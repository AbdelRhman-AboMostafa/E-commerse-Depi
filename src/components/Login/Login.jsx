import React from 'react'
import { useFormik } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useContext } from 'react';
import { UserContext } from '../../Context/userContext';
import toast from 'react-hot-toast';


export default function Login() {

  let {saveUserToken } = useContext(UserContext);
  let navigate = useNavigate();

  async function handelLogin(formData){
    console.log("formData", formData);
    let res = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin' , formData)
    .then((res) => {
      toast.success(res.data.message);
      console.log("res", res.data);
      if(res.data.message === "success"){
        saveUserToken(res.data.token);
        localStorage.setItem("userId", res.data.user.id)
        navigate('/home'); 
      }
    })
    .catch((err) => {
      console.log("err", err.response.data)
      toast.error(err.response.data.message);
    });

  }

  let validationSchema = Yup.object({
    email:Yup.string().email('Invalid email format').required('Email is required'),
    password:Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')

  })

  

  let formik = useFormik({
    initialValues:{
      email: '',
      password: ''
    },
    validationSchema: validationSchema,

    onSubmit: handelLogin
  });         




  return (
    <>
      <section className="bg-light py-3 py-md-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
              <div className="card border border-light-subtle rounded-3 shadow-sm">
                <div className="card-body p-3 p-md-4 p-xl-5">

                  <h2 className="fs-6 fw-normal text-center text-secondary mb-4">Enter your details to Login</h2>
                  
                  <form  onSubmit={formik.handleSubmit}  action="#!">
                    <div className="row gy-2 overflow-hidden">
                      
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input type="email"  className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} name="email" id="email" placeholder="name@example.com" required />
                          <label htmlFor="email" className="form-label">Email</label>
                        </div>
                      </div>
                      
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input type="password"  className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} name="password" id="password" placeholder="Password" required />
                          <label htmlFor="password" className="form-label">Password</label>
                        </div>
                      </div>
                      
                      <div className="col-12">
                        <div className="d-grid my-3">
                          <button className="btn btn-primary btn-lg" type="submit">Sign in</button>
                        </div>
                      </div>
                      
            
                    
                    </div>
                  </form>



                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
