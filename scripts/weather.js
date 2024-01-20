document.addEventListener('DOMContentLoaded', () => {

    const url = "https://api.openweathermap.org/data/2.5/weather?lat=20.42&lon=86.9223&units=imperial&appid=aaa802f065623b257e44b95ccc9e87c0";
    const urlForecast = 'https://api.openweathermap.org/data/2.5/forecast?lat=20.42&lon=86.9223&units=imperial&appid=aaa802f065623b257e44b95ccc9e87c0';

    const weatherContainer = document.querySelector('#weather');

    async function apiFetch() {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
        
    }
    // Forecast API Fetch
async function forecastApiFetch() {
    try {
        const response = await fetch(urlForecast);
        if (response.ok) {
            const data = await response.json()
            console.log(data);
            return data;
        }
        else {
            throw Error (await response.text());
        }
    } catch (error) {
            console.log(error);
    }
}


    function capitalizeFirstLetter(str) {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
    }

    function createWeatherCard(data, weekday) {
        console.log('Current Data', data)
        const card = document.createElement('section');
        card.classList.add('forecast-card');

        const dayOfWeek = document.createElement('h3');
        
        dayOfWeek.textContent = weekday;

        const icon = document.createElement('img');
        const main = document.createElement('p');
        const temp = document.createElement('p');
        const humidity = document.createElement('p');
        const description = document.createElement('p');

        icon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        icon.alt = `Weather Icon`;
        icon.loading = 'lazy';
        icon.width = '300';
        icon.height = '200';

        main.textContent =(data.weather[0].main);
        temp.textContent = `${data.main.temp.toFixed(0)}°F`;
        humidity.textContent = `Humidity: ${data.main.humidity.toFixed(0)}`;
        description.textContent = capitalizeFirstLetter(data.weather[0].description);

        card.appendChild(dayOfWeek);
        card.appendChild(main);
        card.appendChild(icon);
        card.appendChild(temp);
        card.appendChild(humidity);
        card.appendChild(description);

        return card;
    }

    function createBanner(data1){
    
        const bannerContainer = document.querySelector('#banner');

        // Create Button
        const button = document.createElement('button');
        button.id = 'closeBanner';
        button.textContent = '✖';

        // Create High Temp Text
        const bannerContent = document.createElement('p');
        bannerContent.textContent = `Todays high temperature is: ${data1.main.temp_max.toFixed(0)}°F `;
            
    // Append the button to the paragraph
    bannerContent.appendChild(button);

    // Add click event listener to the button
    button.addEventListener('click', () => {
        bannerContainer.style.display = 'none'; // Assuming you want to hide the entire banner
    });

    // Append the paragraph to the banner container
    bannerContainer.appendChild(bannerContent);
}
    async function displayResults() {
        const data1 = await apiFetch();
        const data2 = await forecastApiFetch();
        
        createBanner(data1);
        // Clear the container before adding new cards
        weatherContainer.innerHTML = '';

        // Get current day of the week
        const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const today = new Date().getDay();
        
        // Loop through forecast data and create a card for each day
        for (let i = 0; i < 5; i++) {
            let weekday = '';
            if (i == 0){
                 weekday = 'Today';
                weatherCard = createWeatherCard(data1, weekday);
                 
            }
            else{
                 weekday = weekdays[(today + i) % 7]; // Adding i to get the next days
                 const index = data2.list.findIndex(item => item.dt_txt.includes('15:00'));
                 const adjustedIndex = index + 8 * i;

                 weatherCard = createWeatherCard(data2.list[adjustedIndex], weekday);
            }
            weatherContainer.appendChild(weatherCard);
        }
    }

    displayResults();
})