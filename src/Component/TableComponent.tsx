// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TablePagination,
//   Button,
//   Box,
//   TextField,
// } from "@mui/material";
// import AddRoundedIcon from "@mui/icons-material/AddRounded";

// interface CustomerData {
//   id: number;
//   email: string;
//   firstName: string;
//   lastName: string;
// }

// const TableComponent: React.FC = () => {
//   const [data, setData] = useState<CustomerData[]>([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isBoxOpen, setIsBoxOpen] = useState(false); // State to manage the visibility of the Box
//   const [email, setEmail] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [editItem, setEditItem] = useState<CustomerData | null>(null); // State for the item being edited
//   const boxRef = useRef<HTMLDivElement | null>(null); // Ref for the Box

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:8080/api/v1/customerapp/customer"
//         );
//         setData(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
//         setIsBoxOpen(false); // Close the Box when clicking outside
//       }
//     };

//     if (isBoxOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isBoxOpen]);

//   const handleAddClick = () => {
//     setEditItem(null); // Clear the editItem when adding new data
//     setEmail("");
//     setFirstName("");
//     setLastName("");
//     setIsBoxOpen(true); // Show the Box when clicking the AddRoundedIcon
//   };

//   const handleFormSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "http://localhost:8080/api/v1/customerapp/customer",
//         {
//           email,
//           firstName,
//           lastName,
//         }
//       );

//       // Update the table with the new data
//       setData([...data, response.data]);

//       // Close the form
//       setIsBoxOpen(false);

//       // Clear the form fields
//       setEmail("");
//       setFirstName("");
//       setLastName("");
//     } catch (error) {
//       console.error("Error submitting data:", error);
//     }
//   };

//   const handleUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (editItem) {
//       try {
//         const response = await axios.put(
//           `http://localhost:8080/api/v1/customerapp/customer/${editItem.id}`,
//           {
//             email,
//             firstName,
//             lastName,
//           }
//         );

//         // Update the table with the edited data
//         setData(
//           data.map((item) => (item.id === editItem.id ? response.data : item))
//         );

//         // Close the form and clear the form fields
//         setIsBoxOpen(false);
//         setEditItem(null);
//         setEmail("");
//         setFirstName("");
//         setLastName("");
//       } catch (error) {
//         console.error("Error updating data:", error);
//       }
//     }
//   };

//   const handleEdit = (row: CustomerData) => {
//     setEditItem(row); // Set the item to be edited
//     setEmail(row.email);
//     setFirstName(row.firstName);
//     setLastName(row.lastName);
//     setIsBoxOpen(true); // Open the form for editing
//   };

//   const handleDelete = async (row: CustomerData) => {
//     try {
//       await axios.delete(
//         `http://localhost:8080/api/v1/customerapp/customer/${row.id}`
//       );

//       // Update the table by removing the deleted item
//       setData(data.filter((item) => item.id !== row.id));

//       console.log("Delete:", row);
//     } catch (error) {
//       console.error("Error deleting data:", error);
//     }
//   };

//   // Filter data based on the search query
//   const filteredData = data.filter(
//     (row) =>
//       (row.firstName?.toLowerCase() || "").includes(
//         searchQuery.toLowerCase()
//       ) ||
//       (row.lastName?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
//       (row.email?.toLowerCase() || "").includes(searchQuery.toLowerCase())
//   );

//   const handleChangePage = (event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (
//     event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <>
//       <Box
//         sx={{
//           width: "100%",
//           height: "100%",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <Box
//           sx={{
//             width: "100%",
//             height: "10vh",
//             display: "flex",
//             flexDirection: "row",
//             alignItems: "center",
//             justifyContent: "flex-end",
//             pr: "2%",
//             gap: "20px",
//           }}
//         >
//           <TextField
//             label="Search"
//             variant="outlined"
//             onChange={(e) => setSearchQuery(e.target.value)}
//             size="small"
//             sx={{}}
//           />
//           <Box sx={{ backgroundColor: "#fff" }} onClick={handleAddClick}>
//             <AddRoundedIcon sx={{ fontSize: "40px" }} />
//           </Box>
//           {isBoxOpen && (
//             <Box
//               sx={{
//                 position: "fixed",
//                 top: 0,
//                 left: 0,
//                 width: "100vw",
//                 height: "100vh",
//                 backdropFilter: "blur(10px)",
//                 zIndex: 99, // Ensure it's behind the DateRangePicker but above other content
//               }}
//             />
//           )}

//           {isBoxOpen && (
//             <Box
//               ref={boxRef}
//               sx={{
//                 position: "fixed",
//                 top: "50%",
//                 left: "50%",
//                 transform: "translate(-50%, -50%)",
//                 zIndex: "100",
//                 border: "1px solid gray",
//                 width: "50vw",
//                 height: "auto",
//                 background: "#fff",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 p: "2%",
//               }}
//             >
//               <form onSubmit={editItem ? handleUpdate : handleFormSubmit}>
//                 <TextField
//                   label="Email"
//                   variant="outlined"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   fullWidth
//                   sx={{ mb: 2 }}
//                 />
//                 <TextField
//                   label="First Name"
//                   variant="outlined"
//                   value={firstName}
//                   onChange={(e) => setFirstName(e.target.value)}
//                   fullWidth
//                   sx={{ mb: 2 }}
//                 />
//                 <TextField
//                   label="Last Name"
//                   variant="outlined"
//                   value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                   fullWidth
//                   sx={{ mb: 2 }}
//                 />
//                 <Button type="submit" variant="contained" color="primary">
//                   {editItem ? "Update" : "Submit"}
//                 </Button>
//               </form>
//             </Box>
//           )}
//         </Box>
//         <Paper>
//           <TableContainer
//             sx={{
//               width: "80vw",
//               //   border: "1.5px solid #111",
//             }}
//           >
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={{ bgcolor: "#00b6d8", color: "white" }}>
//                     First Name
//                   </TableCell>
//                   <TableCell sx={{ bgcolor: "#00b6d8", color: "white" }}>
//                     Last Name
//                   </TableCell>
//                   <TableCell sx={{ bgcolor: "#00b6d8", color: "white" }}>
//                     Email
//                   </TableCell>
//                   <TableCell sx={{ bgcolor: "#00b6d8", color: "white" }}>
//                     Action
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredData
//                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   .map((row) => (
//                     <TableRow key={row.id}>
//                       <TableCell>{row.firstName}</TableCell>
//                       <TableCell>{row.lastName}</TableCell>
//                       <TableCell>{row.email}</TableCell>
//                       <TableCell>
//                         <Button
//                           variant="contained"
//                           sx={{ backgroundColor: "#ffd300", color: "black" }}
//                           onClick={() => handleEdit(row)}
//                         >
//                           Edit
//                         </Button>
//                         <Button
//                           variant="contained"
//                           sx={{ backgroundColor: "#de0a26", color: "white" }}
//                           onClick={() => handleDelete(row)}
//                           style={{ marginLeft: "10px" }}
//                         >
//                           Delete
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <TablePagination
//             rowsPerPageOptions={[5]}
//             component="div"
//             count={filteredData.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </Paper>
//       </Box>
//     </>
//   );
// };

// export default TableComponent;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
  Box,
  TextField,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

interface CustomerData {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

const TableComponent: React.FC = () => {
  const [data, setData] = useState<CustomerData[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [editItem, setEditItem] = useState<CustomerData | null>(null);
  const [dataChanged, setDataChanged] = useState(false); // New state to trigger data refetch
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/customerapp/customer"
        );
        setData(response.data);
        setDataChanged(false); // Reset dataChanged after fetching data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dataChanged]); // Depend on dataChanged to refetch data

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setIsBoxOpen(false);
      }
    };

    if (isBoxOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isBoxOpen]);

  const handleAddClick = () => {
    setEditItem(null);
    setEmail("");
    setFirstName("");
    setLastName("");
    setIsBoxOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/customerapp/customer",
        {
          email,
          firstName,
          lastName,
        }
      );

      // Update the dataChanged state to trigger data refetch
      setDataChanged(true);

      setIsBoxOpen(false);
      setEmail("");
      setFirstName("");
      setLastName("");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editItem) {
      try {
        const response = await axios.put(
          `http://localhost:8080/api/v1/customerapp/customer/${editItem.id}`,
          {
            email,
            firstName,
            lastName,
          }
        );

        // Update the dataChanged state to trigger data refetch
        setDataChanged(true);

        setIsBoxOpen(false);
        setEditItem(null);
        setEmail("");
        setFirstName("");
        setLastName("");
      } catch (error) {
        console.error("Error updating data:", error);
      }
    }
  };

  const handleEdit = (row: CustomerData) => {
    setEditItem(row);
    setEmail(row.email);
    setFirstName(row.firstName);
    setLastName(row.lastName);
    setIsBoxOpen(true);
  };

  const handleDelete = async (row: CustomerData) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/v1/customerapp/customer/${row.id}`
      );

      // Update the dataChanged state to trigger data refetch
      setDataChanged(true);

      console.log("Delete:", row);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const filteredData = data.filter(
    (row) =>
      (row.firstName?.toLowerCase() || "").includes(
        searchQuery.toLowerCase()
      ) ||
      (row.lastName?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (row.email?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "10vh",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            pr: "2%",
            gap: "20px",
          }}
        >
          <TextField
            label="Search"
            variant="outlined"
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            sx={{}}
          />
          <Box sx={{ backgroundColor: "#fff" }} onClick={handleAddClick}>
            <AddRoundedIcon sx={{ fontSize: "40px" }} />
          </Box>
          {isBoxOpen && (
            <Box
              sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backdropFilter: "blur(10px)",
                zIndex: 99,
              }}
            />
          )}

          {isBoxOpen && (
            <Box
              ref={boxRef}
              sx={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: "100",
                border: "1px solid gray",
                width: "50vw",
                height: "auto",
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: "2%",
              }}
            >
              <form onSubmit={editItem ? handleUpdate : handleFormSubmit}>
                <TextField
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="First Name"
                  variant="outlined"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Last Name"
                  variant="outlined"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <Button type="submit" variant="contained" color="primary">
                  {editItem ? "Update" : "Submit"}
                </Button>
              </form>
            </Box>
          )}
        </Box>
        <Paper>
          <TableContainer
            sx={{
              width: "80vw",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ bgcolor: "#00b6d8", color: "white" }}>
                    First Name
                  </TableCell>
                  <TableCell sx={{ bgcolor: "#00b6d8", color: "white" }}>
                    Last Name
                  </TableCell>
                  <TableCell sx={{ bgcolor: "#00b6d8", color: "white" }}>
                    Email
                  </TableCell>
                  <TableCell sx={{ bgcolor: "#00b6d8", color: "white" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.firstName}</TableCell>
                      <TableCell>{row.lastName}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          sx={{ backgroundColor: "#ffd300", color: "black" }}
                          onClick={() => handleEdit(row)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          sx={{ backgroundColor: "#de0a26", color: "white" }}
                          onClick={() => handleDelete(row)}
                          style={{ marginLeft: "10px" }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </>
  );
};

export default TableComponent;
