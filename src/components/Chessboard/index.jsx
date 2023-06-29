import React, { useRef } from "react";
import { Tile } from "../Tile";
import "./chessboard.css";
import { useState } from "react";

const verticalAxis = [1, 2, 3, 4, 5, 6, 7, 8];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const initialBoardState = [{ image: String, x: Number, y: Number }];

//Pawns
for (let i = 0; i < 8; i++) {
  initialBoardState.push({ image: "assets/images/pawn_b.png", x: i, y: 6 });
}
for (let i = 0; i < 8; i++) {
  initialBoardState.push({ image: "assets/images/pawn_w.png", x: i, y: 1 });
}

//Rocks
initialBoardState.push({ image: "assets/images/rook_b.png", x: 0, y: 7 });
initialBoardState.push({ image: "assets/images/rook_b.png", x: 7, y: 7 });

initialBoardState.push({ image: "assets/images/rook_w.png", x: 0, y: 0 });
initialBoardState.push({ image: "assets/images/rook_w.png", x: 7, y: 0 });

//Knights
initialBoardState.push({ image: "assets/images/knight_b.png", x: 1, y: 7 });
initialBoardState.push({ image: "assets/images/knight_b.png", x: 6, y: 7 });

initialBoardState.push({ image: "assets/images/knight_w.png", x: 1, y: 0 });
initialBoardState.push({ image: "assets/images/knight_w.png", x: 6, y: 0 });

//Bishops
initialBoardState.push({ image: "assets/images/bishop_b.png", x: 2, y: 7 });
initialBoardState.push({ image: "assets/images/bishop_b.png", x: 5, y: 7 });

initialBoardState.push({ image: "assets/images/bishop_w.png", x: 2, y: 0 });
initialBoardState.push({ image: "assets/images/bishop_w.png", x: 5, y: 0 });

//Queens
initialBoardState.push({ image: "assets/images/queen_b.png", x: 3, y: 7 });
initialBoardState.push({ image: "assets/images/queen_w.png", x: 4, y: 0 });

//Kings
initialBoardState.push({ image: "assets/images/king_b.png", x: 4, y: 7 });
initialBoardState.push({ image: "assets/images/king_w.png", x: 3, y: 0 });

const Chessboard = () => {
  const [activePiece, setActivePiece] =useState(null)
  const [gridX, setGridX] = useState();
  const [gridY, setGridY] = useState();
  const [pieces, setPieces] = useState(initialBoardState);
  const chessboardRef = useRef(null);
 

  function getPosition(clientX, clientY) {
    const chessboard = chessboardRef.current;
    const chessboardRect = chessboard.getBoundingClientRect();

    const offsetX = clientX - chessboardRect.left;
    const offsetY = clientY - chessboardRect.top - 600;

    const tileX = Math.floor(offsetX / 75);
    const tileY = Math.abs(Math.ceil(offsetY / 75));

    return { x: tileX, y: tileY };
  }

  function grabPiece(e) {
    const element = e.target;
    const chessboard = chessboardRef.current;

    if (element.classList.contains("chess-pieces") && chessboard) {
      const { x, y } = getPosition(e.clientX, e.clientY);
      setGridX(x);
      setGridY(y);
      const X = e.clientX - 50;
      const Y = e.clientY - 50;
      element.style.position = "absolute";
      element.style.left = `${X}px`;
      element.style.top = `${Y}px`;

      setActivePiece(element)

    }
  }

  function movePiece(e) {
    const chessboard = chessboardRef.current;

    if (activePiece && chessboard) {
      const minX = chessboard.offsetLeft - 25;
      const minY = chessboard.offsetTop - 25;
      const maxX = chessboard.offsetLeft + chessboard.offsetWidth - 75;
      const maxY = chessboard.offsetTop + chessboard.offsetHeight - 75;
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      activePiece.style.position = "absolute";

      if (x < minX) {
        activePiece.style.left = `${minX}px`;
      } else if (x > maxX) {
        activePiece.style.left = `${maxX}px`;
      } else {
        activePiece.style.left = `${x}px`;
      }

      if (y < minY) {
        activePiece.style.top = `${minY}px`;
      } else if (y > maxY) {
        activePiece.style.top = `${maxY}px`;
      } else {
        activePiece.style.top = `${y}px`;
      }
    }
  }

  function dropPiece(e) {
    const chessboard = chessboardRef.current;
    const { x, y } = getPosition(e.clientX, e.clientY);
    console.log(x, y);

    if (activePiece && chessboard) {
      setPieces((value) => {
        const pieces = value.map((p) => {
          if (p.x === gridX && p.y === gridY) {
            p.x = x;
            p.y = y;
          }
          return p;
        });
        return pieces;
      });
      setActivePiece(null);
    }
  }

  let board = [];

  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      const key = `${j}-${i}`;
      const number = j + i + 2;
      let image = undefined;

      pieces.forEach((piece) => {
        if (piece.x === i && piece.y === j) {
          image = piece.image;
        }
      });

      board.push(<Tile key={key} image={image} number={number} />);
    }
  }

  return (
    <div
      className="chessBoard"
      onMouseDown={(e) => grabPiece(e)}
      onMouseMove={(e) => movePiece(e)}
      onMouseUp={(e) => dropPiece(e)}
      ref={chessboardRef}
    >
      {board}
    </div>
  );
};

export default Chessboard;
