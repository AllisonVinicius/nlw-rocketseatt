// import { Home } from "./pages/Home";
import { createContext, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { auth, firebase } from "./services/firebase";
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

export const AuthContext = createContext({} as any);

function App() {
  const [user, setUser] = useState();

  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider(); //autenticacao com google

    auth.signInWithPopup(provider).then((result) => {
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
    });
  }

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, signInWithGoogle }}>
        <Route path="/" exact component={Home} />
        <Route path="/roooms/new" component={NewRoom} />
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
