import React, { useState, useRef } from 'react';

function TableComponent() {
  const numRows = 10;
  const numCols = 10;

  const tableRef = useRef(null);

  const [tableData, setTableData] = useState(() => {
    // Initialize the table with empty cells
    const initialData = [];
    for (let i = 0; i < numRows; i++) {
      initialData.push(Array(numCols).fill(''));
    }
    return initialData;
  });

  const [isDragging, setIsDragging] = useState(false);
  const [startCell, setStartCell] = useState({ row: null, col: null });
  const [endCell, setEndCell] = useState({ row: null, col: null });

  const handleMouseDown = (row, col) => {
    setIsDragging(true);
    setStartCell({ row, col });
    setEndCell({ row, col });
  };

  const handleMouseEnter = (row, col) => {
    if (isDragging) {
      setEndCell({ row, col });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);

    if (startCell.row !== null && endCell.row !== null) {
      // Determine the minimum and maximum row and column indices
      let minRow = Math.min(startCell.row, endCell.row);
      let minCol = Math.min(startCell.col, endCell.col);
      let maxRow = Math.max(startCell.row, endCell.row);
      let maxCol = Math.max(startCell.col, endCell.col);

      // Calculate the rowspan and colspan for the merged cell
      const rowspan = maxRow - minRow + 1;
      const colspan = maxCol - minCol + 1;

      // Update the table data with the merged cell
      const updatedTableData = [...tableData];
      const mergedCellValue = `Merged (${rowspan}x${colspan})`;
      for (let i = minRow; i <= maxRow; i++) {
        for (let j = minCol; j <= maxCol; j++) {
          if (i !== minRow || j !== minCol) {
            // Clear cells other than the top-left cell
            updatedTableData[i][j] = '';
          } else {
            // Set the top-left cell with rowspan and colspan
            updatedTableData[i][j] = { value: mergedCellValue, rowspan, colspan };
          }
        }
      }

      setTableData(updatedTableData);
      setStartCell({ row: null, col: null });
      setEndCell({ row: null, col: null });
    }
  };

  const renderTable = () => {
    return tableData.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {row.map((cell, colIndex) => (
          <td
            key={colIndex}
            onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
            onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
            onMouseUp={handleMouseUp}
            style={{
              border: '1px solid black',
              textAlign: 'center',
              backgroundColor: isDragging && startCell.row !== null && endCell.row !== null
                && rowIndex >= Math.min(startCell.row, endCell.row)
                && rowIndex <= Math.max(startCell.row, endCell.row)
                && colIndex >= Math.min(startCell.col, endCell.col)
                && colIndex <= Math.max(startCell.col, endCell.col)
                ? 'lightblue'
                : 'white',
            }}
            colSpan={cell && cell.colspan}
            rowSpan={cell && cell.rowspan}
          >
            {cell && cell.value}
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <div>
      <h2>Dynamic Cell Merging with Mouse Drag Selection</h2>
      <table
        ref={tableRef}
        style={{ borderCollapse: 'collapse' }}
        onMouseLeave={() => {
          if (isDragging) {
            setIsDragging(false);
            setStartCell({ row: null, col: null });
            setEndCell({ row: null, col: null });
          }
        }}
      >
        <tbody>{renderTable()}</tbody>
      </table>
    </div>
  );
}

export default TableComponent;















// import React, { useState } from 'react';

// function TableComponent() {
//   const numRows = 10;
//   const numCols = 10;

//   const [tableData, setTableData] = useState(() => {
//     // Initialize the table with empty cells
//     const initialData = [];
//     for (let i = 0; i < numRows; i++) {
//       initialData.push(Array(numCols).fill(''));
//     }
//     return initialData;
//   });

//   const [selectedCells, setSelectedCells] = useState([]);

//   const handleCellClick = (row, col) => {
//     // Toggle the selection of a cell
//     const newSelectedCells = [...selectedCells];
//     const cellIndex = newSelectedCells.findIndex(
//       (cell) => cell.row === row && cell.col === col
//     );
//     if (cellIndex !== -1) {
//       newSelectedCells.splice(cellIndex, 1);
//     } else {
//       newSelectedCells.push({ row, col });
//     }
//     setSelectedCells(newSelectedCells);
//   };

//   const handleMergeCells = () => {
//     if (selectedCells.length < 2) {
//       alert('Select at least two cells to merge.');
//       return;
//     }

//     // Determine the minimum and maximum row and column indices
//     let minRow = numRows - 1;
//     let minCol = numCols - 1;
//     let maxRow = 0;
//     let maxCol = 0;

//     selectedCells.forEach((cell) => {
//       minRow = Math.min(minRow, cell.row);
//       minCol = Math.min(minCol, cell.col);
//       maxRow = Math.max(maxRow, cell.row);
//       maxCol = Math.max(maxCol, cell.col);
//     });

//     // Calculate the rowspan and colspan for the merged cell
//     const rowspan = maxRow - minRow + 1;
//     const colspan = maxCol - minCol + 1;

//     // Update the table data with the merged cell
//     const updatedTableData = [...tableData];
//     const mergedCellValue = `Merged (${rowspan}x${colspan})`;
//     for (let i = minRow; i <= maxRow; i++) {
//       for (let j = minCol; j <= maxCol; j++) {
//         if (i !== minRow || j !== minCol) {
//           // Clear cells other than the top-left cell
//           updatedTableData[i][j] = '';
//         } else {
//           // Set the top-left cell with rowspan and colspan
//           updatedTableData[i][j] = { value: mergedCellValue, rowspan, colspan };
//         }
//       }
//     }

//     setTableData(updatedTableData);
//     setSelectedCells([]);
//   };

//   const renderTable = () => {
//     return tableData.map((row, rowIndex) => (
//       <tr key={rowIndex}>
//         {row.map((cell, colIndex) => (
//           <td
//             key={colIndex}
//             onClick={() => handleCellClick(rowIndex, colIndex)}
//             style={{
//               border: '1px solid black',
//               textAlign: 'center',
//               backgroundColor: selectedCells.some(
//                 (selectedCell) =>
//                   selectedCell.row === rowIndex && selectedCell.col === colIndex
//               )
//                 ? 'lightblue'
//                 : 'white',
//             }}
//             colSpan={cell && cell.colspan}
//             rowSpan={cell && cell.rowspan}
//           >
//             {cell && cell.value}
//           </td>
//         ))}
//       </tr>
//     ));
//   };

//   return (
//     <div>
//       <h2>Dynamic Cell Merging in a 10x10 Table</h2>
//       <button onClick={handleMergeCells}>Merge Selected Cells</button>
//       <table style={{ borderCollapse: 'collapse' }}>
//         <tbody>{renderTable()}</tbody>
//       </table>
//     </div>
//   );
// }

// export default TableComponent;


















// import React, { useState } from 'react';

// function TableComponent() {
//   // Define the fixed width and height for cells
//   const cellStyle = {
//     width: '50px', // Adjust the width as needed
//     height: '50px', // Adjust the height as needed
//     border: '1px solid black', // Add border
//     textAlign: 'center', // Center-align content
//   };

//   // Create a 2D array to define cell configurations, including colspan and rowspan
//   const tableData = [
//     [null, { content: 'Header 1', colSpan: 2 }, { content: 'Header 2', colSpan: 2 }, { content: 'Header 3', colSpan: 2 }, null],
//     [{ content: 'Row 1, Col 1' }, { content: 'Row 1, Col 2' }, { content: 'Row 1, Col 3' }, { content: 'Row 1, Col 4' }, { content: 'Row 1, Col 5' }],
//     [{ content: 'Row 2, Col 1', rowSpan: 2 }, { content: 'Row 2, Col 2' }, { content: 'Row 2, Col 3', colSpan: 2 }, { content: 'Row 2, Col 4' }, { content: 'Row 2, Col 5' }],
//     [{ content: 'Row 3, Col 1' }, null, null, { content: 'Row 3, Col 4' }, { content: 'Row 3, Col 5' }],
//     [null, { content: 'Footer 1', colSpan: 2 }, { content: 'Footer 2', colSpan: 2 }, { content: 'Footer 3', colSpan: 2 }, null],
//   ];

//   // Initialize a 2D array to store input values for each cell
//   const [inputValues, setInputValues] = useState(
//     Array(tableData.length).fill(Array(tableData[0].length).fill(''))
//   );

//   // Function to handle input changes
//   const handleInputChange = (e, row, col) => {
//     const newInputValues = [...inputValues];
//     newInputValues[row][col] = e.target.value;
//     setInputValues(newInputValues);
//   };

//   // Function to render the table cells based on the tableData
//   const renderTableCells = () => {
//     const tableCells = [];

//     for (let i = 0; i < tableData.length; i++) {
//       const row = tableData[i];
//       const rowCells = [];

//       for (let j = 0; j < row.length; j++) {
//         const cellData = row[j];

//         if (cellData) {
//           const { content, colSpan, rowSpan } = cellData;
//           const cellKey = `cell-${i}-${j}`;

//           // Add a table cell (td element) with colspan and rowspan attributes and an input field
//           rowCells.push(
//             <td key={cellKey} style={cellStyle} colSpan={colSpan || 1} rowSpan={rowSpan || 1}>
//               <input
//                 type="text"
//                 value={inputValues[i][j]}
//                 onChange={(e) => handleInputChange(e, i, j)}
//               />
//             </td>
//           );
//         } else {
//           // Add an empty cell
//           rowCells.push(<td key={`empty-cell-${i}-${j}`} style={cellStyle}></td>);
//         }
//       }

//       // Create a table row (tr element) and add the cells to it
//       const rowKey = `row-${i}`;
//       tableCells.push(<tr key={rowKey}>{rowCells}</tr>);
//     }

//     return tableCells;
//   };

//   return (
//     <div>
//       <h2>Table with Colspan, Rowspan, and Input Fields</h2>
//       <table style={{ borderCollapse: 'collapse' }}>
//         <tbody>{renderTableCells()}</tbody>
//       </table>
//     </div>
//   );
// }

// export default TableComponent;
