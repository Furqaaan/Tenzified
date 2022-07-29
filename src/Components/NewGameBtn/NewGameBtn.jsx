import "./NewGameBtn.css"

export default function NewGameBtn(props) {
	return (
		<button className="new-game-btn" type="button" onClick={props.clickHandler}>START NEW GAME</button>
	);
}