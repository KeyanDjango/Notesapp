import React, { useState } from 'react';
import style from './Register.module.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {

    const [regState, setRegState] = useState({
        username: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate();


    // ===============================>Handle Submit

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await axios.post("https://notesappapi-m3nt.onrender.com/api/register/", {
                username:regState.username,
                password:regState.password,
                email:regState.email,
            });
            alert("Registered successfully. Please login.");
            navigate("/");
        }
        catch (error) {
            console.log(error.response?.data);
            console.log(error);
            alert("Registration failed");
        }

    }

    // ===============================>Handle Submit

    function handleCancel() {

        navigate('/')
    }

    //===============================>Data Set for inputs

    function handleChangeInput(e) {
        const { name, value } = e.target;

        setRegState({
            ...regState,
            [name]: value
        });
    }


    return (
        <div className={style.registerParent}>
            <div className={style.registerChild}>
                <h1>Register</h1>
                {}
                <form onSubmit={handleSubmit}>
                    <label htmlFor=''>Username</label>
                    <input type="text" name="username" id="username" onChange={handleChangeInput} />
                    <label htmlFor=''>Email</label>
                    <input type="email" name="email" id="email" onChange={handleChangeInput} />
                    <label htmlFor=''>Password</label>
                    <input type="password" name="password" id="password" onChange={handleChangeInput} />
                    <div className={style.registerBtns}>

                        <button className={style.registersubmit} type='submit'>Create Account</button>
                        <button onClick={handleCancel} className={style.registerCancel} type='reset'>Back to Login</button>

                    </div>
                </form>
            </div>
        </div>
    );
}