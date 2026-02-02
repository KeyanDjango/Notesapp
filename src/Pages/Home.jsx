import React, { useEffect, useState } from 'react';
import '../App.css';
import style from './Home.module.css';
import { FaAdjust } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import Modal from './Modal';
import Card from './Card';


export default function Home() {
    const [modalCheck, setModalCheck] = useState(false);
    function handleModalOpen() {
        setModalCheck(!modalCheck)
    }

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
            
            {/* MODAL PAGE */}

            {modalCheck && <Modal modalCheckfun={handleModalOpen} />}

            <Card />


        </>
    );
}