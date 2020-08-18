var day1 = moment().calendar();  
var day2 = moment().add(1, 'days').calendar();
var day3 = moment().add(2, 'days').calendar();
var day4 = moment().add(3, 'days').calendar();
var day5 = moment().add(4, 'days').calendar();


$(document).ready(function() {
    console.log("ready")
    
    $("button").on("click", function(event) {
        event.preventDefault();
        var location = $("#search").val(); 
        var locationList = []; 

        locationList = JSON.parse(localStorage.getItem("locationList")) || [];
        locationList.push(location);
        localStorage.setItem("locationList", JSON.stringify(locationList));
    
    getForecast(location);
});

function getForecast(location) {
 
    $("#dailyForecast").empty();
    $("#fiveDayForecast").empty();
    $("#day1").empty();
    $("#day2").empty();
    $("#day3").empty();
    $("#day4").empty();
    $("#day5").empty();

    var daily ="https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=2578c302717c0f0c5906c71e6983eae6";
        console.log("Daily", daily);  


    $.ajax({
        url: daily,
        method: "GET",
    }).then(function(response) {
      
        
    var iconLink = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
    var latitude = response.coord.lat; 
    var longitude = response.coord.lon; 

    $("#dailyForecast").append(
        "<div class='col'>"
        +  "<h2 class='daily'>" + response.name + " (" + day1 + ")" + "&nbsp" + "<img src='" + iconLink  + "'>" + "</h2>"
        +  "<ul class='daily'>" + "Today's temperature is " +  response.main.temp + " °F." + "</ul>"
        +  "<ul class='daily'>" + "Today's humidity is " + response.main.humidity + "%." + "</ul>"
        +  "<ul class='daily'>" + "Today's wind speed is " +  response.wind.speed + " MPH." + "</ul>"
        + "</div>"
    ); 

    var fiveDay = "https://api.openweathermap.org/data/2.5/onecall?" + "lat=" + lat + "&lon=" + lon + "&appid=2578c302717c0f0c5906c71e6983eae6";  
        console.log("fiveDay", fiveDay);

    $.ajax({
        url: fiveDay,
        method: "GET",
    }).then(function(response) {
              
    
    var iconLink1 = "http://openweathermap.org/img/w/" + response.daily[0].weather[0].icon + ".png";
    var iconLink2 = "http://openweathermap.org/img/w/" + response.daily[1].weather[0].icon + ".png";
    var iconLink3 = "http://openweathermap.org/img/w/" + response.daily[2].weather[0].icon + ".png";
    var iconLink4 = "http://openweathermap.org/img/w/" + response.daily[3].weather[0].icon + ".png";
    var iconLink5 = "http://openweathermap.org/img/w/" + response.daily[4].weather[0].icon + ".png";
    
    })
})
}
});
