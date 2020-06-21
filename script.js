$(document).ready(function () {
    // HTML variables

    var currentDate = moment().format("dddd, MMMM, Do");
    var listCities = $("#show-cities");
    var currentWeather = $(".current-conditions");
    var currentWeatherDiv = $("<div>");
    var weatherHeading = $("<h1>");
    var weatherIconDiv = $("<img>");
    var forecastDiv = $(".future-forecast");
    var dateDiv = $("<div>");
    var tempDiv = $("<div>");
    var humidityDiv = $("<div>");
    var windSpeedDiv = $("<div>");
    var uvIndexDiv = $("<div>");
    var clearCities = $("#clear-cities");

    // Array Variables

    var searchedCitiesArray = [];
    var city = [];

    var APIKey = "3faa5d1f7e1b0157f518296126002213";


    $("#submit").on("click", function (event) {
        event.preventDefault();

        city = $("#city-input").val();

        if (city !== "") {
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" + "&appid=" + APIKey,
                method: "GET"
            }).then(function (response) {
                // Pull through weather attributes from API
                console.log(response);
                currentTemp = Math.floor(response.main.temp);
                weatherIcon = response.weather[0].icon;
                currentHumidity = response.main.humidity;
                currentWindSpeed = response.wind.speed;

                // Assign classes and attributes to tags to append afterwards
                currentWeatherDiv.attr('class', 'display-current-ul');
                dateDiv.attr('class', 'display date');
                weatherHeading.attr('class', 'display-current-weather').text(city + " " + "|" + currentDate);
                weatherIconDiv.attr('src', "http://openweathermap.org/img/w/" + weatherIcon + ".png");
                tempDiv.attr('class', 'display current temp').text("Current temperature: " + currentTemp + "°");
                humidityDiv.attr('class', 'display current humidity').text("Humidity: " + currentHumidity + "%");
                windSpeedDiv.attr('class', 'display current wind speed').text("Wind Speed: " + currentWindSpeed + "kmph");

                // Append weather data to respective div tags
                currentWeather.append(currentWeatherDiv);
                currentWeatherDiv.append(dateDiv);
                currentWeatherDiv.append(weatherHeading);
                currentWeatherDiv.append(weatherIconDiv);
                currentWeatherDiv.append(tempDiv);
                currentWeatherDiv.append(humidityDiv);
                currentWeatherDiv.append(windSpeedDiv);

                 // Call 5 day forecast
                $.ajax({
                    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric" + "&appid=" + APIKey,
                    method: "GET"
                }).then(function (response) {
                    console.log(response.list);

            })
        })
     }
           
        function searchedCities() {
            if (searchedCitiesArray.length !== 0) {
                listCities.html("");
            }
            for (var i = 0; i < searchedCitiesArray.length; i++) {
                city = searchedCitiesArray[i];

                var searchList = $("<li>").attr("class", "list-cities").data('index', i);
                listCities.append(searchList);
            };

        };

        function clearSearchHistory() {

            searchedCitiesArray = [];
            listCities.text("");
            localStorage.clear();

        };

        function init() {

            var storedCities = JSON.parse(localStorage.getItem('cities'));
            if (storedCities !== null) {
                searchedCitiesArray = storedCities;
            }

            searchedCities();
        };

        function locallyStoredCities() {
            // Stringify and set "cities" key in localStorage to recentlySearchedCitiesArray
            localStorage.setItem("cities", JSON.stringify(searchedCitiesArray));
        };


    clearCities.on("click", function (event) {
        event.preventDefault();
        clearSearchHistory();
        citySearch = ("");
    })
    init();
})
})