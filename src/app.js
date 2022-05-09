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

function formatDay(timestamp) {
let date =new Date(timestamp*1000);
    let day =date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
}

function displayForecast(response) {
let forecast =response.data.daily;
    let forecastElement=document.querySelector("#weather-forecast-week");

    let forecastHTML =`<div class="row">`;

    forecast.forEach(function(forecastDay, index) {
        if (index < 6) {
            forecastHTML = forecastHTML + `
    
            <div class="col-2">
                <div class="card">
                    <div class="weather-forecast-date">${formatDay(forecastDay.dt)}
                    </div>
                    <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"/>
                        <div class="weather-forecast-temperatures">
                            <span class="weather-forcast-temperature-min"> ${Math.round(forecastDay.temp.min)}°</span>
                            <span class="weather-forcast-temperature-max"> ${Math.round(forecastDay.temp.max)}°</span>
                        </div>
                </div>
            </div>  
        `;
        }

 
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

let form= document.querySelector("#search-city-form");
form.addEventListener("submit", handleSubmit);


search("Brisbane");