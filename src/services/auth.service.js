import { API_URL } from "../config"

export const serviceAuthLogin = async (phone) => {
    try {
        
        const respoonse = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({phone})
        })

        const data = await respoonse.json();

        if (!respoonse.ok) throw new Error(data.message);

            return data;        

    } catch (error) {
        return { ok: false, message: `Error: ${error.message}`, error: error, code: 500 }
    }
}

export const serviceAuthVerify = async (code) => {
    try {
        
        const user = localStorage.getItem('c_user')
        const respoonse = await fetch(`${API_URL}/auth/verify`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({user, code})
        })

        const data = await respoonse.json();

        if (!respoonse.ok) throw new Error(data.message);

            return data;        

    } catch (error) {
        return { ok: false, message: `Error: ${error.message}`, error: error, code: 500 }
    }
}