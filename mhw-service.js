/**
 * MHWService - Mengambil dan menormalisasi data Monster Hunter: World & Iceborne
 * dari live REST API https://mhw-db.com dengan caching localStorage.
 */
(function () {
    const BASE_URL = "https://mhw-db.com";
    const CACHE_KEY = "mhwi_kompendium_data_v1";

    const ELEMENT_TYPES = new Set(["fire", "water", "thunder", "ice", "dragon"]);
    const STATUS_TYPES = new Set(["poison", "sleep", "paralysis", "blast", "stun"]);

    // Pemetaan nama armor set khusus yang tidak mengandung nama monsternya di API
    const SPECIAL_ARMOR_PREFIXES = {
        "Teostra": ["kaiser"],
        "Lunastra": ["empress"],
        "Kushala Daora": ["kushala"],
        "Vaal Hazak": ["vaal", "blackveil"],
        "Blackveil Vaal Hazak": ["blackveil", "fellshroud"],
        "Nergigante": ["nergigante"],
        "Ruiner Nergigante": ["ruinous"],
        "Namielle": ["tentacle"],
        "Velkhana": ["rimeguard"],
        "Shara Ishvalda": ["shara ishvalda"],
        "Safi'jiiva": ["safi"],
        "Kulve Taroth": ["kulve"],
        "Alatreon": ["escadora"],
        "Fatalis": ["dragon a+", "dragon b+"],
        "Zorah Magdaros": ["zorah"],
        "Xeno'jiiva": ["xeno"],
        "Behemoth": ["drachen"],
        "Leshen": ["geralt"],
        "Ancient Leshen": ["ciri"]
    };

    function capitalize(str) {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * Mengelompokkan material drop & persentase ke Low Rank, High Rank, dan Master Rank
     */
    function groupDropsByRank(rewards = []) {
        const grouped = {
            low: [],
            high: [],
            master: []
        };

        const seen = new Set();

        rewards.forEach((reward) => {
            const item = reward.item;
            if (!item) return;

            (reward.conditions || []).forEach((cond) => {
                const rank = (cond.rank || "").toLowerCase();
                if (!grouped[rank]) return;

                const method = cond.subtype ? `${cond.type} (${cond.subtype})` : cond.type;
                const dedupeKey = `${rank}|${item.id}|${method}|${cond.quantity}|${cond.chance}`;
                if (seen.has(dedupeKey)) return;
                seen.add(dedupeKey);

                grouped[rank].push({
                    itemId: item.id,
                    itemName: item.name,
                    rarity: item.rarity || 1,
                    method: method,
                    type: cond.type || "Reward",
                    subtype: cond.subtype || null,
                    quantity: cond.quantity || 1,
                    chance: typeof cond.chance === "number" ? cond.chance : 0
                });
            });
        });

        // Urutkan dari persentase drop tertinggi ke terendah
        Object.keys(grouped).forEach((rank) => {
            grouped[rank].sort((a, b) => {
                if (b.chance !== a.chance) return b.chance - a.chance;
                return b.rarity - a.rarity;
            });
        });

        return grouped;
    }

    /**
     * Memformat daftar weakness (elemental & status) serta menentukan kelemahan utama
     */
    function formatWeaknesses(rawWeaknesses = []) {
        const elemental = [];
        const status = [];

        rawWeaknesses.forEach((w) => {
            const elemKey = (w.element || "").toLowerCase();
            const entry = {
                element: elemKey,
                label: capitalize(elemKey),
                stars: w.stars || 1,
                condition: w.condition || null
            };

            if (ELEMENT_TYPES.has(elemKey)) {
                elemental.push(entry);
            } else if (STATUS_TYPES.has(elemKey)) {
                status.push(entry);
            }
        });

        elemental.sort((a, b) => b.stars - a.stars);
        status.sort((a, b) => b.stars - a.stars);

        // Kelemahan utama (tanpa kondisi khusus jika ada, atau bintang tertinggi)
        const baseElemental = elemental.filter((e) => !e.condition);
        const topPool = baseElemental.length ? baseElemental : elemental;
        const primaryWeakness = topPool.length ? topPool[0].label : "None";

        return {
            elemental,
            status,
            primaryWeakness
        };
    }

    /**
     * Mengambil & memformat seluruh data MHW:I dari mhw-db.com
     */
    async function fetchAllData(forceRefresh = false) {
        if (!forceRefresh) {
            try {
                const cachedRaw = localStorage.getItem(CACHE_KEY);
                if (cachedRaw) {
                    const parsed = JSON.parse(cachedRaw);
                    if (parsed && Array.isArray(parsed.monsters) && parsed.monsters.length > 0) {
                        return parsed;
                    }
                }
            } catch (e) {
                console.warn("Cache localStorage tidak terbaca, mengambil ulang dari API:", e);
            }
        }

        const [monstersRes, armorSetsRes] = await Promise.all([
            fetch(`${BASE_URL}/monsters`),
            fetch(`${BASE_URL}/armor/sets`)
        ]);

        if (!monstersRes.ok || !armorSetsRes.ok) {
            throw new Error(`HTTP Error (${monstersRes.status} / ${armorSetsRes.status}) saat menghubungi mhw-db.com`);
        }

        const rawMonsters = await monstersRes.json();
        const rawArmorSets = await armorSetsRes.json();

        // Filter hanya Large Monsters (World + Iceborne)
        const largeMonsters = rawMonsters.filter((m) => m.type === "large");

        // Hitung frekuensi item drop lintas monster untuk mengenali material eksklusif monster
        const itemMonsterCount = new Map();
        largeMonsters.forEach((m) => {
            const uniqueItemIds = new Set((m.rewards || []).map((r) => r.item?.id).filter(Boolean));
            uniqueItemIds.forEach((id) => {
                itemMonsterCount.set(id, (itemMonsterCount.get(id) || 0) + 1);
            });
        });

        // Normalisasi data Armor Sets
        const normalizedArmorSets = rawArmorSets.map((set) => {
            const requiredItemIds = new Set();

            const pieces = (set.pieces || []).map((piece) => {
                const materials = (piece.crafting?.materials || []).map((mat) => {
                    if (mat.item?.id) requiredItemIds.add(mat.item.id);
                    return {
                        itemId: mat.item?.id,
                        name: mat.item?.name || "Unknown Material",
                        quantity: mat.quantity || 1
                    };
                });

                return {
                    id: piece.id,
                    name: piece.name,
                    type: capitalize(piece.type || "piece"),
                    defense: piece.defense?.base || 0,
                    maxDefense: piece.defense?.max || 0,
                    resistances: piece.resistances || { fire: 0, water: 0, thunder: 0, ice: 0, dragon: 0 },
                    slots: (piece.slots || []).map((s) => s.rank),
                    skills: (piece.skills || []).map((s) => ({
                        name: s.skillName,
                        level: s.level
                    })),
                    materials
                };
            });

            return {
                id: set.id,
                name: set.name,
                rank: (set.rank || "").toLowerCase(),
                bonus: set.bonus
                    ? {
                          name: set.bonus.name,
                          ranks: (set.bonus.ranks || []).map((r) => ({
                              pieces: r.pieces,
                              skillName: r.skill?.skillName || set.bonus.name,
                              description: r.description || ""
                          }))
                      }
                    : null,
                pieces,
                _requiredItemIds: Array.from(requiredItemIds)
            };
        });

        // Normalisasi data Monsters + relasi Armor Set per Rank
        const monsters = largeMonsters
            .map((m) => {
                const drops = groupDropsByRank(m.rewards);
                const weaknessInfo = formatWeaknesses(m.weaknesses);

                // Kumpulkan material signature monster ini (muncul pada maksimal 2 monster)
                const signatureItemIds = new Set(
                    (m.rewards || [])
                        .map((r) => r.item?.id)
                        .filter((id) => id && (itemMonsterCount.get(id) || 0) <= 2)
                );

                const monsterNameLower = m.name.toLowerCase();
                const specialPrefixes = SPECIAL_ARMOR_PREFIXES[m.name] || [];

                const matchingSets = normalizedArmorSets
                    .filter((set) => {
                        const setNameLower = set.name.toLowerCase();
                        const matchName = setNameLower.includes(monsterNameLower);
                        const matchPrefix = specialPrefixes.some((p) => setNameLower.startsWith(p));
                        const matchMaterial = set._requiredItemIds.some((id) => signatureItemIds.has(id));
                        return matchName || matchPrefix || matchMaterial;
                    })
                    .map(({ _requiredItemIds, ...cleanSet }) => cleanSet);

                const armorSets = {
                    low: matchingSets.filter((s) => s.rank === "low"),
                    high: matchingSets.filter((s) => s.rank === "high"),
                    master: matchingSets.filter((s) => s.rank === "master")
                };

                return {
                    id: m.id,
                    name: m.name,
                    species: capitalize(m.species || "Unknown"),
                    description: m.description || "No ecological data recorded in the Guild archive.",
                    locations: (m.locations || []).map((l) => l.name),
                    weaknesses: weaknessInfo,
                    primaryWeakness: weaknessInfo.primaryWeakness,
                    ailments: (m.ailments || []).map((a) => ({
                        id: a.id,
                        name: a.name,
                        description: a.description || ""
                    })),
                    drops,
                    armorSets,
                    availableRanks: {
                        low: drops.low.length > 0 || armorSets.low.length > 0,
                        high: drops.high.length > 0 || armorSets.high.length > 0,
                        master: drops.master.length > 0 || armorSets.master.length > 0
                    }
                };
            })
            .sort((a, b) => a.name.localeCompare(b.name));

        const payload = {
            source: "mhw-db.com",
            fetchedAt: new Date().toISOString(),
            totalMonsters: monsters.length,
            monsters
        };

        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
        } catch (e) {
            console.warn("Gagal menyimpan cache ke localStorage:", e);
        }

        return payload;
    }

    window.MHWService = {
        fetchAllData,
        CACHE_KEY
    };
})();
