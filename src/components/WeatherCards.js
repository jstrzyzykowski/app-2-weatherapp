import React, { useEffect, useState } from 'react';
import '../styles/WeatherCards.css';
import WeatherCard from './WeatherCard';
import { API_DATA } from '../api/config';

const CARD_DATA = {
  width: 320,
}

const WeatherCards = () => {
  const [weatherCards, setWeatherCards] = useState([]);
  const [isCarouselActive, setIsCarouselActive] = useState(false);
  const [xOffset, setXOffset] = useState(0);

  const cards = weatherCards.map((card, index) => {
    return <WeatherCard key={index} data={card} remove={() => {
      handleRemove(index);
    }}/>
  });

  const getWeatherData = (city) => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_DATA.key}&mode=json&units=metric`)
    .then((response) => {
      if(response.ok) {
        return response.json()
      } else {
        throw Error('getCityData went wrong');
      }
    })
    .then((data) => {
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=minutely,hourly,alerts&appid=${API_DATA.key}&mode=json&units=metric`)
      .then((response) => {
        if(response.ok) {
          return response.json()
        } else {
          throw Error('getWeatherData went wrong');
        }
      })
      .then((data) => {
        data.cityName = city;
        setWeatherCards([...weatherCards, data]);
      })
      .catch((error) => {
        console.log("Error: ", error.message);
      })
    })
    .catch((error) => {
      console.log("Error: ", error.message);
    })
  }

  const handleClick = (event) => {
    let city = prompt('Enter city name', 'New York');
    if(city !== null) getWeatherData(city);
  }

  const handleClickControllerLeft = () => {
    if(isCarouselActive) {
      if(xOffset < 0) setXOffset(xOffset + CARD_DATA.width);
    }
  }

  const handleClickControllerRight = () => {
    if(isCarouselActive) {
      const hiddenCardsNumber = weatherCards.length - 2;
      console.log(hiddenCardsNumber);
      if(xOffset > -hiddenCardsNumber * CARD_DATA.width) {
        setXOffset(xOffset - CARD_DATA.width);
      }
    }
  }

  const handleRemove = (cardIndex) => {
    const weatherCardsCopy = [...weatherCards];
    const newArray = weatherCardsCopy.filter(card => weatherCardsCopy.indexOf(card) !== cardIndex);
    setWeatherCards(newArray);
    if(xOffset < 0) setXOffset(xOffset + CARD_DATA.width);
  }

  useEffect(() => {
    if(weatherCards.length > 2) setIsCarouselActive(true);
    else {
      setIsCarouselActive(false);
      setXOffset(0);
    };
  }, [weatherCards]);

  return (
    <>
    <div className="weatherCards" style={{
      left: `${xOffset}px`
    }}>
      <div className="weatherCards__card system">
        <h3>Add City</h3>
        <i className="fas fa-plus-circle" onClick={handleClick}></i>
      </div>
      {cards}
    </div>
    <div className="controllers">
      <div className={`controller-left ${isCarouselActive ? 'active' : ''}`} onClick={handleClickControllerLeft}>
        <i className="fas fa-caret-left"></i>
      </div>
      <div className={`controller-right ${isCarouselActive ? 'active' : ''}`} onClick={handleClickControllerRight}>
        <i className="fas fa-caret-right"></i>
      </div>
    </div>
    </>
  );
}

export default WeatherCards;