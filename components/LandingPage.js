import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Cities from "./Cities";
import Weatherdata from "./Weatherdata";

const LandingPage = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [temp, setTemp] = useState("");
  const [weather, setWeather] = useState("");
  const [img, setImg] = useState("");

  const options = {
    method: "GET",
    url: "https://weatherapi-com.p.rapidapi.com/current.json",
    params: { q: "Ponda" },
    headers: {
      "X-RapidAPI-Key": `${process.env.apiKey}`,
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      const { data } = response;
      console.log(data);
      const location = data.location.name;
      const region = data.location.region;
      const temprature = data.current.temp_c;
      const condition = data.current.condition.text;
      const image = data.current.condition.icon;
      setCity(location);
      setCountry(region);
      setTemp(temprature);
      setWeather(condition);
      setImg(image);
    })
    .catch(function (error) {
      console.error(error);
    });
  console.log(city);

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

  // const handleClick = (e, path) => {

  // }
  return (
    <div className="app">
      <div className="main">
        {!city ? (
          ""
        ) : (
          <Weatherdata
            city={city}
            country={country}
            date={dateBuilder(new Date())}
            temp={Math.round(temp)}
            img={`https:${img}`}
            text={weather}
          />
        )}
      </div>
    </div>
  );
};

export default LandingPage;
