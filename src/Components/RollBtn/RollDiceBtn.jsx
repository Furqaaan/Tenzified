import "./RollDiceBtn.css"

export default function RollBtn(props) {
	return (
		<button className="roll-dice-btn" type="button" onClick={props.clickHandler}>ROLL DICES</button>
	);
}