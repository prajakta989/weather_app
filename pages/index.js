import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";
import Weatherdata from "../components/Weatherdata";

export default function Home(props) {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [temp, setTemp] = useState("");
  const [weather, setWeather] = useState("");
  const [img, setImg] = useState("");

  useEffect(() => {
    setCity(props.city);
    setCountry(props.country);
    setTemp(props.temp);
    setWeather(props.weather);
    setImg(props.img);
  }, [props]);

  
  return (
    <div>
      <div className="app">
        <div className="main">
          {!city ? (
            ""
          ) : (
            <Weatherdata
              city={city}
              country={country}
              temp={Math.round(temp)}
              img={`https:${img}`}
              text={weather}
            />
          )}
        </div>
      </div>
    </div>
    //
  );
}

export const getServerSideProps = async () => {
  
  const options = {
    method: "GET",
    url: "https://weatherapi-com.p.rapidapi.com/current.json",
    params: { q: "Ponda" },
    headers: {
      "X-RapidAPI-Key": `${process.env.apiKey}`,
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  const data = await axios.request(options);
  
  return {
    props: {
      city: data.data.location.name,
      country: data.data.location.country,
      state: data.data.location.region,
      temp: data.data.current.temp_c,
      weather: data.data.current.condition.text,
      img: data.data.current.condition.icon,
      showSearchBtn:false
    },
  };
};
