import { act, fireEvent, render } from "@testing-library/react";
import LoginForm from "../components/LoginForm";
import { MemoryRouter } from "react-router-dom";
import { login } from "../service";

jest.mock("../service", () => ({
    ...jest.requireActual("../service.js"),
    login: jest.fn(),
}));

describe("Proper login process", () => {
    describe("with proper values", () => {
        it("calls login function", async () => {
            const component = render(
                <MemoryRouter>
                    <LoginForm />
                </MemoryRouter>
            );

            await act(async () => {
                const emailNode = component.getByTestId("email");
                const passNode = component.getByTestId("pass");
                await act(async () => {
                    fireEvent.change(emailNode, {
                        target: { value: "amumu@wp.pl" },
                    });
                });
                await act(async () => {
                    fireEvent.change(passNode, {
                        target: { value: "Paswordt1!" },
                    });
                });
            });
            await act(async () => {
                fireEvent.click(component.getByDisplayValue("Zaloguj się"));
            });
            expect(login).toHaveBeenCalled();
        });
    });

    describe("with blank email", () => {
        it("doesnt call login function and shows proper message", async () => {
            const component = render(
                <MemoryRouter>
                    <LoginForm />
                </MemoryRouter>
            );

            await act(async () => {
                const emailNode = component.getByTestId("email");
                const passNode = component.getByTestId("pass");
                await act(async () => {
                    fireEvent.change(emailNode, { target: { value: "" } });
                });
                await act(async () => {
                    fireEvent.change(passNode, {
                        target: { value: "Paswordt1!" },
                    });
                });
            });

            await act(async () => {
                fireEvent.click(component.getByDisplayValue("Zaloguj się"));
            });
            expect(login).not.toHaveBeenCalled();
        });
    });

    describe("with blank password", () => {
        it("doesnt call login function and shows proper message", async () => {
            const component = render(
                <MemoryRouter>
                    <LoginForm />
                </MemoryRouter>
            );
            await act(async () => {
                const emailNode = component.getByTestId("email");
                const passNode = component.getByTestId("pass");
                await act(async () => {
                    fireEvent.change(emailNode, {
                        target: { value: "amumu@wp.pl" },
                    });
                });
                await act(async () => {
                    fireEvent.change(passNode, { target: { value: "" } });
                });
            });

            await act(async () => {
                fireEvent.click(component.getByDisplayValue("Zaloguj się"));
            });
            expect(login).not.toHaveBeenCalled();
        });
    });

    describe("with both blank inputs", () => {
        it("doesnt call login function and shows proper message", async () => {
            const component = render(
                <MemoryRouter>
                    <LoginForm />
                </MemoryRouter>
            );
            await act(async () => {
                const emailNode = component.getByTestId("email");
                const passNode = component.getByTestId("pass");
                await act(async () => {
                    fireEvent.change(emailNode, { target: { value: "" } });
                });
                await act(async () => {
                    fireEvent.change(passNode, { target: { value: "" } });
                });
            });
            await act(async () => {
                fireEvent.click(component.getByDisplayValue("Zaloguj się"));
            });
            const warnings = component.getAllByTestId("invalid-msg");

            expect(warnings.length).toBe(2);
            expect(warnings[1].textContent).toBe("To pole nie może być puste!");
            expect(warnings[0].textContent).toBe("To pole nie może być puste!");
            expect(login).not.toHaveBeenCalled();
        });
    });

    describe("with invalid email", () => {
        it("doesnt call login function and shows proper message", async () => {
            const component = render(
                <MemoryRouter>
                    <LoginForm />
                </MemoryRouter>
            );
            await act(async () => {
                const emailNode = component.getByTestId("email");
                const passNode = component.getByTestId("pass");
                await act(async () => {
                    fireEvent.change(emailNode, {
                        target: { value: "@u@wp.pl" },
                    });
                });
                await act(async () => {
                    fireEvent.change(passNode, {
                        target: { value: "Paswordt1!" },
                    });
                });
            });

            await act(async () => {
                fireEvent.click(component.getByDisplayValue("Zaloguj się"));
            });
            const warnings = component.getAllByTestId("invalid-msg");

            expect(warnings.length).toBe(1);
            expect(warnings[0].textContent).toBe(
                "To nie jest poprawny e-mail!"
            );
            expect(login).not.toHaveBeenCalled();
        });
    });
    describe("with incorret password or email error", () => {
        it("shows proper message", async () => {
            login.mockResolvedValue("incorret password or email");
            const component = render(
                <MemoryRouter>
                    <LoginForm />
                </MemoryRouter>
            );
            await act(async () => {
                const emailNode = component.getByTestId("email");
                const passNode = component.getByTestId("pass");
                await act(async () => {
                    fireEvent.change(emailNode, {
                        target: { value: "u@wp.pl" },
                    });
                });
                await act(async () => {
                    fireEvent.change(passNode, {
                        target: { value: "Paswordt1!" },
                    });
                });
            });

            await act(async () => {
                fireEvent.click(component.getByDisplayValue("Zaloguj się"));
            });

            const warnings = component.getAllByTestId("invalid-msg");

            expect(warnings.length).toBe(1);
            expect(warnings[0].textContent).toBe(
                "Ups, coś poszło nie tak. Spróbuj ponownie później"
            );
        });
    });
});
