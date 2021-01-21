var searchHistory = [];

    var time = moment().subtract(10, 'days').calendar();
    console.log(time.toString());
    $("#current-weather").text(time.toString());

function displayCity(event) {
    event.preventDefault();
    $("#current-weather").empty();
    $("#5dayForecast").empty();
    $("#5dayForecastTitle").empty();
    var city = $("#add-city").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=add980b0e4dcc7dac5f789a39df8c020";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        searchHistory.push(city);
        
        
        //Array.includes
        console.log("displayWeather()");
        console.log(response)
        $("#current-weather").append("<h1>" + response.name + "</h1>");
        // displayTime()
        renderResult(response);
        renderUV(response.coord.lat, response.coord.lon);
        weatherForecast(city);
        createHistory();
    })
}





function callFormHistory() {
    $("#current-weather").empty();
    $("#dayForecast").empty();
    $("#5dayForecastTitle").empty();
    var city = $(this).text();
    $("#add-city").val(city);
    console.log(city);
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=add980b0e4dcc7dac5f789a39df8c020";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log("displayWeather()");
        $("#current-weather").append("<h1>" + response.name + "</h1>");
        // displayTime()
        renderResult(response);
        renderUV(response.coord.lat, response.coord.lon);
        weatherForecast(city);
    })
}

function displayTime() {
    var time = moment().subtract(10, 'days').calendar();
    console.log(time.toString());
    $("#current-weather").text(time.toString());
}

function createHistory() {
    $("#location-holder").empty()
    console.log("searchHistory" + searchHistory[0]);
    for (var i = 0; i < searchHistory.length; i++) {
        var a = $("<button>");
        a.on("click", callFormHistory);
        a.text(searchHistory[i]);
        
        $("#location-holder").append(a);
    }
}

function renderResult(data) {
    $("#current-weather").append(
        "<p><strong> Temperature:</strong>"+"  " + data.main.temp + "</p>" +
        "<p><strong>Humidity:</strong>"+"  "  + data.main.humidity + "</p>" +
        "<p><strong>"+"Wind Speed:"+"</strong>" + data.wind.speed + "</p>"

    );
}

// high (6-7); very high (8-10); extreme (11 and ...
function renderUV(lat, lon) {
    var queryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=add980b0e4dcc7dac5f789a39df8c020";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);
        $("#current-weather").append("<p><strong> UV Index:</strong> <span Id = 'uv'>" + response.value + "</span></p>");
        if (parseInt(response.value) <= 5) {
            $("#uv").css("backgroundColor", "green");
        }
        else if (parseInt(response.value) <= 10) {
            $("#uv").css("backgroundColor", "yellow");
        }
        else {
            $("#uv").css("backgroundColor", "red");
        }

    })
}

function weatherForecast(city) {
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=add980b0e4dcc7dac5f789a39df8c020";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $("#5dayForecastTitle").append("<h2>" + "5 Day Forecast" + "</h2>" + "<br>");
        for (var i = 0; i < response.list.length; i += 8) {
            var col = $("<div class = 'col-lg-4 col-sm-6'>");

                // style='width: 25rem; margin:5px'
            var div = $("<div class='card' >");
            var date = filter(response.list[i].dt_txt);
            console.log(date);
            div.append("<p >"+"<strong>Date:</strong>" + "<br>"+date + "</p>");
            div.append("<p>" + "<strong>Temperture:</strong>"+"<br>"+response.list[i].main.temp + "</p>");
            div.append("<p>" + "<strong>Humidity:</strong>"+"<br>"+response.list[i].main.humidity + "</p>");
            col.append(div)

            $("#dayForecast").append(col);
        }
    })
}

function filter(date) {
    var returnDate = "";
    for (var i = 0; i < date.length; i++) {
        if (date[i] === " ") {
            return returnDate;;
        } else {
            returnDate = returnDate + date[i];
        }
    }
}

$("#search").on("click", displayCity);




