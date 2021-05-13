import { act, fireEvent, render } from "@testing-library/react"
import RegisterForm from "../components/RegisterForm"

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
            }

            const mockCreateUser = jest.fn()
            const component = render(
                <RegisterForm createUser={mockCreateUser} />
            )

            await act(async () => {
                for (const [key, value] of Object.entries(properUser)) {
                    const inputNode = component.getByTestId(key)
                    await act(async () => {
                        fireEvent.change(inputNode, {
                            target: { value: value },
                        })
                    })
                }
            })
            await act(async () => {
                fireEvent.click(component.getByDisplayValue("Zarejestruj się!"))
            })

            expect(mockCreateUser).toHaveBeenCalled()
        })
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
            }

            const mockCreateUser = jest.fn()
            mockCreateUser.mockReturnValue(null)
            const component = render(
                <RegisterForm createUser={mockCreateUser} />
            )

            await act(async () => {
                for (const [key, value] of Object.entries(properUser)) {
                    const inputNode = component.getByTestId(key)
                    await act(async () => {
                        fireEvent.change(inputNode, {
                            target: { value: value },
                        })
                    })
                }
            })
            await act(async () => {
                fireEvent.click(component.getByDisplayValue("Zarejestruj się!"))
            })

            expect(component.getByTestId("registration-succeed")).toBeTruthy()
        })
    })

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
            }

            const mockCreateUser = jest.fn()
            const component = render(
                <RegisterForm createUser={mockCreateUser} />
            )

            await act(async () => {
                for (const [key, value] of Object.entries(invUser)) {
                    const inputNode = component.getByTestId(key)
                    await act(async () => {
                        fireEvent.change(inputNode, {
                            target: { value: value },
                        })
                    })
                }
            })
            await act(async () => {
                fireEvent.click(component.getByDisplayValue("Zarejestruj się!"))
            })
            expect(mockCreateUser).not.toHaveBeenCalled()

            const warnings = component.getAllByTestId("invalid-msg")
            expect(warnings.length).toBe(2)
            expect(warnings[0].textContent).toBe("Wpisz prawidłowe imię!")
            expect(warnings[1].textContent).toBe(
                "Jedno lub więcej pól jest nieprawidłowych!"
            )
        })
    })

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
            }

            const mockCreateUser = jest.fn()
            const component = render(
                <RegisterForm createUser={mockCreateUser} />
            )

            await act(async () => {
                for (const [key, value] of Object.entries(invUser)) {
                    const inputNode = component.getByTestId(key)
                    await act(async () => {
                        fireEvent.change(inputNode, {
                            target: { value: value },
                        })
                    })
                }
            })
            await act(async () => {
                fireEvent.click(component.getByDisplayValue("Zarejestruj się!"))
            })
            expect(mockCreateUser).not.toHaveBeenCalled()

            const warnings = component.getAllByTestId("invalid-msg")
            expect(warnings.length).toBe(2)
            expect(warnings[0].textContent).toBe("Wpisz prawidłowe nazwisko!")
            expect(warnings[1].textContent).toBe(
                "Jedno lub więcej pól jest nieprawidłowych!"
            )
        })
    })

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
            }

            const mockCreateUser = jest.fn()
            const component = render(
                <RegisterForm createUser={mockCreateUser} />
            )

            await act(async () => {
                for (const [key, value] of Object.entries(invUser)) {
                    const inputNode = component.getByTestId(key)
                    await act(async () => {
                        fireEvent.change(inputNode, {
                            target: { value: value },
                        })
                    })
                }
            })
            await act(async () => {
                fireEvent.click(component.getByDisplayValue("Zarejestruj się!"))
            })
            expect(mockCreateUser).not.toHaveBeenCalled()

            const warnings = component.getAllByTestId("invalid-msg")
            expect(warnings.length).toBe(2)
            expect(warnings[0].textContent).toBe("E-mail jest nieprawidłowy!")
            expect(warnings[1].textContent).toBe(
                "Jedno lub więcej pól jest nieprawidłowych!"
            )
        })
    })

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
            }

            const mockCreateUser = jest.fn()
            const component = render(
                <RegisterForm createUser={mockCreateUser} />
            )

            await act(async () => {
                for (const [key, value] of Object.entries(invUser)) {
                    const inputNode = component.getByTestId(key)
                    await act(async () => {
                        fireEvent.change(inputNode, {
                            target: { value: value },
                        })
                    })
                }
            })
            await act(async () => {
                fireEvent.click(component.getByDisplayValue("Zarejestruj się!"))
            })
            expect(mockCreateUser).not.toHaveBeenCalled()

            const warnings = component.getAllByTestId("invalid-msg")
            expect(warnings.length).toBe(2)
            expect(warnings[0].textContent).toBe("Numer jest nieprawidłowy!")
            expect(warnings[1].textContent).toBe(
                "Jedno lub więcej pól jest nieprawidłowych!"
            )
        })
    })

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
            }

            const mockCreateUser = jest.fn()
            const component = render(
                <RegisterForm createUser={mockCreateUser} />
            )

            await act(async () => {
                for (const [key, value] of Object.entries(invUser)) {
                    const inputNode = component.getByTestId(key)
                    await act(async () => {
                        fireEvent.change(inputNode, {
                            target: { value: value },
                        })
                    })
                }
            })
            await act(async () => {
                fireEvent.click(component.getByDisplayValue("Zarejestruj się!"))
            })
            expect(mockCreateUser).not.toHaveBeenCalled()

            const warnings = component.getAllByTestId("invalid-msg")
            expect(warnings.length).toBe(2)
            expect(warnings[0].textContent).toBe(
                "Nazwa miasta jest nieprawidłowa!"
            )
            expect(warnings[1].textContent).toBe(
                "Jedno lub więcej pól jest nieprawidłowych!"
            )
        })
    })

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
            }

            const mockCreateUser = jest.fn()
            const component = render(
                <RegisterForm createUser={mockCreateUser} />
            )

            await act(async () => {
                for (const [key, value] of Object.entries(invUser)) {
                    const inputNode = component.getByTestId(key)
                    await act(async () => {
                        fireEvent.change(inputNode, {
                            target: { value: value },
                        })
                    })
                }
            })
            await act(async () => {
                fireEvent.click(component.getByDisplayValue("Zarejestruj się!"))
            })
            expect(mockCreateUser).not.toHaveBeenCalled()

            const warnings = component.getAllByTestId("invalid-msg")
            expect(warnings.length).toBe(2)
            expect(warnings[0].textContent).toBe(
                "Kod pocztowy musi być w formacie: __-___"
            )
            expect(warnings[1].textContent).toBe(
                "Jedno lub więcej pól jest nieprawidłowych!"
            )
        })
    })

    describe("with too weak password", () => {
        it("doesnt call the createUser function and shows proper message", async () => {
            const invUser = {
                name: "Andrzej",
                surname: "Andrzej",
                email: "adnrzej_andrzej@wp.pl",
                street: "Warszawska",
                number: "13B",
                city: "Łódź",
                post_code: "760-601",
                pass: "hasło",
                pass_confirmation: "hasło",
            }

            const mockCreateUser = jest.fn()
            const component = render(
                <RegisterForm createUser={mockCreateUser} />
            )

            await act(async () => {
                for (const [key, value] of Object.entries(invUser)) {
                    const inputNode = component.getByTestId(key)
                    await act(async () => {
                        fireEvent.change(inputNode, {
                            target: { value: value },
                        })
                    })
                }
            })
            await act(async () => {
                fireEvent.click(component.getByDisplayValue("Zarejestruj się!"))
            })
            expect(mockCreateUser).not.toHaveBeenCalled()

            const warnings = component.getAllByTestId("invalid-msg")
            expect(warnings.length).toBe(1)
            expect(warnings[0].textContent).toBe("Hasło jest za słabe!")
        })
    })
    describe("with wrong password confirmation", () => {
        it("doesnt call the createUser function and shows proper message", async () => {
            const invUser = {
                name: "2ojO!",
                surname: "Andrzej",
                email: ".adnrzej_andrzej@wp.pl",
                street: "Warszawska",
                number: "13B",
                city: "Łódź",
                post_code: "760-601",
                pass: "Haasło1!",
                pass_confirmation: "cotoznaczyconfirmation",
            }

            const mockCreateUser = jest.fn()
            const component = render(
                <RegisterForm createUser={mockCreateUser} />
            )

            await act(async () => {
                for (const [key, value] of Object.entries(invUser)) {
                    const inputNode = component.getByTestId(key)
                    await act(async () => {
                        fireEvent.change(inputNode, {
                            target: { value: value },
                        })
                    })
                }
            })
            await act(async () => {
                fireEvent.click(component.getByDisplayValue("Zarejestruj się!"))
            })
            expect(mockCreateUser).not.toHaveBeenCalled()

            const warnings = component.getAllByTestId("invalid-msg")
            expect(warnings.length).toBe(1)
            expect(warnings[0].textContent).toBe("Hasła się nie zgadzają!")
        })
    })

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
            }

            const mockCreateUser = jest.fn()
            mockCreateUser.mockReturnValue("validation error")
            const component = render(
                <RegisterForm createUser={mockCreateUser} />
            )

            await act(async () => {
                for (const [key, value] of Object.entries(invUser)) {
                    const inputNode = component.getByTestId(key)
                    await act(async () => {
                        fireEvent.change(inputNode, {
                            target: { value: value },
                        })
                    })
                }
            })
            await act(async () => {
                fireEvent.click(component.getByDisplayValue("Zarejestruj się!"))
            })

            const warnings = component.getAllByTestId("invalid-msg")

            expect(warnings.length).toBe(1)
            expect(warnings[0].textContent).toBe(
                "Coś poszło nie tak, spróbuj ponownie później"
            )
        })
    })
})
