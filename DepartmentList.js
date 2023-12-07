// src/components/DepartmentList.js
import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    Button,
    Typography,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from '@mui/material';
import ApiService from '../services/ApiService';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [deleteResult, setDeleteResult] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);
    const [newDepartmentData, setNewDepartmentData] = useState({
        description: '',
        parentID: '',
        managerID: '',
    });

    useEffect(() => {
        ApiService.getDepartments()
            .then(response => setDepartments(response.data))
            .catch(error => console.error('Error fetching departments:', error));
    }, []);

    const handleDepartmentButtonClick = (department) => {
        setSelectedDepartment(department);
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setDeleteResult(null);
        setSelectedDepartment(null);
    };

    const handleDeleteDepartment = () => {
        ApiService.deleteDepartment(selectedDepartment.departmentID)
            .then(() => {
                setDepartments(departments.filter(dep => dep.departmentID !== selectedDepartment.departmentID));
                setDeleteResult('Department deleted successfully.');
            })
            .catch(error => {
                console.error('Error deleting department:', error);
                setDeleteResult('Error deleting department.');
            });
    };

    const handleAddDialogClick = () => {
        setIsAddDialogOpen(true);
    };

    const handleAddDialogClose = () => {
        setIsAddDialogOpen(false);
        setNewDepartmentData({
            description: '',
            parentID: '',
            managerID: '',
        });
    };

    const handleAddDepartment = () => {
        ApiService.addDepartment(newDepartmentData)
            .then(response => {
                setDepartments([...departments, response.data]);
                setIsAddDialogOpen(false);
                setNewDepartmentData({
                    description: '',
                    parentID: '',
                    managerID: '',
                });
            })
            .catch(error => console.error('Error adding department:', error));
    };

    const handleShowInfoClick = (department) => {
        setSelectedDepartment(department);
        setIsInfoDialogOpen(true);
    };

    const handleInfoDialogClose = () => {
        setIsInfoDialogOpen(false);
        setSelectedDepartment(null);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleAddDialogClick}>
                    Add Department
                </Button>
            </Grid>
            {departments.map(department => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={department.departmentID}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                {department.description}
                            </Typography>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => handleDepartmentButtonClick(department)}
                            >
                                Delete Department
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => handleShowInfoClick(department)}
                            >
                                Show All Info
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            ))}

            <Dialog open={isDialogOpen} onClose={handleDialogClose}>
                {/* Cod existent pentru dialogul de ștergere */}
                <DialogTitle>Delete Department</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete the department?</Typography>
                    <Typography>{selectedDepartment?.description}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button color="secondary" onClick={handleDeleteDepartment}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={isAddDialogOpen} onClose={handleAddDialogClose}>
                {/* Cod existent pentru dialogul de adăugare */}
                <DialogTitle>Add Department</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Description"
                        fullWidth
                        value={newDepartmentData.description}
                        onChange={(e) => setNewDepartmentData({ ...newDepartmentData, description: e.target.value })}
                    />
                    <TextField
                        label="Parent ID"
                        fullWidth
                        value={newDepartmentData.parentID}
                        onChange={(e) => setNewDepartmentData({ ...newDepartmentData, parentID: e.target.value })}
                    />
                    <TextField
                        label="Manager ID"
                        fullWidth
                        value={newDepartmentData.managerID}
                        onChange={(e) => setNewDepartmentData({ ...newDepartmentData, managerID: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddDialogClose}>Cancel</Button>
                    <Button color="primary" onClick={handleAddDepartment}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={isInfoDialogOpen} onClose={handleInfoDialogClose}>
                <DialogTitle>{selectedDepartment?.description || ''} - All Info</DialogTitle>
                <DialogContent>
                    <Typography>Department ID: {selectedDepartment?.departmentID}</Typography>
                    <Typography>Parent ID: {selectedDepartment?.parentID}</Typography>
                    <Typography>Manager ID: {selectedDepartment?.managerID}</Typography>
                    {/* Adaugă mai multe detalii despre departament aici */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleInfoDialogClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};

export default DepartmentList;
