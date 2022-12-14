import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Dice from "./Components/Dice/Dice";
import RollDiceBtn from "./Components/RollBtn/RollDiceBtn";
import NewGameBtn from "./Components/NewGameBtn/NewGameBtn";
import Confetti from 'react-confetti'
import Header from "./Components/Header/Header";
import "./Tenzified.css";
import Manual from "./Components/Manual/Manual";

export default function Tenzified() {

	let [dices, setDices] = useState(generateInitialDices());
	let [tenzified,setTenzified] = useState(false);
	let [isAllHeld,setIsAllHeld] = useState(false);

	useEffect(()=>{
		checkTenzified();
		checkIfAllHeld();
	},[dices])

	function generateInitialDices() {
		let newDices = [];
		for(let i=0;i<10;i++) {
			newDices.push(generateNewDiceItem());
		}
		return newDices;;
	}

	function generateNewDiceSet() {
			playSound('audio/dice-roll.mp3');
			setDices((prev) => {
				return prev.map((item) => {
					if (item.isHeld)
						return item;
					else
						return generateNewDiceItem();
				});
			});
	}

	function generateNewGame() {

		playSound('audio/new-game.mp3');

		setTenzified(false);
		setDices(generateInitialDices());
	}

	function generateNewDiceItem() {
		var newDice = {
			id: nanoid(),
			value: Math.ceil(Math.random() * 6),
			isHeld: false
		}
		return newDice;
	}

	function makeDiceHeld(event,id) {

		event.target.classList.remove('animate__tada');
		event.target.classList.add('animate__heartBeat');

		playSound('audio/dice-click.mp3');

		setDices((prev)=>{
			return prev.map((item)=>{
				if(item.id == id){
					item.isHeld = true;
				}
				return item;
			});
		});
	}

	function checkTenzified() {
		let selectedValue = dices.find(dice=>dice.isHeld ? true : false);
		
		let isTenzified = dices.every((dice)=>{
			if(dice.isHeld && dice.value === selectedValue.value)
				return true;
			else	
				return false;
		})

		if(isTenzified){
			playSound('audio/victory.mp3');
			setTenzified(isTenzified);
		}
	}

	function checkIfAllHeld() {
		let isAllHeld = dices.every((dice) => {
			if (dice.isHeld)
				return true;
			else
				return false;
		})
		setIsAllHeld(isAllHeld);
	}

	function playSound(file){
		let audio = new Audio(file);
		audio.play();
	}

	let diceElements = dices.map((item) => {
		return <Dice key={item.id} diceId={item.id} value={item.value} isHeld={item.isHeld} clickHandler={makeDiceHeld} />
		}
	);

	return (
		<div className="tenzified-app">
			<div className="header-container">
				<Header/>
				<Manual/>
			</div>
			<div className='dice-container'>
				{diceElements}
			</div>
			<div className="btn-container">
				{(!tenzified && !isAllHeld) && <RollDiceBtn clickHandler={generateNewDiceSet}/>}
				<NewGameBtn clickHandler={generateNewGame} />
			</div>
			{tenzified && <Confetti />}
		</div>
	)
}