function formatDate(timestamp) {
let date = new Date(timestamp);
let hours = date.getHours();
if (hours <10) {
    hours=`0${hours}`;
}
let minutes = date.getMinutes();
if (minutes <10) {
    minutes =`0${minutes}`;
}
let days = [
    "Sunday",
    "Monday", 
    "Tuesday",
    "Wednesday", 
    "Thursday", 
    "Friday", 
    "Saturday"];
let day = days[date.getDay()];
console.log(day);
return `${day} ${hours}:${minutes}`;
}

function displayForecast(response) {
    console.log(response.data.daily);
    let forecastElement=document.querySelector("#weather-forecast-week");

    let forecastHTML =`<div class="row">`;
    let days = ["Monday", "Tuesday","Wednesday", "Thursday","Friday"];
    days.forEach(function(day) {
           forecastHTML = forecastHTML + `
    
        <div class="col-2">
            <div class="card">
                <div class="weather-forecast-date">
                    ${day}
                </div>
                <i class="fa-solid fa-cloud"></i>
                    <div class="weather-forecast-temperatures">
                        <span class="weather-forcast-temperature-min"> 20°</span>
                        <span class="weather-forcast-temperature-max"> 25°</span>
                    </div>
            </div>
        </div>  
    `;
    })
 

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
    
}
function getForecast(coordinates) {
    let apiKey="0b0ec56c90b41bb11f010b0e7cfeb75c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
    console.log(response.data);
    let temperatureElement = document.querySelector("#current-temperature");
    let conditionElement = document.querySelector("#condition");
    let minTempElement =document.querySelector("#min-temperature");
    let maxTempElement =document.querySelector("#max-temperature");
    let feelsLikeTempElement =document.querySelector("#feels-like");
    let humidityElement =document.querySelector("#humidity");
    let dateElement =document.querySelector("#date");
    let iconElement =document.querySelector("#icon");
    let searchElement =document.querySelector("#search-city-input");



    celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°C`;
    conditionElement.innerHTML= response.data.weather[0].description;
    minTempElement.innerHTML= `${Math.round(response.data.main.temp_min)}°`;
    maxTempElement.innerHTML= `${Math.round(response.data.main.temp_max)}°`;
    feelsLikeTempElement.innerHTML= `Feels like: ${Math.round(response.data.main.feels_like)}°`;
    humidityElement.innerHTML= `Humidity: ${Math.round(response.data.main.humidity)}%`;
    dateElement.innerHTML= formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
    searchElement.setAttribute("placeholder", response.data.name);

    getForecast(response.data.coord);
}

function search(city) {
    let apiKey="0b0ec56c90b41bb11f010b0e7cfeb75c";
    let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#search-city-input");
    search(cityInputElement.value);

}

function showfahrenheitTemperature(event) {
    event.preventDefault();
    let fahrenheightTemperature = (celsiusTemperature * 9 / 5)+32;
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let temperatureElement = document.querySelector("#current-temperature");
    temperatureElement.innerHTML = `${Math.round(fahrenheightTemperature)}°F`;

}

function showCelsiusTemperature(event) {
   event.preventDefault();
   celsiusLink.classList.add("active");
   fahrenheitLink.classList.remove("active");
   let temperatureElement = document.querySelector("#current-temperature");
   temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°C`;

}
let celsiusTemperature = null;


let form= document.querySelector("#search-city-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-Link");
fahrenheitLink.addEventListener("click", showfahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-Link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

search("Brisbane");