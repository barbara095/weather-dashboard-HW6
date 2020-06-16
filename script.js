$("#city-input").on("click", function (event) {
    event.preventDefault();

    var APIKey = "3faa5d1f7e1b0157f518296126002213";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Melbourne,Victoria,Australia&appid=" + APIKey;

    var cityInput = $("#city-input").val().trim();

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        $("city-view").text(JSON.stringify(response));

        var cityDiv = $("<div class='city'>");
        cityDiv = cityInput;
    })

})