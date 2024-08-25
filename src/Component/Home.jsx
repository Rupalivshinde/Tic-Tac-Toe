import React, { useState } from 'react';
import './Home.css';
import circle from '/circle.png';
import cross from '/cross.png';

function Home() {
    const [board, setBoard] = useState(Array(9).fill(""));
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);

    const toggle = (e, num) => {
        if (lock || board[num]) return; // Prevent further clicks on a filled or locked board

        const newBoard = [...board];
        if (count % 2 === 0) {
            newBoard[num] = 'x';
            e.target.innerHTML = `<img src="${cross}" alt="X">`;
        } else {
            newBoard[num] = 'o';
            e.target.innerHTML = `<img src="${circle}" alt="O">`;
        }
        setBoard(newBoard);
        setCount(count + 1);

        // Check for a winner after each move
        checkWinner(newBoard);
    };

    const checkWinner = (board) => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                setLock(true); // Lock the board if there's a winner
                alert(`Player ${board[a].toUpperCase()} wins!`);
                return;
            }
        }

        if (board.every(cell => cell)) {
            alert("It's a draw!");
            setLock(true); // Lock the board on a draw
        }
    };

    const handleReset = () => {
        setBoard(Array(9).fill(""));
        setCount(0);
        setLock(false);
        document.querySelectorAll('.boxes').forEach(box => box.innerHTML = "");
    };

    return (
        <div>
            <div className="container">
                <h1 className="title">
                    Tic Tac <span>Toe</span>
                </h1>
                <div className="board">
                    {board.map((_, index) => (
                        <div
                            key={index}
                            className="boxes"
                            onClick={(e) => toggle(e, index)}
                        ></div>
                    ))}
                </div>
                <button className="reset" onClick={handleReset}>
                    Reset
                </button>
            </div>
        </div>
    );
}

export default Home;
