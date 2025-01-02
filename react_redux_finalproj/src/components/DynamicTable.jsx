import React from 'react';

const DynamicTable = ({ columns, data }) => {
  // Render a nested table in a cell if necessary
  const renderCell = (value, columnKey, nestedColumns) => {
    if (Array.isArray(value)) {
      // If the cell value is an array (nested data), render a nested table
      return <DynamicTable columns={nestedColumns} data={value} />;
    } else {
      // Default rendering for simple values
      return value;
    }
  };

  return (
    <table border="1">
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((col, colIndex) => {
              const cellValue = row[col.key];
              const nestedColumns = col.nestedColumns || null;
              return (
                <td key={colIndex}>
                  {renderCell(cellValue, col.key, nestedColumns)}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DynamicTable;
