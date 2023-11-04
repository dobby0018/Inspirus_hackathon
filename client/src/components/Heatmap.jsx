import React, { useState, useEffect } from "react";
import {
  ReferenceDot,
  ReferenceLine,
  ReferenceArea,
  ScatterChart,
  Scatter,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";


function Heatmap(props) {
  const [locations, setLocations] = useState([]);
  const [heatSectors, setHeatSectors] = useState([]);
  const [playerName] = useState(props.playerName);
  const [vertical, setVertical] = useState(window.innerWidth <= 500);
  const [scale, setScale] = useState(vertical ? 4.5 : 4.5);

  useEffect(() => {
    const handleResize = () => {
      setVertical(window.innerWidth <= 500);
      setScale(window.innerWidth <= 500 ? 4.5 : 5);
    };

    window.addEventListener("resize", handleResize);

    const fetchData = async () => {
      const locationsData = getPositionalData(props.data, playerName);
      const sectorsData = getHeatmapSectors(locationsData, 4, 4);
      setLocations(locationsData);
      setHeatSectors(sectorsData);
    };

    fetchData();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [playerName, props.data]);

  const getPositionalData = (events, playerName) => {
    const locationsData = events
      .filter((evt) => evt.location && evt.player && evt.player.name === playerName)
      .map((evt) => ({
        x: evt.location[0],
        y: evt.location[1],
      }));
    return locationsData;
  };

  const getHeatmapSectors = (locationsData, noOfColumns, noOfRows) => {
    const sectorWidth = 120 / noOfColumns;
    const sectorHeight = 80 / noOfRows;

    let sectors = [];
    let sector = 0;
    let xCount = 0;
    while (xCount < 120) {
      let yCount = 0;
      while (yCount < 80) {
        sectors[sector] = {
          count: 0,
          x1: xCount,
          x2: xCount + sectorWidth,
          y1: yCount,
          y2: yCount + sectorHeight,
        };
        for (let loc of locationsData) {
          if (
            loc.x > xCount &&
            loc.x < xCount + sectorWidth &&
            loc.y > yCount &&
            loc.y <= yCount + sectorHeight
          ) {
            sectors[sector].count++;
          }
        }
        yCount += sectorHeight;
        sector++;
      }
      xCount += sectorWidth;
      sector++;
    }
    return sectors;
  };

  const renderScatterChart = (data, heatSectors, scale) => (
    <div className="pitch">
      <ScatterChart
        width={120 * scale}
        height={80 * scale}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <ReferenceDot x={12} y={40} r={10*scale} stroke="black" fillOpacity={0}/> {/* Left Penalty Arc */}
            <ReferenceDot x={60} y={40} r={10*scale} stroke="black" fillOpacity={0}/> {/* Center Circle */}
            <ReferenceDot x={108} y={40} r={10*scale} stroke="black" fillOpacity={0}/> {/* Right Penalty Arc */}
            <ReferenceArea x1={0} x2={18} y1={18} y2={80-18} fill="white" fillOpacity={1} stroke="black" /> {/* Left Penalty Area */}
            <ReferenceArea x1={102} x2={120} y1={18} y2={80-18} fill="white" fillOpacity={1} stroke="black" /> {/* Right Penalty Area */}
            <ReferenceArea x1={0} x2={6} y1={30} y2={80-30} fill="white" fillOpacity={1} stroke="black" /> {/* Left 6-yard Box */}
            <ReferenceArea x1={114} x2={120} y1={30} y2={80-30} fill="white" fillOpacity={1} stroke="black" /> {/* Right 6-yard box */}
            <ReferenceDot x={60} y={40} r={0.5*scale} fill="black" stroke="black"/> {/* Centre Spot */}
            <ReferenceDot x={12} y={40} r={0.5*scale} fill="black" stroke="black"/> {/* Left Penalty Spot */}
            <ReferenceDot x={108} y={40} r={0.5*scale} fill="black" stroke="black"/> {/* Right Penalty Spot */}
            {
                /* 
                    Map the various heat sectors as ReferenceAreas onto the pitch,
                    using `sector.count` to determine opacity
                */
                heatSectors.map((sector, index) => (
                    <ReferenceArea 
                        key={index}
                        x1={sector.x1}
                        x2={sector.x2}
                        y1={sector.y1}
                        y2={sector.y2} 
                        fill="green"
                        fillOpacity={(sector.count / 100) * 1.2}
                        stroke="white"
                        strokeOpacity={0}
                    />
                ))
            }
            <CartesianGrid />
            <ReferenceLine x={60} stroke="black"/> {/* Center Half */}
            <ReferenceArea x1={0} x2={0.1} y1={36} y2={80-36} fill="black" fillOpacity={1} stroke="black"/> {/* Left Goal line */}
            <ReferenceArea x1={119.9} x2={120} y1={36} y2={80-36} fill="black" fillOpacity={1} stroke="black"/> {/* Right Goal line */}
            <ReferenceArea x1={0} x2={120} y1={0} y2={80} fillOpacity={0} stroke="black" /> {/* Pitch Outline */}
            <XAxis type="number" dataKey="x" hide domain={[0,120]}/>
            <YAxis type="number" dataKey="y" hide domain={[0,80]}/>
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="Heatmap" data={data} fill="#777777"/>
      </ScatterChart>
    </div>
  );

  const renderVerticalScatterChart = (data, heatSectors, scale) => (
    <div className="pitch">
      <ScatterChart
        width={80 * scale}
        height={120 * scale}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <ReferenceDot x={12} y={40} r={10*scale} stroke="black" fillOpacity={0}/> {/* Left Penalty Arc */}
            <ReferenceDot x={60} y={40} r={10*scale} stroke="black" fillOpacity={0}/> {/* Center Circle */}
            <ReferenceDot x={108} y={40} r={10*scale} stroke="black" fillOpacity={0}/> {/* Right Penalty Arc */}
            <ReferenceArea x1={0} x2={18} y1={18} y2={80-18} fill="white" fillOpacity={1} stroke="black" /> {/* Left Penalty Area */}
            <ReferenceArea x1={102} x2={120} y1={18} y2={80-18} fill="white" fillOpacity={1} stroke="black" /> {/* Right Penalty Area */}
            <ReferenceArea x1={0} x2={6} y1={30} y2={80-30} fill="white" fillOpacity={1} stroke="black" /> {/* Left 6-yard Box */}
            <ReferenceArea x1={114} x2={120} y1={30} y2={80-30} fill="white" fillOpacity={1} stroke="black" /> {/* Right 6-yard box */}
            <ReferenceDot x={60} y={40} r={0.5*scale} fill="black" stroke="black"/> {/* Centre Spot */}
            <ReferenceDot x={12} y={40} r={0.5*scale} fill="black" stroke="black"/> {/* Left Penalty Spot */}
            <ReferenceDot x={108} y={40} r={0.5*scale} fill="black" stroke="black"/> {/* Right Penalty Spot */}
            {
                /* 
                    Map the various heat sectors as ReferenceAreas onto the pitch,
                    using `sector.count` to determine opacity
                */
                heatSectors.map((sector, index) => (
                    <ReferenceArea 
                        key={index}
                        x1={sector.x1}
                        x2={sector.x2}
                        y1={sector.y1}
                        y2={sector.y2} 
                        fill="green"
                        fillOpacity={(sector.count / 100) * 1.2}
                        stroke="white"
                        strokeOpacity={0}
                    />
                ))
            }
            <CartesianGrid />
            <ReferenceLine x={60} stroke="black"/> {/* Center Half */}
            <ReferenceArea x1={0} x2={0.1} y1={36} y2={80-36} fill="black" fillOpacity={1} stroke="black"/> {/* Left Goal line */}
            <ReferenceArea x1={119.9} x2={120} y1={36} y2={80-36} fill="black" fillOpacity={1} stroke="black"/> {/* Right Goal line */}
            <ReferenceArea x1={0} x2={120} y1={0} y2={80} fillOpacity={0} stroke="black" /> {/* Pitch Outline */}
            <XAxis type="number" dataKey="x" hide domain={[0,120]}/>
            <YAxis type="number" dataKey="y" hide domain={[0,80]}/>
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="Heatmap" data={data} fill="#777777"/>
      </ScatterChart>
    </div>
  );

  return (
    <div className="heatmap">
      <h6>{props.playerName} ({props.playerPosition})</h6>
      {vertical
        ? renderVerticalScatterChart(locations, heatSectors, scale)
        : renderScatterChart(locations, heatSectors, scale)}
    </div>
  );
}

export default Heatmap;
