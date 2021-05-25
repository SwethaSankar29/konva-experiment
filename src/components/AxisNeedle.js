import React, { useEffect, useState } from "react";
import { Group, Line, Text, Layer } from "react-konva";

const AxisNeedle = ({ xPosition, yPosition, layerRef }) => {
  const [previousXPosition, setPreviousXPosition] = useState(0);
  const [previousYPosition, setPreviousYPosition] = useState(0);
  const pixel = 100;
  useEffect(() => {
    let nearXPosition = Math.round(xPosition / pixel) * pixel;
    let nearYPosition = Math.round(yPosition / pixel) * pixel;
    //----------------------------------Hide and show x axis text-------------------------------
    layerRef.current?.findOne(".x-axis-" + previousXPosition).show();
    layerRef.current.getLayer().batchDraw();
    if (previousXPosition != nearXPosition) {
      console.log(previousXPosition);
      setPreviousXPosition(nearXPosition);
    }
    if (xPosition >= nearXPosition - 20 && xPosition <= nearXPosition + 20) {
      layerRef.current?.findOne(".x-axis-" + nearXPosition).hide();
      layerRef.current.getLayer().batchDraw();
    }
    //----------------------------------Hide and show y axis text-------------------------------
    layerRef.current?.findOne(".y-axis-" + previousYPosition).show();
    layerRef.current.getLayer().batchDraw();
    if (previousYPosition != nearYPosition) {
      console.log(previousYPosition);
      setPreviousYPosition(nearYPosition);
    }
    if (yPosition >= nearYPosition - 20 && yPosition <= nearYPosition + 20) {
      layerRef.current?.findOne(".y-axis-" + nearYPosition).hide();
      layerRef.current.getLayer().batchDraw();
    }
    layerRef.current?.findOne(".x-axis-0").show();
    layerRef.current?.findOne(".y-axis-0").show();
  });
  if (xPosition !== 0 && yPosition !== 0) {
    return (
      <Layer>
        <Group>
          {/* {
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
                    } */}
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
  } else {
    return null;
  }
};
export default React.memo(AxisNeedle);
