import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); // Changed to 'password' for consistency
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const regcode = async (e) => {
        e.preventDefault();
        const user = { firstname, lastname, username, email, password };
    
        try {
            const response = await fetch('http://localhost:6000', {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                // Log the response data for better debugging
                console.error("Registration error:", data);
                alert(data.error || "Registration failed");
                return; // Exit if there's an error
            }
    
            alert("Form Successfully Submitted");
            setFirstname("");
            setLastname("");
            setEmail("");
            setPassword("");
            setUsername("");
            navigate('/');
        } catch (error) {
            // Log the error for better debugging
            console.error("Error during registration:", error);
            alert("An unexpected error occurred. Please try again.");
        }
    };
    

    return (
        <>
            <div className='row'>
                <div className='col-sm-6 mx-auto my-4'>
                    <h3 className='my-3'>Registration Form</h3>
                    <form onSubmit={regcode} className='p-5 shadow-lg rounded-5'>
                        <div className="row">
                            <div className="col-sm-6">
                                <a href="/"><div className='back fs-1'><i className="fa-solid fa-circle-left"></i></div></a>
                            </div>
                        </div>
                        <br />
                        <br />
                        <label>Enter First Name:</label>
                        <input className='form-control' value={firstname} onChange={(e) => setFirstname(e.target.value)} type='text' name="fname" />
                        <br />
                        <br />
                        <label>Enter Last Name:</label>
                        <input className='form-control' type='text' name="lname" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                        <br />
                        <br />
                        <label>Username:</label>
                        <input className='form-control' type="text" name='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                        <br />
                        <br />
                        <label>Enter Email:</label>
                        <input className='form-control' type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <br />
                        <br />
                        <label>Enter Password:</label>
                        <input className='form-control' type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <br />
                        <br />
                        <button className='form-control btn btn-primary' type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Registration;
