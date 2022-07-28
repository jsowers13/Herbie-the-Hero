import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/game.css";

export const Game = () => {
  const { store, actions } = useContext(Context);
  const [herbieHP, setHerbieHP] = useState(100);
  const [monsterHP, setMonsterHP] = useState(100);
  const [activityText, setActivityText] = useState("");
  const [herbieDefending, setHerbieDefending] = useState(false);
  const maxHerbieHP = 100;
  var herbieAttack = () => {
    var atkPwr = Math.round(Math.random() * 10 + 1);
    setMonsterHP(monsterHP - atkPwr);
    setActivityText(`Herbie Attacked for ${atkPwr} HP!`);
  };
  var herbieHeal = () => {
    var healPwr = Math.round(Math.random() * (5 - 3 + 1)) + 3;

    if (herbieHP + healPwr >= maxHerbieHP) {
      setHerbieHP(maxHerbieHP);
      setActivityText(`Herbie Healed to Full Health!`);
    } else {
      setHerbieHP(herbieHP + healPwr);
      setActivityText(`Herbie Healed for ${healPwr} HP!`);
    }
  };
  var herbieDefend = () => {
    setHerbieDefending(true);
    setActivityText(`Herbie is bracing for the next attack!`);
  };
  var monsterAttack = () => {
    var diceRoll = Math.floor(Math.random() * 100) + 1;

    var atkPwr = Math.round(Math.random() * 10) + 1;
    var blockedPwr = Math.floor(atkPwr / 2);

    if (herbieDefending) {
      setHerbieHP(herbieHP - blockedPwr);
      setActivityText(
        `Monster Attacked! Herbie Blocked! ${blockedPwr} damage to Herbie.`
      );
    } else if (herbieDefending == false) {
      setHerbieHP(herbieHP - atkPwr);
      setActivityText(`Monster Attacked for ${atkPwr} HP!`);
    }

    setHerbieDefending(false);
  };

  return (
    <div className="container bg-danger d-flex flex-column align-items-center">
      <div className="w-100 bg-primary d-flex">
        <div className="hero-box text-center">
          <img src={rigoImageUrl} className="rigo-pic" />
          <h1>Health Points: {herbieHP}</h1>
          <button onClick={herbieAttack}>attack</button>
          <button onClick={herbieHeal}>Heal</button>
          <button onClick={herbieDefend}>Block</button>
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
      <div className="row bg-success text-center">
        <h1 className="col-12">{activityText}</h1>
      </div>
    </div>
  );
};
