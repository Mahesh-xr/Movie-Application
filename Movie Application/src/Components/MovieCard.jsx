import React from 'react'

const MovieCard = ({movie:{title, poster_path,original_language,release_date,vote_average,}}) => {
  return (
    <div className='movie-card'>
        <img src={poster_path? `https://image.tmdb.org/t/p/w500/${poster_path}`:'/no-movie.png'} alt={title} />
        {/* <p className="text-white">{title}</p> */}
        <h3 className='mt-4'>{title}</h3>
        <div className="content">
            <div className="rating">
                <img src="star.svg" alt="star" />
               <p> {vote_average&&vote_average.toFixed(1)}</p>
            </div>
            
                <span>•</span>
                <p className='lang'>{original_language?original_language:"NA"}</p>
                <span>•</span>
            
        </div>

    </div>
  )
}

export default MovieCard
