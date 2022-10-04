import { createContext } from "react";

export interface IUsarDataContext{

}

const userDataContext = createContext<any | null>(null);

export default userDataContext;