import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const Navbar = () => {
  const [today, setToday] = useState(new Date());

  const getDay = () => weekdays[today.getDay()];
  const getOrdinalNumber = () => {
    const dayOfMonth = today.getDate();
    return `${dayOfMonth}${["st","nd","rd"][((dayOfMonth+90)%100-10)%10-1]||"th"}`;
  }
  const getMonth = () => months[today.getMonth()]


  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__logo">
          <i className="fas fa-meteor"></i>
          <p className="navbar__title">
            <span className="text-extra-bold">Meteor</span>
            ology 
          </p>
        </Link>
        <div className="navbar__date">
          <i className="far fa-calendar-alt"></i>
          <span className="text-bold">{getDay()}</span>, {getOrdinalNumber()} {getMonth()}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;