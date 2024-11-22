import React, { useEffect, useState } from 'react';
import { API_KEY,imgUrl } from "../../Constant/constants";
import axios from '../../axios';
import './Banner.css';

function Banner() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        console.log(response.data.results[0]);
        setMovie(response.data.results[5]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Add a check to ensure movie is defined before rendering
  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className='banner'
    style={{backgroundImage: `url(${movie ? imgUrl + movie.backdrop_path : ""})`}}  >
      <div className='content'>
        <h1 className='title'>{movie ? movie.title : "Movie Name"}</h1>
        <div className='banner_buttons'>
          <button className='button'>Play</button>
          <button className='button'>My List</button>
        </div>
        <h1 className='description'>
          {movie.overview || "No description available"}
        </h1>
      </div>
      <div className="fade_bottom"></div>
    </div>
  );
}

export default Banner;
