import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import SpinWheel from '../../components/Spinwheel/Spinwheel'

const Home = () => {

  const [category,setCategory] = useState("All")
  const foodOptions = [
    "Pizza",
    "Burger",
    "Pasta",
    "Salad",
    "Ice Cream",
    "Sushi",
    "Tacos",
    "Sandwich"
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
