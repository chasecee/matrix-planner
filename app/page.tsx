"use client";
import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { ControlPanel } from "./components/ControlPanel";
import { MatrixDisplay } from "./components/MatrixDisplay";

export default function Home() {
  const [columnCount, setColumnCount] = useState(25); // Default to 24 columns
  const [lightCount, setLightCount] = useState(250); // Default to 250 lights
  const [lightStripLength, setLightStripLength] = useState(50); // Default length of each light strip
  const [lightStripsAmount, setLightStripsAmount] = useState(5); // Default amount of light strips
  const [isSerpentine, setIsSerpentine] = useState("serpentine"); // Use string value for initial state
  // Calculate lightCount based on lightStripLength and lightStripsAmount
  useEffect(() => {
    setLightCount(lightStripLength * lightStripsAmount);
  }, [lightStripLength, lightStripsAmount]);

  const generateColor = (index: number, total: number) => {
    const hue = (360 * index) / total;
    return `hsl(${hue}, 100%, 75%)`;
  };
  const lightStripColors = Array.from(
    { length: lightStripsAmount },
    (_, index) => generateColor(index, lightStripsAmount)
  );
  return (
    <main className="flex min-h-screen flex-col justify-start p-10">
      <Header title="Matrix Planner" authorLink="https://chasecee.com" />
      <ControlPanel
        lightStripLength={lightStripLength}
        setLightStripLength={setLightStripLength}
        lightStripsAmount={lightStripsAmount}
        setLightStripsAmount={setLightStripsAmount}
        columnCount={columnCount}
        setColumnCount={setColumnCount}
        isSerpentine={isSerpentine}
        setIsSerpentine={setIsSerpentine}
        lightCount={lightCount}
        setLightCount={setLightCount}
      />
      <MatrixDisplay
        columnCount={columnCount}
        lightCount={lightCount}
        lightStripLength={lightStripLength}
        lightStripsAmount={lightStripsAmount}
        isSerpentine={isSerpentine}
        lightStripColors={lightStripColors}
      />
    </main>
  );
}
