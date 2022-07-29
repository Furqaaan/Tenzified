import './DIce.css';

export default function Dice(props) {

	let styles = {
		backgroundColor: "#59E391",
		color: "white",
		borderBottom: "2px solid ##3bad69"
	}

	return (
		<div className="dice-item" onClick={() => props.clickHandler(props.diceId)} style={props.isHeld ? styles : {}}>
			{props.value}
		</div>
	)
}