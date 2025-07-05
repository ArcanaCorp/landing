import { API_URL } from "../config"

export const accountCompleteInfo = async (formData) => {

    try {
        
        const response = await fetch(`${API_URL}/account/complete`, {
            method: 'POST',
            body: formData
        })

        const data = await response.json()

        if (!response.ok) throw new Error(data.message);
         
            return data;

    } catch (error) {
        return { ok: false, message: `Error: ${error.message}`, error: error, code: 500 }
    }

}

export const accountGetInfo = async (user) => {

    try {
        
        const response = await fetch(`${API_URL}/account`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user}`,
                'Content-type': 'application/json'
            }
        })

        const data = await response.json();

        if (!response.ok) throw new Error(data.message);

            return data;

    } catch (error) {   
        return { ok: false, message: `Error: ${error.message}`, error: error, code: 500 }
    }

}