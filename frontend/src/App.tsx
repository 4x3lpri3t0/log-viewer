import React, {useEffect, useState} from 'react';
import {useTable} from 'react-table';
import './App.css';

function App() {
  const [data, setResult] = useState([]);
  let [loading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    loading = true;
    fetch('http://localhost:3005/logs')
      .then((response) => response.json())
      .then((data) => {
        setResult(data.rows);
        loading = false;
      })
      .catch((error) => {
        console.log(error);
        loading = false;
      });
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'doc.date', // accessor is the "key" in the data
      },
      {
        Header: 'File',
        accessor: 'doc.file',
      },
    ],
    [],
  );

  // @ts-ignore
  const tableInstance = useTable({columns, data});

  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
    tableInstance;

  return (
    <>
      {loading ? (
        <div>Data Loading...</div>
      ) : (
        // apply the table props
        <table {...getTableProps()}>
          <thead>
            {
              // Loop over the header rows
              headerGroups.map((headerGroup) => (
                // Apply the header row props
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    // Loop over the headers in each row
                    headerGroup.headers.map((column) => (
                      // Apply the header cell props
                      <th {...column.getHeaderProps()}>
                        {
                          // Render the header
                          column.render('Header')
                        }
                      </th>
                    ))
                  }
                </tr>
              ))
            }
          </thead>
          {/* Apply the table body props */}
          <tbody {...getTableBodyProps()}>
            {
              // Loop over the table rows
              rows.map((row) => {
                // Prepare the row for display
                prepareRow(row);
                return (
                  // Apply the row props
                  <tr {...row.getRowProps()}>
                    {
                      // Loop over the rows cells
                      row.cells.map((cell) => {
                        // Apply the cell props
                        return (
                          <td {...cell.getCellProps()}>
                            {
                              // Render the cell contents
                              cell.render('Cell')
                            }
                          </td>
                        );
                      })
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      )}
    </>
  );
}

export default App;
