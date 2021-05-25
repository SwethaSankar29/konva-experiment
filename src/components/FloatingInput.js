import React, { useEffect, useState } from "react";
const FloatingInput = ({ xPos, yPos, value }) => {
  const inputRef = React.createRef();
  const [inputValue, setInputValue] = useState(value);
  useEffect(() => {
    document.getElementsByClassName("floating-input")[0].focus();
    document.getElementsByClassName("floating-input")[0].select();
    setInputValue(value);
  }, []);
  // useMemo(() => {
  //   document.getElementsByClassName("floating-input")[0]?.focus();
  //   document.getElementsByClassName("floating-input")[0]?.select();
  //   setInputValue(value);
  // });
  const changeLengthByInput = (e) => {
    setInputValue(e.target.value);
  };
  const onChangeLengthByInput = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <input
        className="floating-input"
        value={value || inputValue}
        type="number"
        ref={inputRef}
        onKeyDown={changeLengthByInput}
        onChange={onChangeLengthByInput}
        style={{
          top: yPos + "px",
          left: xPos + "px",
          position: "absolute",
          width: "40px",
          fontSize: "12px",
          textAlign: "center",
        }}
      />{" "}
    </div>
  );
};
export default React.memo(FloatingInput);
