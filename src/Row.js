import React from 'react'
import { useState, useEffect } from 'react'
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'
import axios from './axios'

import './Row.css'
const base_URL = "https://image.tmdb.org/t/p/original/"
function Row({ title, fetchUrl, isLargeRow}) {
  const  [ movies, setMovies] = useState([])
  const [trailerUrl, settrailerUrl] = useState("");

  useEffect(() => {
    // if [], run once whem the row loads, and dont run again
    async function fetchData() {
       const request = await axios.get(fetchUrl)
       setMovies(request.data.results)
      //  console.log(request.data.results);
       return request
    }
    fetchData()
  }, [fetchUrl]);
  // console.table(movies);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick =  (movie) => {
    if(trailerUrl) {
      settrailerUrl('')
    } else {
      movieTrailer( movie?.name || movie?.title || movie?.original_title || "", null ,{ tmdbId: movie.id })
      .then((url)=>{
        console.log("url is "+url);
        const urlParams=new URLSearchParams(new URL(url).search);
        console.log("urlParamsn"+urlParams);
        settrailerUrl(urlParams.get("v"));
      })
      .catch((error)=> console.log(error));
}
}
  
  return (
    <div>
    {/* title */}
      <div className="row">
         <h2>{title}</h2>
         <div className="row__posters">
            {/* serveral row__poster(s) */}
            {movies.map(movie =>(
              <img 
              key={movie.id}
              onClick={ ()=> handleClick(movie)}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`} 
              src={`${base_URL}${isLargeRow ? movie.poster_path: movie.backdrop_path}`}
               alt={movie.name} />
            ))}
         </div>
    { trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/> }
      </div>

    {/* contaier-> poster */}
    
    </div>
  )
}

export default Row