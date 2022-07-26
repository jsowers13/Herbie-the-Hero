import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/game.css";

export const Game = () => {
  const { store, actions } = useContext(Context);
  const [herbieHP, setHerbieHP] = useState(100);
  const [monsterHP, setMonsterHP] = useState(100);
  var herbieAttack = () => {
    var atkPwr = Math.round(Math.random() * 10 + 1);
    setMonsterHP(monsterHP - atkPwr);
    console.log("Herbie Attacked for " + atkPwr + " HP!");
  };
  var monsterAttack = () => {
    var atkPwr = Math.round(Math.random() * 10 + 1);

    setHerbieHP(herbieHP - atkPwr);
    console.log("Monster Attack for " + atkPwr);
  };
  var herbieHeal = () => {
    var healPwr = Math.round(Math.random() * 5 + 3);
    setHerbieHP(herbieHP + healPwr);
    console.log("Herbie Healed");
  };

  return (
    <div className="container-fluid d-flex mx-auto">
      <div className="hero-box text-center">
        <img src={rigoImageUrl} className="rigo-pic" />
        <h1>Health Points: {herbieHP}</h1>
        <button onClick={herbieAttack}>attack</button>
        <button onClick={herbieHeal}>Heal</button>
      </div>
      <div className="monster-box text-center">
        <img
          src="https://cdn.pixabay.com/photo/2014/08/25/09/26/monster-426996__340.jpg"
          className="monster-pic"
        />
        <h1>Health Points: {monsterHP}</h1>
        <button onClick={monsterAttack}>Attack</button>
      </div>
    </div>
  );
};
