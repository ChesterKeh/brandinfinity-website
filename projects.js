/*
  PROJECTS — edit this list to add, remove or reorder work on the site.
  Each project:
    brand, ip        : the two names shown as "Brand × IP"
    category         : "film" | "gaming" | "streaming" | "licensing"  (drives the filter chips)
    summary          : one-line description shown on the card and in the detail view
    tags             : short labels shown in the detail view
    images           : paths under assets/work/ (first one is the cover)
    video (optional) : path to an mp4 shown in the detail view
    featured (opt.)  : true = shown as a large card
*/
window.PROJECTS = [
  {
    brand: "Roborock", ip: "The Garfield Movie",
    category: "film",
    summary: "A campaign film and product placement putting Roborock's robot vacuum into the world of The Garfield Movie, cleaning up after Garfield and Odie.",
    tags: ["Film partnership", "Product placement", "Campaign film"],
    images: ["assets/work/roborock-garfield-3.webp", "assets/video/roborock-garfield.webp", "assets/work/roborock-garfield-2.webp", "assets/work/roborock-garfield-endcard.webp"],
    video: "assets/video/roborock-garfield.mp4"
  },
  {
    brand: "Heinemann", ip: "Monopoly",
    category: "licensing",
    summary: "Sweet Dreams by Heinemann reimagined around the Monopoly board, with a travel-themed edition and campaign film.",
    tags: ["Licensing", "Product creation", "Campaign film"],
    images: ["assets/work/heinemann-monopoly.webp", "assets/work/monopoly-poster.webp"],
    video: "assets/video/heinemann-monopoly.mp4",
    featured: true
  },
  {
    brand: "realme", ip: "Spider-Man: Far From Home",
    category: "film",
    summary: "A Spider-Man: Far From Home edition of the realme smartphone, with a custom superhero theme and cinematic launch film.",
    tags: ["Film tie-in", "Product integration", "Launch film"],
    images: ["assets/work/realme-spiderman.webp", "assets/video/realme-superhero.webp"],
    video: "assets/video/realme-superhero.mp4",
    featured: true
  },
  {
    brand: "Anker", ip: "Transformers",
    category: "film",
    summary: "A Transformers-themed Anker product and launch campaign built around the film release.",
    tags: ["Film tie-in", "Product integration", "Launch campaign"],
    images: ["assets/work/anker-transformers-2.webp", "assets/work/anker-transformers.webp"]
  },
  {
    brand: "TUMI", ip: "Bullet Train",
    category: "film",
    summary: "A TUMI partnership with Sony Pictures' Bullet Train, carried through co-branded creative.",
    tags: ["Film partnership", "Co-branded creative"],
    images: ["assets/work/tumi-bullet-train.webp"]
  },
  {
    brand: "Onitsuka Tiger", ip: "Cinderella",
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

window.PARTNERS = [
  "universal","sony-pictures","warner-bros","prime-video","hasbro","xbox-game-studios","hoyoverse",
  "anker","tumi","onitsuka-tiger","heinemann","tictac","bridgestone","5-hour-energy","lexus","honor",
  "oppo","realme","lenovo","acer","msi","rog","hyperx","zotac","aoc","klook","traveloka","oreo",
  "hershey","mms","mentos","chupa-chups","alpenliebe","haagen-dazs","baskin-robbins","dunkin",
  "pizza-hut","lux","lynx","gillette","caltex","chevron"
];
