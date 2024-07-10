import React from "react";
import EditIcon from "@rsuite/icons/Edit";
import { useTaskContext } from "../context/TaskContext";
import TrashIcon from "@rsuite/icons/Trash";
import { StatusColor, TimestampToDate, statusLabel } from "../constant";

const Card = ({ item }) => {
  const { setOpenModal, onDeletTask } = useTaskContext();
  const { label, description, status, dateOnPosted } = item;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        padding: "10px 20px",
        boxShadow: "3px 3px 10px 3px #dddddd",
        position: "relative",
        width: "300px",
      }}
    >
      <span
        style={{
          marginTop: "10px",
          fontSize: "14px",
          fontWeight: "600",
          letterSpacing: "0.005rem",
        }}
      >
        {label}
      </span>
      <div
        style={{
          height: "150px",
          overflow: "auto",
          overflowX: "hidden",
          padding: "3px",
        }}
      >
        {description}
      </div>
      <label style={{ fontSize: "10px" }}>{`Created on - ${TimestampToDate(
        dateOnPosted
      )}`}</label>
      <label
        style={{
          border: `1px solid ${StatusColor[status]}`,
          display: "inline-block",
          width: "fit-content",
          padding: "2px 5px",
          background: StatusColor[status],
          color: "white",
          fontWeight: "600",
          letterSpacing: "0.0865rem",
          borderRadius: "2px",
        }}
      >
        {statusLabel(status)}
      </label>

      <div
        style={{
          position: "absolute",
          right: "20px",
          marginTop: "10px",
          cursor: "pointer",
        }}
        onClick={() => setOpenModal(item)}
      >
        <EditIcon fontSize={20} />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "15px",
          right: "20px",
          marginTop: "10px",
          cursor: "pointer",
        }}
        onClick={() => onDeletTask(item)}
      >
        <TrashIcon fontSize={20} />
      </div>
    </div>
  );
};

export default Card;
