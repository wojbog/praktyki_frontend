import { act, fireEvent, render } from "@testing-library/react";
import RegisterForm from "../components/RegisterForm";
import { createUser } from "../service";

jest.mock("../service", () => ({
    ...jest.requireActual("../service.js"),
    createUser: jest.fn(),
}));

describe("Proper registration", () => {
    describe("with valid inputs", () => {
        it("calls the createUser function", async () => {
            const properUser = {
                name: "Andrzej",
                surname: "Andrzej",
                email: "adnrzej_andrzej@wp.pl",
                street: "Warszawska",
                number: "13B",
                city: "Łódź",
                post_code: "60-601",
                pass: "Haasło1!",
                pass_confirmation: "Haasło1!",
            };

            const component = render(<RegisterForm />);
            //  createUser.mockResolvedValue(null);

            await act(async () => {
                for (const [key, value] of Object.entries(properUser)) {
                    const inputNode = component.getByTestId(key);
                    await act(async () => {
                        fireEvent.change(inputNode, {
                            target: { value: value },
                        });
                        inputNode.blur();
                    });
                }
            });
            await act(async () => {
                fireEvent.click(
                    component.getByDisplayValue("Zarejestruj się!")
                );
            });

            expect(createUser).toHaveBeenCalled();
        });

        it("render success message", async () => {
            const properUser = {
                name: "Andrzej",
                surname: "Andrzej",
                email: "adnrzej_andrzej@wp.pl",
                street: "Warszawska",
                number: "13B",
                city: "Łódź",
                post_code: "60-601",
                pass: "Haasło1!",
                pass_confirmation: "Haasło1!",
            };

            const component = render(<RegisterForm />);
            let obj={
                success:true
            }
            createUser.mockReturnValue(obj);

            await act(async () => {
                for (const [key, value] of Object.entries(properUser)) {
                    const inputNode = component.getByTestId(key);
                    await act(async () => {
                        fireEvent.change(inputNode, {
                            target: { value: value },
                        });
                    });
                }
            });
            await act(async () => {
                fireEvent.click(
                    component.getByDisplayValue("Zarejestruj się!")
                );
            });

            expect(component.getByTestId("registration-succeed")).toBeTruthy();
        });
    });

    describe("with invalid name", () => {
        it("doesnt call the createUser function and shows proper message", async () => {
            const invUser = {
                name: "2ojO!",
                surname: "Andrzej",
                email: "adnrzej_andrzej@wp.pl",
                street: "Warszawska",
                number: "13B",
                city: "Łódź",
                post_code: "60-601",
                pass: "Haasło1!",
                pass_confirmation: "Haasło1!",
            };

            const component = render(<RegisterForm />);

            await act(async () => {
                for (const [key, value] of Object.entries(invUser)) {
                    const inputNode = component.getByTestId(key);
                    await act(async () => {
                        fireEvent.change(inputNode, {
                            target: { value: value },
                        });
                    });
                }
            });
            await act(async () => {
                fireEvent.click(
                    component.getByDisplayValue("Zarejestruj się!")
                );
            });
            expect(createUser).not.toHaveBeenCalled();

            const warnings = component.getAllByTestId("invalid-msg");
            expect(warnings.length).toBe(1);
            expect(warnings[0].textContent).toBe("Wpisz prawidłowe imię!");
        });
    });

    describe("with invalid surname", () => {
        it("doesnt call the createUser function and shows proper message", async () => {
            const invUser = {
                name: "Andrzej",
                surname: "i'm hacker B)",
                email: "adnrzej_andrzej@wp.pl",
                street: "Warszawska",
                number: "13B",
                city: "Łódź",
                post_code: "70-601",
                pass: "Haasło1!",
                pass_confirmation: "Haasło1!",
            };

            const component = render(<RegisterForm createUser={createUser} />);

            await act(async () => {
                for (const [key, value] of Object.entries(invUser)) {
                    const inputNode = component.getByTestId(key);
                    await act(async () => {
                        fireEvent.change(inputNode, {
                            target: { value: value },
                        });
                    });
                }
            });
            await act(async () => {
                fireEvent.click(
                    component.getByDisplayValue("Zarejestruj się!")
                );
            });
            expect(createUser).not.toHaveBeenCalled();

            const warnings = component.getAllByTestId("invalid-msg");
            expect(warnings.length).toBe(1);
            expect(warnings[0].textContent).toBe("Wpisz prawidłowe nazwisko!");
        });
    });

    describe("with invalid email", () => {
        it("doesnt call the createUser function and shows proper message", async () => {
            const invUser = {
                name: "Andrzej",
                surname: "Andrzej",
                email: "dropDatabase()",
                street: "Warszawska",
                number: "13B",
                city: "Łódź",
                post_code: "60-601",
                pass: "Haasło1!",
                pass_confirmation: "Haasło1!",
            };

            const component = render(<RegisterForm createUser={createUser} />);

            await act(async () => {
                for (const [key, value] of Object.entries(invUser)) {
                    const inputNode = component.getByTestId(key);
                    await act(async () => {
                        fireEvent.change(inputNode, {
                            target: { value: value },
                        });
                    });
                }
            });
            await act(async () => {
                fireEvent.click(
                    component.getByDisplayValue("Zarejestruj się!")
                );
            });
            expect(createUser).not.toHaveBeenCalled();

            const warnings = component.getAllByTestId("invalid-msg");
            expect(warnings.length).toBe(1);
            expect(warnings[0].textContent).toBe("E-mail jest nieprawidłowy!");
        });
    });
    describe("with invalid street", () => {
        it("doesnt call the createUser function and shows proper message", async () => {
            const invUser = {
                name: "Andrzej",
                surname: "Andrzej",
                email: "adnrzej_andrzej@wp.pl",
                street: "virus.jpg",
                number: "7",
                city: "Łódź",
                post_code: "60-601",
                pass: "Haasło1!",
                pass_confirmation: "Haasło1!",
            };

            const component = render(<RegisterForm createUser={createUser} />);

            await act(async () => {
                for (const [key, value] of Object.entries(invUser)) {
                    const inputNode = component.getByTestId(key);
                    await act(async () => {
                        fireEvent.change(inputNode, {
                            target: { value: value },
                        });
                    });
                }
            });
            await act(async () => {
                fireEvent.click(
                    component.getByDisplayValue("Zarejestruj się!")
                );
            });
            expect(createUser).not.toHaveBeenCalled();

            const warnings = component.getAllByTestId("invalid-msg");
            expect(warnings.length).toBe(1);
            expect(warnings[0].textContent).toBe("Ulica jest nieprawidłowa!");
        });
    });
    describe("with invalid number", () => {
        it("doesnt call the createUser function and shows proper message", async () => {
            const invUser = {
                name: "Andrzej",
                surname: "Andrzej",
                email: "adnrzej_andrzej@wp.pl",
                street: "Warszawska",
                number: "siedem",
                city: "Łódź",
                post_code: "60-601",
                pass: "Haasło1!",
                pass_confirmation: "Haasło1!",
            };

            const component = render(<RegisterForm createUser={createUser} />);

            await act(async () => {
                for (const [key, value] of Object.entries(invUser)) {
                    const inputNode = component.getByTestId(key);
                    await act(async () => {
                        fireEvent.change(inputNode, {
                            target: { value: value },
                        });
                    });
                }
            });
            await act(async () => {
                fireEvent.click(
                    component.getByDisplayValue("Zarejestruj się!")
                );
            });
            expect(createUser).not.toHaveBeenCalled();

            const warnings = component.getAllByTestId("invalid-msg");
            expect(warnings.length).toBe(1);
            expect(warnings[0].textContent).toBe("Numer jest nieprawidłowy!");
        });
    });

    describe("with invalid city", () => {
        it("doesnt call the createUser function and shows proper message", async () => {
            const invUser = {
                name: "Andrzej",
                surname: "Andrzej",
                email: "adnrzej_andrzej@wp.pl",
                street: "Warszawska",
                number: "74",
                city: "select * from users--hehe",
                post_code: "60-601",
                pass: "Haasło1!",
                pass_confirmation: "Haasło1!",
            };

            const component = render(<RegisterForm createUser={createUser} />);

            await act(async () => {
                for (const [key, value] of Object.entries(invUser)) {
                    const inputNode = component.getByTestId(key);
                    await act(async () => {
                        fireEvent.change(inputNode, {
                            target: { value: value },
                        });
                    });
                }
            });
            await act(async () => {
                fireEvent.click(
                    component.getByDisplayValue("Zarejestruj się!")
                );
            });
            expect(createUser).not.toHaveBeenCalled();

            const warnings = component.getAllByTestId("invalid-msg");
            expect(warnings.length).toBe(1);
            expect(warnings[0].textContent).toBe(
                "Nazwa miasta jest nieprawidłowa!"
            );
        });
    });

    describe("with invalid post_code", () => {
        it("doesnt call the createUser function and shows proper message", async () => {
            const invUser = {
                name: "Andrzej",
                surname: "Andrzej",
                email: "adnrzej_andrzej@wp.pl",
                street: "Warszawska",
                number: "19C",
                city: "Łódź",
                post_code: "grrr",
                pass: "Haasło1!",
                pass_confirmation: "Haasło1!",
            };

            const component = render(<RegisterForm createUser={createUser} />);

            await act(async () => {
                for (const [key, value] of Object.entries(invUser)) {
                    const inputNode = component.getByTestId(key);
                    await act(async () => {
                        fireEvent.change(inputNode, {
                            target: { value: value },
                        });
                    });
                }
            });
            await act(async () => {
                fireEvent.click(
                    component.getByDisplayValue("Zarejestruj się!")
                );
            });
            expect(createUser).not.toHaveBeenCalled();

            const warnings = component.getAllByTestId("invalid-msg");
            expect(warnings.length).toBe(1);
            expect(warnings[0].textContent).toBe(
                "Kod pocztowy musi być w formacie: __-___"
            );
        });
    });

    describe("with too weak password", () => {
        it("doesnt call the createUser function and shows proper message", async () => {
            const invUser = {
                name: "Andrzej",
                surname: "Andrzej",
                email: "adnrzej_andrzej@wp.pl",
                street: "Warszawska",
                number: "13B",
                city: "Łódź",
                post_code: "60-601",
                pass: "hasło",
                pass_confirmation: "hasło",
            };

            const component = render(<RegisterForm createUser={createUser} />);

            await act(async () => {
                for (const [key, value] of Object.entries(invUser)) {
                    const inputNode = component.getByTestId(key);
                    await act(async () => {
                        fireEvent.change(inputNode, {
                            target: { value: value },
                        });
                    });
                }
            });
            await act(async () => {
                fireEvent.click(
                    component.getByDisplayValue("Zarejestruj się!")
                );
            });
            expect(createUser).not.toHaveBeenCalled();

            const warnings = component.getAllByTestId("invalid-msg");
            expect(warnings.length).toBe(1);
            expect(warnings[0].textContent).toBe("Hasło jest za słabe!");
        });
    });
    describe("with wrong password confirmation", () => {
        it("doesnt call the createUser function and shows proper message", async () => {
            const invUser = {
                name: "Kamil",
                surname: "Ślimak",
                email: "coolslimak@wp.pl",
                street: "Warszawska",
                number: "13B",
                city: "Łódź",
                post_code: "60-601",
                pass: "Haasło1!",
                pass_confirmation: "cotoznaczyconfirmation",
            };

            const component = render(<RegisterForm createUser={createUser} />);

            await act(async () => {
                for (const [key, value] of Object.entries(invUser)) {
                    const inputNode = component.getByTestId(key);
                    await act(async () => {
                        fireEvent.change(inputNode, {
                            target: { value: value },
                        });
                    });
                }
            });
            await act(async () => {
                fireEvent.click(
                    component.getByDisplayValue("Zarejestruj się!")
                );
            });
            expect(createUser).not.toHaveBeenCalled();

            const warnings = component.getAllByTestId("invalid-msg");
            expect(warnings.length).toBe(1);
            expect(warnings[0].textContent).toBe("Hasła się nie zgadzają!");
        });
    });

    describe("with responseError", () => {
        it("shows proper message", async () => {
            const invUser = {
                name: "Maaan",
                surname: "Andrzej",
                email: "adnrzejmMaaaan@wp.pl",
                street: "Warszawska",
                number: "13B",
                city: "Łódź",
                post_code: "76-601",
                pass: "Haasło1!",
                pass_confirmation: "Haasło1!",
            };

            createUser.mockReturnValue("validation error");
            const component = render(<RegisterForm createUser={createUser} />);

            await act(async () => {
                for (const [key, value] of Object.entries(invUser)) {
                    const inputNode = component.getByTestId(key);
                    await act(async () => {
                        fireEvent.change(inputNode, {
                            target: { value: value },
                        });
                    });
                }
            });
            await act(async () => {
                fireEvent.click(
                    component.getByDisplayValue("Zarejestruj się!")
                );
            });

            const warnings = component.getAllByTestId("invalid-msg");

            expect(warnings.length).toBe(1);
            expect(warnings[0].textContent).toBe(
                "Ups, coś poszło nie tak. Spróbuj ponownie później"
            );
        });
    });
});
