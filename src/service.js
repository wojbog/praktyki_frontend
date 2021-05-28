import axios from "axios";

const HOST = "127.0.0.1";
const PORT = "3001";

let authenticated = false;
let token =""
/** Send createUser request
 * @param user user object
 * @return null if success, error if it occurred
 */
export const createUser = async (user) => {
    return await axios
        .post(
            `http://${HOST}:${PORT}/createUser`,
            { ...user },
            { "Content-Type": "application/json" },
            { timeout: 3000 }
        )
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

/** Send login request
 *
 * @param user user object
 * @return null if success, error if it occurred
 */

export const login = async (user) => {
    return await axios
        .post(
            `http://${HOST}:${PORT}/login`,
            { ...user },
            { "Content-Type": "application/json" },
            { timeout: 3000 }
        )
        .then((response) => {
            authenticated = true;
            token=response.data.token
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const isAuthenticated = () => {
    return authenticated;
};

export const isAddressNumber = (number) => {
    const pattern = /^\d+[a-zA-Z]*$/;
    return pattern.test(number);
};

export const isPostCode = (post_code) => {
    const pattern = /^\d{2}-\d{3}$/;
    return pattern.test(post_code);
};

export const getAnimals = async (data) => {
    return await axios
        .get(`http://${HOST}:${PORT}/getAnimals`, {
            params: { ...data },
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            return response.data;
        })
        .catch(() => {
            return "error";
        });
};

export const addAnimal = async (data) => {
    return await axios
        .post(
            `http://${HOST}:${PORT}/animal`,
            { ...data },
            {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            { timeout: 3000 }
        )
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const deleteAnimal = async (data) => {
    return await axios
        .post(
            `http://${HOST}:${PORT}/deleteAnimal`,
            { ...data },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const updateAnimal=async(data)=>{
    console.log("wait")
}
