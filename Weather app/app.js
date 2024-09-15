API_KEY = '7cf174c4f6d5e20779c412475f879c32';
const URL = 'https://api.openweathermap.org/data/2.5/weather?units=metric';
const city = document.querySelector('input');
const btn = document.querySelector('.btn');
const temp = document.querySelector('.temp');
const area = document.querySelector('.city');
const humidity = document.querySelector('.humidity-value');
const wind = document.querySelector('.wind-value');
const weather_img = document.querySelector('.weather-img img');

btn.addEventListener('click',async () => {
    city_value = city.value;
    const response = await fetch(URL + `&q=${city_value}&appid=${API_KEY}`);
    const data = await response.json();
    console.log(data);
    if(data.cod == '404'){
        document.querySelector(".invalid-text").classList.add('invalid-text-show');
    }else if(data.cod == '200'){
        document.querySelector(".invalid-text").classList.remove('invalid-text-show');
    }
    area.innerText = data.name;
    temp.innerText = Math.round(data.main.temp) + '°C';
    humidity.innerText = data.main.humidity + '%';
    wind.innerText = data.wind.speed + 'm/s';

    if(data.weather[0].main === 'Clear'){
        weather_img.src = 'images/clear.png';
    }else if(data.weather[0].main === 'Clouds'){
        weather_img.src = 'images/clouds.png';
    }else if(data.weather[0].main === 'Rain'){
        weather_img.src = 'images/rain.png';
    }else if(data.weather[0].main === 'Snow'){
        weather_img.src = 'images/snow.png';
    }else if(data.weather[0].main === 'drizzle'){
        weather_img.src = 'images/drizzle.png';
    }else{
        weather_img.src = 'images/mist.png';
    }
    document.querySelector(".weather-box").classList.add('weather-box-show');
    
    
});
