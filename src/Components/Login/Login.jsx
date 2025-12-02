import React, { useContext, useState } from 'react'
import style from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import image from './../../assets/cart.jpg'
import { UserContext } from '../../Context/UserContext.jsx';
import { SyncLoader } from 'react-spinners';
import axios from 'axios';

export default function Login() {
  const [apiError, setApiError] = useState(null)
  const [loading, setLoading] = useState(false)

  const { setToken } = useContext(UserContext);

  const navigate = useNavigate();

  const validationSchema = object({
    username: string().required("username is required"),
    // password: string().matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Minimum Password Length is 8 and must encludes one uppercase letter and one number and no symbols").required("Password is required")
  })


  async function loginSubmit(values) {
    setLoading(true);
    const data = await axios.post(`https://fakestoreapi.com/auth/login`, values)
      .catch((error) => {
        console.log(error);
        setApiError(error.response.data.message);
        setLoading(false);
      })
      

    if (data.status === 201) {
      localStorage.setItem('token', data.data.token)
      setToken(data.data.token);
      setLoading(false);
      navigate('/');
    }

  }


  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    }, onSubmit: loginSubmit,
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
              <h2 className='mb-5 fw-bold first-font'>Login</h2>
              {apiError ? <div className='alert alert-danger'>{apiError}</div> : null}

              <form className='d-flex flex-column' onSubmit={formik.handleSubmit}>

                <input type="text" className='input' id='username' name='username' placeholder='username' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.touched.username && formik.errors.username ? <div className='text-danger'>{formik.errors.username}</div> : null}

                <input type="password" className='input mt-5' id='password' name='password' placeholder='Password' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.touched.password && formik.errors.password ? <div className='text-danger'>{formik.errors.password}</div> : null}

                {/* Submit button condition*/}
                {loading ? <button className="btn btn-danger my-2" type="submit">
                  <SyncLoader size={10} color='#fff' />
                </button> : <button className="btn btn-danger my-2 mt-5" type="submit" disabled={!(formik.dirty && formik.isValid)}>Sign in</button>}

                {/* Login Link */}
                <p>Don't have account ? <Link className='text-dark ps-2' to={'/register'}>Register</Link></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
}
