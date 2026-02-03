import React, { useEffect, useReducer, useState } from 'react';
import style from './Modal.module.css';
import { IoIosClose } from "react-icons/io";
import axios from 'axios';

const initialNote = {
    title: '',
    content: ''
}


function reducerNote(state, action) {
    switch (action.type) {
        case 'HANDLE_SET':
            return { ...state, [action.field]: action.value }
        case 'RESET':
            return initialNote
        default:
            return state
    }
}

export default function Modal({ modalCheckfun,handleRetriveData }) {

    const [state, dispatch] = useReducer(reducerNote, initialNote);


    // POSTING DATA ==================================>
    async function handleModalSubmit(e) {
        e.preventDefault();

        try {

            const response = await axios.post('https://notesappapi-m3nt.onrender.com/api/crud', {
                title: state.title,
                content: state.content
            });
            alert('Data saved successfully');
            modalCheckfun();
            handleRetriveData();

        } catch (error) {
            console.log(error);

        }
    }

    function handleInputChange(e) {
        dispatch({
            type: 'HANDLE_SET',
            field: e.target.name,
            value: e.target.value
        });
    }





    function handleSave(e) {
        e.preventDefault();
    }


    return (
        <>
            <div className={style.modalParent}>
                <div className={style.modalChild}>
                    {/* TOPBAR */}
                    <div className={style.modalTop}>
                        <h2>Add New Note</h2>

                        <IoIosClose onClick={modalCheckfun} className={style.modalCloseBtn} />
                    </div>

                    

                    {/* FORM */}

                    <div className={style.modalForm}>

                        <form onSubmit={handleModalSubmit} autoComplete='off'>

                            <label htmlFor='title'>Title</label> <br />
                            <input type="text" name="title" value={state.title} maxLength={30} id="title" onChange={handleInputChange} /> <br /> <br />

                            <label htmlFor='content'>Content</label> <br />
                            <textarea name="content" id="content" value={state.content} maxLength={460} onChange={handleInputChange} /> <br />


                            <div className={style.modalBtns}>
                                <input type='reset' value='Cancel' onClick={modalCheckfun} className={style.modalBtnCancel} />
                                <input type='submit' value='Save note' className={style.modalBtnSave} />
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </>
    );
}