import fetchMovies from './api.js';

const filmContainer = document.getElementById('film-container');


const cashedMovies = localStorage.getItem("movies")
let movies
let moviesArr
let moviesGenre = localStorage.getItem('genre')
console.log('genre', moviesGenre);

// Add event listener to the filter button
const sortingButtons = document.querySelectorAll('.sorting-btns button');
sortingButtons.forEach((button) => {
    button.addEventListener('click', () => {
        console.log('clicked', button.textContent);
        localStorage.setItem('genre', button.textContent)
        

    })
})

// Function filterMovies
function filterMovies(movieArr, genre) {
    return movieArr.filter((movie) => movie.genres.includes(genre))
}

// Check if the movies are already cashed in the local storage
if(cashedMovies) {
    moviesArr = JSON.parse(cashedMovies)
    movies = moviesGenre ? filterMovies(moviesArr, moviesGenre) : moviesArr
    console.log('filtered movies',movies)      
}
else {
    console.log('fetching movies');
    
    fetchMovies()
    .then((response) => {
        moviesArr = response
        movies = moviesGenre ? filterMovies(moviesArr, moviesGenre) : moviesArr
        localStorage.setItem("movies", JSON.stringify(response))
        location.reload()
    })
    .catch((err) => console.log(err))
}
console.log(movies);

// loop through the movies and create the elements
movies.forEach((film) => {
    // Create the section element
    const section = document.createElement('section');
    section.setAttribute('key', film.id);

    // Create the div container for the whole content (other than the image)
    const divIdContainer = document.createElement('div');
    divIdContainer.classList.add('div-id-container');

    // Create the movie image
    const movieImage = document.createElement('img');
    movieImage.src = film.primaryImage;
    movieImage.alt = '';
    movieImage.classList.add('movie-picture');

    // Create the div to contain the rest of the elements
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content-div'); // Adding class for styling if needed

    // Create the title and rating section
    const titleSection = document.createElement('div');
    const h1 = document.createElement('h1');
    h1.textContent = film.primaryTitle;
    titleSection.appendChild(h1);

    const typeTitleContainer = document.createElement('div');
    typeTitleContainer.classList.add('type-title-container');
    const movieType = document.createElement('div');
    movieType.classList.add('movie-type');
    movieType.textContent = `Type: ${film.type}`;
    typeTitleContainer.appendChild(movieType);
    titleSection.appendChild(typeTitleContainer);

    const ratingSection = document.createElement('div');
    ratingSection.classList.add('rating-Id');
    const starImage = document.createElement('img');
    starImage.src = 'https://www.svgrepo.com/show/13674/star.svg';
    starImage.alt = '';
    starImage.classList.add('star-img');
    const likesRating = document.createElement('p');
    likesRating.classList.add('likes-rating');
    likesRating.textContent = film.averageRating;
    ratingSection.appendChild(starImage);
    ratingSection.appendChild(likesRating);

    const movieDuration = document.createElement('p');
    movieDuration.classList.add('movie-duration');
    movieDuration.textContent = `${film.runtimeMinutes} min`;
    const votes = document.createElement('p');
    votes.classList.add('movie-duration');
    votes.textContent = `Votes: ${film.numVotes}`;

    // Create the buttons (like, dislike)
    const buttonsDiv = document.createElement('div');
    const likeButton = document.createElement('button');
    likeButton.id = 'like-btn';
    likeButton.textContent = 'Like';
    const dislikeButton = document.createElement('button');
    dislikeButton.id = 'like-btn';
    dislikeButton.textContent = 'Dislike';
    buttonsDiv.appendChild(likeButton);
    buttonsDiv.appendChild(dislikeButton);

    // Create description container
    const descriptionContainer = document.createElement('div');
    descriptionContainer.classList.add('discriptionContainer');
    const descriptionText = document.createElement('p');
    descriptionText.textContent = `Description: ${film.description}`;
    descriptionContainer.appendChild(descriptionText);

    // Create additional info
    const countryText = document.createElement('p');
    countryText.textContent = `Country: ${film.filmingLocations ? film.filmingLocations[0] : ""}`;
    const genresText = document.createElement('p');
    genresText.textContent = `Genres: ${film.genres}`;
    const releaseDateText = document.createElement('p');
    releaseDateText.textContent = `Release Date: ${film.releaseDate}`;

    // Append all the elements to the contentDiv
    contentDiv.appendChild(titleSection);
    contentDiv.appendChild(ratingSection);
    contentDiv.appendChild(movieDuration);
    contentDiv.appendChild(votes);
    contentDiv.appendChild(buttonsDiv);
    contentDiv.appendChild(descriptionContainer);
    contentDiv.appendChild(countryText);
    contentDiv.appendChild(genresText);
    contentDiv.appendChild(releaseDateText);

    // Append the image and content div to the divIdContainer
    divIdContainer.appendChild(movieImage);
    divIdContainer.appendChild(contentDiv);

    // Append the divIdContainer to the section
    section.appendChild(divIdContainer);

    // Finally, append the section to the film container
    filmContainer.appendChild(section);
}
)