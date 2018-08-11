import { config } from '../config';
import { renderRecipe } from './index';

const getRecipe = async (userInput) => {
	const response = await fetch (`https://api.edamam.com/search?q=${userInput}&app_id=${config.APP_ID}&app_key=${config.APP_KEY}&from=0&to=1`);
	if (response.status === 200) {
		const data = await response.json();
		return data;
	} else {
		throw new Error('Unable to fetch data');
	}
}

export { getRecipe };