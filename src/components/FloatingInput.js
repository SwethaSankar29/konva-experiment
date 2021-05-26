import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateInputFocus } from "../features/actives";
const FloatingInput = ({ xPos, yPos, value, setLineByLength }) => {
  const inputRef = React.createRef();
  const [inputValue, setInputValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);
  const [firstKey, setFirstKey] = useState(true);
  const dispatch = useDispatch();
  const setInputSelection = () => {
    if (!isEditing) {
      inputRef.current.select();
      setInputValue(value);
    } else {
      inputRef.current.focus();
    }
  };
  useEffect(() => {
    setInputSelection();
    //
  });

  const changeLengthByInput = (e) => {
    if (firstKey) {
      setInputValue(e.key);
      setFirstKey(false);
      console.log(inputValue);
    } else {
      setInputValue(e.target.value);
    }

    if (e.key == "Enter") {
      setLineByLength(inputValue);
      document.getElementsByClassName("app-main")[0]?.focus();
      inputRef.current.blur();
      setFirstKey(true);
      setIsEditing(false);
      dispatch(updateInputFocus(false));
    }
  };
  const onChangeLengthByInput = (e) => {
    setInputValue(e.target.value);
    setIsEditing(true);
  };

  return (
    <div>
      <input
        className="floating-input"
        value={inputValue}
        type="number"
        ref={inputRef}
        onChange={onChangeLengthByInput}
        onKeyDown={changeLengthByInput}
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
