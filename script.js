
var currentDay = moment().format('M/DD/YYYY');
var day1 = moment().add(1, 'days').format('M/DD/YYYY');
var day2 = moment().add(2, 'days').format('M/DD/YYYY');
var day3 = moment().add(3, 'days').format('M/DD/YYYY');
var day4 = moment().add(4, 'days').format('M/DD/YYYY');
var day5 = moment().add(5, 'days').format('M/DD/YYYY');


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

    var daily ="https://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=imperial&appid=2578c302717c0f0c5906c71e6983eae6";
        console.log("Daily", daily);  


    $.ajax({
        url: daily,
        method: "GET",
    }).then(function(response) {
        console.log(response)
      
        
    var iconLink = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
    var latitude = response.coord.lat; 
    var longitude = response.coord.lon; 

    $("#dailyForecast").append(
        "<div class='col'>"
        + "<h5>" + "Daily Forecast" + "</h5>"
        +  "<h2 class='daily'>" + response.name + " (" + currentDay + ")" + "&nbsp" + "<img src='" + iconLink  + "'>" + "</h2>"
        +  "<ul class='daily'>" + "Today's temperature is " +  response.main.temp + " °F." + "</ul>"
        +  "<ul class='daily'>" + "Today's humidity is " + response.main.humidity + "%." + "</ul>"
        +  "<ul class='daily'>" + "Today's wind speed is " +  response.wind.speed + " MPH." + "</ul>"
        + "</div>"
    ); 

    var fiveDay = "https://api.openweathermap.org/data/2.5/onecall?" + "lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=2578c302717c0f0c5906c71e6983eae6";  
        console.log("fiveDay", fiveDay);

    $.ajax({
        url: fiveDay,
        method: "GET",
    }).then(function(response) {
        console.log(response)

    var iconLink1 = "http://openweathermap.org/img/w/" + response.daily[0].weather[0].icon + ".png";
    var iconLink2 = "http://openweathermap.org/img/w/" + response.daily[1].weather[0].icon + ".png";
    var iconLink3 = "http://openweathermap.org/img/w/" + response.daily[2].weather[0].icon + ".png";
    var iconLink4 = "http://openweathermap.org/img/w/" + response.daily[3].weather[0].icon + ".png";
    var iconLink5 = "http://openweathermap.org/img/w/" + response.daily[4].weather[0].icon + ".png";
       
    $("#dailyForecast").append(
            "<div class='col'>"
           + "<ul class='daily' id='uvIndex'>" + "Today's UV index is " +  response.current.uvi + "." + "</ul>"
           + "</div>"
           );

           if (response.current.uvi <= 5) {
            $("#uvIndex").addClass("green");
           } else if (response.current.uvi <= 10) {
             $("#uvIndex").addClass("yellow");
           } else if (response.current.uvi <= 40) {
               $("#uvIndex").addClass("red");
           };
    
    
    $("#fiveDayForecast").append(
         "<h5>" + "5-Day Forecast" + "</h5>" 
      );

    $("#fiveDayForecast").append(
        "<div id= 'day1' class='card'>"
        +  "<div class='card-header'>" + day1 +"</div>"
        +  "<div class='card-text'>" + "<img src='" + iconLink1 + "'>" +"</div>"
        +  "<div class='card-text'>" + "Temperature:" + response.daily[0].temp.day + " °F" + "</div>"
        +  "<div class='card-text'>" + "Humidity: " + response.daily[0].humidity + "%" + "</div>" 
        + "</div>" 
       ); 

    $("#fiveDayForecast").append(
        "<div id= 'day2' class='card'>"
        +  "<div class='card-header'>" + day2 +"</div>"
        +  "<div class='card-text'>" + "<img src='" + iconLink2 + "'>" +"</div>"
        +  "<div class='card-text'>" + "Temperature:" + response.daily[1].temp.day + " °F" + "</div>"
        +  "<div class='card-text'>" + "Humidity: " + response.daily[1].humidity + "%" + "</div>" 
        + "</div>" 
       ); 

    $("#fiveDayForecast").append(
        "<div id= 'day3' class='card'>"
        +  "<div class='card-header'>" + day3 +"</div>"
        +  "<div class='card-text'>" + "<img src='" + iconLink3 + "'>" +"</div>"
        +  "<div class='card-text'>" + "Temperature:" + response.daily[2].temp.day + " °F" + "</div>"
        +  "<div class='card-text'>" + "Humidity: " + response.daily[2].humidity + "%" + "</div>" 
        + "</div>" 
       ); 

    $("#fiveDayForecast").append(
        "<div id= 'day4' class='card'>"
        +  "<div class='card-header'>" + day4 +"</div>"
        +  "<div class='card-text'>" + "<img src='" + iconLink4 + "'>" +"</div>"
        +  "<div class='card-text'>" + "Temperature:" + response.daily[5].temp.day + " °F" + "</div>"
        +  "<div class='card-text'>" + "Humidity: " + response.daily[5].humidity + "%" + "</div>" 
        + "</div>" 
       ); 

    $("#fiveDayForecast").append(
        "<div id= 'day5' class='card'>"
        +  "<div class='card-header'>" + day5 +"</div>"
        +  "<div class='card-text'>" + "<img src='" + iconLink5 + "'>" +"</div>"
        +  "<div class='card-text'>" + "Temperature:" + response.daily[4].temp.day + " °F" + "</div>"
        +  "<div class='card-text'>" + "Humidity: " + response.daily[4].humidity + "%" + "</div>" 
        + "</div>" 
       ); 
        getLocations();
        })
      })
    }
    function getLocations() {
        $("#locationList").empty();  
        var locationListArray = JSON.parse(localStorage.getItem("locationList")) || [];
        var arrayLength = locationListArray.length; 
      
        for (var i = 0; i < arrayLength; i++) { 
          var locationFromArray = locationListArray[i]; 
      
          $("#locationList").append (
            
            "<div class='list-group'>" + "<button class='list-group-item'>" + locationFromArray  + "</button>")
          }
        }

        getLocations();


    $("#locationList").on("click", ".list-group-item", function(event) {
        event.preventDefault();
        var location = ($(this).text());
        getForecast(location); 
    }) 
              
}); 

