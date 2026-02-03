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

export default function Modal({ selectText, setselectText, handleModalOpen, setModalCheck, handleRetriveData, editCheck, setEditCheck }) {

    const [state, dispatch] = useReducer(reducerNote, initialNote);


    // POSTING DATA ==================================>
    async function handleModalSubmit(e) {
        e.preventDefault();

        if (editCheck) {
            const { id, title, content } = selectText;

            // const updateData = await axios.put(`https://notesappapi-m3nt.onrender.com/api/update/${id}/`, {

            const updateData = await axios.put(`http://127.0.0.1:8000/api/update/${id}/`, {
                title: state.title,
                content: state.content
            });
            handleModalOpen();
            handleRetriveData();
            alert('Data updated successfully');
        } else {
            try {

                // const response = await axios.post('http://127.0.0.1:8000/api/crud', {
                    const response = await axios.post('https://notesappapi-m3nt.onrender.com/api/crud', {
                    title: state.title,
                    content: state.content
                });

                handleModalOpen();
                handleRetriveData();
                alert('Data saved successfully');

            } catch (error) {
                console.log(error);

            }
        }


    }

    function handleInputChange(e) {
        dispatch({
            type: 'HANDLE_SET',
            field: e.target.name,
            value: e.target.value
        });
    }

    function handleClose() {
        handleModalOpen();
        setEditCheck(false)
    }

    function handleCancel() {
        handleModalOpen();
        setEditCheck(false)
    }

    useEffect(() => {
        if (!selectText || !editCheck) return;

        dispatch({
            type: 'HANDLE_SET',
            field: 'title',
            value: selectText.title
        });

        dispatch({
            type: 'HANDLE_SET',
            field: 'content',
            value: selectText.content
        });
    }, [selectText, editCheck]);




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

                        <IoIosClose onClick={() => handleClose()} className={style.modalCloseBtn} />
                    </div>



                    {/* FORM */}

                    <div className={style.modalForm}>

                        <form onSubmit={handleModalSubmit} autoComplete='off'>

                            <label htmlFor='title'>Title</label> <br />
                            <input type="text" name="title" value={state.title} maxLength={30} id="title" onChange={handleInputChange} /> <br /> <br />

                            <label htmlFor='content'>Content</label> <br />
                            <textarea name="content" id="content" value={state.content} maxLength={460} onChange={handleInputChange} /> <br />


                            <div className={style.modalBtns}>
                                <input type='reset' value='Cancel' onClick={() => handleCancel()} className={style.modalBtnCancel} />
                                <input type='submit' value={editCheck ? 'Update note' : 'Add note'} className={style.modalBtnSave} />
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </>
    );
}