import { Select } from "@mui/material";
import React from "react";

const FilterSelect = ({ label, value, options, onChange }) => {
  return (
    <select className="w-28 p-3" value={value} onChange={onChange}>
      <option value="">{label}</option>
      {options.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default FilterSelect;
