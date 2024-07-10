import moment from "moment";

export const FilterOptions = [
  { label: "ALL", value: "all" },
  { label: "TODO", value: "todo" },
  { label: "IN PROGRESS", value: "in_progress" },
  { label: "DONE", value: "done" },
];

export const TodoList = [
  { label: "TODO", value: "todo" },
  { label: "IN PROGRESS", value: "in_progress" },
  { label: "DONE", value: "done" },
];

export const filteredList = (value, data) => {
  return data.filter((item) =>
    item.status?.toLowerCase() === value?.toLowerCase() ? item : null
  );
};

export const StatusColor = {
  todo: "#D4AC0D",
  in_progress: "#2874A6",
  done: "#229954",
};

export const TimestampToDate = (timestamp) => {
  if (!timestamp) return;
  const milliseconds =
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;

  const date = moment(milliseconds);

  return date.format("DD/MM/YYYY");
};

export const statusLabel = (status) => {
  if (status?.split("_")?.length === 2)
    return status?.split("_").join(" ")?.toUpperCase();
  return status?.toUpperCase();
};
