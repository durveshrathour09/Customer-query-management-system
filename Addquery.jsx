import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Addquery = () => {
    const [department, setDepartment] = useState("");
    const [subject, setSubject] = useState("");
    const [query, setQuery] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    const regcode = async (e) => {
        e.preventDefault();
        const user = { department, subject, query, id };
        
        try {
            const response = await fetch(`http://localhost:6000/addquery`, {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const data = await response.json();
            if (!response.ok) {
                alert(data.error || "An error occurred");
                return;
            }

            alert("Form Successfully Submitted");
            setDepartment("");
            setSubject("");
            setQuery("");
            navigate('/addquery');
        } catch (error) {
            console.error("Error submitting the form:", error);
            alert("An error occurred while submitting the form.");
        }
    };

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
                        <form onSubmit={regcode} className='p-5 shadow-lg rounded-5'>
                            <div className="row">
                                <div className="col-sm-6">
                                    <Link to="/">
                                        <div className='back fs-1'>
                                            <i className="fa-solid fa-circle-left"></i>
                                        </div>
                                    </Link>
                                    <br />
                                    <br />
                                    <label>
                                        Department:
                                        <input 
                                            className='form-control' 
                                            value={department} 
                                            onChange={(e) => setDepartment(e.target.value)} 
                                            type='text' 
                                            name="department" 
                                        />
                                    </label>
                                    <input type='hidden' name="id" value={id} />
                                    <br />
                                    <br />
                                    <label>
                                        Subject:
                                        <input 
                                            className='form-control' 
                                            type='text' 
                                            name="subject" 
                                            value={subject} 
                                            onChange={(e) => setSubject(e.target.value)} 
                                        />
                                    </label>
                                    <br />
                                    <br />
                                    <div className="mb-3">
                                        <label htmlFor="queryTextarea" className="form-label">Query</label>
                                        <textarea 
                                            className="form-control" 
                                            id="queryTextarea" 
                                            rows="3" 
                                            placeholder='Write Your Query Here' 
                                            value={query} 
                                            onChange={(e) => setQuery(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <button className='form-control btn btn-primary' type="submit">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Addquery;
