<?php

class weatherApp{
    private $api;
    public function __construct(weatherApi $api){
        $this->api = $api;
    }
    
    public function showWeather($city){
      $weather = $this->api->getWeather($city);
    if(empty($weather) || isset($weather['cod']) && $weather['cod'] != 200){
        echo "<p>City not found. Please try again.</p>";
        return;
    }

    $cityName = htmlspecialchars($weather['name']);
    $temp = htmlspecialchars($weather['main']['temp']);
    $condition = htmlspecialchars($weather['weather'][0]['description']);

    echo "<h2>Weather in $cityName</h2>";
    echo "<p>Temperature: $temp °C</p>";
    echo "<p>Condition: $condition</p>";
}
    
}
?>