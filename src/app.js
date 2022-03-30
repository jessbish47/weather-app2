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

function displayTemperature(response) {
    console.log(response);
    let temperatureElement = document.querySelector("#current-temperature");
    let conditionElement = document.querySelector("#condition");
    let minTempElement =document.querySelector("#min-temperature");
    let maxTempElement =document.querySelector("#max-temperature");
    let feelsLikeTempElement =document.querySelector("#feels-like");
    let humidityElement =document.querySelector("#humidity");
    let dateElement =document.querySelector("#date");
    let iconElement =document.querySelector("#icon");

    temperatureElement.innerHTML = `${Math.round(response.data.main.temp)}°C`;
    conditionElement.innerHTML= response.data.weather[0].description;
    minTempElement.innerHTML= `${Math.round(response.data.main.temp_min)}°`;
    maxTempElement.innerHTML= `${Math.round(response.data.main.temp_max)}°`;
    feelsLikeTempElement.innerHTML= `Feels like: ${Math.round(response.data.main.feels_like)}°`;
    humidityElement.innerHTML= `Humidity: ${Math.round(response.data.main.humidity)}%`;
    dateElement.innerHTML= formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
}

let apiKey="0b0ec56c90b41bb11f010b0e7cfeb75c";
let city= "San Francisco";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);