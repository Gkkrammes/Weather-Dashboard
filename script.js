
$(document).ready(function() {
    console.log("ready")
    
    $("button").on("click", function(event) {
        event.preventDefault();
        var location = $("#search").val(); 
        var locationList = []; 

        cityList = JSON.parse(localStorage.getItem("locationList")) || [];
        locationList.push(location);
        localStorage.setItem("locationList", JSON.stringify(locationList));
    
    });

});