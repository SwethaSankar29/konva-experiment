import Konva from "konva";
import React, { useEffect, useState } from "react";
import { Group, Line, Text, Layer, Rect } from "react-konva";
import { useSelector } from "react-redux";
import { getNeedlePoint } from "../features/actives";

const AxisNeedle = ({ xPosition, yPosition }) => {
  // const needlePoint = useSelector(getNeedlePoint);
  useEffect(() => {
    // console.log(needlePoint);
    // let nearXPosition = Math.round(xPosition / pixel) * pixel;
    // if (xPosition >= nearXPosition - 20 && xPosition <= nearXPosition + 20) {
    //   // stageRef.current?.findOne(".x-axis-" + nearXPosition).hide();
    //   // stageRef.current.findOne(".x-axis-" + nearXPosition).attrs.opacity = 0.2;
    //   console.log(stageRef.current.findOne(".x-axis-" + nearXPosition));
    // }
  });
  return (
    <Layer>
      <Group>
        {
          <Rect
            x={xPosition - 30}
            y={0}
            width={60}
            height={18}
            fill="white"
            stroke="white"
            opacity={0.9}
          ></Rect>
        }
        {
          <Rect
            y={yPosition - 30}
            x={0}
            width={18}
            height={70}
            fill="white"
            stroke="white"
            opacity={0.9}
          ></Rect>
        }
        {
          <Line
            className={"x-axis-needle-line-" + xPosition}
            points={[xPosition, 20, xPosition, 12]}
            stroke="blue"
            strokeWidth={1}
          />
        }
        {
          <Text
            className={"x-axis-needle-text-" + xPosition}
            x={xPosition}
            y={2}
            text={xPosition}
            fontSize={10}
            fill="blue"
          ></Text>
        }
      </Group>
      <Group>
        {
          <Line
            className={"y-axis-needle-line-" + yPosition}
            points={[20, yPosition, 12, yPosition]}
            stroke="blue"
            strokeWidth={1}
          />
        }
        {
          <Text
            className={"y-axis-needle-text-" + yPosition}
            y={yPosition + 3}
            x={0}
            text={yPosition}
            fontSize={10}
            fill="blue"
            rotation={-90}
          ></Text>
        }
      </Group>
    </Layer>
  );
};
export default React.memo(AxisNeedle);
