import React, { useState } from 'react';
import './Table2.css';

const DynamicTable = () => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startCell, setStartCell] = useState(null);
  const [endCell, setEndCell] = useState(null);
  const [selectedCount, setSelectedCount] = useState(0);
  const [rowCount, setRowCount] = useState(0); // Initialize with 2 rows
  const [colCount, setColCount] = useState(0); // Initialize with 2 columns


  const addRow = () => {
    setRowCount(rowCount + 1);
    setSelectedCount(0);
   
  };

  const addColumn = () => {
    setColCount(colCount + 1);
    setSelectedCount(0);
   
  };

  const toggleCellSelection = (cell) => {
    cell.classList.toggle('selecting');
  };

  const mergeCells = () => {
    const selectedCells = document.querySelectorAll('.selecting');
    if (selectedCells.length <= 1) {
      alert('Select at least two cells to merge.');
      return;
    }

    // Determine the minimum row and column index of selected cells
    let minRow = Infinity;
    let minCol = Infinity;
    let maxRow = -1;
    let maxCol = -1;

    selectedCells.forEach((cell) => {
      const rowIndex = cell.parentNode.rowIndex;
      const cellIndex = cell.cellIndex;
      minRow = Math.min(minRow, rowIndex);
      minCol = Math.min(minCol, cellIndex);
      maxRow = Math.max(maxRow, rowIndex);
      maxCol = Math.max(maxCol, cellIndex);
    });

    // Set rowspan and colspan for the first selected cell
    const firstCell = selectedCells[0];
    firstCell.rowSpan = maxRow - minRow + 1;
    firstCell.colSpan = maxCol - minCol + 1;

    // Remove the other selected cells
    selectedCells.forEach((cell) => {
      if (cell !== firstCell) {
        cell.parentNode.removeChild(cell);
      }
    });

    // Clear the selection
    clearSelection();
  };

  const clearSelection = () => {
    const cells = document.querySelectorAll('td');
    cells.forEach((cell) => {
      cell.classList.remove('selecting');
    });
  };

  const handleMouseDown = (event) => {
    if (event.target.tagName === 'TD') {
      setIsMouseDown(true);
      setStartCell(event.target);
      setEndCell(event.target);
      toggleCellSelection(event.target);
    }
  };

  const handleMouseMove = (event) => {
    if (isMouseDown && event.target.tagName === 'TD') {
      setEndCell(event.target);
      selectCells(startCell, event.target);
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const selectCells = (startCell, endCell) => {
    clearSelection();
    const minX = Math.min(startCell.cellIndex, endCell.cellIndex);
    const maxX = Math.max(startCell.cellIndex, endCell.cellIndex);
    const minY = Math.min(
      startCell.parentNode.rowIndex,
      endCell.parentNode.rowIndex
    );
    const maxY = Math.max(
      startCell.parentNode.rowIndex,
      endCell.parentNode.rowIndex
    );

    let selectedCount = 0;

    for (let rowIndex = minY; rowIndex <= maxY; rowIndex++) {
      for (let colIndex = minX; colIndex <= maxX; colIndex++) {
        const cell = document.querySelector(
          `#dynamic-table tr:nth-child(${rowIndex + 1}) td:nth-child(${
            colIndex + 1
          })`
        );
        cell.classList.add('selecting');
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
      <table
        id="dynamic-table"
        border="1"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <tbody>
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: colCount }).map((_, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="text"
                    id={`row${rowIndex + 1}_col${colIndex + 1}`}
                    value={`Row ${rowIndex + 1}, Col ${colIndex + 1}`}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="selected-count">
        Selected cell count: {selectedCount}
      </div>
    </div>
  );
};

export default DynamicTable;
