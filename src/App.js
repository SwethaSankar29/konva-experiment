import "./App.css";
import {
  Circle,
  Layer,
  Line,
  Stage,
  Group,
  Shape,
  TextPath,
  Text,
} from "react-konva";
import BezierCurve from "./components/BezierCurve";
import React, { useState } from "react";

import LineElement from "./components/LineElement";
import CircleElement from "./components/CircleElement";
import Axis from "./components/Axis";
import AxisNeedle from "./components/AxisNeedle";
import "./css/interact.css";
import { updateNeedlePoint } from "./features/actives";
import { useDispatch } from "react-redux";
import FloatingInput from "./components/FloatingInput";

function App() {
  const pixel = 100;
  const dispatch = useDispatch();
  const [elementType, setElementType] = useState("Line");
  const [tool, setTool] = useState("pen");
  const [circleArray, setCircleArray] = useState([]);
  const [lineArray = [], setLineArray] = useState();
  const [snapped, setSnapped] = useState(false);
  const [shapeArray, setShapeArray] = useState([]);
  const [shapeIndex, setShapeIndex] = useState(0);
  const [needlePoint, setNeedlePoint] = useState([0, 0]);
  const [movePoint, setMovePoint] = useState([0, 0]);
  const [lineLength, setLineLength] = useState(0);

  const convertToCurve = () => {
    setElementType("Curve");
  };

  const handleMouseMove = (e) => {
    if (!snapped) {
      let pos = e.target.getStage().getPointerPosition();

      let line = [...lineArray];
      if (lineArray.length > 0) {
        line[line.length - 1].points = [
          line[line.length - 1].points[0],
          line[line.length - 1].points[1],
          pos.x,
          pos.y,
        ];

        let length = getLineLength(
          line[line.length - 1].points[0],
          line[line.length - 1].points[1],
          pos.x,
          pos.y
        );

        setMovePoint([pos.x, pos.y]);
        setLineLength(length);
      }
      setLineArray(line);
    }
  };
  const handleClick = (e) => {
    let pos = e.target.getStage().getPointerPosition();
    setNeedlePoint([pos.x, pos.y]);
    if (e?.target?.attrs?.className != "circle") {
      createCircleAndLine(pos);
    } else {
      snapping(pos, e);
    }
    dispatch(updateNeedlePoint([pos.x, pos.y]));
  };

  function setShape(line, circle) {
    let path = {
      M: { x: circle[0].x, y: circle[0].y },
      L: [],
      closedPath: false,
    };
    for (let i = 0; i < line.length; i++) {
      path.L.push({ x: line[i].points[2], y: line[i].points[3] });
    }
    if (
      circle[0].x == line[line.length - 1]?.points[2] &&
      circle[0].y == line[line.length - 1]?.points[3]
    ) {
      path.closedPath = true;
    }
    let shapes = {
      line: line,
      circle: circle,
      path: path,
    };
    setShapeArray((shapeArray) => [...shapeArray, shapes]);
    setLineArray([]);
    setCircleArray([]);
    setShapeIndex(shapeIndex + 1);
    setNeedlePoint([0, 0]);
    setMovePoint([0, 0]);
  }
  function createCircleAndLine(pos) {
    let circle = { x: pos.x, y: pos.y };
    let line = { points: [pos.x, pos.y, pos.x, pos.y] };
    setLineArray((lineArray) => [...lineArray, line]);
    setCircleArray((circleArray) => [...circleArray, circle]);
    setSnapped(false);
  }
  function snapping(pos, e) {
    ///-------------------snapping to first node------------------
    console.log(e?.target?.attrs?.eleIndex);

    pos = { x: e?.target?.attrs?.x, y: e?.target?.attrs?.y };
    if (e?.target?.attrs?.shapeIndex == shapeIndex) {
      if (e?.target?.attrs?.eleIndex == 0) {
        let line = [...lineArray];
        if (lineArray.length > 0) {
          line[line.length - 1].points = [
            line[line.length - 1].points[0],
            line[line.length - 1].points[1],
            pos.x,
            pos.y,
          ];
        }
        setLineArray(line);
        setShape(line, circleArray);
        setSnapped(true);
      } else {
        ///------update last line x2 y2 as circle cx, cy-----------
        let line = [...lineArray];
        if (lineArray.length > 0) {
          line[line.length - 1].points = [
            line[line.length - 1].points[0],
            line[line.length - 1].points[1],
            pos.x,
            pos.y,
          ];
        }
        setLineArray(line);
        ///----create new line-----------------------
        line = { points: [pos.x, pos.y, pos.x, pos.y] };
        setLineArray((lineArray) => [...lineArray, line]);
        setSnapped(false);
      }
    } else {
      createCircleAndLine(pos);
    }
  }
  function getLineLength(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)).toFixed(2);
  }
  const handleKeyUp = (e) => {
    if (e.key == "Escape") {
      let line = [...lineArray];
      if (lineArray.length > 0) {
        line.splice(line.length - 1, 1);

        setLineArray(() => line);
        setShape(line, circleArray);
        setSnapped(true);
      }
    }
    if (e.key == "p" || e.key == "P") {
      if (lineArray.length > 0) {
        let line = {
          points: [
            circleArray[circleArray.length - 1].x,
            circleArray[circleArray.length - 1].y,
            circleArray[circleArray.length - 1].x,
            circleArray[circleArray.length - 1].y,
          ],
        };
        setLineArray((lineArray) => [...lineArray, line]);
      }
      setTool("pen");
    }
    if (e.key == "v" || e.key == "V") {
      let line = [...lineArray];
      if (lineArray.length > 0) {
        line.splice(line.length - 1, 1);
      }
      setLineArray(() => line);
      setTool("select");
    }
  };

  const stageRef = React.createRef();
  return (
    <div tabIndex={1} onKeyUp={handleKeyUp}>
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onClick={tool == "pen" && handleClick}
        onMouseMove={tool == "pen" && handleMouseMove}
        style={tool == "pen" ? { cursor: "crosshair" } : { cursor: "default" }}
      >
        {/* {elementType == "Line" && (
          <Layer>
            <Line
              points={[100, 500, 500, 100]}
              stroke="grey"
              strokeWidth={2}
              draggable
              onDragStart={convertToCurve}
            ></Line>
          </Layer>
        )}
        {elementType == "Curve" && <BezierCurve />} */}
        <Layer>
          {shapeArray.map((i, shape) => {
            return (
              <Group draggable={tool == "select" ? true : false}>
                {
                  <Shape
                    sceneFunc={(context, shape) => {
                      context.beginPath();
                      context.moveTo(i.path.M.x, i.path.M.y);
                      i.path.L.map((data) => {
                        context.lineTo(data.x, data.y);
                      });

                      context.fillStrokeShape(shape);
                    }}
                    fillEnabled={i.path.closedPath}
                    fill="lightgrey"
                  />
                }
                {i.line.map((j) => {
                  return <LineElement points={j.points} stroke="black" />;
                })}
                {i.circle.map((j, index) => {
                  return (
                    <CircleElement
                      x={j.x}
                      y={j.y}
                      shape={shape}
                      index={index}
                      fill="black"
                    />
                  );
                })}
              </Group>
            );
          })}
          <Group>
            {lineArray.map((i) => {
              return <LineElement points={i.points} stroke="grey" />;
            })}
            {circleArray.map((i, index) => {
              return (
                <CircleElement
                  x={i.x}
                  y={i.y}
                  shape={shapeIndex}
                  index={index}
                  fill={index == circleArray.length - 1 ? "blue" : "grey"}
                />
              );
            })}
          </Group>
        </Layer>
        <Axis
          pixel={100}
          width={window.innerWidth}
          height={window.innerHeight}
        />
        {needlePoint[0] != 0 && needlePoint[1] != 0 && (
          <AxisNeedle
            xPosition={needlePoint[0]}
            yPosition={needlePoint[1]}
          ></AxisNeedle>
        )}
      </Stage>
      {movePoint[0] != 0 && movePoint[1] != 0 && (
        <FloatingInput
          xPos={Number(movePoint[0] + 10)}
          yPos={Number(movePoint[1] + 10)}
          value={lineLength}
        ></FloatingInput>
      )}
    </div>
  );
}

export default App;
