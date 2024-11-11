import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Loginadmin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
   
    const logad = async (e) => {
        e.preventDefault();
        const user = { username, password };
        
        try {
            const response = await fetch('http://localhost:6000/admin', {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            if (data.message === "Login Success") {
                alert("Login successful");
                setUsername("");
                setPassword("");
                navigate('/Admin');
            }

        } catch (error) {
            console.error("Error:", error);
            alert(error.message);
        }
    }

    return (
        <>
            <div className="row">
                <div className="col-sm-4 mx-auto" style={{ marginTop: '10em' }}>
                    <div className="">
                        <form onSubmit={logad} className='p-5 shadow-lg rounded-5 pt-2'>
                            <div className="row mb-5">
                                <div className="col-sm-6 ab">
                                    <a href="/" className='form-control btn'>Customer's Login</a>
                                </div>
                                <div className="col-sm-6 ab">
                                    <a href="/Loginadmin" className='form-control btn btn-primary'>Admin's Login</a>
                                </div>
                            </div>
                            <label>Username:</label>
                            <br />
                            <input
                                className='form-control'
                                type="text"
                                name='username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <br /><br />
                            <label>Password:</label>
                            <br />
                            <input
                                className='form-control'
                                type="password" // Changed to 'password'
                                name='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <br /><br />
                            <button className='form-control btn btn-primary' type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Loginadmin;
