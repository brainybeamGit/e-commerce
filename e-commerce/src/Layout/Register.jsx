import axios from "../utils/axiosInstance"
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
    const [fullName, setFullName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [number, setNumber] = useState();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/register",{
                    fullName, email, password, number}
            )
            toast(data.message)
            setFullName('')
            setEmail('')
            setPassword('')
            setNumber('')
        }
        catch (err) {
           alert(err.response.data.message)
        }
    }
    return (
        <>
        <Toaster />

            <div className="container">
                <div className="row justify-content-center" style={{ padding: "50px" }}>

                    <form className='col-4 ' onSubmit={handleRegister} style={{ border: "1px solid", padding: "50px", borderRadius: "20px" }}>
                        <h1 className='text-center'>Register Page</h1>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Full Name</label>
                            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Phone No</label>
                            <input type="number" value={number} onChange={(e) => setNumber(e.target.value)} className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" required />
                        </div>


                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register