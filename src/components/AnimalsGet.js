import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getAnimals } from "../service";

const AnimalsGet = () => {
    const [wSpecies, setWSpecies] = useState("cattle");//state SpecieAnimal field

    useEffect(() => {
        if (wSpecies === "cattle") {
            setValue("breedAnimal", "all");
        } else if (wSpecies === "pig") {
            setValue("breedAnimal", "all");
        } else {
            setValue("breedAnimal", "all");
        }
    }, [wSpecies]);

    const {
        handleSubmit,
        register,
        setValue,
    } = useForm({ mode: "onSubmit" });

    const onSubmit =async (data) => {
        if (data.statusAnimal === "all") delete data.statusAnimal;
        if (data.numberAnimal === "") delete data.numberAnimal;
        if (data.minBirthDateAnimal === "") delete data.minBirthDateAnimal;
        if (data.maxBirthDateAnimal === "") delete data.maxBirthDateAnimal;
        if (data.specieAnimal === "all") delete data.specieAnimal;
        if (data.breedAnimal === "all") delete data.breedAnimal;
        if (data.utilityTypeAnimal === "all") delete data.utilityTypeAnimal;
        if (data.sexAnimal === "all") delete data.sexAnimal;
        if (data.numberMotherAnimal === "") delete data.numberMotherAnimal;
        if(Date.parse(data.minBirthDateAnimal)>Date.parse(data.maxBirthDateAnimal)){
            var pom=data.maxBirthDateAnimal
            data.maxBirthDateAnimal=data.minBirthDateAnimal;
            data.minBirthDateAnimal=pom;
        }
        await getAnimals(data);
    };

    const changeWSpecies = (event) => {
        setWSpecies(event.target.value);
    };

    return (
        <div>
            <form
                id="get-animal-form"
                className="form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1>Szukaj Zwierząt</h1>
                <div>
                    <div className="input-holder-animal">
                        <div>
                            <label>Status Zawierzęcia</label>
                            <br />
                            <select
                                {...register("statusAnimal")}
                                className="normal-input form-select"
                            >
                                <option value="all">Wszystkie</option>
                                <option value="sold">Sprzedane</option>
                                <option value="current">
                                    Obecnie na satnie
                                </option>
                                <option value="carrion">Padlina</option>
                            </select>
                        </div>
                        <div>
                            <label className="label-top">
                                Numer Identyfikacyjny
                            </label>
                            <br />
                            <input
                                id="numberAnimal"
                                name="numberAnimal"
                                placeholder="Wpisz numer"
                                {...register("numberAnimal")}
                                className="form-input normal-input"
                            />
                        </div>
                    </div>
                    <br></br>
                    <div className="input-holder-animal">
                        <label>Data Urodzenia</label>
                    </div>
                    <div className="input-holder-animal">
                        <div>
                            <input
                                id="minBirthDateAnimal"
                                name="minBirthDateAnimal"
                                {...register("minBirthDateAnimal")}
                                type="date"
                                className="form-input normal-input"
                            />
                        </div>
                        <div className="break">-</div>
                        <div>
                            <input
                                id="maxBirthDateAnimal"
                                name="maxBirthDateAnimal"
                                {...register("maxBirthDateAnimal")}
                                type="date"
                                className="form-input normal-input"
                            />
                        </div>
                    </div>
                    <br></br>
                    <div className="input-holder-animal">
                        <div>
                            <label>Gatunek</label>
                            <br />
                            <select
                                id="specieAnimal"
                                {...register("specieAnimal")}
                                className="normal-input form-select"
                                onChange={changeWSpecies}
                                data-testid="specieAnimal"
                            >
                                <option value="all">Wszystkie</option>
                                <option value="cattle">bydło</option>
                                <option value="pig">świnia</option>
                            </select>
                        </div>
                        <div>
                            <label>Rasa</label>
                            <br />
                            {wSpecies === "cattle" && (
                                <select
                                    {...register("breedAnimal")}
                                    className="normal-input form-select"
                                    data-testid="breed-cattle"
                                >
                                    <option value="all">Wszystkie</option>
                                    <option value="MM">MM</option>
                                    <option value="SM">SM</option>
                                    <option value="HO">HO</option>
                                    <option value="RW">RW</option>
                                </select>
                            )}
                            {wSpecies === "pig" && (
                                <select
                                    {...register("breedAnimal")}
                                    className="normal-input form-select"
                                    data-testid="breed-pig"
                                >
                                    <option value="all">Wszystkie</option>
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
                            {wSpecies === "all" && (
                                <select
                                    {...register("breedAnimal")}
                                    className="normal-input form-select"
                                    data-testid="breed-all"
                                >
                                    <option value="all">Wszystkie</option>
                                </select>
                            )}
                        </div>
                    </div>
                    <br></br>
                    <div className="input-holder-animal">
                        <div>
                            <label>Typ użytkowy</label>
                            <br />
                            <select
                                {...register("utilityTypeAnimal")}
                                className="normal-input form-select"
                            >
                                <option value="all">Wszystkie</option>
                                <option value="combined">Kombinowany</option>
                                <option value="meat">Mięsny</option>
                                <option value="milk">Mleczny</option>
                            </select>
                        </div>
                        <div>
                            <label>Płeć</label>
                            <br />
                            <select
                                {...register("sexAnimal")}
                                className="normal-input form-select"
                            >
                                <option value="all">Wszystkie</option>
                                <option value="male">samiec</option>
                                <option value="female">samica</option>
                            </select>
                        </div>
                    </div>
                    <br />
                    <div className="input-holder-animal">
                        <div>
                            <label>Numer Matki</label>
                            <br />
                            <input
                                id="numberMotherAnimal"
                                name="numberMotherAnimal"
                                placeholder="Wpisz numer"
                                {...register("numberMotherAnimal")}
                                className="form-input normal-input"
                            />
                        </div>
                    </div>
                    <br></br>
                    <div className="input-holder-animal">
                        <input
                            type="submit"
                            form="get-animal-form"
                            id="get-animal-submit"
                            data-testid="get-animal-submit"
                            className="submit"
                            value="Filtruj"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AnimalsGet;
