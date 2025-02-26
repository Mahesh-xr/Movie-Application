import React from 'react'

const TrendinMoviesCard = ({trendingMovie}) => {
  return<section className="trending">
    <h2>Trending</h2>
    <ul>
      {trendingMovie.map((movie, index) => 
        <li key={index}>
          <p>
            {index+1}
          </p>
          <img src={movie.poster_url} alt={movie.title} />{" "}
        </li>
      )}
    </ul>
  </section>
}

export default TrendinMoviesCard;
