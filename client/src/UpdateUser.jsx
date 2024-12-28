import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateUser() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [company_name, setCompany_Name] = useState('');
    const [product_name, setProduct_Name] = useState('');
    const [contact_number, setContact_Number] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({}); // State to store validation errors
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation
        return re.test(email);
    };

    useEffect(() => {
        axios.get(`http://localhost:3001/getUser/${id}`)
            .then(result => {
                setName(result.data.name);
                setCompany_Name(result.data.company_name);
                setProduct_Name(result.data.product_name);
                setContact_Number(result.data.contact_number);
                setEmail(result.data.email);
            })
            .catch(err => console.log(err));
    }, [id]);

    const Update = (e) => {
        e.preventDefault();
        // Clear previous errors
        let validationErrors = {};

        // Check if all fields are filled
        if (!name) validationErrors.name = 'Name is required';
        if (!company_name) validationErrors.company_name = 'Company Name is required';
        if (!product_name) validationErrors.product_name = 'Product Name is required';
        if (!contact_number) validationErrors.contact_number = 'Contact Number is required';
        if (!email) validationErrors.email = 'Email is required';

        // Validate contact number
        if (contact_number && !/^\d{10}$/.test(contact_number)) {
            validationErrors.contact_number = 'Contact number should be exactly 10 digits';
        }

        // Validate email format
        if (email && !validateEmail(email)) {
            validationErrors.email = 'Invalid email format';
        }

        // Set errors if there are any
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // If validation passes, send the update request
        axios.put(`http://localhost:3001/UpdateUser/${id}`, { name, company_name, product_name, contact_number, email })
            .then(result => {
                console.log(result);
                navigate('/');
            })
            .catch(err => {
                console.log(err);
                if (err.response && err.response.data.errors) {
                    setErrors(err.response.data.errors.reduce((acc, error) => {
                        acc[error.param] = error.msg;
                        return acc;
                    }, {}));
                }
            });
    };

    return (
        <div className="d-flex vh-100 justify-content-center align-items-center" style={{ backgroundColor: '#FF2600' }}>
            <div className="w-47 bg-white rounded p-4">
                <h2>Edit Supplier Information</h2>
                <form onSubmit={Update}>
                    <div className="mb-3 text-start">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && <div className="text-danger mt-2">{errors.name}</div>}
                    </div>
                    <div className="mb-3 text-start">
                        <label htmlFor="companyName" className="form-label">Company Name</label>
                        <input
                            type="text"
                            id="companyName"
                            className="form-control"
                            placeholder="Enter Company Name"
                            value={company_name}
                            onChange={(e) => setCompany_Name(e.target.value)}
                        />
                        {errors.company_name && <div className="text-danger mt-2">{errors.company_name}</div>}
                    </div>
                    <div className="mb-3 text-start">
                        <label htmlFor="productName" className="form-label">Product Name</label>
                        <input
                            type="text"
                            id="productName"
                            className="form-control"
                            placeholder="Enter Product Name"
                            value={product_name}
                            onChange={(e) => setProduct_Name(e.target.value)}
                        />
                        {errors.product_name && <div className="text-danger mt-2">{errors.product_name}</div>}
                    </div>
                    <div className="mb-3 text-start">
                        <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                        <input
                            type="tel"
                            id="contactNumber"
                            className="form-control"
                            placeholder="Enter Contact Number"
                            value={contact_number}
                            onChange={(e) => setContact_Number(e.target.value)}
                        />
                        {errors.contact_number && <div className="text-danger mt-2">{errors.contact_number}</div>}
                    </div>
                    <div className="mb-3 text-start">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <div className="text-danger mt-2">{errors.email}</div>}
                    </div>
                    <button
                        type="submit"
                        className="btn"
                        style={{ backgroundColor: '#1D1D1D', color: '#fff', fontWeight: 'bold' }}
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser;
