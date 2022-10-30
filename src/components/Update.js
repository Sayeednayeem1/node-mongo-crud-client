import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const Update = () => {
    const storedUser = useLoaderData();

    const [user, setUser] = useState({storedUser});

    const handleUpdateUser = event => {
        event.preventDefault();
        // console.log(user);
        fetch(`http://localhost:5000/users/${storedUser._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                alert('user updated successfully');
                console.log(data);
            }
            
        });

    };

    const handleInputChange = event => {
        event.preventDefault();
        const value = event.target.value;
        const field = event.target.name;
        console.log(value);
        const newUser = { ...user };
        newUser[field] = value;
        setUser(newUser);

    }

    return (
        <div>
            <h4>Please Update: {storedUser.name}</h4>
            <form onSubmit={handleUpdateUser}>
                <input onChange={handleInputChange} defaultValue={storedUser.name} type="text" name='name' placeholder='name' required />
                <br />
                <input onChange={handleInputChange} type="text" defaultValue={storedUser.address} name='address' placeholder='address' required />
                <br />
                <input onChange={handleInputChange} type="email" name='email' defaultValue={storedUser.email} placeholder='email' required />
                <br />
                <button type='submit'>Update</button>
            </form>
        </div>
    );
};

export default Update;