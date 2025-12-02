import React, { useEffect, useState } from 'react'
import style from './CategoryProducts.module.css';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function CategoryProducts() {

  const { category } = useParams();

  const [products, setProducts] = useState([])

  async function getProducts() {
    const { data } = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
    if (data) {
      setProducts(data)
    }
  }

  function productRating(rate) {
    const stars = [];
    const fullStars = Math.floor(rate);
    const hasHalf = rate % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} color="gold" />);
      } else if (i === fullStars + 1 && hasHalf) {
        stars.push(<FaStarHalfAlt key={i} color="gold" />);
      } else {
        stars.push(<FaRegStar key={i} color="gold" />);
      }
    }

    return stars;
  }

  useEffect(() => {
    getProducts()
  }, [])






  return <>



    <section>
      <div className="container py-5">
        <div className="row g-5">
          {products.map(product => <div key={product.id} className="col-md-4">
            <div className={`${style.product} shadow px-2 py-3`}>

              <figure className='position-relative'>
                <img src={product.image} className={style.image} alt="" />
                <div className={`${style.cartButton}`}>
                  <Link className='btn btn-dark d-block'>Add to cart</Link>
                </div>
              </figure>

              <div className="info">
                <h2 className='h4'>{product.title.split(' ').slice(0, 2).join(' ')}</h2>
                <div className="caption">
                  <div className="content">
                    <p><span className='text-success'>Category:</span> {product.category}</p>
                    <p className={`${style.price}`}>{product.price} EGP</p>
                  </div>
                  <div className="rate">
                    {productRating(product.rating.rate)}
                  </div>
                </div>
              </div>

            </div>
          </div>)}
        </div>
      </div>
    </section>
  </>
}
