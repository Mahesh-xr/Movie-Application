import { useState } from "react";
import Search from "./Components/Search";

import "./App.css";

import React from "react";

const App = () => {
  const[searchItem,setSearch]=useState('hi sample test')
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
          <Search searchItem={searchItem} setSearchItem = {setSearch}/>
        </header>
      </div>
    </main>
  );
};

export default App;
