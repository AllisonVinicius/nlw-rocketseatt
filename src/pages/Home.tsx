import { useHistory } from "react-router-dom";
import { useState, FormEvent } from "react";

import illustrationImg from "../assets/images/illustration.svg";
import logo from "../assets/images/logo.svg";
import googleIcon from "../assets/images/google-icon.svg";

import { database } from "../services/firebase";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";

import "../styles/auth.scss";

export function Home() {
  const history = useHistory(); //hook para nvegar
  // const { value, setValue } = useContext(); //recuperar o valor de um contesto para utilizar em outros compoenntes

  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState("");

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    history.push("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === "") {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get(); //busca a sala

    if (!roomRef.exists()) {
      //verifica se existe a sala
      alert("ROmm does not existe");

      return;
    }
    if (roomRef.val().endedAt) {
      alert("romm alreadry closed");
      return;
    }

    history.push(`/rooms/${roomCode}`);
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
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o codigo da sala"
              onChange={(event) => {
                setRoomCode(event.target.value);
              }}
              value={roomCode}
            />
            <input type="text" placeholder="digige codigo sala" />
            <Button type="submit">entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
