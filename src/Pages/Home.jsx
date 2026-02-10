import React, { use, useEffect, useState } from 'react';
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
    const [msg, setMsg] = useState("");
    const [notedata, setNotesData] = useState([]);
    const [editCheck, setEditCheck] = useState(false);
    const [selectText, setselectText] = useState(null);
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
        // const response = await axios.get('http://127.0.0.1:8000/api/crud', {
        //     headers: {
        //         Authorization: `Bearer ${localStorage.getItem("token")}`,
        //     }
        // });
        const response = await axios.get('https://notesappapi-m3nt.onrender.com/api/crud', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                });
        console.log(response.data);
        setNotesData(response.data);

    }

    // GETTING  DATA (useEffect) ==================================>
    useEffect(() => {
        handleRetriveData();
    }, []);


    // DELETE ALL  DATA  ==================================>

    async function handleDeleteAll() {

        const deletealldialog = window.confirm('Do you want to delete all data?');

        if (deletealldialog) {
            // await axios.delete(`http://127.0.0.1:8000/api/crud`, {
            //     headers: {
            //         Authorization: `Bearer ${localStorage.getItem("token")}`,
            //     }
            // });
            await axios.delete(`https://notesappapi-m3nt.onrender.com/api/crud`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                });
            handleRetriveData();
            alert("Success!\n\nAll data deleted successfully.");
        } else {
            console.log('Deletion all canceled');

        }


    }

    // Security  ==================================>

    useEffect(() => {
        axios.get("https://notesappapi-m3nt.onrender.com/api/home/", {
        // axios.get("http://localhost:8000/api/home/", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/", { replace: true });
    };


    return (
        <>
            {/* TOP BAR */}
            <div className={style.topBar}>
                <h2>Quick Notes</h2>

                <div>
                    <button className={style.addNoteBtn} onClick={handleModalOpen}><FaPlusCircle className={style.plusIconBtn} />Add Note</button>
                    
                </div>
            </div>

            {/* Delete All */}
            <div className={style.homeDeleteAll}>
                <button className={style.deleteNoteBtn} onClick={handleDeleteAll}><MdDelete className={style.plusIconBtn} />Delete All</button>

            </div>

            {/* Log Out */}
            <div className={style.homeDeleteLogOut}>
                <button className={style.logOutNoteBtn} onClick={logout}>Log Out</button>

            </div>


            {/* MODAL PAGE */}

            {modalCheck &&
                <Modal editCheck={editCheck}
                    setEditCheck={setEditCheck}
                    handleRetriveData={handleRetriveData}
                    handleModalOpen={handleModalOpen}
                    selectText={selectText}
                    setselectText={setselectText}
                />}

            <Card notedata={notedata}
                modalCheck={modalCheck}
                handleModalOpen={handleModalOpen}
                editCheck={editCheck}
                setEditCheck={setEditCheck}
                handleRetriveData={handleRetriveData}
                setselectText={setselectText}
            />


        </>
    );
}