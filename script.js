// DOG API
const dogButton = document.getElementById('get-dog');
const dogContainer = document.getElementById('dog-output');

dogButton.addEventListener('click', getDogImage);

// Function to fetch and display a random dog image
async function getDogImage() {
// Fetch data from the Dog API
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();
    // Clear previous image
    dogContainer.innerHTML = '';

    // Create an image element and set its source
    const img = document.createElement('img');
    img.src = data.message;
    // Append the image to the container
    dogContainer.appendChild(img);
    }

// CAT API
const catButton = document.getElementById('get-cat');
const catContainer = document.getElementById('cat-output');

catButton.addEventListener('click', getCatImage);

// Function to fetch and display a random cat image
async function getCatImage() {
// Fetch data from the Cat API
    const response = await fetch('https://api.thecatapi.com/v1/images/search');
    const data = await response.json();
    // Clear previous image
    catContainer.innerHTML = '';

    // Create an image element and set its source
    const img = document.createElement('img');
    img.src = data[0].url;
    // Append the image to the container
    catContainer.appendChild(img);
}
    
// WEATHER API
const weatherButton = document.getElementById('get-weather');
const weatherContainer = document.getElementById('weather-output');

weatherButton.addEventListener('click', getWeather);

// Function to fetch and display weather information
async function getWeather() {
    // Weatherbit requires an API key and location
    // Using a free alternative: Open-Meteo (no key needed)
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.0060&current=temperature_2m,weather_code');
    const data = await response.json();
    
    // Clear previous weather information
    weatherContainer.innerHTML = '';

    // Get temperature and convert to Fahrenheit
    const tempC = data.current.temperature_2m;
    const tempF = (tempC * 9/5) + 32;

    // Create elements to display weather information
    const temp = document.createElement('p');
    temp.textContent = `Temperature: ${tempC}°C / ${tempF.toFixed(1)}°F`;
    
    const location = document.createElement('p');
    location.textContent = 'Location: Minneapolis, MN, USA';

    // Append the weather information to the container
    weatherContainer.appendChild(location);
    weatherContainer.appendChild(temp);
}

// CURRENCY API
const currencyButton = document.getElementById('get-currency');
const currencyContainer = document.getElementById('currency-output');

currencyButton.addEventListener('click', getExchangeRates);

// Function to fetch and display exchange rates
async function getExchangeRates() {
    // Using a free API: ExchangeRate-API (no key needed for basic usage)
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();

    // Clear previous exchange rates
    currencyContainer.innerHTML = '';

    // Create elements to display exchange rates
    const usdToEur = document.createElement('p');
    usdToEur.textContent = `USD to EUR: ${data.rates.EUR}`;

    // Append the exchange rates to the container
    currencyContainer.appendChild(usdToEur);
}

// MOVIES API
const moviesButton = document.getElementById('get-movies');
const moviesContainer = document.getElementById('movies-output');

moviesButton.addEventListener('click', getMovies);

// Function to fetch and display trending movies
async function getMovies() {
    try {
        // Using TMDB API with demo key
        const response = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=d3ad654353df7e0f15f0b20080635acc');
        const data = await response.json();

        // Clear previous movie information
        moviesContainer.innerHTML = '';

        if (data.results && data.results.length > 0) {
            const movie = data.results[0];
            
            // Create elements to display movie information
            const title = document.createElement('p');
            title.textContent = `Title: ${movie.title}`; 
            
            const year = document.createElement('p');
            const releaseDate = new Date(movie.release_date);
            year.textContent = `Year: ${releaseDate.getFullYear()}`;
            
            const overview = document.createElement('p');
            overview.textContent = `Overview: ${movie.overview}`;
            
            const rating = document.createElement('p');
            rating.textContent = `Rating: ${movie.vote_average}/10`;

            // Append the movie information to the container
            moviesContainer.appendChild(title);
            moviesContainer.appendChild(year);
            moviesContainer.appendChild(rating);
            moviesContainer.appendChild(overview);
        } else {
            moviesContainer.innerHTML = '<p>No movies found</p>';
        }
    } catch (error) {
        moviesContainer.innerHTML = '<p>Error fetching movies. Please try again.</p>';
        console.error('Error:', error);
    }
}

// GITHUB API
const githubButton = document.getElementById('get-github');
const githubContainer = document.getElementById('github-output');
const githubUsernameInput = document.getElementById('github-username');

githubButton.addEventListener('click', getGitHubUser);

// Add event listener for Enter key on input field
githubUsernameInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        getGitHubUser();
    }
});

// Function to fetch and display GitHub user information
async function getGitHubUser() {
    // Get username from input field
    const username = githubUsernameInput.value.trim();
    
    // Check if username is provided
    if (!username) {
        githubContainer.innerHTML = '<p>Please enter a GitHub username</p>';
        return;
    }
    
    try {
        // Using GitHub API to fetch user information
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();

        // Clear previous user information
        githubContainer.innerHTML = '';
        
        // Check if user was found
        if (data.message === 'Not Found') {
            githubContainer.innerHTML = '<p>User not found</p>';
            return;
        }

        // Create elements to display GitHub user information
        const usernamePara = document.createElement('p');
        usernamePara.textContent = `Username: ${data.login}`;

        const url = document.createElement('p');
        const link = document.createElement('a');
        link.href = data.html_url;
        link.textContent = data.html_url;
        link.target = '_blank';
        url.appendChild(link);

        const repos = document.createElement('p');
        repos.textContent = `Public Repos: ${data.public_repos}`;

        const followers = document.createElement('p');
        followers.textContent = `Followers: ${data.followers}`;

        // Append the GitHub user information to the container
        githubContainer.appendChild(usernamePara);
        githubContainer.appendChild(url);
        githubContainer.appendChild(repos);
        githubContainer.appendChild(followers);

    } catch (error) {
        githubContainer.innerHTML = '<p>Error fetching user. Please try again.</p>';
        console.error('Error:', error);
    }
}

// JOKE API
const jokeButton = document.getElementById('get-joke');
const jokeContainer = document.getElementById('joke-output');   

jokeButton.addEventListener('click', getJoke);

// Function to fetch and display a random joke
async function getJoke() {
    try {
        // Using a free joke API: Official Joke API
        const response = await fetch('https://official-joke-api.appspot.com/random_joke');
        const data = await response.json();

        // Clear previous joke
        jokeContainer.innerHTML = '';

        // Display the joke
        const setup = document.createElement('p');
        setup.textContent = `Setup: ${data.setup}`;

        const punchline = document.createElement('p');
        punchline.textContent = `Punchline: ${data.punchline}`;

        jokeContainer.appendChild(setup);
        jokeContainer.appendChild(punchline);
    } catch (error) {
        jokeContainer.innerHTML = '<p>Error fetching joke. Please try again.</p>';
        console.error('Error:', error);
    }
}

// FOOD API
const foodButton = document.getElementById('get-food');
const foodContainer = document.getElementById('food-output');

foodButton.addEventListener('click', getFoodApiInfo);

// Function to fetch and display a random food review
async function getFoodApiInfo() {
    try {
        // Using TheMealDB API - free random meal endpoint
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const data = await response.json();

        // Clear previous food review
        foodContainer.innerHTML = '';

        // Display the food review
        const meal = data.meals[0];
        const mealName = document.createElement('p');
        mealName.textContent = `Meal: ${meal.strMeal}`;

        const mealCategory = document.createElement('p');
        mealCategory.textContent = `Category: ${meal.strCategory}`;

        const mealArea = document.createElement('p');
        mealArea.textContent = `Area: ${meal.strArea}`;

        const mealInstructions = document.createElement('p');
        mealInstructions.textContent = `Instructions: ${meal.strInstructions}`;

        foodContainer.appendChild(mealName);
        foodContainer.appendChild(mealCategory);
        foodContainer.appendChild(mealArea);
        foodContainer.appendChild(mealInstructions);
    } catch (error) {
        foodContainer.innerHTML = '<p>Error fetching food review. Please try again.</p>';
        console.error('Error:', error);
    }
}

// VEHICLE ANIMATION
const vehicles = ['🚗', '🚛', '🚌', '🚓', '🏎️'];
const vehicleClasses = ['car', 'truck', 'bus', 'police', 'race-car'];
const vehicleContainer = document.querySelector('.vehicle-container');

// Create animated vehicles every 2 seconds
setInterval(() => {
    const randomIndex = Math.floor(Math.random() * vehicles.length);
    const vehicle = document.createElement('div');
    vehicle.className = `vehicle ${vehicleClasses[randomIndex]}`;
    vehicle.textContent = vehicles[randomIndex];
    
    // Get animation duration from CSS class
    const cssClass = vehicleClasses[randomIndex];
    let duration = 8; // default
    
    if (cssClass === 'truck') duration = 10;
    if (cssClass === 'bus') duration = 12;
    if (cssClass === 'police') duration = 7;
    if (cssClass === 'race-car') duration = 6;
    
    vehicleContainer.appendChild(vehicle);
    
    // Remove the element after animation completes
    setTimeout(() => vehicle.remove(), duration * 1000);
}, 2000);