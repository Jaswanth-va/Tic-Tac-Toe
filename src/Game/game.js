import { useState } from "react";
import "./game.css";

export default function TicTacToe() {
    const [gameStates, setGameStates] = useState([Array(9).fill(null)]);
    const [move, setMove] = useState(0);
    const grid = gameStates[move].map((tileValue, tileNo) => {
        return (
            <button key={tileNo} onClick={(e) => { clickHandler(e,tileValue, tileNo) }}
                onMouseEnter={(e) => { hover(e, tileNo) }}
                onMouseLeave={(e) => { hover(e, tileNo) }}
                className="tiles">
                {tileValue}
            </button>
        )
    })
    const player = move % 2 === 0 ? "X" : "O";
    function clickHandler(e,tileValue, tileNo) {
        e.target.classList.toggle("hover");
        if (!Boolean(winner()) && !tileValue) {
            setGameStates((prevState) => {
                prevState.splice(move + 1);
                let states = [...prevState];
                let newstate = [...prevState[prevState.length - 1]];
                newstate[tileNo] = player;
                states.push(newstate);
                return [...states];
            })
            setMove((prevMove) => {
                return (gameStates.length)
            })
        }

    }
    function hover(e, index) {
        if(!Boolean(winner())){
            if (!gameStates[move][index] && e.target.innerText === "") {
                e.target.innerText = player;
                e.target.classList.add("hover");
            }
            else if (e.target.innerText !== "" && !gameStates[move][index]) {
                e.target.innerText = "";
                e.target.classList.remove("hover");
            }
        }
    }
    let buttons = gameStates.map((gameState, move) => {
        let text;
        if (move === 0) {
            text = "game-start";
        }
        else {
            text = `move#${move}`;
        }
        return (
            <button key={move} onClick={() => { backTo(move) }}>{text}</button>)
    })
    function backTo(move) {
        document.getElementById('winner').style.display = "none";
        setMove(move)
    }
    function winner() {
        let a = gameStates[move];
        let arr = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [6, 4, 2]
        ]
        for (let pos of arr) {
            if (a[pos[0]] && a[pos[0]] === a[pos[1]] && a[pos[1]] === a[pos[2]]) {
                document.getElementById('winner').style.display = "block";
                return (`Winner is ${a[pos[0]]}`)
            }
        }
    }
    return (

        <div className="main_container">
            <h1>Tic-Tac-Toe</h1>
            <div className="grid_buttons_container">
                <div className="outer_grid">
                    <div className="grid">
                        <h2 id="winner" >{winner()}</h2>
                        {grid}
                    </div>
                </div>
            </div>
            <div className="button_div">{buttons.length === 1 ? "" : buttons}</div>
        </div>
    )
}