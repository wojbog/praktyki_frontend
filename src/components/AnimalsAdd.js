import React from "react";
import { useState, useEffect } from "react";
import Input from "./Input";
import { useForm } from "react-hook-form";
import { addAnimal } from "../service";

const AnimalsAdd = () => {
    const [wSpecies, setWSpecies] = useState("cattle");//state SpecieAnimal field

    useEffect(() => {
        if (wSpecies === "cattle") {
            setValue("breedAnimal", "MM");
        } else {
            setValue("breedAnimal", "PBZ");
        }
    }, [wSpecies]);

    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
    } = useForm({ mode: "onSubmit" });

    const onSubmit = async (data) => {
        await addAnimal(data);
    };

    const changeSpecie = (event) => {
        setWSpecies(event.target.value);
    };

    return (
        <div>
            <form
                id="add-animal-form"
                className="form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1>Dodaj Zwierzę</h1>
                <div>
                    <div className="input-holder-animal">
                        <div>
                            <label>Status Zawierzęcia</label>
                            <br />
                            <select
                                {...register("statusAnimal")}
                                className="normal-input form-select"
                            >
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
                            <Input
                                id="numberAnimal"
                                name="numberAnimal"
                                placeholder="Wpisz numer"
                                register={register("numberAnimal", {
                                    required: {
                                        value: true,
                                        message: "To pole nie może być puste!",
                                    },
                                })}
                                isError={errors.numberAnimal}
                                invMsgDirection="right"
                                className="normal-input"
                            />
                        </div>
                    </div>
                    <br></br>
                    <div className="input-holder-animal">
                        <div>
                            <label>Płeć</label>
                            <br />
                            <select
                                {...register("sexAnimal")}
                                className="normal-input form-select"
                            >
                                <option value="male">samiec</option>
                                <option value="female">samica</option>
                            </select>
                        </div>
                        <div>
                            <label className="label-top">Data Urodzenia</label>
                            <Input
                                id="birthDateAnimal"
                                name="birthDateAnimal"
                                type="date"
                                register={register("birthDateAnimal", {
                                    required: {
                                        value: true,
                                        message: "To pole nie może być puste!",
                                    },
                                })}
                                isError={errors.birthDateAnimal}
                                invMsgDirection="right"
                                className="normal-input"
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
                                data-testid="specieAnimal"
                                onChange={changeSpecie}
                            >
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
                                    data-testid="breed-cattle"
                                    className="normal-input form-select"
                                >
                                    <option value="MM">MM</option>
                                    <option value="SM">SM</option>
                                    <option value="HO">HO</option>
                                    <option value="RW">RW</option>
                                </select>
                            )}
                            {wSpecies === "pig" && (
                                <select
                                    {...register("breedAnimal")}
                                    data-testid="breed-pig"
                                    className="normal-input form-select"
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
                                <option value="combined">Kombinowany</option>
                                <option value="meat">Mięsny</option>
                                <option value="milk">Mleczny</option>
                            </select>
                        </div>
                        <div>
                            <label>Numer Matki</label>
                            <br />
                            <Input
                                id="numberMotherAnimal"
                                name="numberMotherAnimal"
                                placeholder="Wpisz numer"
                                register={register("numberMotherAnimal", {
                                    required: {
                                        value: true,
                                        message: "To pole nie może być puste!",
                                    },
                                })}
                                isError={errors.numberMotherAnimal}
                                invMsgDirection="right"
                                className="normal-input"
                            />
                        </div>
                    </div>
                    <br></br>
                    <div className="input-holder-animal">
                        <input
                            type="submit"
                            form="add-animal-form"
                            id="add-animal-submit"
                            className="submit"
                            value="Dodaj"
                            data-testid="add-animal-submit"
                            style={{ backgroundColor: "#ea1b15" }}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AnimalsAdd;
