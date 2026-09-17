const foodOptions = ['Banana', 'Avocado', 'Yogurt', 'Sweet potato', 'Pasta', 'Cheese', 'Chicken', 'Rice', 'Egg', 'Broccoli', 'Apple', 'Oats'];
const meals = [
  {name:'Banana & yogurt oat bowl', foods:['Banana','Yogurt','Oats'], prep:'Cook oats until soft, then top with sliced banana and a spoonful of plain yogurt.'},
  {name:'Apple & banana oatmeal', foods:['Apple','Banana','Oats'], prep:'Cook oats with finely chopped apple until soft. Stir in mashed banana.'},
  {name:'Creamy avocado pasta', foods:['Avocado','Pasta','Cheese'], prep:'Toss cooked pasta with mashed avocado and a splash of pasta water. Finish with grated cheese.'},
  {name:'Chicken & broccoli rice bowl', foods:['Chicken','Broccoli','Rice'], prep:'Serve cooked rice with tender, fully cooked chicken and steamed broccoli, cut to suit your child.'},
  {name:'Cheesy broccoli pasta', foods:['Pasta','Cheese','Broccoli'], prep:'Mix cooked pasta and soft steamed broccoli with grated cheese and a little warm pasta water.'},
  {name:'Sweet potato & chicken bowl', foods:['Sweet potato','Chicken','Yogurt'], prep:'Top soft cooked sweet potato with fully cooked shredded chicken and a spoonful of plain yogurt.'},
  {name:'Avocado & egg rice bowl', foods:['Avocado','Egg','Rice'], prep:'Top warm rice with fully cooked scrambled egg and soft avocado pieces.'},
  {name:'Sweet potato & cheese egg bites', foods:['Sweet potato','Cheese','Egg'], prep:'Fold soft cooked sweet potato and grated cheese into beaten egg. Cook in a pan until the egg is fully set.'},
  {name:'Warm apple yogurt oat bowl', foods:['Apple','Yogurt','Oats'], prep:'Cook oats and chopped apple until soft. Let cool slightly, then add plain yogurt.'}
];
const choices=document.querySelector('#choices'), button=document.querySelector('#suggest');
let selected=[];
foodOptions.forEach(food=>{
  const label=document.createElement('label');label.className='choice';
  const input=document.createElement('input');input.type='checkbox';input.value=food;input.name='foods';
  const span=document.createElement('span');span.textContent=food;label.append(input,span);choices.append(label);
});
function updateSelection(){
  selected=Array.from(choices.querySelectorAll('input:checked'),input=>input.value);
  button.disabled=selected.length===0;
  document.querySelector('#selection-note').textContent=selected.length ? `${selected.length} ${selected.length===1?'food':'foods'} selected` : 'Choose a food to get started.';
  document.querySelector('#prediction').textContent='A little inspiration starts here';
  document.querySelector('#explanation').textContent=selected.length ? 'Your favorites are ready. Click “Suggest a meal” to see an idea.' : 'Select your child’s favorites, then click “Suggest a meal.”';
  document.querySelector('#meal-detail').hidden=true;
}
function joinFoods(foods){return foods.length<2 ? foods[0] : foods.slice(0,-1).join(', ')+' and '+foods.at(-1);}
function suggestMeal(){
  if(!selected.length)return null;
  const meal=meals.map((meal,index)=>({...meal,index,matches:meal.foods.filter(food=>selected.includes(food))})).sort((a,b)=>b.matches.length-a.matches.length||a.index-b.index)[0];
  const others=meal.foods.filter(food=>!selected.includes(food));
  const reason=`Because your child has enjoyed ${joinFoods(meal.matches)}, this meal brings ${meal.matches.length===1?'that familiar ingredient':'those familiar ingredients'} together${others.length ? ` with ${joinFoods(others)}. The added ingredients weren’t selected, so check that they suit your child.` : '.'}`;
  document.querySelector('#prediction').textContent=meal.name;
  document.querySelector('#explanation').textContent=reason;
  document.querySelector('#preparation').textContent=meal.prep;
  document.querySelector('#meal-detail').hidden=false;
  return {meal:meal.name,reason};
}
choices.addEventListener('change',updateSelection);
document.querySelector('#meal-form').addEventListener('submit',event=>{event.preventDefault();suggestMeal();});
