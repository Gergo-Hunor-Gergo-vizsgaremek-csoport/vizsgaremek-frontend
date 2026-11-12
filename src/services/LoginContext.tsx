import {createContext, type ReactNode, useContext, useEffect, useState} from "react";
import type {UserReadDto} from "../dtos/UserReadDto.ts";
import {Container} from "inversify";
import {useContainer} from "./ServiceContext.tsx";
import {UserService} from "./UserService.ts";

interface LoginProps {
    user?: UserReadDto;
    setUser: (user: UserReadDto) => void;
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const LoginContext = createContext({});

export function LoginProvider({ children}: {children: ReactNode }) {

    const services: Container = useContainer();
    const userservice: UserService = services.get(UserService);
    const [user,setUser] = useState<UserReadDto | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    async function Load()
    {
        try
        {
            setUser(await userservice.getUserFromCookie());
            setIsLoggedIn(true);
        }
        catch(err)
        {
            setUser(null);
            setIsLoggedIn(false);
        }
        console.log(user);
    }

    useEffect(() => {
        Load();
    }, []);


    return (
        <LoginContext.Provider value={{user,setUser,isLoggedIn, setIsLoggedIn}}>
            {children}
        </LoginContext.Provider>
    )
}

export function useLogin():LoginProps {
    return useContext(LoginContext) as LoginProps
}