import { useHistory } from "react-router-dom";
import illustrationImg from "../assets/images/illustration.svg";
import logo from "../assets/images/logo.svg";
import googleIcon from "../assets/images/google-icon.svg";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";

import "../styles/auth.scss";

export function Home() {
  const history = useHistory(); //hook para nvegar
  // const { value, setValue } = useContext(); //recuperar o valor de um contesto para utilizar em outros compoenntes
  //context permite compartilhar infor entre componentes e funcoes que podem modificar os valores
  //o que vai refletir em todos os componentes usado.
  const { user, signInWithGoogle } = useAuth();

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    history.push("/rooms/new");
  }
  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="imagem" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as duvidas</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logo} alt="lgoo" />
          <button onClick={handleCreateRoom} className="create-roow">
            <img src={googleIcon} alt="logo goole" />
            Crie sua Sala com o google
          </button>
          <div className="separator"> Ou entre na sala</div>
          <form>
            <input type="text" placeholder="digige codigo sala" />
            <Button type="submit">entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
