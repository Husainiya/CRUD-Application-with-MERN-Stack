import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function CreateUser() {
    const [name, setName] = useState('');
    const [company_name, setCompany_Name] = useState('');
    const [product_name, setProduct_Name] = useState('');
    const [contact_number, setContact_Number] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({}); // State to store all validation errors
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation
        return re.test(email);
    };

    const Submit = (e) => {
        e.preventDefault();
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

        // If there are any validation errors, set them and prevent form submission
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // If validation passes, clear errors and submit the form
        setErrors({});
        axios.post("http://localhost:3001/CreateUser", { name, company_name, product_name, contact_number, email })
            .then(result => {
                console.log(result);
                navigate('/');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="d-flex vh-100 justify-content-center align-items-center" style={{ backgroundColor: '#FF2600' }}>
            <div className="w-47 bg-white rounded p-4">
                <h2>User Management</h2>
                <form onSubmit={Submit}>
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
                        {errors.name && <div className="text-danger">{errors.name}</div>}
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
                        {errors.company_name && <div className="text-danger">{errors.company_name}</div>}
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
                        {errors.product_name && <div className="text-danger">{errors.product_name}</div>}
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
                        {errors.contact_number && <div className="text-danger">{errors.contact_number}</div>}
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
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                    </div>
                    <button type="submit" style={{ backgroundColor: '#1D1D1D', color: '#fff', fontWeight: 'bold' }}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateUser;
