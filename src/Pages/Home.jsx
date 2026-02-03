import React, { useEffect, useState } from 'react';
import '../App.css';
import style from './Home.module.css';
import { FaAdjust } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import Modal from './Modal';
import Card from './Card';
import axios from 'axios';
import { MdDelete } from "react-icons/md";

const local = 'http://127.0.0.1:8000/'
const server = 'https://notesappapi-m3nt.onrender.com'

export default function Home() {
    const [modalCheck, setModalCheck] = useState(false);
    const [notedata, setNotesData] = useState([]);
    function handleModalOpen() {
        setModalCheck(!modalCheck)
    }
    // MODAL POP SCREEN FREEZE ==================================>
    useEffect(() => {
        if (modalCheck) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        // Cleanup when component unmounts
        return () => {
            document.body.style.overflow = 'auto';
        }
    }, [modalCheck]);


    // GETTING  DATA ==================================>

    async function handleRetriveData() {
        const response = await axios.get(`${server}/api/crud`);
        console.log(response.data);
        setNotesData(response.data);

    }

    // GETTING  DATA (useEffect) ==================================>
    useEffect(() => {
        handleRetriveData();
    }, []);

    // DELETE ALL  DATA  ==================================>

    async function handleDeleteAll() {
        await axios.delete(`${server}/api/crud`);
        handleRetriveData();
        alert("Success!\n\nAll data deleted successfully.");

    }

    return (
        <>
            {/* TOP BAR */}
            <div className={style.topBar}>
                <h2>Quick Notes</h2>

                <div>
                    <button className={style.addNoteBtn} onClick={handleModalOpen}><FaPlusCircle className={style.plusIconBtn} />Add Note</button>
                    <button className={style.addColorBtn}><FaAdjust /></button>
                </div>
            </div>

            {/* Delete All */}
            <div className={style.homeDeleteAll}>
                <button className={style.deleteNoteBtn} onClick={handleDeleteAll}><MdDelete className={style.plusIconBtn} />Delete All</button>

            </div>

            {/* MODAL PAGE */}

            {modalCheck && <Modal handleRetriveData={handleRetriveData} modalCheckfun={handleModalOpen} />}

            <Card notedata={notedata} handleRetriveData={handleRetriveData} />


        </>
    );
}