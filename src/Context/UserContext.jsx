import { createContext, useState } from "react";


export const UserContext = createContext();

export default function UserContextProvider(props) {

  const [token, setToken] = useState(localStorage.getItem('token'));


  return <UserContext.Provider value={{ token, setToken }}>
    {props.children}
  </UserContext.Provider>
}