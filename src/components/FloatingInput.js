import React from "react";
const FloatingInput = ({ xPos, yPos, value }) => {
  return (
    <div>
      <input
        value={value}
        type="number"
        style={{
          top: yPos + "px",
          left: xPos + "px",
          position: "absolute",
          width: "40px",
          fontSize: "12px",
          textAlign: "center",
        }}
      />
    </div>
  );
};
export default React.memo(FloatingInput);
