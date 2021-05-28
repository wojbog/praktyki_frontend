import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getAnimals } from "../service";
import { useTransition, animated } from "react-spring";

const AnimalsGet = ({ setList }) => {
    const [wSpecies, setWSpecies] = useState("cattle"); //state SpecieAnimal field
    const [isResponseError, setIsResponseError] = useState(false); //true if createUser returns an error
    const [responseError, setResponseError] = useState(false); //contains displayed message of response error

    const responseErrorAnimation = useTransition(isResponseError, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 300 },
    });

    useEffect(() => {
        async function getData() {
            const error = await getAnimals();
            if (error !== "error") {
                if(error.animals!==null){
                    setList(error.animals);
                }
            } else {
                setIsResponseError(true);
                setResponseError(
                    "Ups, coś poszło nie tak. Spróbuj ponownie później"
                );
            }
        }
        getData();
    }, []);

    useEffect(() => {
        if (wSpecies === "cattle") {
            setValue("breed", "all");
        } else if (wSpecies === "pig") {
            setValue("breed", "all");
        } else {
            setValue("breed", "all");
        }
    }, [wSpecies]);

    const { handleSubmit, register, setValue } = useForm({ mode: "onSubmit" });

    const onSubmit = async (data) => {
        if (data.status === "all") delete data.status;
        if (data.series === "") delete data.series;
        if (data.minBirthDate === "") delete data.minBirthDate;
        if (data.maxBirthDate === "") delete data.maxBirthDate;
        if (data.species === "all") delete data.species;
        if (data.breed === "all") delete data.breed;
        if (data.utilityType === "all") delete data.utilityType;
        if (data.sex === "all") delete data.sex;
        if (data.motherSeries === "") delete data.motherSeries;
        if (Date.parse(data.minBirthDate) > Date.parse(data.maxBirthDate)) {
            var pom = data.maxBirthDate;
            data.maxBirthDate = data.minBirthDate;
            data.minBirthDate = pom;
        }
        const error = await getAnimals(data);
        if (error !== "error") {
            if(error.animals!==null){
                setList(error.animals);
            }
        } else {
            setIsResponseError(true);
            setResponseError(
                "Ups, coś poszło nie tak. Spróbuj ponownie później"
            );
        }
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
                                {...register("status")}
                                className="normal-input form-select"
                            >
                                <option value="all">Wszystkie</option>
                                <option value="sold">Sprzedane</option>
                                <option value="current">
                                    Obecnie na satnie
                                </option>
                                <option value="carrion">
                                    Śmierć naturalna
                                </option>
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
                                {...register("series")}
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
                                {...register("minBirthDate")}
                                type="date"
                                className="form-input normal-input"
                            />
                        </div>
                        <div className="break">-</div>
                        <div>
                            <input
                                id="maxBirthDateAnimal"
                                name="maxBirthDateAnimal"
                                {...register("maxBirthDate")}
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
                                {...register("species")}
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
                                    {...register("breed")}
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
                                    {...register("breed")}
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
                                    {...register("breed")}
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
                                {...register("utilityType")}
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
                                {...register("sex")}
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
                                {...register("motherSeries")}
                                className="form-input normal-input"
                            />
                        </div>
                    </div>
                    {responseErrorAnimation((style, item) =>
                        item ? (
                            <animated.p
                                style={style}
                                className="invalid-footage"
                                data-testid="invalid-msg"
                            >
                                {responseError}
                            </animated.p>
                        ) : (
                            ""
                        )
                    )}
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
