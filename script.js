$(document).ready(function () {
    // HTML variables

    var currentDate = moment().format("dddd, MMMM Do");
    var listCities = $("#show-cities");

    var currentWeather = $(".current-forecast");
    var futureWeather = $(".future-forecast");
    var dateDiv = $("<div>");
    var weatherHeading = $("<h1>");
    var tempDiv = $("<div>");
    var humidityDiv = $("<div>");
    var windSpeedDiv = $("<div>");
    var uvIndexDiv = $("<div>");
    var clearCities = $("#clear-cities");

    // Array Variables

    var searchedCitiesArray = [];
    var citySearch = [];

    var APIKey = "3faa5d1f7e1b0157f518296126002213";


    $("#submit").on("click", function (event) {
        event.preventDefault();
        
        var city = $("#city-input").val();

        if (city !== "") {
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" + "&appid=" + APIKey,
                method: "GET"
            }).then(function (response) {
                // Pull through weather attributes from API
                console.log(response);
                currentTemp = Math.floor(response.main.temp);
                weatherIcon = response.weather.icon;
                currentHumidity = response.main.humidity;
                currentWindSpeed = response.wind.speed;

                currentWeather.attr('class', 'display-current');
                dateDiv.attr('class', 'display date');
                weatherHeading.attr("Forecast for: " + citySearch + "" + currentDate);
                tempDiv.attr('class', 'display current temp').text("Current temperature: " + currentTemp + "&#8451");
                humidityDiv.attr('class', 'display current humidity').text("Humidity: " + currentHumidity + "%");
                windSpeedDiv.attr('class', 'display current wind speed').text("Wind Speed: " + currentWindSpeed + "KMPH");
                
                // Append weather data to respective div tags
                

            })
        }
    init();

    function searchedCities() {
        if (searchedCitiesArray.length !== 0) {
            listCities.html("");
        }
        for (var i = 0; i < searchedCitiesArray.length; i++) {
            citySearch = searchedCitiesArray[i];

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

        locallyStoredCities();
        searchedCities();

    });


    clearCities.on("click", function (event) {
        event.preventDefault();
        clearSearchHistory();
        citySearch = ("");

    });
});
