const foods = [
  { name: 'Banana', icon: '🍌', category: 'Fruit' }, { name: 'Apple', icon: '🍎', category: 'Fruit' },
  { name: 'Pear', icon: '🍐', category: 'Fruit' }, { name: 'Mango', icon: '🥭', category: 'Fruit' },
  { name: 'Strawberry', icon: '🍓', category: 'Fruit' }, { name: 'Blueberry', icon: '🫐', category: 'Fruit' },
  { name: 'Avocado', icon: '🥑', category: 'Vegetables' }, { name: 'Broccoli', icon: '🥦', category: 'Vegetables' },
  { name: 'Sweet potato', icon: '🍠', category: 'Vegetables' }, { name: 'Carrot', icon: '🥕', category: 'Vegetables' },
  { name: 'Peas', icon: '🟢', category: 'Vegetables' }, { name: 'Pumpkin', icon: '🎃', category: 'Vegetables' },
  { name: 'Zucchini', icon: '🥒', category: 'Vegetables' }, { name: 'Oats', icon: '🌾', category: 'Grains' },
  { name: 'Rice', icon: '🍚', category: 'Grains' }, { name: 'Pasta', icon: '🍝', category: 'Grains' },
  { name: 'Quinoa', icon: '🥣', category: 'Grains' }, { name: 'Bread', icon: '🍞', category: 'Grains' },
  { name: 'Potato', icon: '🥔', category: 'Grains' }, { name: 'Chicken', icon: '🍗', category: 'Protein' },
  { name: 'Egg', icon: '🥚', category: 'Protein' }, { name: 'Salmon', icon: '🐟', category: 'Protein' },
  { name: 'Turkey', icon: '🍗', category: 'Protein' }, { name: 'Lentils', icon: '🫘', category: 'Protein' },
  { name: 'Beans', icon: '🫘', category: 'Protein' }, { name: 'Tofu', icon: '◻️', category: 'Protein' },
  { name: 'Yogurt', icon: '🥣', category: 'Dairy' }, { name: 'Cheese', icon: '🧀', category: 'Dairy' },
  { name: 'Cottage cheese', icon: '🥛', category: 'Dairy' },
  { name: 'Beef', icon: '🥩', category: 'Protein' }, { name: 'Pork', icon: '🍖', category: 'Protein' },
  { name: 'Lamb', icon: '🍖', category: 'Protein' }, { name: 'Chickpeas', icon: '🫘', category: 'Protein' },
  { name: 'Cauliflower', icon: '🥦', category: 'Vegetables' }, { name: 'Spinach', icon: '🥬', category: 'Vegetables' },
  { name: 'Green beans', icon: '🫛', category: 'Vegetables' }, { name: 'Bell pepper', icon: '🫑', category: 'Vegetables' },
  { name: 'Tomato', icon: '🍅', category: 'Vegetables' }, { name: 'Cornmeal', icon: '🌽', category: 'Grains' },
  { name: 'Couscous', icon: '🍲', category: 'Grains' }, { name: 'Kiwi', icon: '🥝', category: 'Fruit' },
  { name: 'Peach', icon: '🍑', category: 'Fruit' }, { name: 'Orange', icon: '🍊', category: 'Fruit' }
];

// Each idea is a complete little recipe; selected foods are anchors, not the whole dish.
const meals = [
  { name: 'Banana oat breakfast pancakes', foods: ['Banana', 'Oats', 'Egg'], ingredients: 'Banana · oats · egg · plain yogurt', prep: 'Mash the banana, stir in an egg and ground oats, then cook small pancakes until set through. Cut or break into a soft, easy-to-hold shape and serve with yogurt.', time: '15 min', art: ['🥞', '🍌', '🥣'] },
  { name: 'Apple cinnamon porridge', foods: ['Apple', 'Oats', 'Yogurt'], ingredients: 'Apple · oats · yogurt · cinnamon', prep: 'Simmer finely grated apple with oats and water until very soft. Cool a little, then swirl in yogurt and a tiny pinch of cinnamon.', time: '12 min', art: ['🥣', '🍎', '✨'] },
  { name: 'Avocado green pasta', foods: ['Avocado', 'Pasta', 'Yogurt', 'Peas'], ingredients: 'Pasta · avocado · yogurt · peas', prep: 'Cook small pasta shapes until soft. Mash avocado with yogurt and a spoonful of cooking water, then toss with pasta and soft-cooked peas.', time: '18 min', art: ['🍝', '🥑', '🟢'] },
  { name: 'Chicken rice veggie cakes', foods: ['Chicken', 'Rice', 'Egg', 'Carrot'], ingredients: 'Chicken · rice · egg · grated carrot', prep: 'Mix finely shredded, fully cooked chicken with soft rice, beaten egg and grated carrot. Shape into small patties and cook through in a lightly oiled pan.', time: '25 min', art: ['🍘', '🍗', '🥕'] },
  { name: 'Broccoli cheese pasta bake', foods: ['Broccoli', 'Cheese', 'Pasta'], ingredients: 'Pasta · broccoli · cheese · milk', prep: 'Cook pasta and broccoli until soft. Stir with a little milk and grated cheese, spoon into a small dish, and bake until warm and melty.', time: '25 min', art: ['🧀', '🥦', '🍝'] },
  { name: 'Sweet potato lentil mash', foods: ['Sweet potato', 'Lentils', 'Yogurt'], ingredients: 'Sweet potato · red lentils · yogurt · cumin', prep: 'Simmer peeled sweet potato cubes and red lentils in water until both are very soft. Mash to the texture your child manages, then top with yogurt and a mild pinch of cumin.', time: '25 min', art: ['🍠', '🥣', '🌱'] },
  { name: 'Egg and avocado breakfast toast', foods: ['Egg', 'Avocado', 'Bread'], ingredients: 'Egg · avocado · soft toast · tomato', prep: 'Scramble the egg until fully cooked. Spread mashed avocado over soft toast strips and add the egg; offer soft tomato pieces on the side.', time: '10 min', art: ['🥑', '🍳', '🍞'] },
  { name: 'Cheesy broccoli egg bites', foods: ['Broccoli', 'Cheese', 'Egg', 'Potato'], ingredients: 'Broccoli · egg · cheese · potato', prep: 'Mash cooked potato with finely chopped soft broccoli, beaten egg and grated cheese. Spoon into a mini muffin tray and bake until set through.', time: '25 min', art: ['🧁', '🥦', '🧀'] },
  { name: 'Blueberry yogurt oat bowl', foods: ['Yogurt', 'Oats', 'Banana', 'Blueberry'], ingredients: 'Yogurt · oats · banana · blueberries', prep: 'Soften oats with a little warm water, then cool and stir into yogurt. Top with mashed banana and blueberries prepared safely for your child.', time: '8 min', art: ['🫐', '🥣', '🍌'] },
  { name: 'Apple cheddar sweet potato melts', foods: ['Apple', 'Cheese', 'Sweet potato', 'Oats'], ingredients: 'Sweet potato · apple · mild cheddar · oats', prep: 'Mash cooked sweet potato with grated apple, a little finely grated cheddar and ground oats. Shape into soft rounds and bake until warm and holding together.', time: '22 min', art: ['🍠', '🍎', '🧀'] },
  { name: 'Creamy chicken broccoli noodles', foods: ['Chicken', 'Broccoli', 'Pasta', 'Yogurt'], ingredients: 'Chicken · broccoli · pasta · plain yogurt', prep: 'Cook pasta until soft and steam broccoli until tender. Stir together with finely shredded, fully cooked chicken and a spoonful of yogurt to make a creamy coating.', time: '20 min', art: ['🍜', '🍗', '🥦'] },
  { name: 'Avocado rice veggie bowl', foods: ['Avocado', 'Rice', 'Egg', 'Peas'], ingredients: 'Rice · avocado · egg · soft peas', prep: 'Serve soft-cooked rice with fully cooked scrambled egg, mashed avocado and tender peas. Add a little warm water if you want a softer texture.', time: '18 min', art: ['🍚', '🥑', '🥚'] },
  { name: 'Pear and yogurt quinoa bowl', foods: ['Pear', 'Quinoa', 'Yogurt'], ingredients: 'Pear · quinoa · yogurt · nutmeg', prep: 'Cook quinoa until very soft. Simmer finely diced pear until tender, fold it through the quinoa and top with yogurt and a tiny pinch of nutmeg.', time: '20 min', art: ['🍐', '🥣', '🥛'] },
  { name: 'Mango cottage cheese toast', foods: ['Mango', 'Cottage cheese', 'Bread'], ingredients: 'Mango · cottage cheese · soft toast · oats', prep: 'Mash ripe mango into cottage cheese and spoon over soft toast fingers. Sprinkle with a little finely ground oat for a thicker topping.', time: '8 min', art: ['🥭', '🍞', '🥛'] },
  { name: 'Strawberry banana oat cups', foods: ['Strawberry', 'Banana', 'Oats', 'Egg'], ingredients: 'Strawberry · banana · oats · egg', prep: 'Mash banana with beaten egg and ground oats. Fold in finely chopped strawberry, spoon into a mini muffin tray and bake until set.', time: '20 min', art: ['🧁', '🍓', '🍌'] },
  { name: 'Carrot pea quinoa cakes', foods: ['Carrot', 'Peas', 'Quinoa', 'Egg'], ingredients: 'Carrot · peas · quinoa · egg · yogurt', prep: 'Mix soft cooked quinoa with finely grated carrot, mashed peas and beaten egg. Pan-cook small cakes until set and serve with yogurt.', time: '22 min', art: ['🥕', '🟢', '🥣'] },
  { name: 'Pumpkin lentil rice bowl', foods: ['Pumpkin', 'Lentils', 'Rice', 'Yogurt'], ingredients: 'Pumpkin · lentils · rice · yogurt', prep: 'Simmer pumpkin and red lentils until soft, then mash lightly. Spoon over soft rice and finish with yogurt.', time: '25 min', art: ['🎃', '🍚', '🥣'] },
  { name: 'Zucchini cheese mini muffins', foods: ['Zucchini', 'Cheese', 'Egg', 'Oats'], ingredients: 'Zucchini · cheese · egg · oats', prep: 'Squeeze excess moisture from grated zucchini, then mix with egg, grated cheese and ground oats. Bake in mini muffin cups until cooked through.', time: '22 min', art: ['🧁', '🥒', '🧀'] },
  { name: 'Salmon potato pea mash', foods: ['Salmon', 'Potato', 'Peas'], ingredients: 'Salmon · potato · peas · yogurt', prep: 'Bake salmon until fully cooked and flake carefully, checking for bones. Mash with soft potato and peas, loosening with yogurt if needed.', time: '25 min', art: ['🐟', '🥔', '🟢'] },
  { name: 'Turkey sweet potato quinoa bowl', foods: ['Turkey', 'Sweet potato', 'Quinoa'], ingredients: 'Turkey · sweet potato · quinoa · yogurt', prep: 'Cook quinoa until soft. Cook ground turkey fully and mash or finely crumble; serve with soft sweet potato and a spoon of yogurt.', time: '25 min', art: ['🍠', '🥣', '🍗'] },
  { name: 'Tofu veggie pasta stars', foods: ['Tofu', 'Pasta', 'Zucchini', 'Peas'], ingredients: 'Tofu · pasta · zucchini · peas', prep: 'Cook pasta until soft. Warm crumbled tofu with finely grated zucchini and peas until tender, then fold through the pasta with a splash of cooking water.', time: '18 min', art: ['🍝', '◻️', '🟢'] },
  { name: 'Bean and potato cheese mash', foods: ['Beans', 'Potato', 'Cheese'], ingredients: 'Beans · potato · cheese · yogurt', prep: 'Mash soft cooked beans with potato and a little yogurt until the texture suits your child. Stir through a small amount of grated cheese.', time: '18 min', art: ['🥔', '🫘', '🧀'] },
  { name: 'Mango berry yogurt whip', foods: ['Mango', 'Blueberry', 'Strawberry', 'Yogurt', 'Cottage cheese'], ingredients: 'Mango · berries · yogurt · cottage cheese', prep: 'Mash ripe mango and prepared berries into yogurt and cottage cheese for a thick, spoonable bowl. Thin with a little water if needed.', time: '8 min', art: ['🥭', '🫐', '🍓'] },
  { name: 'Beef, potato and pea stew', foods: ['Beef', 'Potato', 'Peas', 'Carrot'], ingredients: 'Ground beef · potato · peas · carrot · unsalted stock', prep: 'Brown ground beef fully in a small pan. Add diced potato, grated carrot and water or no-salt stock; simmer until very soft. Stir in peas and mash or chop to suit.', time: '30 min', art: ['🥩', '🥔', '🟢'] },
  { name: 'Pork and apple quinoa skillet', foods: ['Pork', 'Apple', 'Quinoa', 'Spinach'], ingredients: 'Ground pork · apple · quinoa · spinach', prep: 'Cook quinoa until soft. In a separate pan, cook ground pork through, then add finely grated apple and chopped spinach. Stir until the spinach wilts and serve over quinoa.', time: '25 min', art: ['🍖', '🍎', '🥣'] },
  { name: 'Beef tomato pasta stars', foods: ['Beef', 'Tomato', 'Pasta', 'Cheese'], ingredients: 'Ground beef · tomato · small pasta · cheese', prep: 'Cook pasta until soft. Brown ground beef fully, add chopped tomato and simmer until saucy. Toss with pasta and a little grated cheese.', time: '25 min', art: ['🍝', '🥩', '🍅'] },
  { name: 'Pork and sweet potato soft patties', foods: ['Pork', 'Sweet potato', 'Egg', 'Oats'], ingredients: 'Ground pork · sweet potato · egg · oats', prep: 'Mash cooked sweet potato and combine with ground pork, egg and oats. Form small flat patties and cook through in a lightly oiled pan, turning once.', time: '25 min', art: ['🍖', '🍠', '🥚'] },
  { name: 'Lamb chickpea couscous bowl', foods: ['Lamb', 'Chickpeas', 'Couscous', 'Spinach'], ingredients: 'Ground lamb · chickpeas · couscous · spinach', prep: 'Prepare couscous until tender. Cook ground lamb fully, then stir in mashed chickpeas and finely chopped spinach with a splash of water. Spoon over couscous.', time: '22 min', art: ['🍖', '🫘', '🥬'] },
  { name: 'Cauliflower cheese polenta', foods: ['Cauliflower', 'Cheese', 'Cornmeal', 'Yogurt'], ingredients: 'Cornmeal · cauliflower · cheese · yogurt', prep: 'Cook cornmeal into soft polenta following the package directions. Steam cauliflower until it mashes easily, then fold into the polenta with grated cheese and a spoon of yogurt.', time: '25 min', art: ['🥣', '🥦', '🧀'] },
  { name: 'Salmon green bean rice bowl', foods: ['Salmon', 'Green beans', 'Rice', 'Yogurt'], ingredients: 'Salmon · green beans · rice · yogurt', prep: 'Cook rice until soft and steam green beans until very tender, then chop finely. Bake salmon until fully cooked, check carefully for bones, and flake into the rice with yogurt.', time: '25 min', art: ['🐟', '🫛', '🍚'] },
  { name: 'Beef and pepper quinoa bowl', foods: ['Beef', 'Bell pepper', 'Quinoa', 'Tomato'], ingredients: 'Ground beef · bell pepper · quinoa · tomato', prep: 'Cook quinoa until tender. Brown ground beef fully, then add finely diced pepper and tomato with a splash of water. Simmer until soft and serve over quinoa.', time: '25 min', art: ['🥩', '🫑', '🥣'] },
  { name: 'Kiwi peach cottage cheese bowl', foods: ['Kiwi', 'Peach', 'Cottage cheese', 'Oats'], ingredients: 'Kiwi · peach · cottage cheese · oats', prep: 'Peel and finely dice ripe kiwi and peach, or soften firmer fruit by steaming. Stir into cottage cheese and top with finely ground oats.', time: '10 min', art: ['🥝', '🍑', '🥛'] },
  { name: 'Orange chickpea spinach mash', foods: ['Orange', 'Chickpeas', 'Spinach', 'Potato'], ingredients: 'Orange · chickpeas · spinach · potato', prep: 'Boil potato until very soft. Warm chickpeas and chopped spinach until tender, then mash with potato and a little orange zest and juice for a mild citrus flavor.', time: '20 min', art: ['🍊', '🫘', '🥬'] }
];

const detailedSteps = {
  'Banana oat breakfast pancakes': ['Mash 1 ripe banana in a bowl. Beat in 1 egg.', 'Stir in ¼ cup ground oats until the batter is thick but spoonable. Rest 2 minutes.', 'Spoon small rounds into a lightly oiled warm pan. Cook 2–3 minutes per side until set through.', 'Cool, break into manageable pieces, and serve with plain yogurt.'],
  'Apple cinnamon porridge': ['Peel and finely grate ½ apple. Add to a saucepan with ¼ cup oats and ½ cup water.', 'Simmer gently for 5–7 minutes, stirring often, until the oats and apple are soft.', 'Let cool a little, then stir in 2 tablespoons plain yogurt and a small pinch of cinnamon.', 'Check the temperature before serving.'],
  'Avocado green pasta': ['Cook ¼ cup small pasta until soft; add a few peas for the last 3 minutes.', 'Mash ¼ avocado with 1 tablespoon plain yogurt and 1–2 tablespoons pasta water.', 'Drain the pasta and peas, then stir through the avocado sauce.', 'Cool and cut any pieces to a size and texture your child manages comfortably.'],
  'Chicken rice veggie cakes': ['Finely shred ¼ cup fully cooked chicken and grate 2 tablespoons carrot.', 'Mix with ½ cup soft cooked rice and 1 beaten egg.', 'Shape into 3 small flat cakes. Cook in a lightly oiled pan over medium-low heat, turning once, until firm and cooked through.', 'Cool fully; break apart or cut to suit your child.'],
  'Broccoli cheese pasta bake': ['Cook ¼ cup small pasta until soft. Steam ¼ cup broccoli until easily mashed, then chop it finely.', 'Mix pasta and broccoli with 2 tablespoons milk and 2 tablespoons grated cheese.', 'Spoon into a small oven-safe dish and bake at 375°F (190°C) for about 10 minutes, until hot and melted.', 'Cool well and check for hot spots before serving.'],
  'Sweet potato lentil mash': ['Peel and dice ½ small sweet potato. Rinse ¼ cup red lentils.', 'Simmer both in 1 cup water for 15–20 minutes, until very soft and the lentils break down.', 'Mash to the texture your child is used to; add water if it is too thick.', 'Top with plain yogurt and a tiny pinch of cumin; cool before serving.'],
  'Egg and avocado breakfast toast': ['Toast ½ slice soft bread lightly, then cut into manageable strips.', 'Scramble 1 egg in a lightly oiled pan, stirring until fully cooked.', 'Mash ¼ avocado and spread a thin layer on the toast; add the egg.', 'Let everything cool and offer soft pieces while your child is seated and supervised.'],
  'Cheesy broccoli egg bites': ['Cook ½ small potato until very soft and mash. Steam ¼ cup broccoli until tender and chop finely.', 'Mix the potato and broccoli with 1 beaten egg and 2 tablespoons grated cheese.', 'Divide into 3 mini muffin cups and bake at 350°F (175°C) for 15–18 minutes, until the centers are set.', 'Cool completely and split into smaller pieces if needed.'],
  'Blueberry yogurt oat bowl': ['Cook ¼ cup oats with ½ cup water until soft, then cool.', 'Stir in ¼ cup plain yogurt and ½ mashed banana.', 'Prepare a few blueberries safely for your child and mash or quarter as appropriate.', 'Spoon the fruit over the oats and check the texture before serving.'],
  'Apple cheddar sweet potato melts': ['Cook ½ small sweet potato until soft and mash. Finely grate ¼ apple.', 'Mix the mash and apple with 2 tablespoons finely grated cheddar and 2 tablespoons ground oats.', 'Shape into small soft rounds and bake at 375°F (190°C) for 12–15 minutes until holding together.', 'Cool before serving; make the pieces suitable for your child’s chewing skills.'],
  'Creamy chicken broccoli noodles': ['Cook ¼ cup small pasta until soft. Steam ¼ cup broccoli until tender and chop finely.', 'Finely shred ¼ cup fully cooked chicken, checking there are no tough pieces.', 'Stir the pasta, broccoli and chicken together with 1 tablespoon plain yogurt and a splash of pasta water.', 'Warm gently, then cool and check the texture before serving.'],
  'Avocado rice veggie bowl': ['Cook ¼ cup rice with extra water until soft. Steam a few peas until tender.', 'Scramble 1 egg until fully cooked and chop or break it into small soft pieces.', 'Mash ¼ avocado. Stir the rice, peas and avocado together, adding warm water to soften.', 'Top with egg and cool before serving.'],
  'Pear and yogurt quinoa bowl': ['Rinse ¼ cup quinoa and cook in ½ cup water until soft, about 15 minutes.', 'Peel, core and finely dice ½ ripe pear. Simmer with a spoonful of water until tender.', 'Stir the pear into the quinoa and add 2 tablespoons plain yogurt.', 'Cool and adjust the texture with water if needed.'],
  'Mango cottage cheese toast': ['Mash ¼ cup ripe mango and stir it into 2 tablespoons cottage cheese.', 'Toast ½ slice soft bread lightly and cut it into manageable strips.', 'Spread the mango mixture thinly over the toast and sprinkle with finely ground oats.', 'Serve right away; check the bread is soft and easy for your child to manage.'],
  'Strawberry banana oat cups': ['Mash ½ banana, beat in 1 egg, then stir in ¼ cup ground oats.', 'Finely chop 1–2 strawberries and fold them into the batter.', 'Spoon into 4 mini muffin cups and bake at 350°F (175°C) for 15–18 minutes, until set through.', 'Cool fully and break into soft pieces.'],
  'Carrot pea quinoa cakes': ['Cook ¼ cup quinoa until soft. Steam 2 tablespoons peas and mash them.', 'Mix with 2 tablespoons finely grated carrot and 1 beaten egg.', 'Spoon into small cakes and cook in a lightly oiled pan over medium-low heat until firm on both sides.', 'Cool and serve with plain yogurt.'],
  'Pumpkin lentil rice bowl': ['Rinse ¼ cup red lentils. Dice ½ cup pumpkin into small pieces.', 'Simmer pumpkin and lentils in 1½ cups water for 18–20 minutes until very soft.', 'Cook ¼ cup rice separately until soft, then spoon the pumpkin-lentil mixture over it.', 'Mash or leave soft lumps depending on your child’s usual texture; cool before serving.'],
  'Zucchini cheese mini muffins': ['Grate ½ small zucchini and press out excess water with a clean towel.', 'Mix with 1 egg, 2 tablespoons grated cheese and ¼ cup ground oats.', 'Divide into 4 mini muffin cups and bake at 350°F (175°C) for 15–18 minutes until set through.', 'Cool fully and split into manageable pieces.'],
  'Salmon potato pea mash': ['Bake a small salmon portion until fully cooked, then carefully check for and remove every bone.', 'Boil ½ small potato and a few peas until both are very soft; drain well.', 'Flake the salmon and mash with the potato and peas, adding plain yogurt or water to soften.', 'Check carefully for bones again, cool, and serve in a texture your child manages.'],
  'Turkey sweet potato quinoa bowl': ['Cook ¼ cup quinoa until soft. Steam or boil ½ small sweet potato until mashable.', 'Cook ¼ cup ground turkey in a pan, breaking it up, until no pink remains and it is fully cooked.', 'Mash or finely crumble the turkey with the sweet potato and spoon over quinoa.', 'Cool before serving and adjust the texture for your child.'],
  'Tofu veggie pasta stars': ['Cook ¼ cup small pasta until soft. Steam peas and finely grated zucchini until tender.', 'Crumble ¼ cup soft tofu into a pan with the vegetables and a splash of water; warm gently.', 'Fold the tofu and vegetables through the pasta. Add pasta water for a softer consistency.', 'Cool and cut any larger pieces to suit your child.'],
  'Bean and potato cheese mash': ['Boil ½ small potato until very soft. Rinse and drain ¼ cup no-salt-added beans.', 'Mash the potato and beans together with 1 tablespoon plain yogurt until soft.', 'Stir in 1 tablespoon finely grated cheese, thinning with water if needed.', 'Check for firm bean pieces and adjust the texture before serving.'],
  'Mango berry yogurt whip': ['Peel and mash ¼ cup ripe mango. Prepare a few berries safely and mash or finely chop them.', 'Stir the fruit into ¼ cup plain yogurt and 2 tablespoons cottage cheese.', 'Add a little water to make the mixture as thick or smooth as your child manages.', 'Serve fresh and discard any portion that has been in contact with the spoon at the table.'],
  'Beef, potato and pea stew': ['Finely grate 1 tablespoon carrot and dice ½ small potato into tiny pieces.', 'Cook ¼ cup ground beef in a small pan, breaking it up, until fully cooked through.', 'Add the carrot, potato and ½ cup water or no-salt stock. Cover and simmer 12–15 minutes until very soft.', 'Stir in 2 tablespoons peas, cook until tender, then mash or chop to suit. Cool before serving.'],
  'Pork and apple quinoa skillet': ['Cook ¼ cup quinoa in ½ cup water until soft. Finely grate ¼ apple and chop a small handful of spinach.', 'Cook ¼ cup ground pork in a pan, breaking it up, until fully cooked through.', 'Add the apple, spinach and 2 tablespoons water; cook until the spinach wilts and apple softens.', 'Serve over quinoa, cool, and check the texture before offering.'],
  'Beef tomato pasta stars': ['Cook ¼ cup small pasta until soft. Chop ½ ripe tomato finely.', 'Cook ¼ cup ground beef in a pan, breaking it into small pieces, until fully cooked through.', 'Add the tomato and 2 tablespoons water; simmer 8–10 minutes until soft and saucy.', 'Toss with drained pasta and 1 tablespoon grated cheese. Cool before serving.'],
  'Pork and sweet potato soft patties': ['Cook and mash ½ small sweet potato. Mix with ¼ cup ground pork, 1 beaten egg and 2 tablespoons oats.', 'Shape into 3 small flat patties, making sure no raw mixture stays on your hands or tools.', 'Pan-cook over medium-low heat with a little oil, turning once, until fully cooked through.', 'Cool and break into soft pieces; check the center of a patty before serving.'],
  'Lamb chickpea couscous bowl': ['Prepare ¼ cup couscous according to its package directions, using water without added salt.', 'Cook ¼ cup ground lamb in a pan, breaking it into small pieces, until fully cooked through.', 'Stir in ¼ cup rinsed chickpeas, mashed, and a small handful of finely chopped spinach with a splash of water.', 'Cook until the spinach is soft, then serve over couscous and cool before offering.'],
  'Cauliflower cheese polenta': ['Steam ½ cup cauliflower florets until they mash easily, then chop or mash them.', 'Whisk ¼ cup cornmeal into 1 cup simmering water. Stir over low heat until thick and soft, following package timing.', 'Fold in cauliflower and 2 tablespoons grated cheese. Add water to loosen if needed.', 'Cool well, stir again to remove hot spots, and serve a soft spoonable texture.'],
  'Salmon green bean rice bowl': ['Cook ¼ cup rice until soft. Steam ¼ cup green beans until very tender, then chop finely.', 'Bake a small salmon portion until fully cooked. Flake it apart and carefully check for bones.', 'Mix the rice, beans and salmon with 1 tablespoon plain yogurt and a splash of warm water.', 'Check once more for bones, cool, and adjust the texture before serving.'],
  'Beef and pepper quinoa bowl': ['Cook ¼ cup quinoa until tender. Finely dice ¼ bell pepper and ½ tomato.', 'Cook ¼ cup ground beef in a pan, breaking it up, until fully cooked through.', 'Add pepper, tomato and 2 tablespoons water. Cover and simmer until the vegetables are soft.', 'Spoon over quinoa, cool, and cut or mash to suit.'],
  'Kiwi peach cottage cheese bowl': ['Peel and finely dice ½ ripe kiwi and ½ ripe peach. Steam firmer fruit until soft.', 'Stir the fruit into ¼ cup cottage cheese.', 'Top with 1 tablespoon finely ground oats for a thicker spoonable texture.', 'Serve fresh and adjust fruit pieces to your child’s chewing skills.'],
  'Orange chickpea spinach mash': ['Peel and dice ½ small potato; boil until very soft. Rinse and drain ¼ cup chickpeas.', 'Warm the chickpeas with a handful of chopped spinach and 2 tablespoons water until the spinach is soft.', 'Mash the chickpeas and spinach with potato. Add a little orange zest and a teaspoon of juice.', 'Check the texture and temperature before serving.']
};

const historyKey = 'little-sprout-family-food-log-v1';
const categories = ['Popular picks', 'All foods', 'Fruit', 'Vegetables', 'Grains', 'Protein', 'Dairy'];
const popularFoods = new Set(['Banana', 'Apple', 'Avocado', 'Broccoli', 'Sweet potato', 'Oats', 'Rice', 'Pasta', 'Chicken', 'Egg', 'Yogurt', 'Cheese']);
const foodList = document.querySelector('#food-list');
const tabs = document.querySelector('#category-tabs');
const search = document.querySelector('#food-search');
const selectedFoodsBox = document.querySelector('#selected-foods');
const foodResultsNote = document.querySelector('#food-results-note');
const button = document.querySelector('#suggest-button');
const count = document.querySelector('#selection-count');
const result = document.querySelector('#result-content');
const ideaNumber = document.querySelector('#idea-number');
const historyList = document.querySelector('#history-list');
const storageStatus = document.querySelector('#storage-status');
const historySummaryStatus = document.querySelector('#history-summary-status');
const clearHistoryButton = document.querySelector('#clear-history');
const calendar = document.querySelector('#calendar');
const calendarMonth = document.querySelector('#calendar-month');
const calendarSelection = document.querySelector('#calendar-selection');
let currentCategory = 'Popular picks';
let currentMeal = null;
const selected = new Set();
let familyLog = { offered: [], shown: [] };
let selectedCalendarDate = dateStamp(new Date());
let calendarMonthDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

try {
  const saved = JSON.parse(localStorage.getItem(historyKey) || 'null');
  if (saved && Array.isArray(saved.offered) && Array.isArray(saved.shown)) {
    familyLog = {
      offered: saved.offered.filter(entry => entry && meals.some(meal => meal.name === entry.meal) && /^\d{4}-\d{2}-\d{2}$/.test(entry.date)),
      shown: saved.shown.filter(name => meals.some(meal => meal.name === name)).slice(0, meals.length)
    };
    if (familyLog.offered.length) {
      const latest = [...familyLog.offered].sort((a, b) => b.date.localeCompare(a.date))[0].date;
      selectedCalendarDate = latest;
      const [year, month] = latest.split('-').map(Number);
      calendarMonthDate = new Date(year, month - 1, 1);
    }
  }
} catch {
  storageStatus.textContent = 'Session only';
}

function saveLog() {
  try {
    localStorage.setItem(historyKey, JSON.stringify(familyLog));
    storageStatus.textContent = 'Saved in this browser';
  } catch {
    storageStatus.textContent = 'Session only';
  }
}

function selectedNames() {
  return [...selected];
}

function updateSelectedFoods() {
  const names = selectedNames();
  selectedFoodsBox.replaceChildren();
  selectedFoodsBox.hidden = names.length === 0;
  for (const name of names) {
    const food = foods.find(item => item.name === name);
    const chip = document.createElement('span');
    chip.className = 'selected-chip';
    const label = document.createElement('span');
    label.textContent = `${food.icon} ${food.name}`;
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.setAttribute('aria-label', `Remove ${food.name}`);
    remove.textContent = '×';
    remove.addEventListener('click', () => {
      const checkbox = [...foodList.querySelectorAll('input')].find(input => input.value === name);
      if (checkbox) checkbox.checked = false;
      selected.delete(name);
      updateFoodControls();
    });
    chip.append(label, remove);
    selectedFoodsBox.append(chip);
  }
}

function renderFoods() {
  const query = search.value.trim().toLocaleLowerCase();
  const visible = foods.filter(food => (query || currentCategory === 'All foods'
    || (currentCategory === 'Popular picks' ? popularFoods.has(food.name) : food.category === currentCategory))
    && food.name.toLocaleLowerCase().includes(query));
  foodList.replaceChildren();
  foodResultsNote.textContent = `${visible.length} ${visible.length === 1 ? 'food' : 'foods'} shown · ${search.value ? 'searching all foods' : currentCategory.toLocaleLowerCase()}`;
  if (!visible.length) {
    const empty = document.createElement('p');
    empty.className = 'no-foods';
    empty.textContent = 'No foods found. Try another search.';
    foodList.append(empty);
    return;
  }
  for (const food of visible) {
    const label = document.createElement('label');
    label.className = 'food-option';
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.name = 'foods';
    input.value = food.name;
    input.checked = selected.has(food.name);
    const text = document.createElement('span');
    text.textContent = `${food.icon} ${food.name}`;
    label.append(input, text);
    foodList.append(label);
  }
}

for (const category of categories) {
  const tab = document.createElement('button');
  tab.type = 'button';
  tab.className = 'category-tab';
  tab.textContent = category;
  tab.setAttribute('aria-pressed', String(category === currentCategory));
  tab.addEventListener('click', () => {
    currentCategory = category;
    search.value = '';
    for (const item of tabs.querySelectorAll('button')) item.setAttribute('aria-pressed', String(item.textContent === category));
    renderFoods();
  });
  tabs.append(tab);
}

function updateFoodControls() {
  const selected = selectedNames();
  button.disabled = selected.length === 0;
  count.textContent = selected.length
    ? `${selected.length} ${selected.length === 1 ? 'food' : 'foods'} selected`
    : 'Choose at least one food to begin.';
  updateSelectedFoods();
}

search.addEventListener('input', renderFoods);
foodList.addEventListener('change', event => {
  if (event.target.matches('input[type="checkbox"]')) {
    if (event.target.checked) selected.add(event.target.value);
    else selected.delete(event.target.value);
  }
  updateFoodControls();
});

function join(items) {
  if (items.length < 2) return items[0] || '';
  return `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`;
}

function dateStamp(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function daysAgo(stamp) {
  const [year, month, day] = stamp.split('-').map(Number);
  const offered = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.floor((today - offered) / 86400000);
}

function selectMeal(selected) {
  const candidates = meals.map(meal => ({ ...meal, matched: meal.foods.filter(food => selected.includes(food)) }))
    .filter(meal => meal.matched.length > 0);
  const recentOfferNames = new Set(familyLog.offered.filter(entry => daysAgo(entry.date) >= 0 && daysAgo(entry.date) < 7).map(entry => entry.meal));
  const freshCandidates = candidates.filter(meal => !recentOfferNames.has(meal.name));
  const pool = freshCandidates.length ? freshCandidates : candidates;
  const strongest = Math.max(...pool.map(meal => meal.matched.length));
  const best = pool.filter(meal => meal.matched.length === strongest);
  return best.find(meal => !familyLog.shown.slice(0, 4).includes(meal.name))
    || best.find(meal => !familyLog.shown.includes(meal.name))
    || best[0];
}

function addText(parent, tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  node.textContent = text;
  parent.append(node);
  return node;
}

function renderMeal(meal) {
  result.replaceChildren();
  const feature = document.createElement('div');
  feature.className = 'meal-feature';
  const copy = document.createElement('div');
  const meta = document.createElement('div');
  meta.className = 'meal-meta';
  addText(meta, 'span', '', `✓ ${join(meal.matched)}`);
  addText(meta, 'span', '', `◷ ${meal.time}`);
  addText(copy, 'h2', 'meal-title', meal.name).id = 'result-title';
  addText(copy, 'p', 'reason', `Your picks — ${join(meal.matched)} — are part of this recipe. It rounds them out with complementary ingredients.`);
  copy.prepend(meta);

  const picture = document.createElement('figure');
  picture.className = 'meal-picture';
  picture.setAttribute('role', 'img');
  picture.setAttribute('aria-label', `Illustration for ${meal.name}`);
  addText(picture, 'span', 'bowl-emoji', meal.art[0]).setAttribute('aria-hidden', 'true');
  for (const [index, icon] of meal.art.slice(1).entries()) {
    addText(picture, 'span', `garnish garnish-${index + 1}`, icon).setAttribute('aria-hidden', 'true');
  }
  feature.append(copy, picture);

  const recipe = document.createElement('div');
  recipe.className = 'recipe-block';
  addText(recipe, 'p', 'make-label', 'Ingredients');
  addText(recipe, 'p', 'recipe-note', 'About one small child portion. Ingredient amounts are included in the steps.');
  addText(recipe, 'p', 'ingredients', meal.ingredients);
  addText(recipe, 'p', 'make-label', 'How to make it');
  const steps = document.createElement('ol');
  steps.className = 'recipe-steps';
  const directions = detailedSteps[meal.name] || [meal.prep];
  directions.forEach((instruction, index) => {
    const item = document.createElement('li');
    const number = addText(item, 'span', 'step-number', String(index + 1));
    number.setAttribute('aria-hidden', 'true');
    const stepIcon = addText(item, 'span', 'step-icon', meal.art[(index + 1) % meal.art.length]);
    stepIcon.setAttribute('aria-hidden', 'true');
    addText(item, 'p', '', instruction);
    steps.append(item);
  });
  recipe.append(steps);

  const form = document.createElement('form');
  form.className = 'offer-form';
  form.setAttribute('aria-label', `Log when you offer ${meal.name}`);
  const dateLabel = document.createElement('label');
  dateLabel.textContent = 'Offered on';
  const dateInput = document.createElement('input');
  dateInput.type = 'date';
  dateInput.name = 'offered-date';
  dateInput.required = true;
  dateInput.value = dateStamp(new Date());
  dateInput.max = dateInput.value;
  dateLabel.append(dateInput);

  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.textContent = 'Save as offered';
  form.append(dateLabel, submit);
  const feedback = addText(form, 'p', 'offer-feedback', 'Save it now; add a review later from the offer calendar.');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const date = dateInput.value;
    familyLog.offered = familyLog.offered.filter(entry => !(entry.meal === meal.name && entry.date === date));
    familyLog.offered.unshift({ meal: meal.name, date, response: '' });
    familyLog.offered = familyLog.offered.slice(0, 100);
    saveLog();
    selectedCalendarDate = date;
    const [year, month] = date.split('-').map(Number);
    calendarMonthDate = new Date(year, month - 1, 1);
    renderCalendar();
    renderHistory();
    feedback.textContent = `Saved as offered for ${formatDate(date)}. You can add a review from the calendar.`;
    feedback.classList.add('is-saved');
  });
  recipe.append(form);
  result.append(feature, recipe);
}

function formatDate(stamp) {
  const [year, month, day] = stamp.split('-').map(Number);
  return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(year, month - 1, day));
}

function renderCalendar() {
  const year = calendarMonthDate.getFullYear();
  const month = calendarMonthDate.getMonth();
  calendarMonth.textContent = new Intl.DateTimeFormat(undefined, { month: 'long', year: 'numeric' }).format(calendarMonthDate);
  calendar.replaceChildren();
  for (const day of ['M', 'T', 'W', 'T', 'F', 'S', 'S']) {
    const label = addText(calendar, 'span', 'calendar-weekday', day);
    label.setAttribute('aria-hidden', 'true');
  }
  const offset = (new Date(year, month, 1).getDay() + 6) % 7;
  for (let blank = 0; blank < offset; blank += 1) {
    const spacer = document.createElement('span');
    spacer.className = 'calendar-spacer';
    spacer.setAttribute('aria-hidden', 'true');
    calendar.append(spacer);
  }
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = dateStamp(new Date(year, month, day));
    const entries = familyLog.offered.filter(entry => entry.date === date);
    const cell = document.createElement('button');
    cell.type = 'button';
    cell.className = `calendar-day${entries.length ? ' has-offers' : ''}`;
    cell.textContent = String(day);
    cell.setAttribute('aria-pressed', String(date === selectedCalendarDate));
    cell.setAttribute('aria-label', `${formatDate(date)}${entries.length ? `, ${entries.length} ${entries.length === 1 ? 'meal' : 'meals'} offered` : ', no meals saved'}`);
    if (entries.length) cell.title = entries.map(entry => entry.meal).join(', ');
    cell.addEventListener('click', () => {
      selectedCalendarDate = date;
      renderCalendar();
      renderHistory();
    });
    calendar.append(cell);
  }
}

function renderHistory() {
  historyList.replaceChildren();
  const entries = familyLog.offered.filter(entry => entry.date === selectedCalendarDate);
  clearHistoryButton.hidden = familyLog.offered.length === 0;
  historySummaryStatus.textContent = familyLog.offered.length
    ? `${familyLog.offered.length} saved ${familyLog.offered.length === 1 ? 'offer' : 'offers'} · open calendar`
    : 'No saved offers yet · open calendar';
  calendarSelection.textContent = `${formatDate(selectedCalendarDate)} · ${entries.length} ${entries.length === 1 ? 'meal' : 'meals'} offered`;
  if (!entries.length) {
    addText(historyList, 'li', 'history-empty', 'Nothing saved for this date.');
    return;
  }
  for (const entry of entries) {
    const row = document.createElement('li');
    const details = document.createElement('span');
    addText(details, 'strong', '', entry.meal);
    const reviewLabels = { enjoyed: 'Enjoyed', tasted: 'Tasted some', 'not-today': 'Not today' };
    const reviewStatus = addText(details, 'small', '', entry.response ? reviewLabels[entry.response] || 'Review saved' : 'No review yet');

    const editor = document.createElement('details');
    editor.className = 'review-editor';
    const editorSummary = addText(editor, 'summary', '', entry.response ? 'Edit review' : 'Add review');
    const reviewForm = document.createElement('form');
    reviewForm.className = 'review-form';
    const reviewSelect = document.createElement('select');
    reviewSelect.setAttribute('aria-label', `Review for ${entry.meal}`);
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'Choose a review';
    placeholder.disabled = true;
    placeholder.selected = !entry.response;
    reviewSelect.append(placeholder);
    for (const [value, label] of [['enjoyed', 'Enjoyed'], ['tasted', 'Tasted some'], ['not-today', 'Not today']]) {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = label;
      reviewSelect.append(option);
    }
    if (entry.response) {
      const clearOption = document.createElement('option');
      clearOption.value = 'clear';
      clearOption.textContent = 'Remove review';
      reviewSelect.append(clearOption);
      reviewSelect.value = entry.response;
    }
    reviewSelect.required = true;
    const saveReview = document.createElement('button');
    saveReview.type = 'submit';
    saveReview.textContent = 'Save review';
    const reviewFeedback = addText(reviewForm, 'span', 'review-feedback', '');
    reviewForm.append(reviewSelect, saveReview);
    reviewForm.append(reviewFeedback);
    reviewForm.addEventListener('submit', event => {
      event.preventDefault();
      entry.response = reviewSelect.value === 'clear' ? '' : reviewSelect.value;
      saveLog();
      reviewStatus.textContent = entry.response ? reviewLabels[entry.response] : 'No review yet';
      editorSummary.textContent = entry.response ? 'Edit review' : 'Add review';
      reviewFeedback.textContent = entry.response ? 'Review saved.' : 'Review removed.';
      editor.open = true;
    });
    editor.append(editorSummary, reviewForm);
    row.append(details, addText(row, 'span', 'history-tag', 'Offered'), editor);
    historyList.append(row);
  }
}

clearHistoryButton.addEventListener('click', () => {
  if (!window.confirm('Clear all offered meals and reviews? This cannot be undone.')) return;
  familyLog.offered = [];
  familyLog.shown = [];
  saveLog();
  selectedCalendarDate = dateStamp(new Date());
  calendarMonthDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  renderCalendar();
  renderHistory();
});

document.querySelector('#previous-month').addEventListener('click', () => {
  calendarMonthDate = new Date(calendarMonthDate.getFullYear(), calendarMonthDate.getMonth() - 1, 1);
  renderCalendar();
});
document.querySelector('#next-month').addEventListener('click', () => {
  calendarMonthDate = new Date(calendarMonthDate.getFullYear(), calendarMonthDate.getMonth() + 1, 1);
  renderCalendar();
});

button.addEventListener('click', () => {
  const selected = selectedNames();
  if (!selected.length) return;
  currentMeal = selectMeal(selected);
  if (!currentMeal) return;
  familyLog.shown = [currentMeal.name, ...familyLog.shown.filter(name => name !== currentMeal.name)].slice(0, meals.length);
  saveLog();
  ideaNumber.textContent = 'A fresh pick';
  renderMeal(currentMeal);
});

renderFoods();
updateFoodControls();
renderCalendar();
renderHistory();
