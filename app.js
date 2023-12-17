async function getWeather() {
    const apiKey = "2fcf65692089cee320dfee2a6bbe888a";
    const cityInput = document.getElementById('city');
    const city = cityInput.value.trim();

    if (!city) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const response = await fetch(currentWeatherUrl);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error', error);
        alert('Error fetching weather data');
    }
}

function displayWeather(data) {
    const tempContainer = document.getElementById('temp-container');
    const weatherInfoContainer = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');

    tempContainer.innerHTML = '';
    weatherInfoContainer.innerHTML = '';

    if (data.cod === '404') {
        weatherInfoContainer.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `<p>${temperature}°C</p>`;
        const weatherHTML = `
            <p>${cityName}</p>
            <p>${description}</p>`;

        tempContainer.innerHTML = temperatureHTML;
        weatherInfoContainer.innerHTML = weatherHTML;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showWeatherIcon();
    }
}

function showWeatherIcon() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
}
