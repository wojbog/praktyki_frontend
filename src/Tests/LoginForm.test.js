import { act, fireEvent, render } from "@testing-library/react";
import LoginForm from "../components/LoginForm";
import { MemoryRouter } from "react-router-dom";

describe("Proper login process", () => {
    describe("with proper values", () => {
        it("calls login function", async () => {
            const mockLogin = jest.fn();
            const component = render(
                <MemoryRouter>
                    <LoginForm login={mockLogin} />
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
            expect(mockLogin).toHaveBeenCalled();
        });
    });

    describe("with blank email", () => {
        it("doesnt call login function and shows proper message", async () => {
            const mockLogin = jest.fn();
            const component = render(
                <MemoryRouter>
                    <LoginForm login={mockLogin} />
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
            expect(mockLogin).not.toHaveBeenCalled();
        });
    });

    describe("with blank password", () => {
        it("doesnt call login function and shows proper message", async () => {
            const mockLogin = jest.fn();
            const component = render(
                <MemoryRouter>
                    <LoginForm login={mockLogin} />
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
            expect(mockLogin).not.toHaveBeenCalled();
        });
    });

    describe("with both blank inputs", () => {
        it("doesnt call login function and shows proper message", async () => {
            const mockLogin = jest.fn();
            const component = render(
                <MemoryRouter>
                    <LoginForm login={mockLogin} />
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
            expect(mockLogin).not.toHaveBeenCalled();
        });
    });

    describe("with invalid email", () => {
        it("doesnt call login function and shows proper message", async () => {
            const mockLogin = jest.fn();
            const component = render(
                <MemoryRouter>
                    <LoginForm login={mockLogin} />
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
            expect(mockLogin).not.toHaveBeenCalled();
        });
    });
});
