import React, { useState } from 'react';
import './Table2.css';

const DynamicTable1 = () => {
  const [selectedCount, setSelectedCount] = useState(0);
  const [tableData, setTableData] = useState([
    ['Row 1, Col 1'],
  ]);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startCell, setStartCell] = useState(null);
  const [endCell, setEndCell] = useState(null);

  const addRow = () => {
    const newRow = Array(tableData[0].length).fill('');
    setTableData([...tableData, newRow]);
    setSelectedCount(0);
  };

  const addColumn = () => {
    const newTableData = tableData.map((row) => [...row, '']);
    setTableData(newTableData);
    setSelectedCount(0);
  };

  const handleChange = (rowIndex, colIndex, value) => {
    const newTableData = [...tableData];
    newTableData[rowIndex][colIndex] = value;
    setTableData(newTableData);
  };

  const toggleCellSelection = (rowIndex, colIndex) => {
    const newTableData = [...tableData];
    newTableData[rowIndex][colIndex] = !newTableData[rowIndex][colIndex];
    setTableData(newTableData);
  };

  const mergeCells = () => {
    const selectedCells = [];
    tableData.forEach((row, rowIndex) => {
      row.forEach((isSelected, colIndex) => {
        if (isSelected) {
          selectedCells.push({ rowIndex, colIndex });
        }
      });
    });
  
    if (selectedCells.length <= 1) {
      alert('Select at least two cells to merge.');
      return;
    }
  
    const minRow = Math.min(...selectedCells.map((cell) => cell.rowIndex));
    const maxRow = Math.max(...selectedCells.map((cell) => cell.rowIndex));
    const minCol = Math.min(...selectedCells.map((cell) => cell.colIndex));
    const maxCol = Math.max(...selectedCells.map((cell) => cell.colIndex));
  
    const mergedContent = [];
    for (let rowIndex = minRow; rowIndex <= maxRow; rowIndex++) {
      const rowContent = [];
      for (let colIndex = minCol; colIndex <= maxCol; colIndex++) {
        rowContent.push(tableData[rowIndex][colIndex]);
      }
      mergedContent.push(rowContent);
    }
  
    // Update the merged cells with the merged content
    for (let rowIndex = minRow; rowIndex <= maxRow; rowIndex++) {
      for (let colIndex = minCol; colIndex <= maxCol; colIndex++) {
        if (rowIndex === minRow && colIndex === minCol) {
          tableData[rowIndex][colIndex] = mergedContent.map((row) => row.join(', ')).join('\n');
        } else {
          tableData[rowIndex][colIndex] = '';
        }
      }
    }
  
    // Deselect all cells
    const newTableData = tableData.map((row) => row.map(() => ''));
    setTableData(newTableData);
  };
  

  const handleMouseDown = (rowIndex, colIndex) => {
    setIsMouseDown(true);
    setStartCell({ rowIndex, colIndex });
    setEndCell({ rowIndex, colIndex });
    toggleCellSelection(rowIndex, colIndex);
  };

  const handleMouseEnter = (rowIndex, colIndex) => {
    if (isMouseDown) {
      setEndCell({ rowIndex, colIndex });
      selectCells(startCell, { rowIndex, colIndex });
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const selectCells = (startCell, endCell) => {
    const minX = Math.min(startCell.colIndex, endCell.colIndex);
    const maxX = Math.max(startCell.colIndex, endCell.colIndex);
    const minY = Math.min(startCell.rowIndex, endCell.rowIndex);
    const maxY = Math.max(startCell.rowIndex, endCell.rowIndex);

    let selectedCount = 0;

    for (let rowIndex = minY; rowIndex <= maxY; rowIndex++) {
      for (let colIndex = minX; colIndex <= maxX; colIndex++) {
        toggleCellSelection(rowIndex, colIndex);
        selectedCount++;
      }
    }

    setSelectedCount(selectedCount);
  };

  return (
    <div>
      <button onClick={addRow}>Add Row</button>
      <button onClick={addColumn}>Add Column</button>
      <button onClick={mergeCells}>Merge Cells</button>
      <table id="dynamic-table" border="1">
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                  onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                  onMouseUp={handleMouseUp}
                  className={cell ? 'selected' : ''}
                >
                  <input
                    type="text"
                    id={`row${rowIndex}-col${colIndex}`}
                    value={cell}
                    onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="selected-count">Selected cell count: {selectedCount}</div>
    </div>
  );
};

export default DynamicTable1;
