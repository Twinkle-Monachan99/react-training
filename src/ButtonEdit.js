import React from "react";
export default function ButtonEdit({
  inputDisable,
  selectedValue,
  setUpdatedValue,
  onEditClick,
  onUpdateClick,
  onDeleteClick,
}) {
  return (
    <div>
      <span style={{ fontWeight: "bold" }}>
        Title:
        {!inputDisable ? (
          <input
            type="text"
            defaultValue={selectedValue}
            onChange={(event) => setUpdatedValue(event.target.value)}
          />
        ) : (
          <label>{selectedValue}</label>
        )}
      </span>
      <button style={{ fontWeight: "bold" }} onClick={onEditClick}>
        Edit
      </button>
      {!inputDisable ? (
        <button style={{ fontWeight: "bold" }} onClick={onUpdateClick}>
          Update
        </button>
      ) : (
        <button style={{ fontWeight: "bold" }} onClick={onDeleteClick}>
          Delete
        </button>
      )}
    </div>
  );
}
