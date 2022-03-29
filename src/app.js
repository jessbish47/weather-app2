function displayTemperature(response) {
    console.log(response);
    let temperatureElement = document.querySelector("#current-temperature");
    let conditionElement = document.querySelector("#condition");
    let minTempElement =document.querySelector("#min-temperature");
    let maxTempElement =document.querySelector("#max-temperature");
    let feelsLikeTempElement =document.querySelector("#feels-like");
    let humidityElement =document.querySelector("#humidity");
    temperatureElement.innerHTML = `${Math.round(response.data.main.temp)}°`;
    conditionElement.innerHTML= response.data.weather[0].description;
    minTempElement.innerHTML= `${Math.round(response.data.main.temp_min)}°`;
    maxTempElement.innerHTML= `${Math.round(response.data.main.temp_max)}°`;
    feelsLikeTempElement.innerHTML= `Feels like: ${Math.round(response.data.main.feels_like)}°`;
    humidityElement.innerHTML= `Humidity: ${Math.round(response.data.main.humidity)}%`
    

}

let apiKey="0b0ec56c90b41bb11f010b0e7cfeb75c";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=Sydney&appid=${apiKey}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);