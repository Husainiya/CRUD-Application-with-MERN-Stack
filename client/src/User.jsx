import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '@fortawesome/fontawesome-free/css/all.min.css';

function Users() {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [message, setMessage] = useState(''); // State to store success message

    useEffect(() => {
        axios.get(`http://localhost:3001?sortField=${sortField}&sortOrder=${sortOrder}`)
            .then(result => setUsers(result.data))
            .catch(err => console.log(err));
    }, [sortField, sortOrder]);

    const handleSearch = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:3001/search?query=${searchQuery}`)
            .then(result => setUsers(result.data))
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/deleteUser/' + id)
            .then(res => {
                console.log(res);
                setMessage('Successfully deleted!'); // Set success message
                setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
                setUsers(users.filter(user => user._id !== id)); // Remove deleted user from the list
            })
            .catch(err => console.log(err));
    };

    const handleSelectUser = (id) => {
        if (selectedUsers.includes(id)) {
            setSelectedUsers(selectedUsers.filter(userId => userId !== id));
        } else {
            setSelectedUsers([...selectedUsers, id]);
        }
    };

    const handleSelectAll = () => {
        if (selectedUsers.length === users.length) {
            setSelectedUsers([]); // Deselect all if already all selected
        } else {
            setSelectedUsers(users.map(user => user._id)); // Select all
        }
    };

    const generateReport = () => {
        if (selectedUsers.length === 0) {
            alert("Please select at least one user to generate a report.");
            return;
        }

        axios.post('http://localhost:3001/generateReport', { userIds: selectedUsers }, { responseType: 'blob' })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'SupplierManagementReport.pdf');
                document.body.appendChild(link);
                link.click();
            })
            .catch(err => console.log(err));
    };

    const toggleSortOrder = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    return (
        <div className="d-flex vh-100 justify-content-center align-items-center" style={{ backgroundColor: '#FF2600' }}>
            <div className='w-55 bg-white rounded p-2'>
                <div className="d-flex justify-content-between mb-2">
                    <Link to="/create" className="btn" style={{ backgroundColor: '#000', color: '#fff' }}>Add +</Link>
                    <form onSubmit={handleSearch} className="d-flex align-items-center">
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)} 
                            className="form-control"
                            style={{ marginRight: '0.5rem' }} // Reduced margin
                        />
                        <button type="submit" className="btn" style={{ backgroundColor: '#000', color: '#fff' }}>
                            <i className="fas fa-search"></i> {/* Added search icon */}
                        </button>
                    </form>
                    <div className="d-flex align-items-center ms-2">
                        <div className="d-flex align-items-center me-2">
                            <select onChange={(e) => setSortField(e.target.value)} value={sortField} className="me-2">
                                <option value="name">Name</option>
                                <option value="company_name">Company Name</option>
                                <option value="product_name">Product Name</option>
                                <option value="email">Email</option>
                            </select>
                            <button 
                                onClick={toggleSortOrder} 
                                className="btn" 
                                style={{ backgroundColor: '#000', color: '#fff', marginRight: '0.5rem' }} // Reduced margin
                            >
                                <i className={`fas fa-filter`}></i>
                            </button>
                        </div>
                        <button onClick={generateReport} className="btn btn-warning">Generate Report</button>
                    </div>
                </div>
                {message && <div className="alert alert-success">{message}</div>} {/* Display success message */}
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th>
                                <input 
                                    type="checkbox" 
                                    checked={selectedUsers.length === users.length}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th>Name</th>
                            <th>Company Name</th>
                            <th>Product Name</th>
                            <th>Contact Number</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <input 
                                                type="checkbox" 
                                                checked={selectedUsers.includes(user._id)}
                                                onChange={() => handleSelectUser(user._id)}
                                            />
                                        </td>
                                        <td>{user.name}</td>
                                        <td>{user.company_name}</td>
                                        <td>{user.product_name}</td>
                                        <td>{user.contact_number}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <Link to={`/update/${user._id}`} className="btn" style={{ backgroundColor: '#000', color: '#fff', marginRight: '8px' }}>
                                                <i className="fas fa-edit"></i>
                                            </Link>
                                            <button className="btn" style={{ backgroundColor: '#cd1c18', color: '#fff' }} onClick={() => handleDelete(user._id)}>
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;
