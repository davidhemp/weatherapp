const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    // Insecure but there you go
    const APIKey = 'a6c1d018ca65fd099d9bdb4bcd15da6b';
    // const city = document.querySelector('.search-box input').value;
    const city = 'London'
    
    if (city === '') {
        // Default style
        container.style.height = '105px';    
        error404.style.display = 'none';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.classList.remove('fadeIn');
        return;
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            console.log();    
            if (json.cod === '404'){
                container.style.height = '500px';    
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return
            }
            
            if (json.cod === 200){
                const image = document.querySelector('.weather-box img');
                const temperature = document.querySelector('.weather-box .temperature');
                const description = document.querySelector('.weather-box .description');
                const humidity = document.querySelector('.weather-details .humidity span');
                const wind = document.querySelector('.weather-details .wind span');

                error404.style.display = 'none';
                container.style.height = '590px';    
                weatherBox.style.display = '';
                weatherDetails.style.display = '';
                weatherBox.classList.add('fadeIn');
                weatherDetails.classList.add('fadeIn');

                humidity.innerHTML = `${json.main.humidity}%`;
                temperature.innerHTML = `${parseInt(json.main.temp)}°C`;
                wind.innerHTML = `${json.wind.speed}Km/h`;
            }    

        })
        
})