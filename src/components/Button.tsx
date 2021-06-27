import { ButtonHTMLAttributes } from "react"; //atributos do botao pode receber
import "../styles/button.scss";

type BuuttonProps = ButtonHTMLAttributes<HTMLButtonElement>; //tipagem global

export function Button(props: BuuttonProps) {
  return <button className="button" {...props} />; //spread operator, pega todas propriedas
}
