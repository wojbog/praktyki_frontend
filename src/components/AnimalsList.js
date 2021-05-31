import React from "react";
import { deleteAnimal } from "../service.js";
import { useState } from "react";

const AnimalsList = ({ listAnimals, deleteOneAnimal, setValue }) => {
    const changeTable = async (id) => {
        deleteAnimal(listAnimals[id]);
        deleteOneAnimal(id);
    };

    const RowAnimals = (animal, index) => {
        const [state, setstate] = useState(false);
        const [wSpecies, setWSpecies] = useState(animal.species); //state SpecieAnimal field

        const ediTable = (id) => {
            setstate(true);
        };

        const changeMotherSeries = (event) => {
            listAnimals[index].motherSeries = event.target.value;
            setValue([...listAnimals]);
        };
        const changeBreed = (event) => {
            listAnimals[index].breed = event.target.value;
            setValue([...listAnimals]);
        };
        const changeSex = (event) => {
            listAnimals[index].sex = event.target.value;
            setValue([...listAnimals]);
        };

        const changeStatus = (event) => {
            listAnimals[index].status = event.target.value;
            setValue([...listAnimals]);
        };
        const changeUtilitytype = (event) => {
            listAnimals[index].utilityType = event.target.value;
            setValue([...listAnimals]);
        };

        const changeDate = (event) => {
            listAnimals[index].birthDate = event.target.value;
            setValue([...listAnimals]);
        };

        const confimRow = (id) => {
            setstate(false);
            // updateAnimal(listAnimals[id]);
        };

        const changeSpecie = (event) => {
            setWSpecies(event.target.value);
            listAnimals[index].species = event.target.value;
            if (event.target.value === "cattle") {
                listAnimals[index].breed = "MM";
            } else {
                listAnimals[index].breed = "PBZ";
            }
            setValue([...listAnimals]);
        };

        return (
            <tr key={index}>
                <td width="50px">{index + 1}</td>
                <td width="200px">{animal.series}</td>
                {!state ? (
                    <>
                        <td width="150px">{animal.birthDate}</td>
                        <td width="100px">
                            {animal.species === "cattle" ? "bydło" : "świnia"}
                        </td>
                        <td width="100px">{animal.breed}</td>
                        <td width="100px">
                            {animal.sex === "male" ? "samiec" : "samica"}
                        </td>
                        <td width="100px">
                            {(animal.utilityType === "meat" && "Mięsny") ||
                                (animal.utilityType === "milk" && "Mleczny") ||
                                (animal.utilityType === "combined" &&
                                    "Kombinowany")}
                        </td>
                        <td width="200px">
                            {(animal.status === "current" &&
                                "obecnia na stanie") ||
                                (animal.status === "sold" && "Sprzedane") ||
                                (animal.status === "carrion" && "padlina")}
                        </td>
                        <td width="200px">{animal.motherSeries}</td>
                    </>
                ) : (
                    <>
                        <td>
                            <input
                                type="date"
                                defaultValue={animal.birthDate}
                                onChange={changeDate}
                            />
                        </td>
                        <td>
                            <select
                                defaultValue={animal.species}
                                onChange={changeSpecie}
                            >
                                <option value="cattle">bydło</option>
                                <option value="pig">świnia</option>
                            </select>
                        </td>
                        <td>
                            {wSpecies === "cattle" && (
                                <select
                                    defaultValue={animal.breed}
                                    data-testid="breed-cattle"
                                    onChange={changeBreed}
                                >
                                    <option value="MM">MM</option>
                                    <option value="SM">SM</option>
                                    <option value="HO">HO</option>
                                    <option value="RW">RW</option>
                                </select>
                            )}
                            {wSpecies === "pig" && (
                                <select
                                    defaultValue={animal.breed}
                                    data-testid="breed-pig"
                                    onChange={changeBreed}
                                >
                                    <option value="PBZ">
                                        Biała zwisłoucha
                                    </option>
                                    <option value="WBP">
                                        Wielka biała polska
                                    </option>
                                    <option value="PUL">Puławska</option>
                                    <option value="ZB">Złotnicka biała</option>
                                </select>
                            )}
                        </td>
                        <td>
                            <select
                                defaultValue={animal.sex}
                                onChange={changeSex}
                            >
                                <option value="male">samiec</option>
                                <option value="female">samica</option>
                            </select>
                        </td>
                        <td>
                            <select
                                defaultValue={animal.utilityType}
                                onChange={changeUtilitytype}
                            >
                                <option value="combined">Kombinowany</option>
                                <option value="meat">Mięsny</option>
                                <option value="milk">Mleczny</option>
                            </select>
                        </td>
                        <td>
                            <select
                                defaultValue={animal.status}
                                onChange={changeStatus}
                            >
                                <option value="sold">Sprzedane</option>
                                <option value="current">
                                    Obecnie na satnie
                                </option>
                                <option value="carrion">Padlina</option>
                            </select>
                        </td>
                        <td>
                            <input
                                onChange={changeMotherSeries}
                                defaultValue={animal.motherSeries}
                            />
                        </td>
                    </>
                )}
                <td>
                    <button id="btnDelete">
                        <i
                            className="material-icons"
                            id="iconDelete"
                            onClick={() => changeTable(index)}
                        >
                            delete
                        </i>
                    </button>
                    <button id="btnDelete">
                        {!state ? (
                            <i
                                className="material-icons"
                                onClick={() => ediTable(index)}
                            >
                                edit
                            </i>
                        ) : (
                            <i
                                className="material-icons"
                                onClick={() => confimRow(index)}
                            >
                                check
                            </i>
                        )}
                    </button>
                </td>
            </tr>
        );
    };

    return (
        <div className="AnimalsListForm">
            <div className="tablebody">
                <table>
                    <thead>
                        <tr>
                            <th>Lp.</th>
                            <th>Numer Identyfikacyjny</th>
                            <th>Data Urodzenia</th>
                            <th>Gatunek</th>
                            <th>Rasa</th>
                            <th>Płeć</th>
                            <th>Typ użytkowy</th>
                            <th>Status</th>
                            <th>Numer Identyfikacyjny Matki</th>
                            <th></th>
                        </tr>
                    </thead>
                    {listAnimals ? (
                        <tbody>{listAnimals.map(RowAnimals)}</tbody>
                    ) : (
                        <span>Nie ma jeszcze zwierząt</span>
                    )}
                </table>
            </div>
        </div>
    );
};

export default AnimalsList;
