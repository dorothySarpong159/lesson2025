<?php

class WeatherApi{
    private $baseUrl;
    private $apiKey;

    public function __construct($baseUrl, $apiKey){
        $this->baseUrl = $baseUrl;
        $this->apiKey = $apiKey;
    }
    
     
    private function request($endpoint){
      $url = $this->baseUrl . $endpoint . "&appid=" . $this->apiKey . "&units=metric";
        //initialize cURL
        $ch = curl_init($url);

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);

        if ($response === false){
           curl_close($ch); 
           return null;
        }

        curl_close($ch);
        

        return json_decode($response, true);

    }
    public function getWeather($city) {

        if (empty($city)) {
            return null;
        }

        $endpoint = "weather?q=" . urlencode($city);
        return $this->request($endpoint);
    }
}
        
?>