import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { FaEye } from "react-icons/fa";
import { button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { BsPenFill } from "react-icons/bs";

const columns = [
  { id: "sino", label: "SI-no" },
  { id: "topics", label: "Topics" },
  {
    id: "duedate",
    label: "Due-Date",
    // minWidth: 170,
    align: "right",
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: "time",
    label: "Time",
    // minWidth: 170,
    align: "right",
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: "type",
    label: "Type",
    // minWidth: 170,
    align: "right",
    // format: (value) => value.toFixed(2),
  },
  {
    id: "evaluatedBy",
    label: "Evaluated By",
    // minWidth: 170,
    align: "right",
    // format: (value) => value.toFixed(2),
  },
  {
    id: "status",
    label: "Status",
    // minWidth: 170,
    align: "right",
    // format: (value) => value.toFixed(2),
  },
  {
    id: "mark",
    label: "Mark",
    // minWidth: 170,
    align: "right",
    // format: (value) => value.toFixed(2),
  },
  {
    id: "activity",
    label: "Activity",
    // minWidth: 170,
    align: "right",
    // format: (value) => value.toFixed(2),
  },
];

function createData(
  sino,
  topics,
  duedate,
  time,
  type,
  evaluatedBy,
  status,
  mark,
  activity
) {
  return {
    sino,
    topics,
    duedate,
    time,
    type,
    evaluatedBy,
    status,
    mark,
    activity,
  };
}

const rows = [
  createData(
    "1",
    "Merge-sort",
    "20-June",
    "4.00pm",
    "online",
    "sneha",
    "Verified",
    10
  ),
  createData(
    "1",
    "Merge-sort",
    "20-June",
    "4.00pm",
    "online",
    "sneha",
    "Verified",
    10
  ),
  createData(
    "1",
    "Merge-sort",
    "20-June",
    "4.00pm",
    "online",
    "sneha",
    "Verified",
    10
  ),
  createData(
    "1",
    "Merge-sort",
    "20-June",
    "4.00pm",
    "online",
    "sneha",
    "pending",
    10
  ),
  createData(
    "1",
    "Merge-sort",
    "20-June",
    "4.00pm",
    "online",
    "sneha",
    "Verified",
    10
  ),
  createData(
    "1",
    "Merge-sort",
    "20-June",
    "4.00pm",
    "online",
    "sneha",
    "Verified",
    10
  ),
  createData(
    "1",
    "Merge-sort",
    "20-June",
    "4.00pm",
    "online",
    "sneha",
    "hello",
    10
  ),

  // Add more rows here with values for all properties.
];

// ... (previous code)

export default function AssignmentDetails() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleViewActivity = (row) => {
    console.log(row);
    // Implement the logic to view the activity for the given row.
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.id === "activity") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {row.status === "Verified" ? (
                              <Link to="/student/scorecard">
                                <button onClick={() => handleViewActivity(row)}>
                                  <FaEye />
                                </button>
                              </Link>
                            ) : (
                              <Link to="/student/submitForm">
                                <button>
                                  <BsPenFill />
                                </button>
                              </Link>
                            )}
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
