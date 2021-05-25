import { act, fireEvent, render } from "@testing-library/react";
import AnimalsGet from "../components/AnimalsGet";
import { getAnimals } from "../service";

jest.mock("../service", () => ({
    ...jest.requireActual("../service.js"),
    getAnimals: jest.fn(),
}));

describe("test AnimalsGet component", () => {
    it("after submition call getAnimals", async () => {
        const component = render(<AnimalsGet />);
        await act(async () => {
            fireEvent.click(component.getByTestId("get-animal-submit"));
        });
        expect(getAnimals).toHaveBeenCalled();
    });
    describe("change breed options after change Specie", () => {
        it("choose cattle", async () => {
            const component = render(<AnimalsGet />);
            await act(async () => {
                fireEvent.change(component.getByTestId("specieAnimal"), {
                    target: { value: "cattle" },
                });
            });
            expect(component.getByTestId("breed-cattle")).toBeTruthy();
        });
        it("choose pig", async () => {
            const component = render(<AnimalsGet />);
            await act(async () => {
                fireEvent.change(component.getByTestId("specieAnimal"), {
                    target: { value: "pig" },
                });
            });
            expect(component.getByTestId("breed-pig")).toBeTruthy();
        });
        it("choose all", async () => {
            const component = render(<AnimalsGet />);
            await act(async () => {
                fireEvent.change(component.getByTestId("specieAnimal"), {
                    target: { value: "all" },
                });
            });
            expect(component.getByTestId("breed-all")).toBeTruthy();
        });
    });
});
