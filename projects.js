/*
  PROJECTS — edit this list to add, remove or reorder work on the site.
  Each project:
    brand, ip          : the two names shown as "Brand × IP"
    category           : "film" | "gaming" | "streaming" | "licensing"  (drives the filter buttons)
    summary            : one-line description shown in the case study
    tags               : short scope labels shown in the case study
    images             : paths under assets/ (the first one is the cover)
    video     (opt.)   : path to an mp4, plays in the carousel/grid on hover and in the case study
    cover     (opt.)   : a different image for the grid card
    highlight (opt.)   : true = also shown in the Our Work carousel
*/
window.PROJECTS = [
  {
    brand: "Roborock", ip: "The Garfield Movie",
    highlight: true,   // shown in the Our Work carousel
    category: "film",
    summary: "A campaign film and product placement putting Roborock's robot vacuum into the world of The Garfield Movie, cleaning up after Garfield and Odie.",
    tags: ["Film partnership", "Product placement", "Campaign film"],
    images: ["assets/video/roborock-garfield.webp", "assets/work/roborock-garfield-3.webp", "assets/work/roborock-garfield-2.webp", "assets/work/roborock-garfield-endcard.webp"],
    video: "assets/video/roborock-garfield.mp4",
    cover: "assets/work/roborock-garfield-2.webp"   // optional: different image for the grid card
  },
  {
    brand: "Heinemann", ip: "Monopoly",
    highlight: true,   // shown in the Our Work carousel
    category: "licensing",
    summary: "Sweet Dreams by Heinemann reimagined around the Monopoly board, with a travel-themed edition and campaign film.",
    tags: ["Licensing", "Product creation", "Campaign film"],
    images: ["assets/work/heinemann-monopoly.webp", "assets/work/monopoly-poster.webp"],
    video: "assets/video/heinemann-monopoly.mp4",
    featured: true
  },
  {
    brand: "realme", ip: "Spider-Man: Far From Home",
    highlight: true,   // shown in the Our Work carousel
    category: "film",
    summary: "A Spider-Man: Far From Home edition of the realme smartphone, with a custom superhero theme and cinematic launch film.",
    tags: ["Film tie-in", "Product integration", "Launch film"],
    images: ["assets/work/realme-spiderman.webp", "assets/video/realme-superhero.webp"],
    video: "assets/video/realme-superhero.mp4",
    featured: true
  },
  {
    brand: "Anker", ip: "Transformers",
    highlight: true,   // shown in the Our Work carousel
    category: "film",
    summary: "A Transformers-themed Anker product and launch campaign built around the film release.",
    tags: ["Film tie-in", "Product integration", "Launch campaign"],
    images: ["assets/work/anker-transformers-2.webp", "assets/work/anker-transformers.webp"]
  },
  {
    brand: "TUMI", ip: "Bullet Train",
    highlight: true,   // shown in the Our Work carousel
    category: "film",
    summary: "A TUMI partnership with Sony Pictures' Bullet Train, carried through co-branded creative.",
    tags: ["Film partnership", "Co-branded creative"],
    images: ["assets/work/tumi-bullet-train.webp"]
  },
  {
    brand: "Onitsuka Tiger", ip: "Cinderella",
    highlight: true,   // shown in the Our Work carousel
    category: "film",
    summary: "Onitsuka Tiger stepped into the world of Cinderella with a co-branded campaign.",
    tags: ["Film partnership", "Fashion", "Co-branded creative"],
    images: ["assets/work/onitsuka-cinderella.webp"]
  },
  {
    brand: "MSI", ip: "Venom",
    category: "film",
    summary: "MSI gaming hardware paired with Venom, with a free Venom gift box with purchase.",
    tags: ["Film tie-in", "Gift with purchase", "Retail"],
    images: ["assets/work/msi-venom.webp"]
  },
  {
    brand: "ZOTAC GAMING", ip: "Spider-Man: Across the Spider-Verse",
    category: "film",
    summary: "ZOTAC GAMING teamed up with Spider-Man: Across the Spider-Verse to 'Power the hero in you'.",
    tags: ["Film tie-in", "Gaming hardware", "Campaign"],
    images: ["assets/work/zotac-spiderverse.webp"]
  },
  {
    brand: "Lenovo", ip: "Madame Web",
    category: "film",
    summary: "Lenovo Legion and Yoga laptops showcased alongside Madame Web.",
    tags: ["Film tie-in", "Product placement", "Campaign"],
    images: ["assets/work/lenovo-madameweb.webp"]
  },
  {
    brand: "Dunkin'", ip: "Spider-Man: Far From Home",
    category: "film",
    summary: "Limited-edition Spider-Man: Far From Home donut boxes for Dunkin'.",
    tags: ["Film tie-in", "Packaging", "In-store"],
    images: ["assets/work/dunkin-spiderman.webp"]
  },
  {
    brand: "Vitakraft", ip: "DC League of Super-Pets",
    highlight: true,   // shown in the Our Work carousel
    category: "film",
    summary: "An on-pack promotion giving pet owners the chance to win movie tickets to DC League of Super-Pets.",
    tags: ["Film tie-in", "On-pack promotion", "In-trade"],
    images: ["assets/work/vitakraft-superpets.webp"]
  },
  {
    brand: "5-hour Energy", ip: "Venom & Spider-Verse",
    category: "film",
    summary: "Limited-edition 5-hour Energy packs and campaigns tied to the Venom and Spider-Verse films.",
    tags: ["Film tie-in", "Limited-edition packs", "Retail"],
    images: ["assets/work/5hour-spiderverse.webp", "assets/work/5hour-venom.webp"]
  },
  {
    brand: "Tic Tac", ip: "Mobile Legends: Bang Bang",
    highlight: true,   // shown in the Our Work carousel
    category: "gaming",
    summary: "A Tic Tac promotion where purchases unlocked in-game Diamonds, skins and heroes for Mobile Legends players.",
    tags: ["Gaming", "Sales mechanic", "In-game rewards"],
    images: ["assets/work/tictac-mlbb-2.webp", "assets/work/tictac-mlbb.webp"]
  },
  {
    brand: "Bridgestone", ip: "Race to the Top",
    category: "gaming",
    summary: "Bridgestone brought into gaming with a custom controller, in-game racing suits and a 'Race to the Top' activation.",
    tags: ["Gaming", "In-game integration", "Merchandise"],
    images: ["assets/work/bridgestone-race.webp", "assets/work/bridgestone-controller.webp", "assets/work/bridgestone-suits.webp"]
  }
];

/*
  PRODUCTS — the "Products & activations" gallery.
  project: the brand name of the project it opens (must match a PROJECTS brand)
*/
window.PRODUCTS = [
  { img: "assets/work/5hour-venom.webp", label: "Venom special-edition shot", project: "5-hour Energy" },
  { img: "assets/work/bridgestone-suits.webp", label: "Bridgestone in-game racing suits", project: "Bridgestone", fill: true },
  { img: "assets/work/anker-transformers.webp", label: "Nebula × Transformers projector", project: "Anker", fill: true },
  { img: "assets/work/dunkin-spiderman.webp", label: "Spider-Man donut boxes", project: "Dunkin'" },
  { img: "assets/work/bridgestone-controller.webp", label: "Bridgestone custom controller", project: "Bridgestone", fill: true },
  { img: "assets/work/5hour-spiderverse.webp", label: "Across the Spider-Verse campaign", project: "5-hour Energy", wide: true }
];

window.PARTNERS = [
  "hasbro","sony-pictures","hoyoverse","xbox-game-studios","universal","prime-video","warner-bros",
  "rog","tumi","lenovo","pizza-hut","tictac","onitsuka-tiger","mentos",
  "realme","traveloka","oreo","baskin-robbins","mms","aoc","alpenliebe",
  "lynx","bridgestone","lux","chupa-chups","msi","hyperx","haagen-dazs",
  "dunkin","klook","lexus","acer","chevron","5-hour-energy","anker",
  "honor","heinemann","oppo","caltex","gillette","hershey","zotac"
];
