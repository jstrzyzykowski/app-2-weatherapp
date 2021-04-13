import React, { useEffect, useState } from 'react';
import '../styles/WeatherCard.css';


const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
];

const WeatherCard = ({data, id, remove : handleClick}) => {
  const {current, daily, cityName} = data;

  const nextDays = daily.map((dayData, index) => {
    if(index > 0 && index <= 4) {
      const date = new Date(dayData.dt * 1000);
      return (
        <div className="weatherCard__day">
          <p className="weatherCard__date">
            <span>{months[date.getMonth()]}</span>
            <span className="text-bold">{date.getDate()}</span>
          </p>
          <img style={{ width: '40px' }} src={`http://openweathermap.org/img/wn/${dayData.weather[0].icon}.png`} alt={`${dayData.weather[0].description} icon`}/>
          <p>{(dayData.temp.day).toFixed(1)}&#176;C</p>
        </div>
      );
    }
  });

  return (
    <div className="weatherCard" data-id={id}>
      <div className="weatherCard__header">
        <div className="weatherCard__city">
          <i className="fas fa-map-marker-alt"></i>
          <p className="weatherCard__city-name">{cityName}</p>
        </div>
        <i className="fas fa-times" onClick={handleClick}></i>
      </div>
      <div className="weatherCard__wrapper">
        <div className="weatherCard__weather">
          {/* <img src={`http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`} alt=""/> */}
          <div className="weatherCard__weather-desc">
            <p>{current.weather[0].main}</p>
            <p className="weatherCard__temp">{(current.temp).toFixed(1)}&#176;C</p>
          </div>
        </div>
        <div className="weatherCard__future">
          <h3>Next 4 Days</h3>
          <div className="weatherCard__days">
            {nextDays}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;