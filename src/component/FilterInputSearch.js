import React from "react";
import { SelectPicker } from "rsuite";
import { FilterOptions } from "../constant";

const filterList = [
  { label: "All", value: "all" },
  { label: "Todo", value: "todo" },
  { label: "In Progress", value: "in_progress" },
  { label: "Done", value: "done" },
];

const FilterInputSearch = ({ filterValue, setFilteValue }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <label>Filter data</label>
      <SelectPicker
        data={FilterOptions || []}
        value={filterValue}
        searchable={false}
        style={{ width: 224 }}
        cleanable={false}
        placeholder="Select "
        onChange={(value) => setFilteValue(value)}
      />
    </div>
  );
};

export default FilterInputSearch;
