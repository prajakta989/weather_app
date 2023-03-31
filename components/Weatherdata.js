import React from "react";
import Link from "next/link";
import Image from 'next/image'

const Weatherdata = ({ city, country, date, temp, img, text, showSearchBtn}) => {
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  return (
    <div>
      <div className="location-box">
        <div className="location">
          {city}, {country}
        </div>
        <div className="date">{dateBuilder(new Date())}</div>
      </div>
      <div className="weather-box">
        <div className="temp">{temp}&#x2103;</div>
        <div>
          {/* <img src={img} /> */}
          <Image
          src={img}
          alt="weather-image"
          height={100}
          width={100}
          />
        </div>
        <div className="weather">{text}</div>
        {
          showSearchBtn?  "": <Link href="./cities">
          <button className="search-btn">Search a City</button>
        </Link>
        }

      </div>
    </div>
  );
};

export default Weatherdata;
