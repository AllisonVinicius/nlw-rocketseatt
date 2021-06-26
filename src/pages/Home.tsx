import illustrationImg from "../assets/images/illustration.svg";
import logo from "../assets/images/logo.svg";
import googleIcon from "../assets/images/google-icon.svg";
import { Button } from "../components/Button";
import "../styles/auth.scss";

export function Home() {
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
          <button className="create-roow">
            <img src={googleIcon} alt="logo goole" />
            Crie sua Sala
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
