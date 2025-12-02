import React from 'react'
import style from './Home.module.css';
import Categories from '../Categories/Categories';
import HomeProducts from '../HomeProducts/HomeProducts';

export default function Home() {
  return <>
    <Categories/>
    <HomeProducts/>
  </>
}
