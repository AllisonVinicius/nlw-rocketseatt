import { ButtonHTMLAttributes } from "react";

type BuuttonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: BuuttonProps) {
  return <button className="button" {...props} />;
}
