import { createContext, ReactNode } from "react";
//context permite compartilhar infor entre componentes e funcoes que podem modificar os valores
//o que vai refletir em todos os componentes usado.
import { useState, useEffect } from "react";
//hooks -> createContext -> conseguir usar o contexto info em varios componentes
//useState -> armazena o valor do estado da variavel no momento
//useEffect -> disparo de efeitos colaterais(funcionalidade). dispara uma funcao sempre que algo acontecer
//uma informação mudar ou component mudar de tela.
import { auth, firebase } from "../services/firebase";

type User = {
  id: string;
  name: string;
  avatar: string;
};

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>; //toda assincrona devolve uma Promise(promessa de recebimento)
};

type AuthContextProviderProps = {
  children: ReactNode; //sempre que enviar componente do react do tipo children sempre reactNode
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  //useEffect - > usar 2 paramaetros, qual funcao executar e quando executar
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error("missing informatioc google");
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider(); //autenticacao com google
    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      if (!displayName || !photoURL) {
        throw new Error("missing informatioc google");
      }
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  }
  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}
