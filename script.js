$(document).ready(function () {
    // HTML variables

    var currentDate = moment().format("dddd, MMMM, Do YYYY, h:mma");
    var listCities = $("#show-cities");
    var searchList = $("<div>");
    var currentWeather = $(".current-conditions");
    var currentWeatherDiv = $("<div>");
    var weatherHeading = $("<h1>");
    var weatherIconDiv = $("<img>");
    var forecastDiv = $(".future-forecast");
    var forecastEl = $("<div>");
    var dateDiv = $("<div>");
    var tempDiv = $("<div>");
    var minTemp = $("<div>");
    var maxTemp = $("<div>");
    var humidityDiv = $("<div>");
    var windSpeedDiv = $("<div>");
    var uvIndexDiv = $("<div>");
    var clearCities = $("#clear-cities");
    var cityID;

    // Array Variables

    var searchedCitiesArray = [];
    var city = [];

    var APIKey = "3faa5d1f7e1b0157f518296126002213";

    $("#submit").on("click", function (event) {
        event.preventDefault();
        searchedCities();

        function searchedCities() {
            if (searchedCitiesArray.length !== 0) {
                listCities.html("");
            }
            for (var i = 0; i < searchedCitiesArray.length; i++) {
                city = searchedCitiesArray[i];

                searchList.attr("class", "list-cities").text(city[i]);
                listCities.append(searchList);
            }
        };

        city = $("#city-input").val();


        if (city !== "") {
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" + "&appid=" + APIKey,
                method: "GET"
            }).then(function (response) {
                // Pull through weather attributes from API
                console.log(response);
                currentTemp = Math.floor(response.main.temp);
                tempMax = Math.floor(response.main.temp_max);
                tempMin = Math.floor(response.main.temp_min);
                weatherIcon = response.weather[0].icon;
                currentHumidity = response.main.humidity;
                currentWindSpeed = response.wind.speed;
                cityLat = response.coord.lat;
                cityLon = response.coord.lon;

                // Assign classes and attributes to tags to append afterwards
                currentWeatherDiv.attr('class', 'display-current-ul');
                dateDiv.attr('class', 'display date');
                weatherHeading.attr('class', 'display-current-weather').text(city + " " + "|" + currentDate);
                weatherIconDiv.attr('src', "http://openweathermap.org/img/w/" + weatherIcon + ".png");
                tempDiv.attr('class', 'display current temp').text("Current temperature: " + currentTemp + "°");
                minTemp.attr('class', 'display min temp').text("Minimum temperature: " + tempMin + "°");
                maxTemp.attr('class', 'display max temp').text("Maximum temperature: " + tempMax + "°");
                humidityDiv.attr('class', 'display current humidity').text("Humidity: " + currentHumidity + "%");
                windSpeedDiv.attr('class', 'display current wind speed').text("Wind Speed: " + currentWindSpeed + "kmph");

                // Append weather data to respective div tags
                currentWeather.append(currentWeatherDiv);
                currentWeatherDiv.append(dateDiv);
                currentWeatherDiv.append(weatherHeading);
                currentWeatherDiv.append(weatherIconDiv);
                currentWeatherDiv.append(tempDiv);
                currentWeatherDiv.append(minTemp);
                currentWeatherDiv.append(maxTemp);
                currentWeatherDiv.append(humidityDiv);
                currentWeatherDiv.append(windSpeedDiv);

                // Retrieve UV Index
                $.ajax({
                    url: "https://api.openweathermap.org/data/2.5/uvi/forecast?appid=" + APIKey + "&lat="
                        + cityLat + "&lon=" + cityLon,
                    method: "GET"
                }).then(function (response) {
                    console.log(response);
                    uvIndex = response[0].value;

                    // Change colour of UV index according to level of severity
                    if ((uvIndex) <= 2) {
                        uvIndexDiv.attr('class', 'display-UV-index').text("UV Index: " + uvIndex + " (Favourable)").css('color', 'green', 'font-weight', 'bolder');
                        currentWeatherDiv.append(uvIndexDiv);
                    } else if ((uvIndex) >= 2 && (uvIndex) <= 5) {
                        uvIndexDiv.attr('class', 'display-UV-index').text("UV Index: " + uvIndex + " (Moderate)").css('color', 'sandybrown');
                        currentWeatherDiv.append(uvIndexDiv);
                    } else if ((uvIndex) >= 5 && (uvIndex) <= 7) {
                        uvIndexDiv.attr('class', 'display-UV-index').text("UV Index: " + uvIndex + " (High)").css('color', 'orange');
                        currentWeatherDiv.append(uvIndexDiv);
                    } else if ((uvIndex) >= 7 && (uvIndex) <= 10) {
                        uvIndexDiv.attr('class', 'display-UV-index').text("UV Index: " + uvIndex + " (Severe)").css('color', 'red');
                        currentWeatherDiv.append(uvIndexDiv);
                    } else if ((uvIndex) > 10) {
                        uvIndexDiv.attr('class', 'display-UV-index').text("UV Index: " + uvIndex + " (Extreme)").css('color', 'maroon');
                        currentWeatherDiv.append(uvIndexDiv);
                    }
                })
        

            })
            // Call 5 day forecast
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&appid=" + APIKey,
                method: "GET"
            }).then(function (response) {
                console.log(response.list.slice(0, 5));

            })
            
            

        }
    })

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
    };

    function locallyStoredCities() {
        // Stringify and set "cities" key in localStorage to searchedCitiesArray
        localStorage.setItem("city", JSON.stringify(searchedCitiesArray));
    }


    clearCities.on("click", function (event) {
        clearSearchHistory();
        listCities = ("");
    });


})

