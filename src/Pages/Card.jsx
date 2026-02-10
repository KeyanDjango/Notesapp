import React from 'react';
import style from './Card.module.css';
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import axios from 'axios';
import Modal from './Modal';

export default function Card({ notedata, handleRetriveData, setEditCheck, editCheck, modalCheck, handleModalOpen, setselectText }) {

    async function handleDeleteOne(item) {

        const dialogvar = window.confirm(`Do you want to delete this ${item.title}?`)

        if (dialogvar) {
            try {
                console.log(item.id);
                // // const deleteOne = await axios.delete(`http://127.0.0.1:8000/api/delete/${item.id}/`, {
                //     headers: {
                //         Authorization: `Bearer ${localStorage.getItem("token")}`,
                //     }
                // });
                const deleteOne = await axios.delete(`https://notesappapi-m3nt.onrender.com/api/delete/${item.id}/`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                });
                handleRetriveData();
                alert(`Success! \n \n ${item.title} Data deleted successfully`);
            } catch (error) {
                console.log(error);

            }
        } else {
            console.log('Delete canceled');

        }


    }

    function handleEdit(item) {
        handleModalOpen();
        setEditCheck(true)
        setselectText(item);

    }
    return (
        <>
            <div className={style.cardParent}>

                {notedata.map((item) => (

                    <div className={style.cardData} key={item.id}>

                        <div className={style.cardEdit}>
                            <h3>{item.title}</h3>

                            <div className={style.cardEditBtns}>
                                <button className={style.cardEditBtnDelete} onClick={() => handleDeleteOne(item)}><MdDelete className={style.cardEditBtnDeleteIcon} /></button>
                                <button className={style.cardEditBtn} onClick={() => handleEdit(item)}><FaRegEdit className={style.cardEditBtnEditIcon} /></button>

                            </div>

                        </div>


                        <p>{item.content}</p>
                    </div>
                ))}

            </div>


        </>
    );
}