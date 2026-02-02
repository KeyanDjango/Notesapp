import React from 'react';
import style from './Modal.module.css';
import { IoIosClose } from "react-icons/io";

export default function Modal({ modalCheckfun }) {
    function handleModalSubmit(e) {
        e.preventDefault();
        alert('Message')
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
                        
                        <IoIosClose onClick={modalCheckfun}  className={style.modalCloseBtn} />
                    </div>
        
                    {/* FORM */}

                    <div className={style.modalForm}>

                        <form onSubmit={handleModalSubmit}>
        
                            <label htmlFor='title'>Title</label> <br />
                            <input type="text" name="title" maxLength={50} id="title" /> <br /> <br />

                            <label htmlFor='content'>Content</label> <br />
                            <textarea name="content" id="content" /> <br />


                            <div className={style.modalBtns}>
                                <input type='reset' value='Cancel' onClick={modalCheckfun} className={style.modalBtnCancel} />
                                <input type='submit' value='Save note'  className={style.modalBtnSave} />
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </>
    );
}