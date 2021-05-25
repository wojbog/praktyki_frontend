import { act, fireEvent, render } from "@testing-library/react";
import AnimalsAdd from "../components/AnimalsAdd";
import { addAnimal } from "../service";

jest.mock("../service", () => ({
    ...jest.requireActual("../service.js"),
    addAnimal: jest.fn(),
}));

describe("test AnimalsAdd component", () => {
    it("try add new animal without data", async () => {
        const component = render(<AnimalsAdd />);

        await act(async () => {
            fireEvent.click(component.getByTestId("add-animal-submit"));
        });
        expect(addAnimal).not.toHaveBeenCalled();

        const warnings = component.getAllByTestId("invalid-msg");
        expect(warnings.length).toBe(3);
        expect(warnings[0].textContent).toBe("To pole nie może być puste!");
        expect(warnings[1].textContent).toBe("To pole nie może być puste!");
        expect(warnings[2].textContent).toBe("To pole nie może być puste!");
    });
    it("after submition call addAnimals", async () => {
        const component = render(<AnimalsAdd />);
        await act(async () => {
            await act(async () => {
                const inputNodeM = component.getByTestId("numberMotherAnimal");
                fireEvent.change(inputNodeM, {
                    target: { value: "PL005231505072" },
                });
            });
            await act(async () => {
                const inputNodeN = component.getByTestId("numberAnimal");

                fireEvent.change(inputNodeN, {
                    target: { value: "PL005324788795" },
                });
            });

            await act(async () => {
                const inputNodeB = component.getByTestId("birthDateAnimal");

                fireEvent.change(inputNodeB, {
                    target: { value: '2020-05-04' },
                });
            });
        });

        await act(async () => {
            fireEvent.click(component.getByTestId("add-animal-submit"));
        });
        expect(addAnimal).toHaveBeenCalled();
    });
    describe("change breed options after change Specie", () => {
        it("choose cattle", async () => {
            const component = render(<AnimalsAdd />);
            await act(async () => {
                fireEvent.change(component.getByTestId("specieAnimal"), {
                    target: { value: "cattle" },
                });
            });
            expect(component.getByTestId("breed-cattle")).toBeTruthy();
        });
        it("choose pig", async () => {
            const component = render(<AnimalsAdd />);
            await act(async () => {
                fireEvent.change(component.getByTestId("specieAnimal"), {
                    target: { value: "pig" },
                });
            });
            expect(component.getByTestId("breed-pig")).toBeTruthy();
        });
    });
});
