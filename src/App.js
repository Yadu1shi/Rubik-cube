import React, { useState } from 'react';
import { Rubikcube } from './components/Rubikcube'; // Adjust path as needed
import './App.css';

const App = () => {
  const [cube, setCube] = useState(new Rubikcube());
  const [scrambleMoves, setScrambleMoves] = useState([]);

  const handleRotate = (face) => {
    const newCube = new Rubikcube();
    Object.assign(newCube.faces, JSON.parse(JSON.stringify(cube.faces))); // Deep copy
    newCube.rotateFace(face);
    setCube(newCube);
    newCube.printFace(); // For console debugging
  };

  const handleScramble = () => {
    const newCube = new Rubikcube();
    Object.assign(newCube.faces, JSON.parse(JSON.stringify(cube.faces))); // Deep copy
    newCube.scramble();
    setCube(newCube);
    setScrambleMoves(newCube.scramblemoves);
    newCube.printFace(); // For console debugging
  };

  const handleSolveWhiteCross = () => {
    const newCube = new Rubikcube();
    Object.assign(newCube.faces, JSON.parse(JSON.stringify(cube.faces))); // Deep copy
    newCube.solveWhiteCross();
    setCube(newCube);
    setScrambleMoves(newCube.scramblemoves); // Show solver moves
    newCube.printFace(); // For console debugging
  };

  const getColor = (color) => {
    const colors = {
      W: 'white',
      Y: 'yellow',
      G: 'green',
      B: 'blue',
      O: 'orange',
      R: 'red',
    };
    return colors[color] || 'gray';
  };

  return (
    <>
      <div className="rubik-cube-container">
        <h1>Rubik's Cube Simulator</h1>
        <div className="cube-display">
          {Object.entries(cube.faces).map(([face, grid]) => (
            <div key={face} className="face">
              <h3>{face} Face</h3>
              <div className="grid">
                {grid.map((row, rowIndex) => (
                  <div key={rowIndex} className="row">
                    {row.map((cell, colIndex) => (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        className="cell"
                        style={{ backgroundColor: getColor(cell) }}
                      ></div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="controls">
          {['F', 'B', 'T', 'D', 'L', 'R'].map((face) => (
            <button key={face} onClick={() => handleRotate(face)}>
              Rotate {face}
            </button>
          ))}
          <button onClick={handleScramble}>Scramble</button>
          <button onClick={handleSolveWhiteCross}>Solve White Cross</button>
        </div>
        {scrambleMoves.length > 0 && (
          <div>
            <h3>Moves:</h3>
            <p>{scrambleMoves.join(', ')}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default App;