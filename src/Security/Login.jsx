import React, { useState } from 'react';
import style from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {

    const navigate = useNavigate()
    const [loginState, setLoginState] = useState({
        email: '',
        password: ''
    });


    // ===============================>Handle Submit
    async function handleSubmit(e) {
        e.preventDefault();
        if (loginState.email === '') {
            alert('Email field is empty!')
            return;
        }

        if (loginState.password === '') {
            alert('Password field is empty!')
            return;
        }

        try {
            const res = await axios.post("https://notesappapi-m3nt.onrender.com/api/login/", {
                email: loginState.email,
                password: loginState.password,
            });
            localStorage.setItem("token", res.data.access);
            navigate("/home");

        } catch (error) {

            console.log(error);
            alert("Invalid login");

        }

    }

    //===============================>Data Set for inputs

    function handleChangeInput(e) {
        const { name, value } = e.target;

        setLoginState({
            ...loginState,
            [name]: value
        });
    }



    return (
        <div className={style.loginCon}>
            <div className={style.topbarLogin}>
                <h2>Quick Notes App</h2>
            </div>

            <div className={style.loginFormConMain}>
                <div className={style.loginFormCon}>


                    <h1>Login</h1>
                    <div className={style.logintxt}>Create your thoughts</div>

                    <div className={style.loginForm}>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor='email'>Email</label>
                            <input type='email' name='email' id='email' onChange={handleChangeInput} />
                            <label htmlFor='password'>Password</label>
                            <input type='password' name='password' id='password' onChange={handleChangeInput} />
                            <Link className={style.loginLink} to="/register">If you dont have account register!</Link>
                            <button type='submit'> Login </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}