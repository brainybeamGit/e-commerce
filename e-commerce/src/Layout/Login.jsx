import axios from 'axios';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:3000/login", {
                email, password
            }
            )
            console.log(data)
            toast(data.message)

        

            localStorage.setItem("token",data.token)
            localStorage.setItem("userEmail",data.user.email)
            localStorage.setItem("userId",data.user._id)
            localStorage.setItem("role",data.user.role)

            setEmail('')
            setPassword('')
               navigate('/')
        }
        catch (err) {
            toast(err?.response?.data?.message)
        }
    }

    return (
        <>
            <Toaster />
            <div className="container">
                <div className="row justify-content-center" style={{ padding: "50px" }}>

                    <form className='col-4 ' onSubmit={handleLogin} style={{ border: "1px solid", padding: "50px", borderRadius: "20px" }}>
                        <h1 className='text-center'>Login Page</h1>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Email address</label>
                            <input value={email} type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Password</label>
                            <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" for="exampleCheck1">Check me out</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login