import React from 'react'
import axios from './axios'
import {useEffect, useState} from 'react'
import requests from './requests';
import './Banner.css'
function Banner() {
    const [movie, setMovie] = useState([]);
    useEffect(() => {
            async function fethData() {
                const request  = await axios.get(requests.fetchNetflixOriginals)
                setMovie(request.data.results[Math.floor(Math.random() *request.data.results.length -1)]
                )
                // []--> Math.floor(Math.random() *request.data.results.length -1)
                
                return request
            }
            fethData()
 
    }, []);
    console.log(movie);

    const truncate = (str, n) => {
		return str?.length > n ? str.substr(0, n - 1) + "..." : str;
	};
  return (
     <header className="banner"
      style={{backgroundSize: "cover",
             backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
             backgroundPosition: "top center"
     }}>
        <div className="banner__contents">
            <h1 className='banner__title'>
                {movie?.title || movie?.name || movie?.original_name}
            </h1>
            <div className="banner__buttons">
            <button className="banner__button">Play</button>
            <button className="banner__button">My List</button>
            </div>
            {/* description */}
            <h1 className="banner__description">
                {truncate(movie?.overview, 150)}
            </h1>

        </div>
        <div className="banner--fadeButton"></div>
     </header>

  )
}

export default Banner