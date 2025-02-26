import React from "react";
import { useState, useEffect } from "react";
import { useDebounce } from "react-use";
import Search from "./Components/Search";
import Spinner from "./Components/Spinner";
import MovieCard from "./Components/MovieCard";
import TrendinMoviesCard from "./Components/TrendinMoviesCard";
import { updatedSearchCount, getTrendingmovies } from "./AppWrite";
import axios from "axios";

import "./App.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // Replace with your TMDB API key
const BASE_URL = "https://api.themoviedb.org/3";

const App = () => {
  const [searchItem, setSearch] = useState("");
  const [allMovies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchItem, setDebouncedSearchItem] = useState("");
  const [trendingMovie, setTrendingMovies] = useState([]);

  useDebounce(() => setDebouncedSearchItem(searchItem), 500, [searchItem]);

  // configuration for fetching the data
  const config = {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  };
  // function which fetches the  Top Movie Details from the API
  const getMovie = async (movieToSearch) => {
    setErrorMessage("");
    setIsLoading(true);

    try {
      const endpoint = movieToSearch
        ? `${BASE_URL}/search/movie?query=${encodeURIComponent(
            debouncedSearchItem
          )}`
        : `${BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await axios.get(endpoint, config);
      const result = response.data.results;

      // Handle API-specific errors
      if (result.Response === "False") {
        console.log("ERROR");
        setErrorMessage(result.Error || "Failed to fetch Movies");
        setMovies([]);
        return;
      }
      if (response.status !== 200) {
        throw new Error("Failed to fetch");
      }
      setMovies(result);
      if (movieToSearch && result.length > 0) {
        await updatedSearchCount(debouncedSearchItem, result[0]);
      }
    } catch (error) {
      console.log("Error while fetching:", error.message);
      setErrorMessage("Error While Fetching The Movies. Please Try Again...");
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movie = await getTrendingmovies()
      console.log(movie)

      setTrendingMovies(movie);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovie(debouncedSearchItem);
  }, [debouncedSearchItem]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  useEffect(() => {
    console.log(trendingMovie);
  }, [trendingMovie]);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="hero banner" />
          <h1 className="">
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without Hassel
          </h1>
          <Search searchItem={searchItem} setSearchItem={setSearch} />
        </header>
        { trendingMovie.length> 0 && <TrendinMoviesCard  trendingMovie={trendingMovie} />}

        <section className="all-movies">
          <h2>All Movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {allMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
