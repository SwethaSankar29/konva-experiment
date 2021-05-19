import React, { useState, useEffect } from "react";
import { Group, Layer, Line, Rect, Text } from "react-konva";

const Axis = ({ pixel, width, height }) => {
  const xAxis = (i, yPos) => {
    return (
      <Group name={"x-axis-" + i * pixel}>
        <Line
          className={"x-axis-line-" + i * pixel}
          points={[i * pixel, 20, i * pixel, yPos]}
          stroke="grey"
          strokeWidth={1}
        />
        <Text
          className={"x-axis-text-" + i * pixel}
          x={i * pixel}
          y={2}
          text={i * pixel}
          fontSize={10}
        ></Text>
      </Group>
    );
  };
  const yAxis = (i, xPos) => {
    return (
      <Group>
        <Line
          className={"y-axis-line-" + i * pixel}
          points={[20, i * pixel, xPos, i * pixel]}
          stroke="grey"
          strokeWidth={1}
        />
        <Text
          className={"y-axis-text-" + i * pixel}
          key={i * pixel}
          y={i * pixel + 3}
          x={0}
          text={i * pixel}
          fontSize={10}
          rotation={-90}
          fillAfterStrokeEnabled={false}
        ></Text>
      </Group>
    );
  };

  return (
    <Layer>
      {
        <Rect
          x={-10000}
          y={0}
          width={20000}
          height={20}
          fill="white"
          stroke="white"
        ></Rect>
      }
      {
        <Rect
          x={0}
          y={-1000}
          width={20}
          height={2000}
          fill="white"
          stroke="white"
        ></Rect>
      }
      {<Line points={[-width, 20, width, 20]} stroke="grey" strokeWidth={1} />}
      {
        <Line
          points={[20, -height, 20, height]}
          stroke="grey"
          strokeWidth={1}
        />
      }

      {Array.from({ length: width }, (item, i) => {
        if (i % 100 == 0) {
          return xAxis(i, 16);
        } else {
          return xAxis(i, 10);
        }
      })}
      {Array.from({ length: height }, (item, i) => {
        if (i % 100 == 0) {
          return yAxis(i, 16);
        } else {
          return yAxis(i, 10);
        }
      })}

      <Rect
        x={1}
        y={1}
        width={18.7}
        height={18.7}
        fill="white"
        stroke="white"
      ></Rect>
    </Layer>
  );
};
export default React.memo(Axis);
