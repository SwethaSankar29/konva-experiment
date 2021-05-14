import { Circle } from "react-konva";

const CircleElement = ({ x, y, shape, index, fill }) => {
  return (
    <Circle
      x={x}
      y={y}
      className={"circle"}
      radius={4}
      fill={fill}
      id={shape + "_" + index}
      strokeWidth={2}
      eleIndex={index}
      shapeIndex={shape}
    />
  );
};
export default CircleElement;
