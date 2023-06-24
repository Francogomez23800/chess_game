import React, { useRef } from "react";
import { Tile } from "../Tile";
import "./chessboard.css";

const verticalAxis = [1, 2, 3, 4, 5, 6, 7, 8];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const pieces = [{ image: String, x: Number, y: Number }];

//Pawns
for (let i = 0; i < 8; i++) {
  pieces.push({ image: "assets/images/pawn_b.png", x: i, y: 6 });
}
for (let i = 0; i < 8; i++) {
  pieces.push({ image: "assets/images/pawn_w.png", x: i, y: 1 });
}

//Rocks
pieces.push({ image: "assets/images/rook_b.png", x: 0, y: 7 });
pieces.push({ image: "assets/images/rook_b.png", x: 7, y: 7 });

pieces.push({ image: "assets/images/rook_w.png", x: 0, y: 0 });
pieces.push({ image: "assets/images/rook_w.png", x: 7, y: 0 });

//Knights
pieces.push({ image: "assets/images/knight_b.png", x: 1, y: 7 });
pieces.push({ image: "assets/images/knight_b.png", x: 6, y: 7 });

pieces.push({ image: "assets/images/knight_w.png", x: 1, y: 0 });
pieces.push({ image: "assets/images/knight_w.png", x: 6, y: 0 });

//Bishops
pieces.push({ image: "assets/images/bishop_b.png", x: 2, y: 7 });
pieces.push({ image: "assets/images/bishop_b.png", x: 5, y: 7 });

pieces.push({ image: "assets/images/bishop_w.png", x: 2, y: 0 });
pieces.push({ image: "assets/images/bishop_w.png", x: 5, y: 0 });

//Queens
pieces.push({ image: "assets/images/queen_b.png", x: 3, y: 7 });
pieces.push({ image: "assets/images/queen_w.png", x: 4, y: 0 });

//Kings
pieces.push({ image: "assets/images/king_b.png", x: 4, y: 7 });
pieces.push({ image: "assets/images/king_w.png", x: 3, y: 0 });

const Chessboard = () => {
  const chessboardRef =useRef(null)
  let activePiece = null;

  function grabPiece(e) {
    const element = e.target;
  
    if (element.classList.contains("chess-pieces")) {
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
  
      activePiece = element;
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
      activePiece.style.position = 'absolute';
  
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
    if (activePiece) {
      activePiece = null;
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
