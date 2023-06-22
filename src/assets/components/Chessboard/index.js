import React from "react";
import './chessboard.css'

const verticalAxis = [1, 2, 3, 4, 5, 6, 7, 8];
const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

function Chessboard() {
    let board = [];

    for (let j = verticalAxis.length - 1; j >= 0; j--) {
        for (let i = 0; i < horizontalAxis.length; i++) {
            const number = j + i + 2

            if (number % 2 === 0) {
                board.push(
                    <span className="black-tile">{horizontalAxis[i]}{verticalAxis[j]}</span>);
            } else {
                board.push(
                    <span className="white-tile">{horizontalAxis[i]}{verticalAxis[j]}</span>);
            }


        }
    }

    return (
        <div className="chessBoard">
            {board}
        </div>
    );
}
export { Chessboard }