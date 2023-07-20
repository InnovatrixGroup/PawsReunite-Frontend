// import React, { useEffect, useState } from "react";

// function Filter(props) {
//   const filterType = props.filterType;
//   const [filter, setFilter] = useState([]);
//   const [selectedValue, setSelectedValue] = useState(""); // New state for selected value

//   useEffect(() => {
//     const fetchFilter = async () => {
//       const response = await fetch(`http://localhost:3001/posts/filter?status=${filterType}`);
//       const result = await response.json();
//       setFilter(result.data);
//     };
//     fetchFilter();
//   }, [filterType]);

//   const handleSelectChange = (e) => {
//     const value = e.target.value;
//     setSelectedValue(value); // Update the selected value
//     props.onFilterChange(value); // Call the event handler passed as prop
//   };

//   return (
//     <div className="filter-container ">
//       <select
//         id={filterType}
//         className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//         onChange={handleSelectChange} // Call the new event handler
//         value={selectedValue} // Set the value attribute to maintain the selected value
//       >
//         <option selected value="">
//           {filterType}
//         </option>
//         {filter.length > 0 &&
//           filter.map((item) => (
//             <option key={item} value={item}>
//               {item}
//             </option>
//           ))}
//       </select>
//     </div>
//   );
// }

// export default Filter;

import React, { useEffect, useState } from "react";

function Filter(props) {
  const filterType = props.filterType;
  const [filter, setFilter] = useState([]);
  const [selectedValue, setSelectedValue] = useState(""); // New state for selected value

  useEffect(() => {
    const fetchFilter = async () => {
      const response = await fetch(`http://localhost:3001/posts/filter?status=${filterType}`);
      const result = await response.json();
      setFilter(result.data);
    };
    fetchFilter();
  }, [filterType]);

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectedValue(value); // Update the selected value
    props.onFilterChange(filterType, value); // Call the event handler passed as prop
  };

  return (
    <div className="filter-container">
      <select
        id={filterType}
        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={handleSelectChange} // Call the new event handler
        value={selectedValue} // Set the value attribute to maintain the selected value
      >
        <option value="">{filterType}</option>
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
