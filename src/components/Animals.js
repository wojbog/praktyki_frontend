import React from "react";
import AnimalsList from "./AnimalsList";
import AnimalsSideBarNav from "./AnimalsSideBarNav";
import { useState } from "react";

const DefaultData = {
    series: "brak danych",
    birthDate: "2018-02-01",
    species: "pig",
    breed: "WBP",
    sex: "male",
    utilityType: "meat",
    status: "current",
    motherSeries: "PL1587697",
};

const DefaultData2 = {
    series: "brak danych",
    birthDate: "2018-02-01",
    species: "pig",
    breed: "WBP",
    sex: "male",
    utilityType: "meat",
    status: "current",
    motherSeries: "PL1587697",
};

const Animals = () => {
    const [listAnimals, setListAnimals] = useState([DefaultData,DefaultData2]);

    const deleteAnimal = (index) => {
        let prelistAnimals = listAnimals;
        prelistAnimals.splice(index, 1);
        setListAnimals([...prelistAnimals]);
    };
    return (
        <div>
            <div className="Animals">
                <AnimalsSideBarNav setList={setListAnimals} />
                <AnimalsList
                    listAnimals={listAnimals}
                    deleteOneAnimal={deleteAnimal}
                    setValue={setListAnimals}
                />
            </div>
        </div>
    );
};

export default Animals;
