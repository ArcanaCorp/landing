import { createContext, useContext, useState } from "react";

const DBContext = createContext();

export const DBProvider = ({ children }) => {

    const [ filter, setFilter ] = useState('all')

    const contextValue = {
        filter,
        setFilter
    }

    return (
        <DBContext.Provider value={contextValue}>{children}</DBContext.Provider>
    )

}

export const useDB = () => useContext(DBContext);