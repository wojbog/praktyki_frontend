import React from "react";
import { useState, useEffect } from "react";
import AnimalsAdd from "./AnimalsAdd";
import AnimalsGet from "./AnimalsGet";

const AnimalsSideBarNav = () => {
    const [whatForm, setForm] = useState(false);//fasle if AnimalsGet, true if AnimalsAdd
    const [whatFromStr, setWhatFormStr] = useState("Filtruj");//set text on button

    useEffect(() => {
        if (whatFromStr === "Dodaj") {
            setWhatFormStr("Filtruj");
        } else {
            setWhatFormStr("Dodaj");
        }
    }, [whatForm]);

    const setWhatForm = () => {
        setForm((prevWhatForm) => !prevWhatForm);
    };

    return (
        <div className="AnimalsNavBar">
            <div style={{height:"700px"}}>{!whatForm ? <AnimalsGet /> : <AnimalsAdd />}</div>
           
                    <div className="input-holder-animal">
                        <label className="switch">
                            <input type="checkbox" onChange={setWhatForm} />
                            <span className="slider">
                                <div className={`${whatForm ? "form1" : "form2"}`}>
                                    {whatFromStr}
                                </div>
                            </span>
                        </label>
                    </div>
                </div>
    );
};

export default AnimalsSideBarNav;
