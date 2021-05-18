import { createUser, login, isAddressNumber, isPostCode } from "../service";
import axios from "axios";

jest.mock("axios");

describe("Validation functions properly validate", () => {
    describe("isAddresNumber", () => {
        it("with proper number returns true", async () => {
            const numbers = ["13", "15A", "18C"];
            numbers.forEach((number) => {
                expect(isAddressNumber(number)).toBe(true);
            });
        });
        it("with invalid number returns false", () => {
            const numbers = ["1A3", "A", ".18C"];
            numbers.forEach((number) => {
                expect(isAddressNumber(number)).toBe(false);
            });
        });
    });
    describe("isPostCode", () => {
        it("with strong post code returns true", async () => {
            const post_codes = ["60-125", "11-124", "33-955"];
            post_codes.forEach((post_code) => {
                expect(isPostCode(post_code)).toBe(true);
            });
        });
        it("with invalid post code returns false", async () => {
            const post_codes = ["611-111", "11_234", "999-99"];
            post_codes.forEach((post_code) => {
                expect(isPostCode(post_code)).toBe(false);
            });
        });
    });
});

describe("fetching functions return proper stuff", () => {
    describe("createUser", () => {
        it("with success returns null", async () => {
            axios.post.mockImplementationOnce(() =>
                Promise.resolve(JSON.stringify({ success: true, status: 200 }))
            );

            await expect(createUser({})).resolves.toEqual(null);
        });

        it("with response error returns value of error", async () => {
            axios.post.mockImplementationOnce(() =>
                Promise.resolve(
                    JSON.stringify({
                        success: false,
                        error: "Jesteś trochę tępy",
                        status: 440,
                    })
                )
            );

            await expect(createUser({})).resolves.toEqual("Jesteś trochę tępy");
        });

        it("with axiosError returns value of error", async () => {
            axios.post.mockImplementationOnce(() =>
                Promise.reject(new Error("Nie no odwal sie"))
            );

            await expect(createUser({})).resolves.toEqual(
                new Error("Nie no odwal sie")
            );
        });
    });

    describe("login", () => {
        it("with success returns null", async () => {
            axios.post.mockImplementationOnce(() =>
                Promise.resolve(JSON.stringify({ success: true, status: 200 }))
            );

            await expect(login({})).resolves.toEqual(null);
        });

        it("with response error returns value of error", async () => {
            axios.post.mockImplementationOnce(() =>
                Promise.resolve(
                    JSON.stringify({
                        success: false,
                        error: "Jesteś trochę tępy",
                        status: 440,
                    })
                )
            );

            await expect(login({})).resolves.toEqual("Jesteś trochę tępy");
        });

        it("with axiosError returns value of error", async () => {
            axios.post.mockImplementationOnce(() =>
                Promise.reject(new Error("Nie no odwal sie"))
            );

            await expect(login({})).resolves.toEqual(
                new Error("Nie no odwal sie")
            );
        });
    });
});
