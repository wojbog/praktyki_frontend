import axios from "axios";
import { useState } from "react";

const HOST = "127.0.0.1";
const PORT = "3001";

let authenticated = false;
/** Send createUser request
 * @param user user object
 * @return null if success, error if it occurred
 */
export const createUser = async (user) => {
    try {
        const response = await axios.post(
            `https://${HOST}:${PORT}/createUser`,
            { user: user },
            { timeout: 2000 },
            { wihCredentials: true }
        );
        const obj = JSON.parse(response);
        if (obj.success) {
            return null;
        } else {
            return obj.error;
        }
    } catch (error) {
        return error;
    }
};

/** Send login request
 *
 * @param user user object
 * @return null if success, error if it occurred
 */

export const login = async (user) => {
    try {
        const response = await axios.post(
            `https://${HOST}:${PORT}/login`,
            { user: user },
            { timeout: 2000 }
        );
        const obj = JSON.parse(response);
        if (obj.success) {
            authenticated = true;
            return null;
        } else {
            return obj.error;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
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
