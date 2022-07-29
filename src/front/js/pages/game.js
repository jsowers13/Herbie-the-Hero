import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { useNavigate } from "react-router-dom";
import "../../styles/game.css";

export const Game = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [herbieHP, setHerbieHP] = useState(100);
  const [monsterHP, setMonsterHP] = useState(12);
  const [activityText, setActivityText] = useState("");
  const [herbieDefending, setHerbieDefending] = useState(false);
  const [finalAttackAvail, setFinalAttackAvail] = useState(true);
  const maxHerbieHP = 100;
  const maxMonsterHP = 100;
  var partingShot = () => {
    //If the monster is defeated by Herbie, it gets a chance to either perform a final attack to try and take down Herbie with it, or heal itself to stay in the fight

    console.log("Taking a parting shot...");
    let atkPwr = 0;
    let healAmt = 0;
    let random = Math.random();
    let chance = Math.round(Math.random() * 2);
    if (chance == 1) {
      console.log("Monster Desperate Attack");
      atkPwr = Math.floor(Math.random() * 5) + 15;
      setHerbieHP(herbieHP - atkPwr);
      alert(
        `Monster Deperately Attacked in its Final Throes! ${atkPwr} damage to Herbie!`
      );
    }
    if (chance == 2) {
      console.log("Monster Tries to Keep Itself Upright");
      healAmt = maxMonsterHP / 4;
      setMonsterHP(monsterHP + healAmt);
      alert(`Monster Casts Cure! Monster Heals for ${healAmt} HP!`);
    }
    setFinalAttackAvail(false);
  };
  if (monsterHP <= 0) {
    setMonsterHP(0);
    if (!finalAttackAvail) {
      alert("Monster has been defeated! Congratulations Herbie!");
      navigate("/");
    } else {
      partingShot();
    }
  }
  if (herbieHP <= 0) {
    setHerbieHP(0);
    alert("Oh No! Herbie has fallen in battle!");
    navigate("/");
  }
  var herbieAttack = () => {
    var atkPwr = Math.round(Math.random() * 10 + 1);
    setMonsterHP(monsterHP - atkPwr);
    alert(`Herbie Attacked for ${atkPwr} HP!`);
    monsterAttack();
  };
  var herbieHeal = () => {
    var healPwr = Math.round(Math.random() * (5 - 3 + 1)) + 3;

    if (herbieHP + healPwr >= maxHerbieHP) {
      setHerbieHP(maxHerbieHP);
      alert(`Herbie Healed to Full Health!`);
    } else {
      setHerbieHP(herbieHP + healPwr);
      alert(`Herbie Healed for ${healPwr} HP!`);
      monsterAttack();
    }
  };
  var herbieDefend = () => {
    setHerbieDefending(true);
    alert(`Herbie is bracing for the next attack!`);
    monsterAttack();
  };
  var monsterAttack = () => {
    var atkPwr = 0;
    var diceRoll = Math.floor(Math.random() * 100) + 1;
    //This functionality allows the monster to attack more fiercely as it loses health, simulating the monster becoming more agitated and desperate
    if (monsterHP <= maxMonsterHP / 8) {
      diceRoll = 100;
    } else if (monsterHP <= maxMonsterHP / 4) {
      diceRoll = Math.floor(Math.random() * 41) + 60;
    }
    console.log(`Monster rolled a ${diceRoll} for attack`);
    //As the attack dice roll gets higher, the damage the monster can deal per attack goes up as well
    if (diceRoll < 60) {
      atkPwr = Math.round(Math.random() * 5) + 1;
    } else if (diceRoll >= 60 && diceRoll < 90) {
      atkPwr = Math.floor(Math.random() * 6) + 5;
    } else if (diceRoll > 90) {
      atkPwr = Math.floor(Math.random() * 6) + 10;
    }

    var blockedPwr = Math.floor(atkPwr / 2);

    if (herbieDefending) {
      setHerbieHP(herbieHP - blockedPwr);
      alert(
        `Monster Attacked! Herbie Blocked! ${blockedPwr} damage to Herbie.`
      );
    } else if (!herbieDefending) {
      setHerbieHP(herbieHP - atkPwr);
      alert(`Monster Attacked for ${atkPwr} HP!`);
    }

    setHerbieDefending(false);
  };
  var partingShot = () => {
    //If the monster is defeated by Herbie, it gets a chance to either perform a final attack to try and take down Herbie with it, or heal itself to stay in the fight
    console.log("Taking a parting shot...");
    let atkPwr = 0;
    let healAmt = 0;
    let random = Math.random();
    let chance = Math.round(Math.random() * 2);
    if (chance == 1) {
      console.log("Monster Desperate Attack");
      atkPwr = Math.floor(Math.random() * 5) + 15;
      setHerbieHP(herbieHP - atkPwr);
      alert(
        `Monster Deperately Attacked in its Final Throes! ${atkPwr} damage to Herbie!`
      );
    }
    if (chance == 2) {
      console.log("Monster Tries to Keep Itself Upright");
      healAmt = maxMonsterHP / 4;
      setMonsterHP(monsterHP + healAmt);
      alert(`Monster Casts Cure! Monster Heals for ${healAmt} HP!`);
    }
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
