import { Dish, DishCategory, CategoryInfo, Testimonial, GalleryItem, FAQItem } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'rice-meals',
    name: 'Rice & Meals',
    shortDesc: 'Iconic smoky Jollof, aromatic fried rice, and heirloom native grain delicacies.',
    iconName: 'Utensils',
    image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'african-specials',
    name: 'African Specials',
    shortDesc: 'Centuries of heritage: rich Egusi, Efo Riro, Asun, and celebratory native stews.',
    iconName: 'Flame',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'grills',
    name: 'Grills & Suya',
    shortDesc: 'Slow-charred over open flame with northern Yaji spice and herb butter marinades.',
    iconName: 'FlameKindling',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'soups',
    name: 'Pepper Soups',
    shortDesc: 'Aromatic healing broths infused with Uda, Aidan pods, and fiery scotch bonnets.',
    iconName: 'Soup',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'small-chops',
    name: 'Small Chops',
    shortDesc: 'Irresistible party bites: golden puff-puff, crunchy spring rolls, samosas & Gizdodo.',
    iconName: 'Cookie',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pastries',
    name: 'Artisan Pastries',
    shortDesc: 'Flaky golden hand pies, Scotch eggs, and plantain butter crust creations.',
    iconName: 'CakeSlice',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'drinks',
    name: 'Handcrafted Drinks',
    shortDesc: 'Chilled Zobo infusions, Chapman, palm wine coolers, and tropical baobab blends.',
    iconName: 'Wine',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'desserts',
    name: 'Desserts',
    shortDesc: 'Sweet African endings: caramelized plantain pudding, baobab panna cotta & gelato.',
    iconName: 'IceCream',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80'
  }
];

export const DISHES: Dish[] = [
  // 1. RICE & MEALS
  {
    id: 'jollof-rice-royale',
    slug: 'signature-smoky-party-jollof',
    name: 'Signature Smoky Party Jollof',
    category: 'rice-meals',
    price: 6500,
    description: 'Long-grain parboiled rice simmered in slow-roasted plum tomatoes, bell peppers, scotch bonnets, and firewood smoke essence. Served with caramelized sweet dodo (fried plantains) and crunchy house slaw.',
    longDescription: 'Our hallmark dish captures the legendary soul of West African celebrations. Cooked over direct heat to achieve that distinct, irresistible smoky bottom layer (the coveted "party pot bottom"). Accompanied by sweet honey-fried plantains and fresh vegetable slaw.',
    image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Long-Grain Rice', 'Roasted Plum Tomatoes', 'Red Bell Peppers', 'Scotch Bonnet', 'Smoked Paprika', 'Thyme & Bay Leaves', 'Fried Sweet Plantain'],
    tags: ['Best Seller', 'Signature', 'Smoky', 'Iconic'],
    featured: true,
    available: true,
    isSignature: true,
    spicyLevel: 2,
    prepTime: '20-25 mins',
    calories: 680,
    servingSize: '1 generous platter (Serves 1-2)',
    allergens: ['None'],
    pairedDrink: 'Chilled Hibiscus Zobo Elixir'
  },
  {
    id: 'fried-rice-prawns',
    slug: 'savanna-royale-fried-rice',
    name: 'Savanna Royale Fried Rice',
    category: 'rice-meals',
    price: 7500,
    description: 'Wok-tossed turmeric-infused rice with diced beef liver, sweet corn, green peas, carrots, and sweet butter-basted jumbo tiger prawns.',
    longDescription: 'Fragrant basmati and long-grain rice tossed in seasoned rich chicken broth, fresh crisp market vegetables, and seasoned liver cubes, crowned with two char-grilled tiger prawns.',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Rice', 'Tiger Prawns', 'Beef Liver bits', 'Turmeric', 'Green Peas', 'Sweet Corn', 'Spring Onions'],
    tags: ['Seafood', 'Chef Choice'],
    featured: true,
    available: true,
    spicyLevel: 1,
    prepTime: '20 mins',
    calories: 720,
    servingSize: '1 portion',
    allergens: ['Crustaceans'],
    pairedDrink: 'Savanna Classic Chapman'
  },
  {
    id: 'ofada-ayamase-platter',
    slug: 'village-ofada-rice-ayamase',
    name: 'Village Ofada Rice & Designer Ayamase',
    category: 'rice-meals',
    price: 8500,
    description: 'Unpolished aromatic brown Ofada rice wrapped in fresh Thaumatococcus leaves, paired with fiery bleached palm oil green pepper stew, assorted beef tripe, and hard-boiled egg.',
    longDescription: 'An indigenous delicacy celebrated for its robust earthy aroma. The designer Ayamase sauce is crafted from charred green bell peppers, locust beans (Iru), crayfish, and tender assorted offal meats slow-simmered to spicy perfection.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Ofada Brown Rice', 'Green Peppers', 'Fermented Locust Beans (Iru)', 'Bleached Palm Oil', 'Assorted Offal', 'Boiled Egg'],
    tags: ['Traditional', 'Spicy', 'Heritage'],
    featured: true,
    available: true,
    spicyLevel: 3,
    prepTime: '25 mins',
    calories: 840,
    servingSize: '1 leaf-wrapped portion',
    allergens: ['Egg', 'Fish'],
    pairedDrink: 'Chilled Palm Wine Cooler'
  },
  {
    id: 'coconut-rice-delight',
    slug: 'island-coconut-rice',
    name: 'Island Coconut Fragrant Rice',
    category: 'rice-meals',
    price: 6000,
    description: 'Fluffy rice infused with fresh pressed coconut cream, dry fish flakes, crayfish, and sautéed sweet red peppers.',
    longDescription: 'A silky, nutty delicacy crafted using freshly extracted organic coconut milk, simmered gently with aromatic spices and sweet onions for a comforting, subtly sweet savory note.',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Basmati Rice', 'Fresh Coconut Milk', 'Smoked Fish', 'Crayfish', 'Sweet Peppers'],
    tags: ['Rich', 'Aromatic'],
    available: true,
    spicyLevel: 1,
    prepTime: '18 mins',
    calories: 650,
    servingSize: '1 portion'
  },

  // 2. AFRICAN SPECIALS & SOUPS
  {
    id: 'egusi-soup-royale',
    slug: 'royal-egusi-soup-pounded-yam',
    name: 'Royal Egusi Soup & Smooth Pounded Yam',
    category: 'african-specials',
    price: 9000,
    description: 'Ground melon seeds pan-seared with bitterleaf and spinach in palm oil, loaded with tender goat meat, stockfish, and smoked catfish. Served with velvet-smooth pounded yam.',
    longDescription: 'The undisputed monarch of Nigerian communal feasts. Melon seeds are toasted and cooked in golden palm oil with bitterleaf shreds, crayfish broth, and braised goat meat that falls off the bone. Paired with pillowy hot pounded yam.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Ground Melon Seeds', 'Goat Meat', 'Smoked Catfish', 'Stockfish Head', 'Bitterleaf', 'Spinach', 'Palm Oil', 'Pounded Yam'],
    tags: ['Royalty', 'Popular', 'Comfort Food'],
    featured: true,
    available: true,
    isSignature: true,
    spicyLevel: 2,
    prepTime: '25 mins',
    calories: 920,
    servingSize: 'Large bowl + 1 Pounded Yam swallow',
    allergens: ['Fish'],
    pairedDrink: 'Hibiscus Ginger Tea'
  },
  {
    id: 'efo-riro-elegusi',
    slug: 'efo-riro-shaki-smoked-fish',
    name: 'Lagos Efo Riro with Assorted Meats',
    category: 'african-specials',
    price: 8500,
    description: 'Rich Yoruba-style sautéed green amaranth spinach stew with shredded smoked panla fish, tender cow tripe (Shaki), cow skin (Ponmo), and iru aromatics.',
    longDescription: 'Vibrant local spinach wilted down in a rich reduction of roasted tatashe peppers, locust beans, and assorted cuts of beef and smoked seafood. Served with your choice of Amala or Pounded Yam.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Fresh Spinach', 'Roasted Tatashe Peppers', 'Locust Beans (Iru)', 'Cow Skin (Ponmo)', 'Tripe (Shaki)', 'Smoked Fish'],
    tags: ['Authentic', 'Hearty'],
    featured: false,
    available: true,
    spicyLevel: 2,
    prepTime: '22 mins',
    calories: 780,
    servingSize: '1 soup bowl + 1 swallow'
  },
  {
    id: 'spicy-goat-asun',
    slug: 'flame-roasted-goat-meat-asun',
    name: 'Flame-Roasted Spicy Goat Meat (Asun)',
    category: 'african-specials',
    price: 7500,
    description: 'Tender bite-sized cuts of young goat meat charred over smoky coals and tossed with coarsely crushed habanero peppers, sweet red onions, and bell peppers.',
    longDescription: 'A street-food celebration elevated to fine dining. Juicy goat meat slow-charred over open flame to render crispy exterior edges, tossed immediately in sizzling habaneros and sweet onion rings.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Goat Meat', 'Scotch Bonnet Habaneros', 'Red Onions', 'Bell Peppers', 'Savanna Seasoning Salt'],
    tags: ['Spicy', 'Appetizer', 'Best with Drinks'],
    featured: true,
    available: true,
    spicyLevel: 3,
    prepTime: '15 mins',
    calories: 540,
    servingSize: '1 sharing platter',
    pairedDrink: 'Chilled Palm Wine Cooler'
  },
  {
    id: 'seafood-okra-soup',
    slug: 'fishermans-feast-seafood-okra',
    name: 'Fisherman’s Feast Seafood Okra',
    category: 'african-specials',
    price: 12000,
    description: 'Crunchy diced fresh okra simmered in aromatic seafood broth with fresh blue crab, jumbo tiger prawns, calamari rings, and flaked catfish.',
    longDescription: 'A coastal masterpiece from the Niger Delta creeks. Crispy, vibrant okra cooked briefly with fresh local herbs, loaded with fresh sea crab, ocean prawns, tender calamari, and smoked catfish.',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Fresh Okra', 'Sea Blue Crab', 'Jumbo Prawns', 'Calamari', 'Smoked Catfish', 'Crayfish', 'Scotch Bonnet'],
    tags: ['Premium Seafood', 'Delicacy'],
    featured: true,
    available: true,
    spicyLevel: 2,
    prepTime: '25 mins',
    calories: 610,
    servingSize: '1 large gourmet bowl',
    allergens: ['Crustaceans', 'Molluscs', 'Fish']
  },

  // 3. GRILLS & SUYA
  {
    id: 'prime-beef-suya',
    slug: 'signature-prime-beef-suya-platter',
    name: 'Signature Prime Beef Suya Platter',
    category: 'grills',
    price: 6500,
    description: 'Thinly sliced choice beef skewers crusted in northern Hausa Yaji spice (roasted peanut powder, ginger, garlic, chili) and charred over open acacia coals.',
    longDescription: 'Hand-sliced tender beef marinated in cold-pressed groundnut oil and our secret house blend of roasted kuli-kuli, Uda pepper, ginger, and garlic. Served hot on newsprint-style parchment with raw red onion rings, ripe tomatoes, and extra dry Yaji spice.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Prime Beef', 'Yaji Spice Blend (Roasted Groundnut, Ginger, Chili, Garlic)', 'Red Onions', 'Vine Tomatoes', 'Lime Wedge'],
    tags: ['Signature', 'Open Flame', 'Street Favorite'],
    featured: true,
    available: true,
    isSignature: true,
    spicyLevel: 3,
    prepTime: '15 mins',
    calories: 590,
    servingSize: '1 platter (4 skewers + toppings)',
    allergens: ['Peanuts'],
    pairedDrink: 'Savanna Classic Chapman'
  },
  {
    id: 'grilled-whole-tilapia',
    slug: 'char-grilled-whole-tilapia-fish',
    name: 'Char-Grilled Whole Tilapia Fish',
    category: 'grills',
    price: 9500,
    description: 'Whole fresh tilapia cross-scored and rubbed with garlic-herb butter and roasted scotch bonnet sauce, grilled to crisp skin and juicy flaky tenderness. Served with roasted yam chips.',
    longDescription: 'Sourced fresh daily and marinated in lemon zest, aromatic herbs, and crushed peppers before hitting the fiery charcoal grill. Accompanied by crispy golden yam chips and spicy pepper relish dip.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Fresh Whole Tilapia', 'Herb Butter', 'Scotch Bonnet Relish', 'Garlic', 'Ginger', 'Fried Yam Chips'],
    tags: ['Whole Fish', 'Popular'],
    featured: true,
    available: true,
    spicyLevel: 2,
    prepTime: '30 mins',
    calories: 780,
    servingSize: 'Whole Fish (Serves 1-2)',
    allergens: ['Fish']
  },
  {
    id: 'roasted-suya-chicken',
    slug: 'charcoal-roasted-chicken-suya',
    name: 'Charcoal Spatchcock Chicken Suya',
    category: 'grills',
    price: 8000,
    description: 'Half spring chicken spatchcocked and slow-roasted over hardwood charcoal with sticky honey suya glaze. Served with fried sweet plantain fingers.',
    longDescription: 'Juicy, smoky, and tender throughout. The chicken is brined with citrus herbs, coated in Yaji spice, and basted continually over the coals for a succulent caramelized exterior.',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Spring Chicken', 'Yaji Suya Rub', 'Honey Glaze', 'Lemon Grass', 'Sweet Plantain'],
    tags: ['Grill', 'Hearty'],
    available: true,
    spicyLevel: 2,
    prepTime: '25 mins',
    calories: 820,
    servingSize: 'Half Chicken + Dodo'
  },
  {
    id: 'grilled-lamb-chops',
    slug: 'savanna-grilled-lamb-chops',
    name: 'Savanna Spiced Lamb Chops',
    category: 'grills',
    price: 11000,
    description: 'French-trimmed tender lamb cutlets marinated in rosemary, garlic, and wild African black pepper, seared over charcoal with a hibiscus reduction.',
    longDescription: 'Premium lamb chops seared to medium juicy tenderness, brushed with a tangy sweet hibiscus flower reduction and served with roasted herb baby potatoes.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Lamb Chops', 'Zobo Hibiscus Glaze', 'Rosemary', 'Garlic', 'Black Pepper', 'Herb Potatoes'],
    tags: ['Gourmet', 'Chef Special'],
    available: true,
    spicyLevel: 1,
    prepTime: '22 mins',
    calories: 760,
    servingSize: '3 Lamb Chops'
  },

  // 4. SOUPS & PEPPER SOUPS
  {
    id: 'catfish-pepper-soup',
    slug: 'fresh-catfish-pepper-soup',
    name: 'Point & Kill Fresh Catfish Pepper Soup',
    category: 'soups',
    price: 7500,
    description: 'Succulent cuts of fresh live catfish poached in an aromatic herbal broth of calabash nutmeg, Uda pods, scent leaf, and fresh chili peppers.',
    longDescription: 'A revered Nigerian soul-warming specialty. Prepared with freshly caught catfish in a clear, fiery, aromatic broth enriched with scent leaves (Efirin) that invigorates the senses.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Fresh Catfish', 'Calabash Nutmeg (Ehuru)', 'Negro Pepper (Uda)', 'Scent Leaves (Efirin)', 'Scotch Bonnet'],
    tags: ['Fiery', 'Aromatic', 'Traditional'],
    featured: false,
    available: true,
    spicyLevel: 3,
    prepTime: '20 mins',
    calories: 420,
    servingSize: '1 large bowl',
    allergens: ['Fish']
  },
  {
    id: 'goat-meat-pepper-soup',
    slug: 'savanna-goat-meat-pepper-soup',
    name: 'Savanna Slow-Simmered Goat Meat Pepper Soup',
    category: 'soups',
    price: 6500,
    description: 'Tender bone-in goat meat simmered for hours in medicinal indigenous spices, fresh ginger, and crushed peppers with hot agidi (corn starch cake).',
    longDescription: 'Rich, peppery, and deeply therapeutic broth made with ginger root, allspice, Aidan pod essence, and tender cuts of young goat meat that melt in your mouth.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Goat Meat', 'Aidan Fruit', 'Ginger & Garlic', 'Pepper Soup Spice Mix', 'Scent Leaves'],
    tags: ['Therapeutic', 'Spicy'],
    available: true,
    spicyLevel: 3,
    prepTime: '15 mins',
    calories: 460,
    servingSize: '1 bowl'
  },

  // 5. SMALL CHOPS & APPETIZERS
  {
    id: 'puff-puff-basket',
    slug: 'golden-crispy-puff-puff-basket',
    name: 'Golden Crispy Puff-Puff Basket',
    category: 'small-chops',
    price: 3000,
    description: 'Fluffy, golden-brown deep-fried yeast dough balls with a pillowy interior, dusted with subtle nutmeg and cinnamon sugar.',
    longDescription: 'The ultimate West African celebration snack! Crispy and golden on the outside with a cloud-soft, sweet, fragrant crumb inside. Served with spiced pepper dip or honey drizzle.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Flour', 'Yeast', 'Nutmeg', 'Cane Sugar', 'Vegetable Oil'],
    tags: ['Street Icon', 'Vegetarian', 'Must-Have'],
    featured: true,
    available: true,
    spicyLevel: 0,
    prepTime: '10 mins',
    calories: 380,
    servingSize: 'Basket of 8 pieces'
  },
  {
    id: 'gizdodo-skillet',
    slug: 'spicy-gizdodo-skillet',
    name: 'Sizzling Spicy Gizdodo Skillet',
    category: 'small-chops',
    price: 4500,
    description: 'Crispy fried chicken gizzards and ripe golden plantain cubes tossed in rich, seasoned roasted habanero and bell pepper sauce.',
    longDescription: 'A beloved modern party staple pairing the chewiness of seasoned chicken gizzards with sweet, tender fried plantains, coated in a thick, glossy tomato-pepper reduction.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Chicken Gizzards', 'Ripe Plantains', 'Red Bell Peppers', 'Habanero', 'Spring Onions'],
    tags: ['Crowd Favorite', 'Spicy'],
    featured: true,
    available: true,
    spicyLevel: 2,
    prepTime: '15 mins',
    calories: 520,
    servingSize: '1 sharing bowl'
  },
  {
    id: 'savanna-small-chops-platter',
    slug: 'ultimate-savanna-small-chops-platter',
    name: 'The Ultimate Small Chops Platter',
    category: 'small-chops',
    price: 8500,
    description: 'Generous party platter featuring 6 golden Puff-Puff, 4 crispy Beef Samosas, 4 Spring Rolls, 2 Peppered Chicken Drummettes, and Gizdodo.',
    longDescription: 'The complete African finger-food tasting experience, beautifully plated with spicy dipping sauces. Perfect for sharing across tables or kick-starting an evening.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Puff-Puff', 'Beef Samosas', 'Vegetable Spring Rolls', 'Peppered Chicken', 'Gizdodo'],
    tags: ['Sharing', 'Party Platter', 'Value'],
    featured: true,
    available: true,
    spicyLevel: 2,
    prepTime: '18 mins',
    calories: 950,
    servingSize: 'Serves 2-3 guests'
  },

  // 6. PASTRIES
  {
    id: 'signature-meat-pie',
    slug: 'savanna-signature-beef-meat-pie',
    name: 'Savanna Signature Minced Beef Pie',
    category: 'pastries',
    price: 2500,
    description: 'Golden, buttery, melt-in-the-mouth shortcrust pastry generously packed with savory minced beef, cubed potatoes, and sweet carrots.',
    longDescription: 'Baked fresh every morning in our artisan kitchen. The pastry is light and flaky, encasing a rich, moist, herb-scented beef and vegetable filling that never leaks.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Butter Pastry', 'Minced Beef', 'Potatoes', 'Carrots', 'Nutmeg & Herbs'],
    tags: ['Baked Fresh', 'Breakfast / Snack'],
    available: true,
    spicyLevel: 1,
    prepTime: '5 mins (Pre-baked fresh)',
    calories: 410,
    servingSize: '1 large pie'
  },
  {
    id: 'scotch-egg-delight',
    slug: 'artisan-scotch-egg',
    name: 'Artisan Herb-Crusted Scotch Egg',
    category: 'pastries',
    price: 2200,
    description: 'A soft-boiled organic egg encased in spiced sausage meat, rolled in crunchy golden breadcrumbs and fried to golden perfection.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Organic Egg', 'Spiced Sausage Meat', 'Panko Breadcrumbs', 'Herbs'],
    tags: ['Snack', 'Classic'],
    available: true,
    spicyLevel: 1,
    prepTime: '5 mins',
    calories: 340,
    servingSize: '1 whole scotch egg',
    allergens: ['Egg', 'Gluten']
  },

  // 7. DRINKS & MOCKTAILS
  {
    id: 'zobo-hibiscus-elixir',
    slug: 'chilled-hibiscus-zobo-elixir',
    name: 'Chilled Hibiscus Zobo Elixir',
    category: 'drinks',
    price: 2500,
    description: 'Organic dried roselle hibiscus flowers brewed with crushed ginger root, cloves, sweet pineapple peels, and fresh mint leaves.',
    longDescription: 'The ruby-red jewel of African beverages. Brewed slowly with whole spices and sweetened with fresh pineapple and passion fruit juice. Served chilled over crystal ice blocks with a sprig of garden mint.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Organic Hibiscus (Zobo)', 'Fresh Ginger Root', 'Cloves', 'Pineapple Puree', 'Garden Mint'],
    tags: ['Non-Alcoholic', 'Antioxidant', 'House Special'],
    featured: true,
    available: true,
    isSignature: true,
    spicyLevel: 0,
    prepTime: '5 mins',
    calories: 120,
    servingSize: '500ml tall glass'
  },
  {
    id: 'savanna-chapman',
    slug: 'savanna-classic-chapman',
    name: 'Savanna Classic Chapman Mocktail',
    category: 'drinks',
    price: 3000,
    description: 'The definitive Nigerian cocktail: Fanta, Sprite, pomegranate grenadine, aromatic Angostura bitters, fresh cucumber ribbons, and orange slices.',
    longDescription: 'Created in Lagos and celebrated worldwide. A refreshing sparkling citrus cooler infused with drops of aromatic bitters, garnished with chilled cucumber ribbons and lemon wheels.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Sparkling Citrus', 'Grenadine', 'Angostura Bitters', 'Cucumber Ribbons', 'Orange Wheels'],
    tags: ['Iconic', 'Refreshing', 'Party Favorite'],
    featured: true,
    available: true,
    spicyLevel: 0,
    prepTime: '5 mins',
    calories: 180,
    servingSize: '600ml balloon goblet'
  },
  {
    id: 'palm-wine-cooler',
    slug: 'chilled-palm-wine-cooler',
    name: 'Fresh Tapped Palm Wine Cooler',
    category: 'drinks',
    price: 3500,
    description: 'Naturally sweet fresh palm wine served ice-cold with a dash of lime juice and crushed lemongrass.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Fresh Natural Palm Wine', 'Lime Juice', 'Lemongrass'],
    tags: ['Traditional Drink', 'Chilled'],
    available: true,
    spicyLevel: 0,
    prepTime: '5 mins',
    calories: 160,
    servingSize: 'Clay pot goblet'
  },

  // 8. DESSERTS
  {
    id: 'plantain-bread-pudding',
    slug: 'warm-caramelized-plantain-bread-pudding',
    name: 'Warm Caramelized Plantain Bread Pudding',
    category: 'desserts',
    price: 4000,
    description: 'Brioche bread soaked in spiced sweet custard and ripe caramelized plantains, baked golden and topped with vanilla bean gelato and warm toffee sauce.',
    longDescription: 'A decadent African fusion dessert. Ripe honey plantains are caramelized with brown sugar and dark rum essence, layered in golden brioche and baked until custardy inside with a crisp top.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Brioche Bread', 'Sweet Ripe Plantain', 'Vanilla Bean Custard', 'Salted Toffee Caramel', 'Gelato'],
    tags: ['Chef Signature', 'Decadent', 'Warm'],
    featured: true,
    available: true,
    isSignature: true,
    spicyLevel: 0,
    prepTime: '15 mins',
    calories: 520,
    servingSize: '1 dessert plate',
    allergens: ['Dairy', 'Gluten', 'Egg']
  },
  {
    id: 'baobab-panna-cotta',
    slug: 'baobab-white-chocolate-panna-cotta',
    name: 'Wild Baobab & White Chocolate Panna Cotta',
    category: 'desserts',
    price: 4500,
    description: 'Velvety cream infused with tangy wild baobab fruit pulp, layered on white chocolate crunch and topped with passion fruit compote.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Cream', 'Baobab Pulp', 'White Chocolate', 'Passion Fruit'],
    tags: ['Tangy & Sweet', 'Superfruit'],
    available: true,
    spicyLevel: 0,
    prepTime: '10 mins',
    calories: 430,
    servingSize: '1 glass jar',
    allergens: ['Dairy']
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Signature Smoky Party Jollof Plating',
    category: 'food',
    image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=1200&q=80',
    description: 'Our iconic firewood smoky Jollof served with fried sweet plantains and house slaw.',
    highlightTag: 'Signature Dish'
  },
  {
    id: 'gal-2',
    title: 'The Royal Palm Main Dining Hall',
    category: 'restaurant',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    description: 'Warm ambient lighting, gold accents, and handcrafted mahogany dining booths.',
    highlightTag: 'Interior Atmosphere'
  },
  {
    id: 'gal-3',
    title: 'Open Flame Charcoal Suya Grilling',
    category: 'behind-the-scenes',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80',
    description: 'Master grill chefs searing beef skewers with northern Yaji spice rub.',
    highlightTag: 'Master Grills'
  },
  {
    id: 'gal-4',
    title: 'Seafood Okra Luxury Bowl',
    category: 'food',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=80',
    description: 'Fresh blue crab, tiger prawns, and calamari in rich herbal okra broth.',
    highlightTag: 'Niger Delta Heritage'
  },
  {
    id: 'gal-5',
    title: 'Artisan Zobo & Chapman Bar Cocktails',
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=80',
    description: 'Handcrafted mocktails infused with hibiscus, fresh citrus, and botanicals.',
    highlightTag: 'Mixology'
  },
  {
    id: 'gal-6',
    title: 'Evening Private Celebrations & VIP Lounge',
    category: 'events',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
    description: 'Guests gathering for intimate birthday dinners and corporate tasting events.',
    highlightTag: 'VIP Events'
  },
  {
    id: 'gal-7',
    title: 'Executive Chef Preparing Egusi Soup',
    category: 'behind-the-scenes',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=80',
    description: 'Every traditional soup is crafted from scratch using stone-ground melon seeds.',
    highlightTag: 'Culinary Craft'
  },
  {
    id: 'gal-8',
    title: 'Golden Crispy Puff-Puff with Honey Glaze',
    category: 'food',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80',
    description: 'Freshly fried sweet dough dusted with nutmeg and cinnamon sugar.',
    highlightTag: 'Street Treat'
  },
  {
    id: 'gal-9',
    title: 'Warm Hospitality & Welcoming Guests',
    category: 'people',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80',
    description: 'The genuine warmth and joy of African communal dining at Savanna Bites.',
    highlightTag: 'Community'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'rev-1',
    name: 'Dr. Adeola Balogun',
    role: 'Food Enthusiast & Lekki Resident',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: '“The Signature Smoky Jollof took me straight back to childhood Sunday weddings. You can taste the authenticity in every grain. The presentation and ambiance are truly world-class.”',
    date: 'August 2026',
    dishLoved: 'Signature Smoky Party Jollof'
  },
  {
    id: 'rev-2',
    name: 'Chukwuma Eze',
    role: 'Architect & Regular Diner',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: '“Their Suya platter paired with chilled Zobo elixir is the best in Lagos. Tender beef, perfect spice heat, and the online ordering delivered to Victoria Island in under 40 minutes.”',
    date: 'July 2026',
    dishLoved: 'Prime Beef Suya Platter'
  },
  {
    id: 'rev-3',
    name: 'Fatima Sanusi',
    role: 'Event Host & Corporate Executive',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: '“We hosted our executive dinner in the Savanna VIP room. The Seafood Okra and Egusi soup had our international guests raving. Flawless hospitality!”',
    date: 'August 2026',
    dishLoved: 'Royal Egusi Soup & Seafood Okra'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'ordering',
    question: 'How do I place an order for delivery or pickup?',
    answer: 'You can easily browse our menu online, add your favorite dishes to the cart, customize your protein and spice preferences, and proceed to checkout. You can pay securely with Paystack or choose direct WhatsApp ordering.'
  },
  {
    id: 'faq-2',
    category: 'delivery',
    question: 'What are your delivery areas and fees in Lagos?',
    answer: 'We deliver across Victoria Island, Lekki Phase 1 & 2, Ikoyi, Oniru, Banana Island, and Ikeja. Our standard delivery fee is ₦1,500, and orders above ₦35,000 qualify for free delivery!'
  },
  {
    id: 'faq-3',
    category: 'payments',
    question: 'What payment methods do you accept?',
    answer: 'We accept instant online debit/credit card payments and bank transfers via Paystack, as well as verified bank transfers upon WhatsApp order placement.'
  },
  {
    id: 'faq-4',
    category: 'ordering',
    question: 'Can I order directly through WhatsApp?',
    answer: 'Yes! Simply click the "Order via WhatsApp" button on the menu or during checkout. Our system will format your full order with item names, quantities, and delivery address into a ready-to-send WhatsApp message to our concierge.'
  },
  {
    id: 'faq-5',
    category: 'reservations',
    question: 'How do I make a table reservation for dining in?',
    answer: 'Visit our Reservation page, pick your preferred date, time, party size, and seating zone (Main Dining Hall, Palm Terrace, or VIP Lounge). We will send a confirmation notification within minutes.'
  },
  {
    id: 'faq-6',
    category: 'delivery',
    question: 'How long does food preparation and delivery take?',
    answer: 'All our dishes are cooked fresh to order. Delivery typically takes between 35 to 50 minutes depending on your location in Lagos.'
  },
  {
    id: 'faq-7',
    category: 'food-dietary',
    question: 'Can I customize my spice level or dietary requirements?',
    answer: 'Absolutely. During checkout or dish selection, you can adjust your spice preference (Mild, Medium, Fiery Hot) and note any allergies or specific dietary requests.'
  },
  {
    id: 'faq-8',
    category: 'catering',
    question: 'Do you cater for private events and weddings?',
    answer: 'Yes! Savanna Bites provides bespoke African catering services for private dinners, corporate events, and weddings. Reach out through our Contact page or WhatsApp for catering packages.'
  }
];
