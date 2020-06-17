$(document).ready(function () {
    // HTML variables

    var currentDate = moment().format("dddd, MMMM Do");
    var listCities = $(".list-cities");
    var citySearch = $("#city-input");
    var clearCities = $("#clear-cities");



    // Array Variables

    var searchedCities = [];
    var citiesArray = [];


    $("#submit").on("click", function () {

        renderForecast();
    })

    function renderForecast (){
        event.preventDefault();
        
        $("#show-cities").empty();

        var APIKey = "3faa5d1f7e1b0157f518296126002213";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            $("city-view").text(JSON.stringify(response));

            var cityDiv = $("<div class='city'>");
            cityDiv.push(city);
        })

}

$("#submit").on("click", function(event) {
    event.preventDefault();

    city.push(listCities);


})
})