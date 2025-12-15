import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import SpinWheel from '../../components/Spinwheel/Spinwheel'

const Home = () => {

  const [category,setCategory] = useState("All")
  const foodOptions = [
    "Noodles",
    "Pasta",
    "Salad",
    "Ice Cream",
    "Sandwich",
    "Rolls",
    "Desserts",
    "Cake",
    "Pure Veg",
  ];
  return (
    <>
      <Header/>
      <ExploreMenu setCategory={setCategory} category={category}/>
      <SpinWheel options={foodOptions}/>
      <FoodDisplay category={category}/>
      <AppDownload/>
    </>
  )
}

export default Home
