import { act, fireEvent, render, screen } from "@testing-library/react"
import { createMemoryHistory } from "history"
import { MemoryRouter } from "react-router"
import { isAuthenticated } from "../service"

import App from "../App"
import RegisterForm from "../components/RegisterForm"
import LoginForm from "../components/LoginForm"
import Nothing from "../components/Nothing"

jest.mock("../service")
jest.mock("../components/LoginForm")
jest.mock("../components/RegisterForm")
jest.mock("../components/Nothing")

describe("Routs correctly when user isn't logged in", () => {
    it("Renders LoginForm on /logowanie route", async () => {
        isAuthenticated.mockResolvedValue(false)
        LoginForm.mockImplementation(() => <div>LoginFormMock</div>)

        render(
            <MemoryRouter initialEntries={["/logowanie"]}>
                <App />
            </MemoryRouter>
        )
        expect(screen.getByText("LoginFormMock")).toBeInTheDocument
    })

    it("Renders RegisterForm on /rejestracja route", async () => {
        isAuthenticated.mockResolvedValue(false)
        RegisterForm.mockImplementation(() => <div>RegisterFormMock</div>)

        render(
            <MemoryRouter initialEntries={["/rejestracja"]}>
                <App />
            </MemoryRouter>
        )
        expect(screen.getByText("RegisterFormMock")).toBeInTheDocument
    })
})
