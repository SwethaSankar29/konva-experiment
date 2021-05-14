import { Circle, Group, Layer, Line, Shape } from "react-konva";
import React, { useState } from "react";
const BezierCurve = () => {
  const [controlPoints, setControlPoints] = useState({
    startPoint: [100, 500],
    controlPoint1: getControlPointsAtIntervals(0.75, 100, 500, 500, 100)
      .controlPoint,
    controlPoint2: getControlPointsAtIntervals(0.75, 500, 100, 100, 500)
      .controlPoint,
    endPoint: [500, 100],
  });

  const linePoints = [
    {
      points: [
        controlPoints.startPoint[0],
        controlPoints.startPoint[1],
        controlPoints.controlPoint1[0],
        controlPoints.controlPoint1[1],
      ],
    },
    {
      points: [
        controlPoints.controlPoint2[0],
        controlPoints.controlPoint2[1],
        controlPoints.endPoint[0],
        controlPoints.endPoint[1],
      ],
    },
  ];
  const circlePoints = [
    controlPoints.startPoint,
    controlPoints.controlPoint1,
    controlPoints.controlPoint2,
    controlPoints.endPoint,
  ];

  const [bezierControlCircle, setBezierControlCircle] = useState(circlePoints);
  const [bezierControlLine, setBezierControlLine] = useState(linePoints);

  const dragBezierControlPoint = (e) => {
    dragUpdateCurve(e);
  };

  function dragUpdateCurve(e) {
    let newPoints = [e.target.attrs.x, e.target.attrs.y];
    let end = "";
    if (e.target.index === 1) {
      end = "startPoint";
    }
    if (e.target.index === 2) {
      end = "controlPoint1";
    }
    if (e.target.index === 3) {
      end = "controlPoint2";
    }
    if (e.target.index === 4) {
      end = "endPoint";
    }
    setControlPoints({ ...controlPoints, [end]: newPoints });
    setBezierControlLine(linePoints);
    setBezierControlCircle(circlePoints);
  }
  // get curve control points at ratio a and b a:b
  function getControlPointsAtRatio(a, b, x1, y1, x2, y2) {
    let x = (b * x1 + a * x2) / (a + b);
    let y = (b * y1 + a * y2) / (a + b);

    return { controlPoint: [x, y] };
  }
  // get curve control points at interval 0 to 1
  function getControlPointsAtIntervals(k, x1, y1, x2, y2) {
    let x = (x1 + k * x2) / (1 + k);
    let y = (y1 + k * y2) / (1 + k);

    return { controlPoint: [x, y] };
  }
  function generateCurveControlPoints(x1, y1, x2, y2) {
    let controlPoint1X = Math.round(Math.abs((x1 + x2) / 2));
    let controlPoint1Y = Math.round(Math.abs((y1 + y2) / 2));
    let controlPoint2X = Math.round(Math.abs((controlPoint1X + x2) / 2));
    let controlPoint2Y = Math.round(Math.abs((controlPoint1Y + y2) / 2));
    controlPoint1X = Math.round(Math.abs((x1 + controlPoint1X) / 2));
    controlPoint1Y = Math.round(Math.abs((y1 + controlPoint1Y) / 2));

    return {
      controlPoint1: [controlPoint1X, controlPoint1Y],
      controlPoint2: [controlPoint2X, controlPoint2Y],
    };
  }
  const dragGroup = (e) => {
    e.cancelBubble = true;
  };

  return (
    <Layer>
      <Group draggable onDragEnd={dragGroup}>
        <Shape
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(
              controlPoints.startPoint[0],
              controlPoints.startPoint[1]
            );
            context.bezierCurveTo(
              controlPoints.controlPoint1[0],
              controlPoints.controlPoint1[1],

              controlPoints.controlPoint2[0],
              controlPoints.controlPoint2[1],
              controlPoints.endPoint[0],
              controlPoints.endPoint[1]
            );
            context.fillStrokeShape(shape);
          }}
          fill="transparent"
          stroke="grey"
          strokeWidth={2}
        />
        {bezierControlCircle.map((i) => {
          return (
            <Circle
              x={i[0]}
              y={i[1]}
              radius={5}
              fill="blue"
              draggable={true}
              onDragMove={dragBezierControlPoint}
              onDragEnd={dragBezierControlPoint}
            />
          );
        })}
        {bezierControlLine.map((i) => {
          return (
            <Line
              points={i.points}
              stroke="blue"
              strokeWidth={2}
              lineCap="round"
              lineJoin="round"
              dash={[5, 5]}
            />
          );
        })}
      </Group>
    </Layer>
  );
};
export default BezierCurve;
