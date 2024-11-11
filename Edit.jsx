import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
    const { id } = useParams();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true); // Loading state

    const getemp = async () => {
        try {
            const response = await fetch(`http://localhost:6000/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch customer data');
            }
            const result = await response.json();
            setFirstname(result.firstname);
            setLastname(result.lastname);
            setEmail(result.email);
            setPassword(result.password);
            setUsername(result.username);
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const navigate = useNavigate();

    const editemp = async (e) => {
        e.preventDefault();
        const updatedata = { firstname, lastname, email, password, username };

        try {
            const response = await fetch(`http://localhost:6000/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedata),
            });

            if (!response.ok) {
                throw new Error('Failed to update customer data');
            }

            const result = await response.json();
            alert("Updated successfully");
            navigate('/Customer');
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        getemp();
    }, [id]);

    // Show loading state while fetching
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className='row'>
                <div className='col-sm-6 mx-auto my-5'>
                    <h3 className='my-4 text-light'><u>Upd</u>ation Form</h3>
                    <form onSubmit={editemp} className='p-5 shadow-lg rounded-5'>
                        <label>Enter First Name:</label>
                        <input className='form-control' value={firstname} onChange={(e) => setFirstname(e.target.value)} type='text' name="fname" />
                        <br />
                        <br />
                        <label>Enter Last Name:</label>
                        <input className='form-control' type='text' name="lname" value={lastname} onChange={(e) => setLastname(e.target.value)} />
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
                        <label>Enter Username:</label>
                        <input className='form-control' type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <br />
                        <br />
                        <button className='form-control btn btn-primary' type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Edit;
