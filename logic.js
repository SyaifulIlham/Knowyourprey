const monsterArtwork = window.monsterArtwork;

const monsters = [
        {
            name: "Rathalos", class: "Flying Wyvern", element: "Fire",
            ecology: "Apex predator of the Ancient Forest, known as the 'King of the Skies'. Uses venomous claws and explosive fire breath.",
            ailments: ["Fireblight", "Poison", "Stun"],
            hitzones: [
                { part: "Head", cut: 65, blunt: 60, ammo: 45, fire: 0, water: 15, thunder: 20, ice: 15, dragon: 30 },
                { part: "Neck", cut: 50, blunt: 40, ammo: 35, fire: 0, water: 10, thunder: 15, ice: 10, dragon: 20 },
                { part: "Back", cut: 30, blunt: 30, ammo: 20, fire: 0, water: 10, thunder: 15, ice: 10, dragon: 20 },
                { part: "Wings", cut: 60, blunt: 40, ammo: 45, fire: 0, water: 15, thunder: 20, ice: 15, dragon: 20 },
                { part: "Legs", cut: 45, blunt: 40, ammo: 30, fire: 0, water: 5, thunder: 10, ice: 5, dragon: 10 },
                { part: "Tail", cut: 45, blunt: 40, ammo: 30, fire: 0, water: 5, thunder: 10, ice: 5, dragon: 20 }
            ]
        },
        {
            name: "Nergigante", class: "Elder Dragon", element: "None",
            ecology: "An Elder Dragon that hunts other Elder Dragons. Covered in spikes that harden over time.",
            ailments: ["None"],
            hitzones: [
                { part: "Head (White Spikes)", cut: 65, blunt: 65, ammo: 50, fire: 0, water: 0, thunder: 30, ice: 0, dragon: 15 },
                { part: "Forelegs (White Spikes)", cut: 60, blunt: 60, ammo: 45, fire: 0, water: 0, thunder: 30, ice: 0, dragon: 15 },
                { part: "Head (Black Spikes)", cut: 20, blunt: 20, ammo: 10, fire: 0, water: 0, thunder: 15, ice: 0, dragon: 10 },
                { part: "Tail", cut: 45, blunt: 40, ammo: 30, fire: 0, water: 0, thunder: 20, ice: 0, dragon: 10 }
            ]
        },
        {
            name: "Zinogre", class: "Fanged Wyvern", element: "Thunder",
            ecology: "A wolf-like wyvern that gathers Fulgurbugs to supercharge its body with electricity.",
            ailments: ["Thunderblight", "Paralysis"],
            hitzones: [
                { part: "Head", cut: 65, blunt: 65, ammo: 50, fire: 15, water: 25, thunder: 0, ice: 30, dragon: 5 },
                { part: "Back", cut: 45, blunt: 45, ammo: 40, fire: 10, water: 20, thunder: 0, ice: 25, dragon: 5 },
                { part: "Forelegs", cut: 40, blunt: 40, ammo: 25, fire: 10, water: 15, thunder: 0, ice: 20, dragon: 5 },
                { part: "Hindlegs", cut: 35, blunt: 35, ammo: 20, fire: 5, water: 10, thunder: 0, ice: 15, dragon: 5 }
            ]
        },
        {
            name: "Aknosom", class: "Bird Wyvern", element: "Fire",
            ecology: "Uses its crest like a parasol to intimidate foes. Can spit fireballs and perform crane-like kicks.",
            ailments: ["Fireblight"],
            hitzones: [
                { part: "Crest", cut: 65, blunt: 60, ammo: 55, fire: 0, water: 30, thunder: 20, ice: 10, dragon: 0 },
                { part: "Head", cut: 60, blunt: 60, ammo: 45, fire: 0, water: 25, thunder: 15, ice: 5, dragon: 0 },
                { part: "Wings", cut: 50, blunt: 45, ammo: 40, fire: 0, water: 25, thunder: 15, ice: 5, dragon: 0 },
                { part: "Legs", cut: 40, blunt: 35, ammo: 30, fire: 0, water: 10, thunder: 10, ice: 5, dragon: 0 }
            ]
        },
        {
            name: "Malzeno", class: "Elder Dragon", element: "Dragon",
            ecology: "A vampiric Elder Dragon that uses Qurio to drain life force. Its movements are incredibly swift.",
            ailments: ["Bloodblight", "Dragonblight"],
            hitzones: [
                { part: "Head", cut: 60, blunt: 55, ammo: 45, fire: 10, water: 10, thunder: 0, ice: 15, dragon: 25 },
                { part: "Forelegs", cut: 45, blunt: 45, ammo: 30, fire: 5, water: 5, thunder: 0, ice: 10, dragon: 20 },
                { part: "Tail (Tip)", cut: 55, blunt: 45, ammo: 35, fire: 5, water: 5, thunder: 0, ice: 10, dragon: 20 },
                { part: "Wings", cut: 30, blunt: 30, ammo: 20, fire: 5, water: 5, thunder: 0, ice: 10, dragon: 15 }
            ]
        },
        {
            name: "Rajang", class: "Fanged Beast", element: "Thunder",
            ecology: "Extremely aggressive. Enters a golden state when enraged, becoming fiercely powerful and fast.",
            ailments: ["Thunderblight"],
            hitzones: [
                { part: "Head", cut: 60, blunt: 65, ammo: 45, fire: 0, water: 15, thunder: 0, ice: 30, dragon: 0 },
                { part: "Forelegs", cut: 45, blunt: 40, ammo: 30, fire: 0, water: 10, thunder: 0, ice: 15, dragon: 0 },
                { part: "Torso", cut: 45, blunt: 40, ammo: 30, fire: 0, water: 10, thunder: 0, ice: 15, dragon: 0 },
                { part: "Tail", cut: 50, blunt: 40, ammo: 20, fire: 0, water: 10, thunder: 0, ice: 20, dragon: 0 }
            ]
        },
        {
            name: "Tigrex", class: "Flying Wyvern", element: "None",
            ecology: "A primal wyvern that uses raw physical strength and deafening roars instead of elemental breath.",
            ailments: ["None"],
            hitzones: [
                { part: "Head", cut: 65, blunt: 65, ammo: 55, fire: 0, water: 15, thunder: 30, ice: 10, dragon: 15 },
                { part: "Forelegs", cut: 50, blunt: 45, ammo: 35, fire: 0, water: 10, thunder: 20, ice: 5, dragon: 10 },
                { part: "Tail", cut: 45, blunt: 40, ammo: 30, fire: 0, water: 5, thunder: 15, ice: 5, dragon: 5 }
            ]
        },
        {
            name: "Velkhana", class: "Elder Dragon", element: "Ice",
            ecology: "An Elder Dragon that controls ice, freezing the moisture in the air to create armor and weapons.",
            ailments: ["Iceblight"],
            hitzones: [
                { part: "Head", cut: 65, blunt: 60, ammo: 45, fire: 30, water: 10, thunder: 15, ice: 0, dragon: 25 },
                { part: "Neck", cut: 55, blunt: 50, ammo: 35, fire: 25, water: 5, thunder: 10, ice: 0, dragon: 20 },
                { part: "Forelegs (Ice)", cut: 30, blunt: 30, ammo: 20, fire: 20, water: 5, thunder: 10, ice: 0, dragon: 15 },
                { part: "Tail", cut: 45, blunt: 40, ammo: 30, fire: 20, water: 5, thunder: 10, ice: 0, dragon: 15 }
            ]
        },
        {
            name: "Magnamalo", class: "Fanged Wyvern", element: "None",
            ecology: "Wreathed in Hellfire, this terrifying wyvern devours other monsters to fuel its explosive attacks.",
            ailments: ["Hellfireblight"],
            hitzones: [
                { part: "Head", cut: 55, blunt: 55, ammo: 40, fire: 0, water: 20, thunder: 15, ice: 10, dragon: 0 },
                { part: "Armblades", cut: 45, blunt: 45, ammo: 30, fire: 0, water: 15, thunder: 10, ice: 5, dragon: 0 },
                { part: "Tail (Blade)", cut: 50, blunt: 45, ammo: 35, fire: 0, water: 15, thunder: 10, ice: 5, dragon: 0 }
            ]
        },
        {
            name: "Anjanath", class: "Brute Wyvern", element: "Fire",
            ecology: "A highly aggressive brute wyvern that breathes fire when enraged. Often hunts in the Ancient Forest.",
            ailments: ["Fireblight"],
            hitzones: [
                { part: "Head", cut: 60, blunt: 60, ammo: 45, fire: 0, water: 30, thunder: 15, ice: 15, dragon: 10 },
                { part: "Nose", cut: 70, blunt: 70, ammo: 50, fire: 0, water: 35, thunder: 20, ice: 20, dragon: 15 },
                { part: "Legs", cut: 35, blunt: 35, ammo: 20, fire: 0, water: 15, thunder: 5, ice: 5, dragon: 5 },
                { part: "Tail", cut: 45, blunt: 40, ammo: 30, fire: 0, water: 20, thunder: 10, ice: 10, dragon: 5 }
            ]
        },
        {
            name: "Glavenus", class: "Brute Wyvern", element: "Fire",
            ecology: "Uses its massive tail like a greatsword, sharpening it on its fangs to make it red hot and explosive.",
            ailments: ["Fireblight"],
            hitzones: [
                { part: "Head", cut: 55, blunt: 55, ammo: 40, fire: 0, water: 30, thunder: 10, ice: 10, dragon: 5 },
                { part: "Throat (Heated)", cut: 65, blunt: 65, ammo: 45, fire: 0, water: 35, thunder: 15, ice: 15, dragon: 10 },
                { part: "Tail (Heated)", cut: 65, blunt: 60, ammo: 45, fire: 0, water: 25, thunder: 10, ice: 10, dragon: 5 },
                { part: "Legs", cut: 35, blunt: 35, ammo: 25, fire: 0, water: 10, thunder: 5, ice: 5, dragon: 5 }
            ]
        },
        {
            name: "Brachydios", class: "Brute Wyvern", element: "None",
            ecology: "Coats its fists and horn with volatile slime that explodes shortly after impact or when struck.",
            ailments: ["Blastblight"],
            hitzones: [
                { part: "Head", cut: 60, blunt: 60, ammo: 45, fire: 0, water: 30, thunder: 10, ice: 20, dragon: 5 },
                { part: "Pounders", cut: 45, blunt: 45, ammo: 30, fire: 0, water: 20, thunder: 5, ice: 15, dragon: 5 },
                { part: "Tail", cut: 45, blunt: 40, ammo: 35, fire: 0, water: 20, thunder: 10, ice: 15, dragon: 5 }
            ]
        },
        {
            name: "Barioth", class: "Flying Wyvern", element: "Ice",
            ecology: "Rules the frozen tundra. Uses its massive tusks and spiked tail to grip the ice for high-speed mobility.",
            ailments: ["Iceblight"],
            hitzones: [
                { part: "Head", cut: 60, blunt: 60, ammo: 45, fire: 30, water: 0, thunder: 15, ice: 0, dragon: 5 },
                { part: "Forelegs", cut: 45, blunt: 45, ammo: 35, fire: 20, water: 0, thunder: 10, ice: 0, dragon: 5 },
                { part: "Tail", cut: 40, blunt: 35, ammo: 30, fire: 20, water: 0, thunder: 10, ice: 0, dragon: 5 }
            ]
        },
        {
            name: "Nargacuga", class: "Flying Wyvern", element: "None",
            ecology: "A stealthy ambush predator that strikes from the shadows. Its tail can fire deadly spikes.",
            ailments: ["Bleeding"],
            hitzones: [
                { part: "Head", cut: 65, blunt: 65, ammo: 45, fire: 15, water: 5, thunder: 30, ice: 10, dragon: 5 },
                { part: "Tail", cut: 45, blunt: 40, ammo: 30, fire: 10, water: 5, thunder: 20, ice: 5, dragon: 5 },
                { part: "Forelegs", cut: 35, blunt: 35, ammo: 25, fire: 10, water: 5, thunder: 15, ice: 5, dragon: 5 }
            ]
        },
        {
            name: "Diablos", class: "Flying Wyvern", element: "None",
            ecology: "A highly territorial herbivore of the desert. Uses its massive horns to charge and burrow underground.",
            ailments: ["Stun"],
            hitzones: [
                { part: "Head", cut: 30, blunt: 25, ammo: 20, fire: 0, water: 15, thunder: 10, ice: 30, dragon: 15 },
                { part: "Belly", cut: 65, blunt: 60, ammo: 40, fire: 0, water: 15, thunder: 10, ice: 30, dragon: 15 },
                { part: "Wings", cut: 45, blunt: 40, ammo: 60, fire: 0, water: 10, thunder: 5, ice: 20, dragon: 10 },
                { part: "Tail", cut: 45, blunt: 40, ammo: 30, fire: 0, water: 10, thunder: 5, ice: 20, dragon: 10 }
            ]
        },
        {
            name: "Astalos", class: "Flying Wyvern", element: "Thunder",
            ecology: "Creates electricity via a specialized crest, wings, and tail. Highly aggressive towards anything in its path.",
            ailments: ["Thunderblight", "Paralysis"],
            hitzones: [
                { part: "Head", cut: 65, blunt: 65, ammo: 45, fire: 10, water: 20, thunder: 0, ice: 30, dragon: 10 },
                { part: "Neck", cut: 45, blunt: 40, ammo: 35, fire: 5, water: 15, thunder: 0, ice: 20, dragon: 5 },
                { part: "Wings", cut: 35, blunt: 35, ammo: 25, fire: 5, water: 15, thunder: 0, ice: 20, dragon: 5 },
                { part: "Tail (Tip)", cut: 55, blunt: 50, ammo: 35, fire: 5, water: 15, thunder: 0, ice: 20, dragon: 5 }
            ]
        },
        {
            name: "Mizutsune", class: "Leviathan", element: "Water",
            ecology: "A graceful Leviathan that secretes a soapy fluid to create bubbles, hindering enemies while sliding swiftly.",
            ailments: ["Waterblight", "Bubbleblight"],
            hitzones: [
                { part: "Head", cut: 65, blunt: 60, ammo: 45, fire: 5, water: 0, thunder: 30, ice: 5, dragon: 15 },
                { part: "Dorsal Fin", cut: 50, blunt: 45, ammo: 35, fire: 5, water: 0, thunder: 20, ice: 5, dragon: 10 },
                { part: "Forelegs", cut: 35, blunt: 35, ammo: 25, fire: 5, water: 0, thunder: 15, ice: 5, dragon: 10 },
                { part: "Tail", cut: 45, blunt: 40, ammo: 30, fire: 5, water: 0, thunder: 20, ice: 5, dragon: 10 }
            ]
        },
        {
            name: "Goss Harag", class: "Fanged Beast", element: "Ice",
            ecology: "Wanders snowy regions. Inhales cold air to freeze its own body fluids, forming deadly ice blades on its arms.",
            ailments: ["Iceblight"],
            hitzones: [
                { part: "Head", cut: 65, blunt: 65, ammo: 55, fire: 30, water: 5, thunder: 10, ice: 0, dragon: 5 },
                { part: "Ice Blade", cut: 60, blunt: 60, ammo: 45, fire: 35, water: 5, thunder: 10, ice: 0, dragon: 5 },
                { part: "Forelegs", cut: 40, blunt: 40, ammo: 25, fire: 20, water: 5, thunder: 5, ice: 0, dragon: 0 },
                { part: "Hindlegs", cut: 35, blunt: 35, ammo: 25, fire: 15, water: 5, thunder: 5, ice: 0, dragon: 0 }
            ]
        },
        {
            name: "Kushala Daora", class: "Elder Dragon", element: "None",
            ecology: "An Elder Dragon of steel that summons fierce storms and tornadoes to blow hunters away.",
            ailments: ["Dragonblight (if corrupted)"],
            hitzones: [
                { part: "Head", cut: 55, blunt: 60, ammo: 40, fire: 10, water: 0, thunder: 20, ice: 0, dragon: 15 },
                { part: "Forelegs", cut: 45, blunt: 45, ammo: 25, fire: 5, water: 0, thunder: 15, ice: 0, dragon: 10 },
                { part: "Tail", cut: 40, blunt: 35, ammo: 25, fire: 5, water: 0, thunder: 15, ice: 0, dragon: 10 },
                { part: "Wings", cut: 30, blunt: 30, ammo: 20, fire: 5, water: 0, thunder: 10, ice: 0, dragon: 5 }
            ]
        },
        {
            name: "Teostra", class: "Elder Dragon", element: "Fire",
            ecology: "The Emperor of Flame. Breathes fire and scatters highly volatile scale dust that explodes.",
            ailments: ["Fireblight", "Blastblight"],
            hitzones: [
                { part: "Head", cut: 65, blunt: 65, ammo: 45, fire: 0, water: 30, thunder: 5, ice: 20, dragon: 10 },
                { part: "Wings", cut: 45, blunt: 40, ammo: 30, fire: 0, water: 15, thunder: 5, ice: 10, dragon: 5 },
                { part: "Tail", cut: 50, blunt: 45, ammo: 35, fire: 0, water: 20, thunder: 5, ice: 15, dragon: 5 },
                { part: "Forelegs", cut: 35, blunt: 35, ammo: 25, fire: 0, water: 10, thunder: 5, ice: 5, dragon: 5 }
            ]
        },
        {
            name: "Arzuros", class: "Fanged Beast", element: "None",
            ecology: "A bear-like beast that raids honey stores and uses its powerful forelegs to knock hunters aside.",
            ailments: ["None"],
            hitzones: []
        },
        {
            name: "Barroth", class: "Brute Wyvern", element: "None",
            ecology: "A territorial wyvern that coats itself in mud for protection and charges anything that enters its path.",
            ailments: ["Waterblight"],
            hitzones: []
        },
        {
            name: "Basarios", class: "Flying Wyvern", element: "Fire",
            ecology: "A rock-armored wyvern that hides among boulders and releases heat and toxic gas when threatened.",
            ailments: ["Poison", "Sleep"],
            hitzones: []
        },
        {
            name: "Bazelgeuse", class: "Flying Wyvern", element: "Blast",
            ecology: "A roaming bomber that scatters explosive scales over the battlefield before diving into the chaos.",
            ailments: ["Blastblight"],
            hitzones: [
                { part: "Head", cut: 65, blunt: 65, ammo: 45, fire: 0, water: 30, thunder: 5, ice: 20, dragon: 10 },
                { part: "Wings", cut: 45, blunt: 40, ammo: 30, fire: 0, water: 15, thunder: 5, ice: 10, dragon: 5 },
                { part: "Tail", cut: 50, blunt: 45, ammo: 35, fire: 0, water: 20, thunder: 5, ice: 15, dragon: 5 },
                { part: "Forelegs", cut: 35, blunt: 35, ammo: 25, fire: 0, water: 10, thunder: 5, ice: 5, dragon: 5 }
            ]
        },
        {
            name: "Beotodus", class: "Piscine Wyvern", element: "Ice",
            ecology: "A snow-burrowing piscine wyvern that cuts through frozen ground with its horn to ambush prey.",
            ailments: ["Iceblight"],
            hitzones: []
        },
        {
            name: "Bishaten", class: "Fanged Beast", element: "None",
            ecology: "A curious, agile beast that hurls poisonous and other strange fruit at its opponents.",
            ailments: ["Poison"],
            hitzones: []
        },
        {
            name: "Chameleos", class: "Elder Dragon", element: "Poison",
            ecology: "A mysterious Elder Dragon that vanishes from sight and attacks with clouds of potent poison.",
            ailments: ["Poison"],
            hitzones: [
                { part: "Head", cut: 55, blunt: 50, ammo: 45, fire: 25, water: 0, thunder: 10, ice: 0, dragon: 20 },
                { part: "Wings", cut: 22, blunt: 20, ammo: 20, fire: 20, water: 0, thunder: 10, ice: 0, dragon: 15 },
                { part: "Tail", cut: 35, blunt: 22, ammo: 45, fire: 10, water: 0, thunder: 10, ice: 0, dragon: 5 },
                { part: "Forelegs", cut: 45, blunt: 45, ammo: 20, fire: 20, water: 0, thunder: 10, ice: 0, dragon: 10 }
            ]
        },
        {
            name: "Congalala", class: "Fanged Beast", element: "None",
            ecology: "A pink-furred beast that uses mushrooms to alter its breath and unleash foul-smelling attacks.",
            ailments: ["Defence Down"],
            hitzones: []
        },
        {
            name: "Espinas", class: "Flying Wyvern", element: "Fire",
            ecology: "A heavily armored wyvern that appears docile until roused, then attacks with fire, poison, and paralysis.",
            ailments: ["Fireblight", "Poison", "Paralysis"],
            hitzones: []
        },
        {
            name: "Gore Magala", class: "Unknown", element: "Dragon",
            ecology: "A winged, sightless creature whose scales spread the Frenzy Virus and heighten its senses.",
            ailments: ["Frenzy"],
            hitzones: []
        },
        {
            name: "Great Girros", class: "Fanged Wyvern", element: "Paralysis",
            ecology: "A pack-leading predator that uses its paralyzing fangs to immobilize prey in the Rotten Vale.",
            ailments: ["Paralysis"],
            hitzones: []
        },
        {
            name: "Great Jagras", class: "Fanged Wyvern", element: "None",
            ecology: "A pack hunter that swallows prey whole, expanding its body before regurgitating its meal.",
            ailments: ["None"],
            hitzones: []
        },
        {
            name: "Great Maccao", class: "Bird Wyvern", element: "None",
            ecology: "A nimble raptor that balances on its powerful tail to launch springing kicks at its prey.",
            ailments: ["None"],
            hitzones: []
        },
        {
            name: "Great Wroggi", class: "Bird Wyvern", element: "Poison",
            ecology: "A pack-leading bird wyvern that expels poisonous gas while its smaller packmates close in.",
            ailments: ["Poison"],
            hitzones: []
        },
        {
            name: "Khezu", class: "Flying Wyvern", element: "Thunder",
            ecology: "A pale cave-dwelling wyvern that clings to ceilings and discharges electricity at close range.",
            ailments: ["Thunderblight", "Paralysis"],
            hitzones: []
        },
        {
            name: "Kulu-Ya-Ku", class: "Bird Wyvern", element: "None",
            ecology: "A clever scavenger that digs up rocks and eggs, then uses its finds as shields and weapons.",
            ailments: ["None"],
            hitzones: []
        },
        {
            name: "Legiana", class: "Flying Wyvern", element: "Ice",
            ecology: "A graceful predator of the Coral Highlands that chills the air around its wings to slow its prey.",
            ailments: ["Iceblight"],
            hitzones: []
        },
        {
            name: "Lunastra", class: "Elder Dragon", element: "Fire",
            ecology: "A fierce Elder Dragon that scatters heat-charged blue scales and fights alongside Teostra.",
            ailments: ["Fireblight", "Blastblight"],
            hitzones: []
        },
        {
            name: "Paolumu", class: "Flying Wyvern", element: "None",
            ecology: "A fluffy wyvern that inflates its throat to float above the ground and blast hunters with air.",
            ailments: ["Sleep"],
            hitzones: []
        },
        {
            name: "Pukei-Pukei", class: "Bird Wyvern", element: "Poison",
            ecology: "A forest-dwelling wyvern that stores toxic plants in its body and sprays poison from its mouth and tail.",
            ailments: ["Poison"],
            hitzones: []
        },
        {
            name: "Seregios", class: "Flying Wyvern", element: "None",
            ecology: "A fast, territorial wyvern that launches razor-sharp scales capable of causing severe bleeding.",
            ailments: ["Bleeding"],
            hitzones: []
        },
        {
            name: "Shagaru Magala", class: "Elder Dragon", element: "Dragon",
            ecology: "The radiant adult form of Gore Magala, spreading Frenzy across vast territories with its wing scales.",
            ailments: ["Frenzy"],
            hitzones: []
        },
        {
            name: "Somnacanth", class: "Leviathan", element: "Water",
            ecology: "A moonlit leviathan that glides across water and releases sleep-inducing powder from its crest.",
            ailments: ["Sleep"],
            hitzones: []
        },
        {
            name: "Tetranadon", class: "Amphibian", element: "Water",
            ecology: "A massive amphibian that gulps down stones and prey, swelling its body before unleashing heavy blows.",
            ailments: ["Waterblight"],
            hitzones: []
        },
        {
            name: "Tobi-Kadachi", class: "Fanged Wyvern", element: "Thunder",
            ecology: "An arboreal wyvern that charges its fur with static as it glides between trees.",
            ailments: ["Thunderblight"],
            hitzones: []
        },
        {
            name: "Uragaan", class: "Brute Wyvern", element: "Fire",
            ecology: "A hulking wyvern that rolls through volcanic terrain and scatters explosive rocks in its wake.",
            ailments: ["Blastblight", "Sleep"],
            hitzones: []
        },
        {
            name: "Vaal Hazak", class: "Elder Dragon", element: "Dragon",
            ecology: "A decaying Elder Dragon shrouded in effluvium that drains the vitality of nearby creatures.",
            ailments: ["Effluvia buildup"],
            hitzones: []
        },
        {
            name: "Viper Tobi-Kadachi", class: "Fanged Wyvern", element: "Poison",
            ecology: "A toxic subspecies that prowls the Hoarfrost Reach and attacks with venomous fangs and tail spines.",
            ailments: ["Poison", "Paralysis"],
            hitzones: []
        },
        {
            name: "Yian Garuga", class: "Bird Wyvern", element: "Fire",
            ecology: "A scarred, aggressive bird wyvern that chains poisonous tail strikes with explosive fireballs.",
            ailments: ["Poison"],
            hitzones: []
        },
        {
            name: "Yian Kut-Ku", class: "Bird Wyvern", element: "Fire",
            ecology: "A skittish bird wyvern with a sensitive ear crest that spits fire and charges in sudden bursts.",
            ailments: ["Fireblight"],
            hitzones: []
        }
    ];
// Populate Filters
    const classes = [...new Set(monsters.map(m => m.class))].sort();
    const elements = [...new Set(monsters.map(m => m.element))].sort();

    const classFilter = document.getElementById('classFilter');
    const elementFilter = document.getElementById('elementFilter');
    
    classes.forEach(c => classFilter.innerHTML += `<option value="${c}">${c}</option>`);
    elements.forEach(e => elementFilter.innerHTML += `<option value="${e}">${e}</option>`);

    // Render Grid
    const grid = document.getElementById('monsterGrid');
    
    function renderGrid() {
        const term = document.getElementById('searchInput').value.toLowerCase();
        const selClass = classFilter.value;
        const selElem = elementFilter.value;
        const filteredMonsters = monsters.filter(m => {
            const matchName = m.name.toLowerCase().includes(term);
            const matchClass = selClass === 'all' || m.class === selClass;
            const matchElem = selElem === 'all' || m.element === selElem;
            return matchName && matchClass && matchElem;
        });

        grid.innerHTML = '';
        document.getElementById('resultCount').textContent = filteredMonsters.length;
        document.getElementById('emptyState').classList.toggle('hidden', filteredMonsters.length > 0);

        filteredMonsters.forEach((m, idx) => {
            const card = document.createElement('article');
            card.className = "monster-card rounded-sm";
            card.tabIndex = 0;
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `View ${m.name} dossier`);
            card.innerHTML = `
                <div class="monster-art">
                    <img src="${monsterArtwork[m.name] || ''}" alt="${m.name}" loading="lazy" decoding="async">
                    <span class="absolute left-3 top-3 z-10 rounded-sm border border-white/15 bg-black/50 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-amber-100">${m.class}</span>
                </div>
                <div class="monster-card-body px-4 pb-4">
                    <div class="monster-number mb-1">FIELD DOSSIER ${String(monsters.indexOf(m) + 1).padStart(2, '0')}</div>
                    <div class="monster-name text-xl font-black uppercase leading-tight">${m.name}</div>
                    <div class="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                        <span class="text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500">Primary element</span>
                        <span class="element-tag rounded-sm px-2 py-1 text-[10px] font-black uppercase tracking-wider">${m.element}</span>
                    </div>
                    <div class="mt-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                        <span>View target data</span><span class="text-amber-400" aria-hidden="true">&#x2197;</span>
                    </div>
                </div>
            `;
            card.querySelector('img').addEventListener('error', event => {
                event.currentTarget.remove();
            }, { once: true });
            card.addEventListener('click', () => openModal(m));
            card.addEventListener('keydown', event => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openModal(m);
                }
            });
            grid.appendChild(card);
        });
    }

    document.getElementById('searchInput').addEventListener('input', renderGrid);
    classFilter.addEventListener('change', renderGrid);
    elementFilter.addEventListener('change', renderGrid);

    // Modal Logic
    const modal = document.getElementById('monsterModal');
    document.getElementById('closeBtn').onclick = () => modal.close();
    
    function formatCell(val, isRaw) {
        if (isRaw && val >= 45) return `<td class="weak-point-raw">${val}</td>`;
        if (!isRaw && val >= 20) return `<td class="weak-point-elem">${val}</td>`;
        return `<td>${val}</td>`;
    }

    function openModal(m) {
        const modalImage = document.getElementById('modalImage');
        modalImage.src = monsterArtwork[m.name] || '';
        modalImage.alt = m.name;
        modalImage.onerror = () => modalImage.removeAttribute('src');
        document.getElementById('modalName').innerText = m.name;
        document.getElementById('modalClass').innerText = m.class;
        document.getElementById('modalEcology').innerText = m.ecology;
        
        document.getElementById('modalAilments').innerHTML = m.ailments.map(a => 
            `<span class="bg-zinc-800 border border-zinc-700 px-2 py-1 rounded text-zinc-300 font-bold">${a}</span>`
        ).join('');

        document.getElementById('hitzoneBody').innerHTML = m.hitzones.length ? m.hitzones.map(h => `
            <tr>
                <td class="text-left font-bold text-zinc-300">${h.part}</td>
                ${formatCell(h.cut, true)}
                ${formatCell(h.blunt, true)}
                ${formatCell(h.ammo, true)}
                ${formatCell(h.fire, false)}
                ${formatCell(h.water, false)}
                ${formatCell(h.thunder, false)}
                ${formatCell(h.ice, false)}
                ${formatCell(h.dragon, false)}
            </tr>
        `).join('') : '<tr><td colspan="9" class="py-6 text-zinc-500">Hitzone data has not been added for this monster yet.</td></tr>';

        modal.showModal();
    }

    // Init
    document.getElementById('heroMonsterCount').textContent = monsters.length;
    renderGrid();
