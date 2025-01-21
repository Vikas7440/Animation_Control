import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [numBoxes, setNumBoxes] = useState(10);
  const [numRows, setNumRows] = useState(12);
  const [speed, setSpeed] = useState(100);
  const [isPaused, setIsPaused] = useState(false);
  const greenBlocks = 5;

  const colorGradient = [
    "#00FF00", "#32FF32", "#64FF64", "#90EE90", "#ADD8E6",
    "#87CEEB", "#4682B4", "#00008B", "#4B0082", "#800080",
    "#8B008B", "#FF1493", "#FFC0CB", "#FF69B4", "#FF4500",
    "#FF0000", "#B22222", "#8B0000",
  ];

  const [colorIndex, setColorIndex] = useState(0);

  const handleColorChange = () => {
    setColorIndex((prevIndex) => (prevIndex + 1) % colorGradient.length);
  };

  useEffect(() => {
    if (!isPaused) {
      const colorInterval = setInterval(handleColorChange, 3000);

      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          if (direction === 1 && prevIndex + 1 >= numBoxes + 1 - greenBlocks) {
            setDirection(-1);
            return prevIndex - 1;
          } else if (direction === -1 && prevIndex <= 0) {
            setDirection(1);
            return prevIndex + 1;
          }
          return prevIndex + direction;
        });
      }, speed);

      return () => {
        clearInterval(interval);
        clearInterval(colorInterval);
      };
    }
  }, [direction, numBoxes, greenBlocks, speed, isPaused]);

  const leftToRight = (opacity, color) => (
    <div
      style={{
        width: "20px",
        height: "20px",
        backgroundColor: color,
        opacity: opacity,
        border: "1px solid #222",
      }}
    ></div>
  );

  const renderRow = () => {
    return (
      <div className="flex border-1 border-slate-900">
        {Array.from({ length: numBoxes }).map((_, index) => {
          const offset = index - currentIndex;
          if (offset >= 0 && offset < greenBlocks) {
            const opacity =
              direction === 1
                ? (offset + 1) * (1 / greenBlocks)
                : 1 - offset * (1 / greenBlocks);
            return leftToRight(opacity, colorGradient[colorIndex]);
          } else {
            return <div className="w-5 h-5  border-2 border-slate-900" />;
          }
        })}
      </div>
    );
  };

  return (
    <div className="p-4 bg-indigo-500 min-h-screen max-h-screen min-w-screen max-w-screen overflow-hidden">
      <div className="mb-4">
        <h1 className="text-3xl mb-4">Animation Controls</h1>
        <div className="space-x-4">
        <div>
 {/* Number of Columns */}
<label className="text-xl w-full flex flex-col items-center">
  Number of Columns:
  <div className="flex items-center gap-2 mt-2">
    <button
      onClick={() => setNumBoxes((prev) => Math.max(1, prev - 1))}
      className="bg-red-500 text-white px-2 py-1 rounded"
    >
      -
    </button>
    <input
      type="number"
      value={numBoxes}
      onChange={(e) => setNumBoxes(Number(e.target.value))}
      min="1"
      className="border px-2 py-1 text-center w-20"
    />
    <button
      onClick={() => setNumBoxes((prev) => prev + 1)}
      className="bg-green-500 text-white px-2 py-1 rounded"
    >
      +
    </button>
  </div>
</label>

{/* Number of Rows */}
<label className="text-xl w-full flex flex-col items-center mt-4">
  Number of Rows:
  <div className="flex items-center gap-2 mt-2">
    <button
      onClick={() => setNumRows((prev) => Math.max(1, prev - 1))}
      className="bg-red-500 text-white px-2 py-1 rounded"
    >
      -
    </button>
    <input
      type="number"
      value={numRows}
      onChange={(e) => setNumRows(Number(e.target.value))}
      min="1"
      className="border px-2 py-1 text-center w-20"
    />
    <button
      onClick={() => setNumRows((prev) => prev + 1)}
      className="bg-green-500 text-white px-2 py-1 rounded"
    >
      +
    </button>
  </div>
</label>
</div>

        </div>
      </div>

      <div className="space-x-4 mb-4 m-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setSpeed((prevSpeed) => Math.max(50, prevSpeed - 20))}
        >
          Increase Speed
        </button>
        <br></br>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setSpeed((prevSpeed) => Math.min(500, prevSpeed + 20))}
        >
          Decrease Speed
        </button>
      </div>

      <div className="mb-4">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => setIsPaused((prev) => !prev)}
        >
          {isPaused ? "Play" : "Pause"}
        </button>
      </div>

      <div
        style={{
          width: `${numBoxes * 20}px`,
          height: `${numRows * 20}px`,
          overflow: "hidden",
          position: "relative",
        }}
        className="bg-black"
      >
        <div className="border-2">
          {[...Array(numRows)].map((_, rowIndex) => (
            <div key={rowIndex}>{renderRow()}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
