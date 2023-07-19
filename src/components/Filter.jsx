import React, { useEffect, useState } from "react";

function Filter(props) {
  const filterType = props.filterType;
  const [filter, setFilter] = useState([]);
  useEffect(() => {
    const fetchFilter = async () => {
      const response = await fetch(`http://localhost:3001/posts/filter?status=${filterType}`);
      const result = await response.json();
      setFilter(result.data);
    };
    fetchFilter();
  }, [filterType]);

  return (
    <div className="filter-container ">
      <select
        id={filterType}
        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option selected>{filterType}</option>
        {filter.length > 0 &&
          filter.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
      </select>
    </div>
  );
}

export default Filter;
