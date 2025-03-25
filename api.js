const url = 'https://imdb236.p.rapidapi.com/imdb/most-popular-movies';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '6ee780b73emsh80ea193d802e044p1accb6jsn5618244abdf1',
		'x-rapidapi-host': 'imdb236.p.rapidapi.com'
	}
};

async function fetchMovies() {
	
	try {
		const response = await fetch(url, options);
		// Turn the returned json into actual object
		const result = await response.json();
		return result
	} catch (error) {
		console.error(error);
	}
}

export default fetchMovies