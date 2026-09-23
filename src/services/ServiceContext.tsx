import {
    createContext,
    useContext,
    type ReactNode,
} from "react";
import {container} from "./container.ts";


const ContainerContext =
    createContext(container)

export function ServiceProvider({
                                    children,
                                }: {
    children: ReactNode;
}) {
    return (
        <ContainerContext.Provider value={container}>
            {children}
        </ContainerContext.Provider>
    );
}

export function useContainer() {
    return useContext(ContainerContext)
}
