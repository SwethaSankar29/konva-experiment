import { Line } from "react-konva";

const LineElement = ({ points, stroke }) => {
  return <Line points={points} stroke={stroke} strokeWidth={1}></Line>;
};
export default LineElement;
