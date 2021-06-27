import { Link } from "react-router-dom";
import illustrationImg from "../assets/images/illustration.svg";
import logo from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import { FormEvent, useState } from "react";
import { database } from "../services/firebase";
import "../styles/auth.scss";

import { useAuth } from "../hooks/useAuth";

export function NewRoom() {
  const { user } = useAuth();
  const [newRoom, setNewRomm] = useState("");
  const history = useHistory();

  async function handCreateRoom(event: FormEvent) {
    event?.preventDefault(); //previni o comportamento padrao para a tela não "piscar" ao clicar
    if (newRoom.trim() === "") {
      return;
    }

    const roomRef = database.ref("rooms"); //categoria romm dentro do db

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      autorId: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`);
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

          <h2>Criar uma nova sala</h2>
          <form onSubmit={handCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => setNewRomm(event.target.value)} //pegar o evento adicionado no input,valor de entrada
            />
            <Button type="submit">Criar Sala</Button>
          </form>
          <p>
            Quer entrar sala exitente<Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
