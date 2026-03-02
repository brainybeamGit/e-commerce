import React, { useState } from 'react'
import axios from "./utils/axiosInstance"

const Contact = () => {
    const [email, setEmail] = useState()
    const [fullname, setFullName] = useState()
    const [message, setMessage] = useState()

    const handleContact = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post("/api/contact",
                { email, fullname, message }
            )
            alert(data.message)
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <div>Contact</div>
                        <form onSubmit={handleContact}>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Email address</label>
                                <input onChange={(e) => setEmail(e.target.value)} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Full Name</label>
                                <input onChange={(e) => setFullName(e.target.value)} type="text" class="form-control" id="exampleInputPassword1" />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Message</label>
                                <input onChange={(e) => setMessage(e.target.value)} type="text" class="form-control" id="exampleInputPassword1" />
                            </div>

                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact