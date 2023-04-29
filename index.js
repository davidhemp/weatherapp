const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    // Insecure but there you go
    const APIKey = 'a6c1d018ca65fd099d9bdb4bcd15da6b';
    const city = document.querySelector('.search-box input').value.trim();
    
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
                // Grab weather details elements
                const image = document.querySelector('.weather-box img');
                const temperature = document.querySelector('.weather-box .temperature');
                const description = document.querySelector('.weather-box .description');
                const humidity = document.querySelector('.weather-details .humidity span');
                const wind = document.querySelector('.weather-details .wind span');
                
                //Ensure 404 is hidden and display weather box
                error404.style.display = 'none';
                container.style.height = '550px';    
                weatherBox.style.display = '';
                weatherDetails.style.display = '';
                weatherBox.classList.add('fadeIn');
                weatherDetails.classList.add('fadeIn');

                //Set values and images. Assuming a static name but using a failback if we can't find a matching image
                fetch(`images/${json.weather[0].main}.png`, { method :'HEAD'})
                    .then(res => {
                        if(res.ok){
                            image.src = `images/${json.weather[0].main}.png`;
                        } else {
                            image.src = 'images/general.png';
                        }
                    })
                
                description.innerHTML = `${json.weather[0].description}`;
                humidity.innerHTML = `${json.main.humidity}%`;
                temperature.innerHTML = `${parseInt(json.main.temp)}°C`;
                wind.innerHTML = `${json.wind.speed}Km/h`;
            }    

        })
        
})