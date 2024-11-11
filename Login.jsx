import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State for error messages
    const navigate = useNavigate();

    const logcus = async (e) => {
        e.preventDefault();
        const user = { username, password };
        
        try {
            const response = await fetch('http://localhost:6000/cust', {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (!response.ok) {
                setError(data.error || "Login failed. Please try again.");
            } else {
                alert("Form Login success");
                setUsername("");
                setPassword("");
                navigate('/Customer');
            }
        } catch (error) {
            setError("An unexpected error occurred. Please try again later.");
        }
    };

    return (
        <>
            <div className="row">
                <div className="col-sm-4 mx-auto" style={{ marginTop: '10em' }}>
                    <div>
                        <form onSubmit={logcus} className='p-5 shadow-lg rounded-5 pt-2'>
                            <div className="row mb-5">
                                <div className="col-sm-6">
                                    <a href="/" className='btn btn-primary'>Customer's Login</a>
                                </div>
                                <div className="col-sm-6">
                                    <a href="/Loginadmin" className='form-control btn'>Admin's Login</a>
                                </div>
                            </div>
                            <div>
                                <label>Username:</label>
                                <input 
                                    className='form-control' 
                                    type="text" 
                                    name='username' 
                                    value={username} 
                                    onChange={(e) => setUsername(e.target.value)} 
                                /><br /><br />
                            </div>
                            <div>
                                <label>Password:</label>
                                <input 
                                    className='form-control' 
                                    type="password" // Change to password
                                    name='password' 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                /><br /><br />
                            </div>
                            {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
                            <button className='form-control btn btn-primary' type="submit">Submit</button>
                        </form>
                        <div className="row mx-auto">
                            <div className="col-sm-6 text-center mt-5">
                                <a href="/Registration">Create new account</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
