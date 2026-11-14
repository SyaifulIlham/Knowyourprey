/**
 * Hunter's Kompendium UI Controller (Monster Hunter: World & Iceborne)
 */
(function () {
    let monsters = [];
    let currentMonster = null;
    let currentRank = "master";

    const ELEMENT_BADGE_STYLES = {
        fire: "border-red-500/40 bg-red-950/50 text-red-300",
        water: "border-sky-500/40 bg-sky-950/50 text-sky-300",
        thunder: "border-yellow-500/40 bg-yellow-950/50 text-yellow-300",
        ice: "border-cyan-500/40 bg-cyan-950/50 text-cyan-300",
        dragon: "border-purple-500/40 bg-purple-950/50 text-purple-300",
        poison: "border-fuchsia-500/40 bg-fuchsia-950/50 text-fuchsia-300",
        sleep: "border-indigo-500/40 bg-indigo-950/50 text-indigo-300",
        paralysis: "border-amber-500/40 bg-amber-950/50 text-amber-300",
        blast: "border-orange-500/40 bg-orange-950/50 text-orange-300",
        stun: "border-stone-500/40 bg-stone-800/70 text-stone-200"
    };

    const grid = document.getElementById("monsterGrid");
    const searchInput = document.getElementById("searchInput");
    const classFilter = document.getElementById("classFilter");
    const elementFilter = document.getElementById("elementFilter");
    const loadingState = document.getElementById("loadingState");
    const errorState = document.getElementById("errorState");
    const emptyState = document.getElementById("emptyState");
    const apiStatusBadge = document.getElementById("apiStatusBadge");
    const modal = document.getElementById("monsterModal");

    function renderStars(count) {
        const filled = "★".repeat(Math.min(3, Math.max(0, count)));
        const empty = "☆".repeat(Math.max(0, 3 - count));
        const color = count >= 3 ? "text-amber-300" : count === 2 ? "text-amber-500" : "text-zinc-400";
        return `<span class="font-bold tracking-wider ${color}">${filled}<span class="text-zinc-600">${empty}</span></span>`;
    }

    function populateSpeciesFilter() {
        const currentVal = classFilter.value;
        const speciesList = [...new Set(monsters.map((m) => m.species))].sort();
        classFilter.innerHTML = `<option value="all">All species (${speciesList.length})</option>`;
        speciesList.forEach((sp) => {
            const opt = document.createElement("option");
            opt.value = sp;
            opt.textContent = sp;
            classFilter.appendChild(opt);
        });
        if ([...classFilter.options].some((o) => o.value === currentVal)) {
            classFilter.value = currentVal;
        }
    }

    function monsterMatchesSearch(monster, term) {
        if (!term) return true;
        if (monster.name.toLowerCase().includes(term)) return true;
        if (monster.species.toLowerCase().includes(term)) return true;
        if (monster.locations.some((loc) => loc.toLowerCase().includes(term))) return true;

        // Cek juga pada daftar material drop (Low, High, Master Rank)
        const allDrops = [
            ...monster.drops.low,
            ...monster.drops.high,
            ...monster.drops.master
        ];
        return allDrops.some((d) => d.itemName.toLowerCase().includes(term));
    }

    function getMatchingMaterialHint(monster, term) {
        if (!term || monster.name.toLowerCase().includes(term)) return null;
        const allDrops = [
            ...monster.drops.master.map((d) => ({ ...d, rankLabel: "MR" })),
            ...monster.drops.high.map((d) => ({ ...d, rankLabel: "HR" })),
            ...monster.drops.low.map((d) => ({ ...d, rankLabel: "LR" }))
        ];
        const found = allDrops.find((d) => d.itemName.toLowerCase().includes(term));
        return found ? `${found.itemName} (${found.rankLabel} ${found.chance}%)` : null;
    }

    function renderGrid() {
        const term = searchInput.value.trim().toLowerCase();
        const selSpecies = classFilter.value;
        const selElem = elementFilter.value;

        const filtered = monsters.filter((m) => {
            const matchSearch = monsterMatchesSearch(m, term);
            const matchSpecies = selSpecies === "all" || m.species === selSpecies;
            const matchElem =
                selElem === "all" ||
                m.weaknesses.elemental.some(
                    (w) => w.label.toLowerCase() === selElem.toLowerCase() && w.stars >= 2
                );
            return matchSearch && matchSpecies && matchElem;
        });

        grid.innerHTML = "";
        document.getElementById("resultCount").textContent = filtered.length;
        emptyState.classList.toggle("hidden", filtered.length > 0 || monsters.length === 0);

        filtered.forEach((m, idx) => {
            const card = document.createElement("article");
            card.className = "monster-card rounded-sm";
            card.tabIndex = 0;
            card.setAttribute("role", "button");
            card.setAttribute("aria-label", `View ${m.name} dossier`);

            const artUrl = window.getMonsterArtwork(m.name);
            const rankBadges = [
                m.availableRanks.low ? `<span class="rounded bg-emerald-950/90 border border-emerald-500/40 px-1.5 py-0.5 text-[9px] font-black text-emerald-300">LR</span>` : "",
                m.availableRanks.high ? `<span class="rounded bg-amber-950/90 border border-amber-500/40 px-1.5 py-0.5 text-[9px] font-black text-amber-300">HR</span>` : "",
                m.availableRanks.master ? `<span class="rounded bg-rose-950/90 border border-rose-500/40 px-1.5 py-0.5 text-[9px] font-black text-rose-300">MR</span>` : ""
            ].filter(Boolean).join("");

            const materialHint = getMatchingMaterialHint(m, term);
            const topWeaknesses = m.weaknesses.elemental.slice(0, 2);

            card.innerHTML = `
                <div class="monster-art">
                    <img src="${artUrl}" alt="${m.name}" loading="lazy" decoding="async">
                    <span class="absolute left-3 top-3 z-10 rounded-sm border border-white/15 bg-black/60 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-amber-100">${m.species}</span>
                    <div class="absolute right-3 top-3 z-10 flex gap-1">${rankBadges}</div>
                </div>
                <div class="monster-card-body px-4 pb-4">
                    <div class="monster-number mb-1">GUILD RECORD #${String(idx + 1).padStart(2, "0")}</div>
                    <div class="monster-name text-xl font-black uppercase leading-tight">${m.name}</div>
                    ${
                        materialHint
                            ? `<div class="mt-2 rounded border border-amber-500/30 bg-amber-950/30 px-2 py-1 text-[11px] text-amber-200">Drop: <strong>${materialHint}</strong></div>`
                            : ""
                    }
                    <div class="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                        <span class="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-500">Weakness</span>
                        <div class="flex flex-wrap justify-end gap-1">
                            ${
                                topWeaknesses.length
                                    ? topWeaknesses
                                          .map(
                                              (w) =>
                                                  `<span class="element-tag rounded-sm px-2 py-0.5 text-[10px] font-black uppercase tracking-wider">${w.label} ${"★".repeat(w.stars)}</span>`
                                          )
                                          .join("")
                                    : `<span class="element-tag rounded-sm px-2 py-0.5 text-[10px] font-black uppercase">None</span>`
                            }
                        </div>
                    </div>
                    <div class="mt-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                        <span>Drops &amp; Armor Sets</span>
                        <span class="text-amber-400" aria-hidden="true">&#x2197;</span>
                    </div>
                </div>
            `;

            const imgEl = card.querySelector("img");
            imgEl.addEventListener(
                "error",
                () => {
                    imgEl.src = window.MONSTER_PLACEHOLDER_SVG;
                },
                { once: true }
            );

            card.addEventListener("click", () => openModal(m));
            card.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openModal(m);
                }
            });

            grid.appendChild(card);
        });
    }

    function renderWeaknessList(list, containerEl) {
        if (!list || list.length === 0) {
            containerEl.innerHTML = `<p class="text-zinc-500">No significant weakness recorded.</p>`;
            return;
        }

        containerEl.innerHTML = list
            .map((w) => {
                const badgeClass = ELEMENT_BADGE_STYLES[w.element] || "border-zinc-700 bg-zinc-800 text-zinc-200";
                return `
                    <div class="flex items-center justify-between gap-2 rounded border border-zinc-800/80 bg-zinc-950/60 px-2.5 py-1.5">
                        <div class="flex items-center gap-2">
                            <span class="rounded border px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${badgeClass}">${w.label}</span>
                            ${w.condition ? `<span class="text-[11px] italic text-zinc-400">(${w.condition})</span>` : ""}
                        </div>
                        <div>${renderStars(w.stars)}</div>
                    </div>
                `;
            })
            .join("");
    }

    function populateDropMethodFilter(dropsForRank) {
        const methodFilter = document.getElementById("dropMethodFilter");
        const methods = [...new Set(dropsForRank.map((d) => d.type))].sort();
        methodFilter.innerHTML = `<option value="all">All Methods (${dropsForRank.length})</option>`;
        methods.forEach((m) => {
            const opt = document.createElement("option");
            opt.value = m;
            opt.textContent = m;
            methodFilter.appendChild(opt);
        });
    }

    function renderRankContent(monster, rank) {
        currentRank = rank;
        const rankTitles = {
            low: "Low Rank",
            high: "High Rank",
            master: "Master Rank"
        };

        document.getElementById("activeRankLabel").textContent = rankTitles[rank];
        document.getElementById("activeArmorRankLabel").textContent = rankTitles[rank];

        // Update active state tombol tab
        document.querySelectorAll("#rankTabs .rank-tab").forEach((btn) => {
            const btnRank = btn.dataset.rank;
            const dropCount = monster.drops[btnRank]?.length || 0;
            btn.textContent = `${rankTitles[btnRank]} (${dropCount})`;
            btn.classList.remove("active-low", "active-high", "active-master");
            if (btnRank === rank) {
                btn.classList.add(`active-${rank}`);
            }
        });

        const rankDrops = monster.drops[rank] || [];
        populateDropMethodFilter(rankDrops);
        renderDropsTable(rankDrops, "all");
        renderArmorSets(monster.armorSets[rank] || [], rankTitles[rank]);
    }

    function renderDropsTable(rankDrops, methodFilterVal) {
        const tbody = document.getElementById("dropsTableBody");
        const filteredDrops =
            methodFilterVal === "all"
                ? rankDrops
                : rankDrops.filter((d) => d.type === methodFilterVal);

        if (!filteredDrops.length) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="4" class="py-8 text-center text-zinc-500">
                        Monster ini tidak memiliki tabel material drop pada rank ini.
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = filteredDrops
            .map((d) => {
                const barColor =
                    d.chance >= 40
                        ? "bg-emerald-500"
                        : d.chance >= 15
                        ? "bg-amber-400"
                        : "bg-rose-400";
                const textColor =
                    d.chance >= 40
                        ? "text-emerald-300"
                        : d.chance >= 15
                        ? "text-amber-300"
                        : "text-rose-300";

                return `
                    <tr class="hover:bg-zinc-900/70">
                        <td class="font-bold text-zinc-100">
                            ${d.itemName}
                            <span class="ml-1.5 rounded border border-zinc-700 bg-zinc-900 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-400">R${d.rarity}</span>
                        </td>
                        <td class="text-zinc-300">${d.method}</td>
                        <td class="text-center font-semibold text-zinc-300">x${d.quantity}</td>
                        <td class="text-right">
                            <div class="inline-flex items-center justify-end gap-2">
                                <div class="hidden h-1.5 w-16 overflow-hidden rounded-full bg-zinc-800 sm:block">
                                    <div class="h-full ${barColor}" style="width: ${Math.min(100, d.chance)}%"></div>
                                </div>
                                <span class="min-w-[3rem] font-black ${textColor}">${d.chance}%</span>
                            </div>
                        </td>
                    </tr>
                `;
            })
            .join("");
    }

    function renderArmorSets(sets, rankTitle) {
        const container = document.getElementById("armorSetsContainer");
        if (!sets || sets.length === 0) {
            container.innerHTML = `
                <div class="rounded border border-dashed border-zinc-800 bg-zinc-900/40 px-4 py-6 text-center text-xs text-zinc-500">
                    Tidak ada armor set khusus monster ini pada ${rankTitle}.
                </div>
            `;
            return;
        }

        container.innerHTML = sets
            .map((set) => {
                const bonusHtml = set.bonus
                    ? `<div class="mt-2 rounded border border-amber-500/30 bg-amber-950/25 px-3 py-2 text-xs">
                        <span class="font-black uppercase text-amber-300">Set Bonus — ${set.bonus.name}:</span>
                        <ul class="mt-1 space-y-0.5 text-zinc-300">
                            ${set.bonus.ranks
                                .map((r) => `<li><strong class="text-amber-200">(${r.pieces} pcs)</strong> ${r.skillName}: ${r.description}</li>`)
                                .join("")}
                        </ul>
                       </div>`
                    : "";

                const piecesHtml = set.pieces
                    .map((p) => {
                        const skillsStr = p.skills.length
                            ? p.skills.map((s) => `<span class="rounded bg-zinc-800 px-1.5 py-0.5 text-[11px] text-amber-200">${s.name} Lv.${s.level}</span>`).join(" ")
                            : `<span class="text-[11px] text-zinc-500">No innate skills</span>`;

                        const slotsStr = p.slots.length
                            ? p.slots.map((lv) => `<span class="rounded border border-sky-500/40 bg-sky-950/40 px-1.5 py-0.5 text-[10px] font-bold text-sky-300">[${lv}]</span>`).join(" ")
                            : `<span class="text-[10px] text-zinc-600">-</span>`;

                        const matsStr = p.materials.length
                            ? p.materials.map((m) => `${m.name} x${m.quantity}`).join(", ")
                            : "-";

                        return `
                            <div class="border-t border-zinc-800/80 py-2.5 text-xs">
                                <div class="flex flex-wrap items-center justify-between gap-2">
                                    <div>
                                        <span class="mr-1.5 rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] font-black uppercase text-zinc-400">${p.type}</span>
                                        <strong class="text-zinc-100">${p.name}</strong>
                                    </div>
                                    <div class="flex items-center gap-2 text-[11px] text-zinc-400">
                                        <span>Def: <strong class="text-zinc-200">${p.defense}</strong></span>
                                        <span>Slots: ${slotsStr}</span>
                                    </div>
                                </div>
                                <div class="mt-1.5 flex flex-wrap gap-1">${skillsStr}</div>
                                <div class="mt-1 text-[11px] text-zinc-400">Materials: <span class="text-zinc-300">${matsStr}</span></div>
                            </div>
                        `;
                    })
                    .join("");

                return `
                    <details class="group rounded border border-zinc-800 bg-zinc-900/70 p-3.5" open>
                        <summary class="flex cursor-pointer list-none items-center justify-between gap-2">
                            <div>
                                <span class="text-sm font-black uppercase tracking-wide text-amber-300">${set.name}</span>
                                <span class="ml-2 text-xs text-zinc-400">(${set.pieces.length} pieces)</span>
                            </div>
                            <span class="text-xs font-bold text-zinc-400 group-open:rotate-180 transition-transform">&#9662;</span>
                        </summary>
                        ${bonusHtml}
                        <div class="mt-2.5">${piecesHtml}</div>
                    </details>
                `;
            })
            .join("");
    }

    function openModal(monster) {
        currentMonster = monster;

        const modalImage = document.getElementById("modalImage");
        modalImage.src = window.getMonsterArtwork(monster.name);
        modalImage.alt = monster.name;
        modalImage.onerror = () => {
            modalImage.src = window.MONSTER_PLACEHOLDER_SVG;
        };

        document.getElementById("modalSpeciesBadge").textContent = monster.species;
        document.getElementById("modalName").textContent = monster.name;
        document.getElementById("modalEcology").textContent = monster.description;

        // Habitats
        const locationsEl = document.getElementById("modalLocations");
        locationsEl.innerHTML = monster.locations.length
            ? monster.locations
                  .map(
                      (loc) =>
                          `<span class="rounded border border-zinc-700 bg-zinc-900 px-2 py-0.5 text-zinc-300">${loc}</span>`
                  )
                  .join("")
            : `<span class="text-zinc-500">Unknown habitat</span>`;

        // Ailments
        const ailmentsEl = document.getElementById("modalAilments");
        ailmentsEl.innerHTML = monster.ailments.length
            ? monster.ailments
                  .map(
                      (a) => `
                        <div class="rounded border border-rose-900/50 bg-rose-950/25 px-2.5 py-1.5">
                            <div class="font-bold text-rose-300">${a.name}</div>
                            ${a.description ? `<div class="mt-0.5 text-[11px] leading-snug text-zinc-400">${a.description}</div>` : ""}
                        </div>
                      `
                  )
                  .join("")
            : `<span class="text-zinc-500">No special ailments recorded</span>`;

        // Weaknesses
        renderWeaknessList(
            monster.weaknesses.elemental,
            document.getElementById("modalElementWeaknesses")
        );
        renderWeaknessList(
            monster.weaknesses.status,
            document.getElementById("modalStatusWeaknesses")
        );

        // Pilih rank default tertinggi yang tersedia untuk monster ini (MR -> HR -> LR)
        const defaultRank = monster.availableRanks.master
            ? "master"
            : monster.availableRanks.high
            ? "high"
            : "low";

        renderRankContent(monster, defaultRank);
        modal.showModal();
    }

    async function loadKompendium(forceRefresh = false) {
        loadingState.classList.remove("hidden");
        errorState.classList.add("hidden");
        grid.classList.add("hidden");
        emptyState.classList.add("hidden");

        apiStatusBadge.innerHTML = `<span class="h-2 w-2 rounded-full bg-amber-400 animate-pulse"></span> Syncing mhw-db...`;

        try {
            const payload = await window.MHWService.fetchAllData(forceRefresh);
            monsters = payload.monsters;

            document.getElementById("heroMonsterCount").textContent = monsters.length;
            populateSpeciesFilter();

            loadingState.classList.add("hidden");
            grid.classList.remove("hidden");
            renderGrid();

            apiStatusBadge.innerHTML = `<span class="h-2 w-2 rounded-full bg-emerald-400"></span> MHW:I Live (${monsters.length})`;
        } catch (err) {
            console.error(err);
            loadingState.classList.add("hidden");
            errorState.classList.remove("hidden");
            document.getElementById("errorMessage").textContent = err.message;
            apiStatusBadge.innerHTML = `<span class="h-2 w-2 rounded-full bg-rose-500"></span> API Offline`;
        }
    }

    // Event Listeners
    searchInput.addEventListener("input", renderGrid);
    classFilter.addEventListener("change", renderGrid);
    elementFilter.addEventListener("change", renderGrid);

    document.getElementById("closeBtn").addEventListener("click", () => modal.close());
    modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.close();
    });

    document.querySelectorAll("#rankTabs .rank-tab").forEach((btn) => {
        btn.addEventListener("click", () => {
            if (!currentMonster) return;
            renderRankContent(currentMonster, btn.dataset.rank);
        });
    });

    document.getElementById("dropMethodFilter").addEventListener("change", (e) => {
        if (!currentMonster) return;
        const rankDrops = currentMonster.drops[currentRank] || [];
        renderDropsTable(rankDrops, e.target.value);
    });

    document.getElementById("refreshApiBtn").addEventListener("click", () => loadKompendium(true));
    document.getElementById("retryBtn").addEventListener("click", () => loadKompendium(true));

    // Boot
    loadKompendium(false);
})();
