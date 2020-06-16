var APIKey = "3faa5d1f7e1b0157f518296126002213";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Melbourne,Victoria,Australia&appid=" + APIKey;

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
  })