import React, { useState } from "react";
import axios from "axios";
import Weatherdata from "./Weatherdata";

const Cities = () => {
  const [search, setSearch] = useState("");
  const [errors, setError] = useState(false);

  const [weather, setWeather] = useState({});
  console.log(search);
  const searchData = (evt) => {
    // console.log(evt);
    if (evt.key === "Enter") {
      console.log("enter pressed");
      const options = {
        method: "GET",
        url: "https://weatherapi-com.p.rapidapi.com/current.json",
        params: { q: `${search}` },
        headers: {
          "X-RapidAPI-Key": `${process.env.apiKey}`,
          "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        },
      };
      axios
        .request(options)
        .then(function (response) {
          console.log(response);
          const { data } = response;
          // console.log("data:",data);

          // const region = data.location.region;
          // const temprature = data.current.temp_c;
          // const condition = data.current.condition.text;
          // const image = data.current.condition.icon;
          setWeather(data);
          setSearch("");
          setError(false);
        })
        .catch(function (error) {
          console.error(error);
          setError(true);
          setWeather("");
        });
    }
  };

  console.log("weather", weather);

  // let country = weather.location.region;
  // let temp = weather.current.temp_c;
  // let img = weather.current.condition.icon;
  // let text = weather.current.condition.text;

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
      <div className="app">
        <div className="main">
          <div className="search-box">
            <input
              type="text"
              className="searchbar"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              onKeyDown={(e) => searchData(e)}
            />
            {errors && (
              <div className="error">
                <span>
                  <p>Could not fetch the results</p>
                </span>
              </div>
            )}
          </div>

          {typeof weather.location != "undefined" ? (
            <div>
              <Weatherdata
                city={weather.location.name}
                country={weather.location.region}
                date={dateBuilder(new Date())}
                temp={Math.round(weather.current.temp_c)}
                img={`https:${weather.current.condition.icon}`}
                text={weather.current.condition.text}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Cities;
