import Box from "@mui/material/Box";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button, Checkbox, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from '@mui/icons-material/Close';

export default function Webapp() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedRow, setSelectedRow] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5)

    const [country, setCountry] = useState("");
    const [device, setDevice] = useState("");
    const [tab, setTab] = useState("");
    const [category, setCategory] = useState("");
    const [version, setVersion] = useState("");
    const [status, setStatus] = useState("");
    const [title, setTitle] = useState("");
    const [open, setOpen] = useState(false);

    const [rows, setRows] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/data")
            .then((res) => res.json())
            .then((data) => setRows(data))
            .catch((err) => console.error("Error fetching data:", err));
    }, [])


    const handleDelete = () => {
        selectedRow.forEach(id => {
            fetch(`http://localhost:8000/data/${id}`, {
                method: "DELETE"
            })
                .then((res) => res.text()).then((msg) => console.log(msg))
                .catch((err) => console.error("Error deleting data:", err))
        });
        setRows(rows.filter(row => !selectedRow.includes(row.id)));
        setSelectedRow([]);
    }

    const handleModelOpen = () => {
        setOpen(true);
    }

    const handleModelClose = () => {
        setOpen(false);
    }

    const handleReset = () => {
        setSelectedRow([]);
        setPage(0);
        setRowsPerPage(5);
        setTitle("");
        setTab("");
        setCountry("");
        setDevice("");
        setCategory("");
        setVersion("");
        setStatus("");
        setStartDate(null);
        setEndDate(null);
    };


    const handleCheckboxChange = (id) => {
        setSelectedRow((prev) => prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id])
    }

    const handleStartDate = (newValue) => {
        setStartDate(newValue);

        if (endDate && newValue && dayjs(newValue).isAfter(endDate)) {
            setEndDate(null);
        }
    };

    const handleEndDate = (newValue) => {
        if (startDate && newValue && dayjs(newValue).isBefore(startDate)) {
            alert("End date cannot be before Start date!");
            return;
        }
        setEndDate(newValue);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        height: '70%',
        bgcolor: 'background.paper',
        border: '2px solid white',
        boxShadow: 24,
        p: 4,
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box margin={'20px'} border={'1px solid gray'} padding={'20px'}>
            <h2 style={{color:"#1976d2", display:'flex', justifyContent:'center'}}>Channels Application</h2>
            <Box border={'1px solid gray'} padding={'20px'} margin={'20px'} borderRadius={'10px'}>
                <Box>
                    <FormControl sx={{ minWidth: '246px', margin: '10px' }}>
                        <InputLabel id="input-label">Country</InputLabel>
                        <Select labelId="input-label" label='Country' value={country} onChange={(e) => setCountry(e.target.value)}>
                            <MenuItem value="US">US</MenuItem>
                            <MenuItem value="Canada">Canada</MenuItem>
                            <MenuItem value="India">India</MenuItem>
                            <MenuItem value="Korea">Korea</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: '246px', margin: '10px' }}>
                        <InputLabel id="input-label">Device Type</InputLabel>
                        <Select labelId="input-label" label='Device Type' value={device} onChange={(event) => setDevice(event.target.value)}>
                            <MenuItem value="All">All</MenuItem>
                            <MenuItem value="auto">auto</MenuItem>
                            <MenuItem value="tv">tv</MenuItem>
                            <MenuItem value="mobile">mobile</MenuItem>
                            <MenuItem value="pc">pc</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: '246px', margin: '10px' }}>
                        <InputLabel id="input-label">Tab</InputLabel>
                        <Select labelId="input-label" label='Tab' value={tab} onChange={(event) => setTab(event.target.value)}>
                            <MenuItem value="All">All</MenuItem>
                            <MenuItem value="Test Tab 2">Test Tab 2</MenuItem>
                            <MenuItem value="Live">Live</MenuItem>
                            <MenuItem value="Test-KIDS kids">Test-KIDS kids</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: '246px', margin: '10px' }}>
                        <InputLabel id="input-label">Category</InputLabel>
                        <Select labelId="input-label" label='Category' value={category} onChange={(e) => setCategory(e.target.value)}>
                            <MenuItem value="Promotion">Promotion</MenuItem>
                            <MenuItem value="test1">test1</MenuItem>
                            <MenuItem value="test2">test2</MenuItem>
                            <MenuItem value="Promotion">Promotion</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: '246px', margin: '10px' }}>
                        <InputLabel id="input-label">Platform Version</InputLabel>
                        <Select labelId="input-label" label='PlatformVersion' value={version} onChange={(e) => setVersion(e.target.value)}>
                            <MenuItem value="auto">auto</MenuItem>
                            <MenuItem value="3.4.0">3.4.0</MenuItem>
                            <MenuItem value="8.2.0">8.2.0</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box>
                    <FormControl sx={{ minWidth: '246px', margin: '10px' }}>
                        <InputLabel id='sample-label' >Status</InputLabel>
                        <Select labelId="sample-label" label='status' value={status} onChange={(e) => setStatus(e.target.value)}>
                            <MenuItem value='auto'>auto</MenuItem>
                            <MenuItem value='processing'>processing</MenuItem>
                            <MenuItem value='done'>done</MenuItem>
                            <MenuItem value='test'>test</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ margin: '10px' }}>
                        <TextField label='Title' value={title} onChange={(e) => setTitle(e.target.value)}>Title</TextField>
                    </FormControl>
                    <FormControl sx={{ margin: '10px' }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker value={startDate} onChange={handleStartDate} />
                        </LocalizationProvider>
                    </FormControl>
                    <FormControl sx={{ margin: '10px' }} label="End Date">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker value={endDate} onChange={handleEndDate} />
                        </LocalizationProvider>
                    </FormControl>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap:'10px'}}>
                        <FormControl sx={{ height: '56px' }} >
                        <Button variant="outlined" onClick={() => handleReset()}><RestartAltIcon />Reset</Button>
                    </FormControl>
                    <FormControl sx={{height: '56px' }}>
                        <Button variant="contained"><SearchIcon /> Search</Button>
                    </FormControl> 
                    </Box>
                   

                </Box>
            </Box>
            <Box border={'1px solid gray'} padding={'20px'} margin={'20px'} borderRadius={'10px'}>

                <Box
                    padding={'5px'}
                    margin={'10px'}
                    borderRadius={'10px'}
                    display="flex"
                    justifyContent="flex-end"
                    gap={2}
                >
                    <Button variant="contained" sx={{ background: 'red', minWidth: '90px' }} onClick={handleDelete}>
                        <DeleteIcon />
                    </Button>
                    <div>
                        <Button variant="contained" sx={{ minWidth: '90px' }} onClick={handleModelOpen}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description">
                            Add
                        </Button>
                        <Modal open={open} onClose={handleModelClose} sx={{ minWidth: '50px', }}>
                            <Box sx={style}>
                                <IconButton onClick={handleModelClose} sx={{ display: "flex", justifyContent: 'flex-end', color: 'red' }}><CloseIcon /></IconButton>
                                <Box border={'1px solid white'} padding={'20px'} margin={'20px'} borderRadius={'10px'}>
                                    <Box>
                                        <FormControl sx={{ minWidth: '246px', margin: '10px' }}>
                                            <InputLabel id="input-label">Country</InputLabel>
                                            <Select labelId="input-label" label='Country' value={country} onChange={(e) => setCountry(e.target.value)}>
                                                <MenuItem value="US">US</MenuItem>
                                                <MenuItem value="Canada">Canada</MenuItem>
                                                <MenuItem value="India">India</MenuItem>
                                                <MenuItem value="Korea">Korea</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <FormControl sx={{ minWidth: '246px', margin: '10px' }}>
                                            <InputLabel id="input-label">Device Type</InputLabel>
                                            <Select labelId="input-label" label='Device Type' value={device} onChange={(event) => setDevice(event.target.value)}>
                                                <MenuItem value="All">All</MenuItem>
                                                <MenuItem value="auto">auto</MenuItem>
                                                <MenuItem value="tv">tv</MenuItem>
                                                <MenuItem value="mobile">mobile</MenuItem>
                                                <MenuItem value="pc">pc</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <FormControl sx={{ minWidth: '246px', margin: '10px' }}>
                                            <InputLabel id="input-label">Tab</InputLabel>
                                            <Select labelId="input-label" label='Tab' value={tab} onChange={(e) => setTab(e.target.value)}>
                                                <MenuItem value="All">All</MenuItem>
                                                <MenuItem value="Test Tab 2">Test Tab 2</MenuItem>
                                                <MenuItem value="Live">Live</MenuItem>
                                                <MenuItem value="Test-KIDS kids">Test-KIDS kids</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <FormControl sx={{ minWidth: '246px', margin: '10px' }}>
                                            <InputLabel id="input-label">Category</InputLabel>
                                            <Select labelId="input-label" label='Category' value={category} onChange={(e) => setCategory(e.target.value)}>
                                                <MenuItem value="Promotion">Promotion</MenuItem>
                                                <MenuItem value="test1">test1</MenuItem>
                                                <MenuItem value="test2">test2</MenuItem>
                                                <MenuItem value="Promotion">Promotion</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <FormControl sx={{ minWidth: '246px', margin: '10px' }}>
                                            <InputLabel id="input-label">Platform Version</InputLabel>
                                            <Select labelId="input-label" label='PlatformVersion' value={version} onChange={(e) => setVersion(e.target.value)}>
                                                <MenuItem value="auto">auto</MenuItem>
                                                <MenuItem value="3.4.0">3.4.0</MenuItem>
                                                <MenuItem value="8.2.0">8.2.0</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Box>
                                        <FormControl sx={{ minWidth: '246px', margin: '10px' }}>
                                            <InputLabel id='sample-label' >Status</InputLabel>
                                            <Select labelId="sample-label" label='status' value={status} onChange={(e) => setStatus(e.target.value)}>
                                                <MenuItem value='auto'>auto</MenuItem>
                                                <MenuItem value='processing'>processing</MenuItem>
                                                <MenuItem value='done'>done</MenuItem>
                                                <MenuItem value='test'>test</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <FormControl sx={{ margin: '10px' }}>
                                            <TextField label='Title' value={title} onChange={(e) => setTitle(e.target.value)}>Title</TextField>
                                        </FormControl>
                                        <FormControl sx={{ margin: '10px' }}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker value={startDate} onChange={handleStartDate} />
                                            </LocalizationProvider>
                                        </FormControl>
                                        <FormControl sx={{ margin: '10px' }} label="End Date">
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker value={endDate} onChange={handleEndDate} />
                                            </LocalizationProvider>
                                        </FormControl>
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap:'10px' }}>
                                        <Button
                                            variant="contained"
                                            onClick={() => {
                                                const newRow = {
                                                    id: rows.length + 1,
                                                    country,
                                                    device,
                                                    tab,
                                                    category,
                                                    version,
                                                    status,
                                                    title,
                                                    startDate: startDate ? dayjs(startDate).format("YYYY-MM-DD") : "",
                                                    endDate: endDate ? dayjs(endDate).format("YYYY-MM-DD") : "",
                                                };

                                                setRows((prev) => [...prev, newRow]);

                                                fetch("http://localhost:8000/data", {
                                                    method: "POST",
                                                    headers: { "Content-Type": "application/json" },
                                                    body: JSON.stringify(newRow),
                                                });

                                                handleModelClose();
                                                handleReset();
                                            }}
                                        >
                                            Save
                                        </Button>
                                        <Button variant="contained" sx={{ background: 'red' }} onClick={handleModelClose}> Cancel</Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Modal>
                    </div>

                </Box>
                <Paper>
                    <Table  sx={{ borderBlockStartColor :'red', width: '100%', overflow: "hidden" }}>
                        <TableContainer sx={{ width: "100%", height: "100%" }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            indeterminate={selectedRow.length > 0 && selectedRow.length < rows.length}
                                            checked={rows.length > 0 && selectedRow.length === rows.length}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedRow(rows.map((r) => r.id))
                                                } else {
                                                    setSelectedRow([]);
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>Id</TableCell>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Country</TableCell>
                                    <TableCell>Decice Type</TableCell>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Platform Version</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>StartDate</TableCell>
                                    <TableCell>EndDate</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                    <TableRow key={row.id}>
                                        <Checkbox
                                            checked={selectedRow.includes(row.id)}
                                            onChange={() => handleCheckboxChange(row.id)} />
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{row.title}</TableCell>
                                        <TableCell>{row.country}</TableCell>
                                        <TableCell>{row.device}</TableCell>
                                        <TableCell>{row.category}</TableCell>
                                        <TableCell>{row.version}</TableCell>
                                        <TableCell>{row.status}</TableCell>
                                        <TableCell>{row.startDate}</TableCell>
                                        <TableCell>{row.endDate}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </TableContainer>
                    </Table>
                </Paper>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </Box>
    )
}