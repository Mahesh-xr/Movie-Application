import { useState, useEffect, use } from "react";
import Search from "./Components/Search";
import axios from "axios";

import "./App.css";

import React from "react";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // Replace with your TMDB API key
const BASE_URL = "https://api.themoviedb.org/3";

const App = () => {
  const [searchItem, setSearch] = useState("hi sample test");
  const [allMovies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // configuration for fetching the data
  const config = {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  };
  // function which fetches the  Top Movie Details from the API
  const getMovie = async () => {
    setErrorMessage("");
    setIsLoading(true);
    try {
      const endpoint = `${BASE_URL}/discover/movie?sort_by=popularity.desc`;
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
    } catch (error) {
      console.log("Error while fetching:", error.message);
      setErrorMessage("Error While Fetching The Movies. Please Try Again...");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMovie();
  }, []);
  useEffect(() => {
    console.log("Updated Movies:", allMovies);
  }, [allMovies]);

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
        <section className="all-movies">
          <h2>All Movies</h2>
          {isLoading ? (
            <p className="text-white-500">Loading...</p>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {allMovies.map((movie) => (
                <li className="text-white">{movie.title}</li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
