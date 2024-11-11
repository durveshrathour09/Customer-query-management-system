import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Customer = () => {
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(null); // Start with null for loading state
    const [loading, setLoading] = useState(true); // Loading state
    const { id } = useParams();

    const viewCustomer = async () => {
        try {
            const response = await fetch(`http://localhost:6000/${id}`);
            if (!response.ok) {
                throw new Error('Customer not found');
            }
            const result = await response.json();
            setCustomer(result);
        } catch (error) {
            alert(error.message);
            navigate('/Login');
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    };

    useEffect(() => {
        viewCustomer();
    }, [id]);

    // Show a loading message while fetching customer data
    if (loading) {
        return <div>Loading...</div>;
    }

    if (!customer) {
        return <div>No customer data available.</div>; // Handle case where customer is null
    }

    const { firstname, lastname, username, email } = customer;

    return (
        <div className="row">
            <div className="col-sm-12">
                <div className="row dash_main">
                    <div className="col-2 bg-danger h-100">
                        <div>Sidenav</div>
                        <Link to={`/Customer/${id}`}>Customer</Link>
                        <br />
                        <Link to={`/Addquery/${id}`}>Add Query</Link>
                    </div>
                    <div className="col-10 bg-primary h-100">
                        <h3>{firstname} {lastname}</h3>
                        <p>Username: {username}</p>
                        <p>Email: {email}</p>
                        <Link className='btn btn-warning' to={`/Edit/${id}`}>Edit Profile</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Customer;
