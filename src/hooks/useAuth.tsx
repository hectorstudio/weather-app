import { useState, createContext, useContext, useEffect } from "react";

const API_KEY = 'b57c7bcac59b39cff79973afafaea67d';

export interface IAuthObject {
  email: string;
  password: string;
}

const authContext = createContext({ authed: false, login: (obj: IAuthObject): boolean => false });

// useAuth hook  defineds app authorization state, if API is stored into localStorage, authed state will be set as true
const useAuth = () => {
  const [authed, setAuthed] = useState<boolean>(false);
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (accessToken && accessToken !== '') { // If accessToken is valid...
      setAuthed(true);
    }
  }, [accessToken])

  return {
    authed,
    login: (obj: IAuthObject) => {
      // TODO: Login Action
      localStorage.setItem('accessToken', API_KEY);
      setAuthed(true);
      return true;
    }
  };
}

export function AuthProvider(props: { children: JSX.Element; }) {
  const { children } = props;
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return useContext(authContext);
}