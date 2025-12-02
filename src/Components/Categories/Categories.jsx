import React from 'react'
import style from './Categories.module.css';
import { Link } from 'react-router-dom';
import clothes from './../../assets/clothes.jpg'
import electronics from './../../assets/electronics.jpg'
import furniture from './../../assets/furniture.jpg'
import shoes from './../../assets/shoes.jpg'
import Slider from 'react-slick';
import { GiClothes, GiLinkedRings } from 'react-icons/gi';
import { PiPicnicTableBold } from 'react-icons/pi';
import { BiDevices } from 'react-icons/bi';

export default function Categories() {

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true

  };


  return <>
    <header className='container'>
      <div className="row">
        <div className="col">
          <Slider {...settings}>
            <figure>
              <img src={clothes} className={`${style.images}`} alt="" />
            </figure>
            <figure>
              <img src={electronics} className={`${style.images}`} alt="" />
            </figure>
            <figure>
              <img src={shoes} className={`${style.images}`} alt="" />
            </figure>
            <figure>
              <img src={furniture} className={`${style.images}`} alt="" />
            </figure>
          </Slider>
        </div>
      </div>
    </header>

    <section className='mt-5'>
      <div className="container">
        <h2 className={`${style.decoration} text-danger h5 ps-5`}>Categories</h2>
        <h2 className='mt-5 first-font'>Browse By Category</h2>
        <div className="row my-5">
          <div className="col-md-4">
            <Link to={"products/men's clothing"} className={`${style.content} text-decoration-none border border-1 d-flex flex-column align-items-center rounded-2 py-4 cursor-pointer`}>
              <GiClothes className={`${style.icon} my-3`} />
              <h2 className='second-font fs-4 fw-bold'>Clothes</h2>
            </Link>
          </div>
          <div className="col-md-4">
            <Link to={'products/electronics'} className={`${style.content} text-decoration-none border border-1 d-flex flex-column align-items-center rounded-2 py-4 cursor-pointer`}>
              <BiDevices className={`${style.icon} my-3`} />
              <h2 className='second-font fs-4 fw-bold'>Electronics</h2>
            </Link>
          </div>
          <div className="col-md-4">
            <Link to={'products/jewelery'} className={`${style.content} text-decoration-none border border-1 d-flex flex-column align-items-center rounded-2 py-4 cursor-pointer`}>
              <GiLinkedRings className={`${style.icon} my-3`} />
              <h2 className='second-font fs-4 fw-bold'>Jewelery</h2>
            </Link>
          </div>
        </div>
      </div>
    </section>
  </>
}
