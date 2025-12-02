import React, { useState } from 'react'
import style from './Register.module.css';
import image from './../../assets/cart.jpg'
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { SyncLoader } from 'react-spinners';
import { object, string } from 'yup';

export default function Register() {

  const [apiError, setApiError] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const validationSchema = object({
    name: string().min(3, "Min name length is 3").max(30, "Max name length is 30").required("Name is required"),
    email: string().matches(/[a-z0-9.]+@(gmail|yahoo)\.com\b/, "Invalid email for Ex:test@gmail.com").required("Email is required"),
    password: string().matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Minimum Password Length is 8 and must encludes one uppercase letter and one number and no symbols").required("Password is required"),
    avatar: string().url("Invalid url").required("Image is required")
  })


  async function registerSubmit(values) {
    setLoading(true);
    const data = await axios.post(`https://fakestoreapi.com/users`, values)
      .catch((error) => {
        setApiError(error.response.data.message);
        setLoading(false);
      })

    if (data.status === 201) {
      setLoading(false);
      navigate('/login');
    }

  }


  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      avatar: ""
    }, onSubmit: registerSubmit,
    validationSchema
  });


  return <>
    <section className='mt-4'>
      <div className="ps-5 pe-5">
        <div className="row align-items-center">
          <div className={`col-md-7 ${style.bgRegister} mb-4 d-none d-sm-block d-md-block`}>
            <div className="image text-center">
              <img src={image} className='w-50 shadow rounded-5' alt="" />
            </div>
          </div>

          <div className="col-md-5 d-flex justify-content-center d-md-block">
            <div className="form w-75">
              <h2 className='mb-5 fw-bold first-font'>Register</h2>
              {apiError ? <div className='alert alert-danger'>{apiError[0]}</div> : null}
              <form className='d-flex flex-column' onSubmit={formik.handleSubmit}>
                <input type="text" className='input' id='name' name='name' placeholder='Name' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.touched.name && formik.errors.name ? <div className='text-danger'>{formik.errors.name}</div>: null}
                
                <input type="email" className='input mt-5' id='email' name='email' placeholder='Email' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.touched.email && formik.errors.email ? <div className='text-danger'>{formik.errors.email}</div>: null}
                
                <input type="password" className='input mt-5' id='password' name='password' placeholder='Password' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.touched.password && formik.errors.password ? <div className='text-danger'>{formik.errors.password}</div>: null}
                
                <input type="url" className='input mt-5' id='avatar' name='avatar' placeholder='Image url' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.touched.avatar && formik.errors.avatar ? <div className='text-danger'>{formik.errors.avatar}</div>: null}

                {/* Submit button condition*/}
                {loading ? <button className="btn btn-danger my-2" type="submit">
                  <SyncLoader size={10} color='#fff' />
                </button> : <button className="btn btn-danger my-2 mt-5" type="submit" disabled={!(formik.dirty && formik.isValid)}>Sign up</button>}

                {/* Login Link */}
                <p>Already have account ? <Link className='text-dark ps-2' to={'/login'}>Log in</Link></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
}
