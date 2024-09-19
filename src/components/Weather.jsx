import React, { useEffect, useRef, useState } from 'react'
import './weather.css'
import search_icon from '../assets/search.png'
import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'
import drizzle from '../assets/drizzle.png'
import humidity from '../assets/humidity.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import wind from '../assets/wind.png'

const Weather = () => {
  const [city, setCity] = useState("delhi");
  const [weatherData, setWeatherData] = useState({});
  const inputel =useRef("");

  const allIcons = {
    "01d": clear,
    "01n":clear,
    "02d":cloud,
    "02n":cloud,
    "03d":cloud,
    "03n":cloud,
    "04d":drizzle,
    "04n":drizzle,
    "09d":rain,
    "09n":rain,
    "10d":rain,
    "10n":rain,
    "13d":snow,
    "13n":snow,
  }

  const handlechange = () => {
    setCity(inputel.current.value);
  }


  const search = async (city) => {
    if(city === ""){
      alert("Enter city name")
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
      const response = await fetch(url);
      const da = await response.json();
      setWeatherData({
        "humid":da.main.humidity,
        "temparature":parseFloat(da.main.temp.toFixed(0)),
        "windspeed":da.wind.speed,
        "icon":da.weather[0].icon,
      });
      
    } catch (error) {
      setWeatherData(false);
      console.log(error);
    }
  }

  useEffect(() => {
    search(city);
  }, [city])

  const icon = allIcons[weatherData.icon] || clear;


  return (
    <div className='weather'>
      <div className='search-bar'>
        <input ref={inputel} type='text' placeholder='search'></input>
        <img onClick={handlechange} src={search_icon} alt='search_icon'></img>
      </div>
      {weatherData?<>
        <img src={icon} alt='clear-icon' className='weather-icon' />
      <p className='temparature'>{weatherData.temparature}°C</p>
      <p className='location' >{city}</p>
      <div className='weather-data'>
        <div className='col'>
          <img src={humidity} alt='humidity'></img>
          <div>
            <p> {weatherData.humid}%</p>
            <span>humidity</span>
          </div>
        </div>
        <div className='col'>
          <img src={wind} alt='wind'></img>
          <div>
            <p> {weatherData.windspeed}km/hr</p>
            <span>wind speed</span>
          </div>
        </div>
      </div>
      </>:<></>}
     
    </div>
  )
}

export default Weather