const url = 'http://localhost:3000/movies'
async function fetchMovies() {
	try{
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				"Content-Type": "application/json"
			}
		})
		if (response.ok) {
			const result = await response.json()
			return result
		} else {
			throw new Error('Failed to fetch data')
		}
	} catch(err) {
		console.error('Error fetching movies:', err)
	}

}

export default fetchMovies