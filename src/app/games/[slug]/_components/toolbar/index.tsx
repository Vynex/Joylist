"use client";

import { useState } from "react";
import Toggle from "@/components/toggle";

import AppsIcon from "@/assets/icons/apps.svg";
import MailIcon from "@/assets/icons/mail.svg";
import styles from "./index.module.css";

export default function Toolbar({ gameId }: { gameId: number }) {
  const [ played, setPlayed ] = useState(() => checkLocalStorage("played", gameId));
  const [ wished, setWished ] = useState(() => checkLocalStorage("wished", gameId));

  function handlePlayed() {
    setPlayed(!played);
    setLocalStorage("played", gameId, !played);
  }

  function handleWished() {
    setWished(!wished);
    setLocalStorage("wished", gameId, !wished);
  }

  return (
    <div className={styles.actions}>
      <Toggle active={played} onClick={handlePlayed} Icon={AppsIcon}>Played</Toggle>
      <Toggle active={wished} onClick={handleWished} Icon={MailIcon}>Wishlist</Toggle>
    </div>
  )
}

function checkLocalStorage(key: "played" | "wished", game: number) {
  const allGames = localStorage.getItem(key);
  const parsed = allGames ? JSON.parse(allGames) : [];

  return parsed.includes(game);
}

function setLocalStorage(key: "played" | "wished", game: number, add = true) {
  const allGames = localStorage.getItem(key);
  let parsed = allGames ? JSON.parse(allGames) : [];

  if (add && !parsed.includes(game)) parsed.push(game);
  else if (!add) parsed = parsed.filter((id: number) => id !== game);

  localStorage.setItem(key, JSON.stringify(parsed));
}
