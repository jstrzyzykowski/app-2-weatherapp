import React from 'react';
import WeatherCards from '../components/WeatherCards';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="home__container">
        <div className="home__header">
          <h2>Lorem ipsum dolor sit</h2>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi autem vitae velit adipisci magni nisi.</p>
        </div>
        <div className="home__weather-cards">
          <WeatherCards/>
        </div>
      </div>
    </div>
  );
}

export default Home;