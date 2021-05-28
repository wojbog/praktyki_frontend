import React from "react";
import { useState } from "react";
import AnimalsAdd from "./AnimalsAdd";
import AnimalsGet from "./AnimalsGet";

const AnimalsSideBarNav = ({setList}) => {
    const [isActiveSearchForm, setIsActiveSearchForm] = useState(false); //fasle if AnimalsGet, true if AnimalsAdd

    const changeForm = () => {
        setIsActiveSearchForm((prevWhatForm) => !prevWhatForm);
    };

    return (
        <div className="AnimalsNavBar">
            <div style={{ height: "700px" }}>
                {!isActiveSearchForm ? <AnimalsGet setList={setList}/> : <AnimalsAdd />}
            </div>
            <div className="button-container">
                <div
                    className={`button ${
                        isActiveSearchForm ? "active" : "inactive"
                    }  `}
                    onClick={() => {
                        if (isActiveSearchForm) {
                            changeForm();
                        }
                    }}
                >
                    <span>Filtruj</span>
                    <i style={{ fontSize: 32 }} className="material-icons">
                        manage_search
                    </i>
                </div>
                <div
                    className={`button ${
                        isActiveSearchForm ? "inactive" : "active"
                    }  `}
                    onClick={() => {
                        if (!isActiveSearchForm) {
                            changeForm();
                        }
                    }}
                >
                    <span>Dodaj</span>
                    <i style={{ fontSize: 32 }} className="material-icons">
                        add
                    </i>
                </div>
            </div>

            {/* <div className="input-holder-animal">
                <label className="switch">
                    <input type="checkbox" onChange={setWhatForm} />
                    <span className="slider">
                        <div className={`${whatForm ? "form2" : "form1"}`}>
                            {whatFromStr}
                        </div>
                    </span>
                </label>
            </div> */}
        </div>
    );
};

export default AnimalsSideBarNav;
