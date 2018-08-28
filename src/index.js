import "./styles/styles.scss";

import  { getRecipe, getRandom } from "./requests";

const searchBoxSubmit = document.querySelector('.search__button');
let searchBoxInput = document.querySelector('.search__input');

const overviewHeading = document.querySelector('.overview__heading');
const recipeSource = document.querySelector('.recipe-source');
const fullLink = document.querySelector('.source-link__paragraph');
const recipeTime = document.querySelector('.overview__details-number');
const recipeImage = document.querySelector('.image__recipe');

const yields = document.querySelector('.overview__yields');
const ingredientsList = document.querySelector('.list');
const labelsList = document.querySelector('.label__list');

const searchRecipeButton = document.querySelector('#search-recipe-button');
const getRandomButton = document.querySelector('#get-random-button');

// GET RANDOM RECIPE
getRandomButton.addEventListener('click', () => {
	getRandomButton.classList.add('side-nav__item--active');
	searchRecipeButton.classList.remove('side-nav__item--active');
	// renderRandom();
});

// BACK TO INITIAL STATE
searchRecipeButton.addEventListener('click', () => {
	searchRecipeButton.classList.add('side-nav__item--active');
	getRandomButton.classList.remove('side-nav__item--active');
})

// ON USER SEARCH INPUT
searchBoxSubmit.addEventListener('click', () => {
	render();
});

// ON USER SEARCH INPUT - ENTER
searchBoxInput.addEventListener('keypress', (e) => {
	if (e.keyCode === 13 || e.which === 13) {
		render();
	}
});


const renderRecipe = (data) => {
	if (data.hits[0].recipe.label.length > 40) {
		overviewHeading.textContent = `${data.hits[0].recipe.label.slice(0, 40)}...`;
	} else {
		overviewHeading.textContent = data.hits[0].recipe.label;
	}
	recipeSource.textContent = data.hits[0].recipe.source;
	recipeSource.setAttribute('href', data.hits[0].recipe.url);
	fullLink.setAttribute('href', data.hits[0].recipe.url);
	
	if (data.hits[0].recipe.totalTime < 1) {
		recipeTime.innerText = 30;
	} else {
		recipeTime.innerText = data.hits[0].recipe.totalTime;
	}
	
	recipeImage.setAttribute('src', data.hits[0].recipe.image);
	
	
	
};


const handleIngredients = (data) => {
	const ingredients = data.hits[0].recipe.ingredientLines;
	
	while (ingredientsList.firstChild) {
		ingredientsList.removeChild(ingredientsList.firstChild);
	}
	
	for (let i = 0; i < ingredients.length; i++) {
		const el = document.createElement('li');
		el.classList.add('list__item');
		ingredientsList.appendChild(el)
		
		el.innerHTML = `<img class="list__item-icon" src="img/chevron-small-right.png"></img>${ingredients[i]}`;
	}
}


// HANDLE THE NUMBER OF YIELDS ICONS TO APPEAR NEXT TO THE TITLE
const handleYields = (data) => {
	const yieldsNum = data.hits[0].recipe.yield;
	
	while (yields.firstChild) {
		yields.removeChild(yields.firstChild);
	}
	
	// DISPLAY MAXIMUN OF FIVE ICONS (YIELDS FOR 5 OR MORE)
	if (yieldsNum >= 5) {
		for (let i = 1; i <= 5; i++) {
			const el = document.createElement('svg');
			el.classList.add('overview__icon-yield');
			el.innerHTML = '<use xlink:href="img/sprite.svg#icon-star"></use>';
			const shadow = el.createShadowRoot();
			shadow.innerHTML = '<svg id="icon-star" viewBox="0 0 20 20" width="100%" height="100%"><title>star</title><path d="M10 1.3l2.388 6.722h6.412l-5.232 3.948 1.871 6.928-5.439-4.154-5.438 4.154 1.87-6.928-5.233-3.948h6.412l2.389-6.722z"></path></svg>';
			
			yields.appendChild(el);
		}
		// IF LESS THAN FIVE, DISPLAY THE AMOUNT OF ICONS
	} else {
		for (let i = 1; i <= yieldsNum; i++) {
			const el = document.createElement('svg');
			el.classList.add('overview__icon-yield');
			el.innerHTML = '<use xlink:href="img/sprite.svg#icon-star"></use>';
			const shadow = el.createShadowRoot();
			shadow.innerHTML = '<svg id="icon-star" viewBox="0 0 20 20" width="100%" height="100%"><title>star</title><path d="M10 1.3l2.388 6.722h6.412l-5.232 3.948 1.871 6.928-5.439-4.154-5.438 4.154 1.87-6.928-5.233-3.948h6.412l2.389-6.722z"></path></svg>';
			
			yields.appendChild(el);
		}
	}
}

const handleLabels = (data) => {
	const healthLabels = data.hits[0].recipe.healthLabels;
	const calories = Math.round(data.hits[0].recipe.calories);
	const dietLabels = data.hits[0].recipe.dietLabels;
	
	while (labelsList.firstChild) {
		labelsList.removeChild(labelsList.firstChild);
	}
	
	if (calories > 0) {
		const el = document.createElement('li');
		el.classList.add('label__text');
		labelsList.appendChild(el)
		
		el.innerHTML = `<img class="list__item-icon" src="img/chevron-small-right.png"></img>${calories} Calories`;
	}
	
	if (dietLabels.length > 0) {
		const el = document.createElement('li');
		el.classList.add('label__text');
		labelsList.appendChild(el)
		
		el.innerHTML = `<img class="list__item-icon" src="img/chevron-small-right.png"></img>${dietLabels[0]}`;
	}
	
	if (healthLabels.length > 0) {
		for (let i = 0; i < healthLabels.length; i++) {
			const el = document.createElement('li');
			el.classList.add('label__text');
			labelsList.appendChild(el)
			
			el.innerHTML = `<img class="list__item-icon" src="img/chevron-small-right.png"></img>${healthLabels[i]}`;
		}
	}
}

const render = async () => {
	const data = await getRecipe(searchBoxInput.value);
	searchBoxInput.value = '';
	renderRecipe(data);
	handleYields(data);
	handleIngredients(data);
	handleLabels(data);
	
	
	console.log(data);
	
};

// const renderRandom = async () => {
// 	const data = await getRandom('http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_9b5945e03f05acbf9d69625138385408');
// 	renderRecipe(data);
// 	handleYields(data);
// 	handleIngredients(data);
// 	handleLabels(data);
	
	
// 	console.log(data);
// }



export { renderRecipe };
