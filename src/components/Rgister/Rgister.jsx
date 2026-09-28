import React, { useContext } from 'react'
import { useFormik } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from '../../Context/userContext';
import toast from 'react-hot-toast';


export default function Rgister() {

  let navigate = useNavigate();

  let {saveUserToken} = useContext(UserContext);
  async function handelRegister(formData){
    console.log("formData", formData);

    // TODO: send formData to backend to create new user

    let res = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', formData)
    .then((res) => {
      console.log("res", res.data);
      if(res.data.message === "success"){
        saveUserToken(res.data.token);
        toast.success(res.data.message);
        navigate('/home');  // programmatic Routing
      }
    })
    .catch((err) => {
      console.log("err", err.response.data)
      toast.error(err.response.data.message);
    });
  }



  let validationSchema = Yup.object({
    name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters').max(50, 'Name must be at most 50 characters'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required').matches(/^[A-Z][a-z0-9]{6,8}$/),
    rePassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Re-enter Password is required'),
    phone: Yup.string().matches(/^01[1250][0-9]{8}$/, 'Invalid phone number format').required('Phone Number is required')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },

    validationSchema: validationSchema,

    onSubmit: handelRegister
  });


  return (
    <>
      <section className="bg-light py-3 py-md-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
              <div className="card border border-light-subtle rounded-3 shadow-sm">
                <div className="card-body p-3 p-md-4 p-xl-5">
                  <div className="text-center mb-3">
                    <a href="#!">
                      <img src="./assets/img/bsb-logo.svg" alt="BootstrapBrain Logo" width={175} height={57} />
                    </a>
                  </div>
                  <h2 className="fs-6 fw-normal text-center text-secondary mb-4">Enter your details to register</h2>
                  <form  onSubmit={formik.handleSubmit} action="#!">
                    <div className="row gy-2 overflow-hidden">
                      <div className="col-12">
                        
                        <div className="form-floating mb-3">
                          <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control" value={formik.values.name} name="name" id="name" placeholder="First Name" required  />
                          <label htmlFor="name" className="form-label">Name</label>
                        </div>
                      </div>
                      
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input type="email" onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control" name="email" value={formik.values.email} id="email" placeholder="name@example.com" required />
                          <label htmlFor="email" className="form-label">Email</label>
                        </div>
                      </div>
                      
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control" name="password" value={formik.values.password} id="password" placeholder="Password" required />
                          <label htmlFor="password" className="form-label">Password</label>
                        </div>
                      </div>
                      
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control" name="rePassword" value={formik.values.rePassword} id="rePassword" placeholder="Re-enter Password" required />
                          <label htmlFor="rePassword" className="form-label">Re-enter Password</label>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control" name="phone" value={formik.values.phone} id="phone" placeholder="Phone Number" required />
                          <label htmlFor="phone" className="form-label">Phone Number</label>
                        </div>
                      </div>
                      
                      
                      
                      <div className="col-12">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" defaultValue name="iAgree" id="iAgree" required />
                          <label className="form-check-label text-secondary" htmlFor="iAgree">
                            I agree to the <a href="#!" className="link-primary text-decoration-none">terms and conditions</a>
                          </label>
                        </div>
                      </div>
                      
                      <div className="col-12">
                        <div className="d-grid my-3">
                          <button className="btn btn-primary btn-lg" type="submit">Sign up</button>
                        </div>
                      </div>
                      
                      <div className="col-12">
                        <p className="m-0 text-secondary text-center">Already have an account? <a href="#!" className="link-primary text-decoration-none">Sign in</a></p>
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
