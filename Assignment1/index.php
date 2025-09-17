
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name = "description" content = "weather Api">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Weather App</title>
	<link rel = "stylesheet" href = "./css/style.css"/>
	
	
</head>
<body>
	
<header>
	<h1> Weather App</h1>
	<p>Get current weather conditions</p>
</header>

<main>
	<section>
		<form method ="post">
		<input type="text" id="city-input" name="city-input" placeholder="Enter city name">
		<button type="submit" name="submit-btn" id="get-weather-btn">Get Weather</button>
	</section>
	
</main>
<?php
require_once "config.php";
require_once "WeatherApi.php";
require_once "WeatherApp.php";

if (isset($_POST['city-input']) && !empty($_POST['city-input'])) {
    
    $city = htmlspecialchars($_POST['city-input']);

$api = new WeatherApi(Weather_BASE_URL, Weather_API_KEY);

$app = new WeatherApp($api);

$app->showWeather($city);
}
?>
<footer>
	<small>&copy; <span id="year">2025</span> API Assignment <a href= "https://openweathermap.org/api">OpenWeather</a></small>
</footer>

</body>
</html>


<?php






