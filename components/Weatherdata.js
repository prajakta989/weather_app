import React from "react";
import Link from "next/link";
import Image from 'next/image'

const Weatherdata = ({ city, country, date, temp, img, text }) => {
  return (
    <div>
      <div className="location-box">
        <div className="location">
          {city}, {country}
        </div>
        <div className="date">{date}</div>
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
        <Link href="./cities">
          <button className="search-btn">Search a City</button>
        </Link>
      </div>
    </div>
  );
};

export default Weatherdata;
