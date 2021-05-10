import { act, fireEvent, getByDisplayValue, render} from '@testing-library/react'
import RegisterForm from '../components/RegisterForm'

describe("Proper registration", () => {
    describe("with valid inputs", () => {
        it('calls the createUser function', async () => {
            const properUser = {
                "name": "Andrzej",
                "surname":"Andrzej",
                "email": "adnrzej_andrzej@wp.pl",
                "street": "Warszawska",
                "number": "13B",
                "city":"Łódź",
                "post_code": "60-601",
                "pass": "Haasło1!",
                "pass-confirmation" :"Haasło1!"
            }

            const mockCreateUser = jest.fn()
            const component = render(<RegisterForm createUser={mockCreateUser}/>)

            await act(async () => {
                for (const [key, value] of Object.entries(properUser)) {
                    const inputNode = component.getByTestId(key)
                    await act(async ()=> {
                        fireEvent.change(inputNode, {target: {value: value}})
                    })
                }
            })
            await act(async () => {
                fireEvent.click(component.getByDisplayValue("Zarejestruj się!"))
            })

            expect(mockCreateUser).toHaveBeenCalled()

        })  
    })

    describe("with invalid inputs", () => {
        it('doesnt calls the createUser function', async () => {
            const properUser = {
                "name": "Andrzej",
                "surname":"Andrzej",
                "email": ".adnrzej_andrzej@wp.pl",
                "street": "Warszawska",
                "number": "13B",
                "city":"Łódź",
                "post_code": "760-601",
                "pass": "Haasło1!",
                "pass-confirmation" :"Haasło1!"
            }

            const mockCreateUser = jest.fn()
            const component = render(<RegisterForm createUser={mockCreateUser}/>)

            await act(async () => {
                for (const [key, value] of Object.entries(properUser)) {
                    const inputNode = component.getByTestId(key)
                    await act(async ()=> {
                        fireEvent.change(inputNode, {target: {value: value}})
                    })
                }
            })
            await act(async () => {
                fireEvent.click(component.getByDisplayValue("Zarejestruj się!"))
            })
            expect(mockCreateUser).not.toHaveBeenCalled()
        })  
    })
})