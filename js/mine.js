let serchInput = document.querySelector("#home .search-input")
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// =============================current Day==========================
(function () {
    let currentDay = new Date();
    document.querySelector("#firstCard .header-card .day").innerHTML = days[currentDay.getDay()];
    document.querySelector("#firstCard .header-card .date").innerHTML = currentDay.getDate() + month[currentDay.getMonth()];

})();
// ============================Next Day===========================
(function () {
    let currentDay = new Date();
    document.querySelector("#secondCard .header-card span").innerHTML = days[(currentDay.getDay() + 1)];
})();
// ============================last Day===========================
(function(){
    let currentDay = new Date();
    document.querySelector("#lastCard .header-card span").innerHTML = days[(currentDay.getDay()+2)];
})();
async function getWeather(city) {
    let apiWeather = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ec54118b4957441d8c910848240201&q=${city}&days=3`);
    let weatherData = await apiWeather.json();
    return weatherData;
}
async function displayWeather(city = "cairo") {
    let weatherData = await getWeather(city);
    //===================First Card (current Day)=====================================
    document.querySelector("#firstCard .body-card .location").innerHTML = weatherData.location.name;
    document.querySelector("#firstCard .degree .num").innerHTML = weatherData.current.temp_c + `<span class="sizem">o</span>C`;
    document.querySelector("#firstCard .icon-degree").innerHTML = `<img src="https:${weatherData.current.condition.icon}" alt="icon"></img>`;
    document.querySelector("#firstCard .body-card .text-degree").innerHTML = weatherData.current.condition.text;
    //==================second Card (next day)=========================================
    document.querySelector("#secondCard .body-card picture").innerHTML = `<img src="https:${weatherData.forecast.forecastday[1].day.condition.icon}" alt="icon">`;
    document.querySelector("#secondCard .body-card .num").innerHTML = weatherData.forecast.forecastday[1].day.maxtemp_c + `<span class="sizemm">o</span>C</div>`;
    document.querySelector("#secondCard .body-card .num2").innerHTML = weatherData.forecast.forecastday[1].day.mintemp_c + `<span class="sizenn">o</span></p>`;
    document.querySelector("#secondCard .body-card .lastSpan").innerHTML = weatherData.forecast.forecastday[1].day.condition.text;
    // ==================last Card (last day)=========================================
    document.querySelector("#lastCard .body-card picture").innerHTML = `<img src="https:${weatherData.forecast.forecastday[2].day.condition.icon}" alt="icon">`;
    document.querySelector("#lastCard .body-card .num").innerHTML = weatherData.forecast.forecastday[2].day.maxtemp_c + `<span class="sizemm">o</span>C</div>`;
    document.querySelector("#lastCard .body-card .num2").innerHTML = weatherData.forecast.forecastday[2].day.mintemp_c + `<span class="sizenn">o</span></p>`;
    document.querySelector("#lastCard .body-card .lastSpan").innerHTML = weatherData.forecast.forecastday[2].day.condition.text;
}
displayWeather()
serchInput.addEventListener("keypress", function () {

    let serchValue = serchInput.value;
    displayWeather(serchValue);

})
