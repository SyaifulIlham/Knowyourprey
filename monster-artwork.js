// Pemetaan aset gambar lokal monster Monster Hunter: World & Iceborne
window.monsterArtwork = {
    "Anjanath": "assets/monsters/anjanath.png",
    "Barioth": "assets/monsters/barioth.png",
    "Barroth": "assets/monsters/barroth.png",
    "Bazelgeuse": "assets/monsters/bazelgeuse.png",
    "Beotodus": "assets/monsters/beotodus.png",
    "Brachydios": "assets/monsters/brachydios.png",
    "Diablos": "assets/monsters/diablos.png",
    "Glavenus": "assets/monsters/glavenus.png",
    "Great Girros": "assets/monsters/great-girros.png",
    "Great Jagras": "assets/monsters/great-jagras.png",
    "Kulu-Ya-Ku": "assets/monsters/kulu-ya-ku.png",
    "Kushala Daora": "assets/monsters/kushala-daora.webp",
    "Legiana": "assets/monsters/legiana.png",
    "Lunastra": "assets/monsters/lunastra.png",
    "Nargacuga": "assets/monsters/nargacuga.png",
    "Nergigante": "assets/monsters/nergigante.png",
    "Paolumu": "assets/monsters/paolumu.png",
    "Pukei-Pukei": "assets/monsters/pukei-pukei.png",
    "Rajang": "assets/monsters/rajang.png",
    "Rathalos": "assets/monsters/rathalos.png",
    "Teostra": "assets/monsters/teostra.png",
    "Tigrex": "assets/monsters/tigrex.png",
    "Tobi-Kadachi": "assets/monsters/tobi-kadachi.png",
    "Uragaan": "assets/monsters/uragaan.png",
    "Vaal Hazak": "assets/monsters/vaal-hazak.png",
    "Velkhana": "assets/monsters/velkhana.png",
    "Viper Tobi-Kadachi": "assets/monsters/viper-tobi-kadachi.png",
    "Yian Garuga": "assets/monsters/yian-garuga.png",
    "Zinogre": "assets/monsters/zinogre.png"
};

// SVG Emblem Fallback jika monster MHW:I belum memiliki file PNG di folder assets/monsters/
window.MONSTER_PLACEHOLDER_SVG = "data:image/svg+xml;utf8," + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none">
  <rect width="200" height="200" fill="none"/>
  <polygon points="100,22 168,61 168,139 100,178 32,139 32,61" stroke="#d97706" stroke-width="3" stroke-opacity="0.45" fill="#1c1917" fill-opacity="0.6"/>
  <polygon points="100,36 154,68 154,132 100,164 46,132 46,68" stroke="#f59e0b" stroke-width="1.5" stroke-opacity="0.25" fill="none"/>
  <path d="M72 118 L100 66 L128 118 L100 105 Z" fill="#f59e0b" fill-opacity="0.25" stroke="#fbbf24" stroke-width="2"/>
  <circle cx="100" cy="134" r="6" fill="#fbbf24" fill-opacity="0.6"/>
  <text x="100" y="154" text-anchor="middle" fill="#a8a29e" font-family="sans-serif" font-size="9" font-weight="bold" letter-spacing="2">GUILD ARCHIVE</text>
</svg>
`);

window.getMonsterArtwork = function (monsterName) {
    if (!monsterName) return window.MONSTER_PLACEHOLDER_SVG;
    if (window.monsterArtwork[monsterName]) {
        return window.monsterArtwork[monsterName];
    }
    const slug = monsterName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    return `assets/monsters/${slug}.png`;
};
