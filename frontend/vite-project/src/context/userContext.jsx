import React, {createContext, useState} from "react";

export const UserContext=createContext();

export const UserProvider=({children})=>{
    const [user,setUser] = useState(null);

    //functions to update user data
    const updateUser=(userData)=>{
        setUser(userData);
    };

    //fuction to clear user data;
    const clearUser = () =>{
        setUser(null);
    };
    return(
        <UserContext.Provider
        value={{
            user,
            updateUser,
            clearUser
        }}
        >{children}</UserContext.Provider>
        
    );
}

export default UserProvider;