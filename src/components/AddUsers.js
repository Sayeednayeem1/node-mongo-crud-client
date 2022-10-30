import React, { useState } from 'react';

const AddUsers = () => {
    const [user, setUser] = useState({});

    const handleAddUser = event =>{
        event.preventDefault();
        console.log(user);

        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then( res => res.json())
        .then( data => {
            if(data.acknowledged){
                alert('user added succesfully');
                event.target.reset();
            }
        });
    };

    const handleInputBlur = event =>{
        event.preventDefault();
        const value = event.target.value;
        const field = event.target.name;
        console.log(value);
        const newUser = {...user};
        newUser[field] = value;
        setUser(newUser);

    }

    return (
        <div>
            <h4>lets add a user</h4>
            <form onSubmit={handleAddUser}>
                <input onChange={handleInputBlur} type="text" name='name' placeholder='name' required/>
                <br/>
                <input onChange={handleInputBlur} type="text" name='address' placeholder='address' required/>
                <br/>
                <input onChange={handleInputBlur} type="email" name='email' placeholder='email' required/>
                <br/>
                <button type='submit'>Add user</button>
            </form>
        </div>
    );
};

export default AddUsers;