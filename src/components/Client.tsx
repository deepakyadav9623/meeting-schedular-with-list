import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import AddClientModal from './Modal/AddClientModal';
import DeleteConfirmationModal from './Modal/DeleteConfirmationModal';


interface Client {
    id: number;
    name: string;
    email: string;
    phone: string;
    city: string;
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        tableContainer: {
            margin: 'auto',
            marginTop: theme.spacing(4),
            width: '80%',
        },
        tableHead: {
            backgroundColor: theme.palette.primary.light,
        },
        tableHeadCell: {
            color: theme.palette.primary.contrastText,
            fontWeight: 'bold',
        },
        tableRow: {
            '&:hover': {
                backgroundColor: theme.palette.action.hover,
            },
        },
        tableCell: {
            maxWidth: 150,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
        },
        createButton: {
            marginLeft: theme.spacing(2),
        },
    })
);

const Client: React.FC = () => {
    const classes = useStyles();
    const [clients, setClients] = useState(JSON.parse(localStorage.getItem("clients") || "[]"));
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedClient, setSelectedClient] = useState(null);
    const [deleted, setDeleted] = useState<number>(1);
    const [deletedName, setDeletedName] = useState<string>();
    const [showClientModal, setShowClientModal] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState<boolean>(false);
    const [editedData,setEditedData] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        setClients(JSON.parse(localStorage.getItem("clients") || "[]"));
    }, [deleted, showClientModal])

    const handleTableRowClick = (client: any) => {
        navigate(`/meetings/${client.name}`)
    };

    const handleCreateClientClick = () => {
        // console.log(987654);
        setEditedData(undefined)
        setShowClientModal(true)
    };
    const onCloseModal = () => {
        setShowClientModal(false);
        setOpenDelete(false);
    }
    const deleteClient = () => {
        const data = JSON.parse(localStorage.getItem("clients") || "[]");
        const updatedData = data.filter((el: any) => el.name !== deletedName);
        localStorage.setItem("clients", JSON.stringify(updatedData));
        setDeleted(deleted + 1);
        setOpenDelete(false);
        setAnchorEl(null);
    }


    return (
        <div>
            <Typography variant="h4" component="h1" align="center">Clients List
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.createButton}
                    onClick={handleCreateClientClick}
                >
                    Add Client
                </Button>
            </Typography>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell className={classes.tableHeadCell}>ID</TableCell>
                            <TableCell className={classes.tableHeadCell}>Name</TableCell>
                            <TableCell className={classes.tableHeadCell}>Email</TableCell>
                            <TableCell className={classes.tableHeadCell}>Relationship</TableCell>
                            <TableCell className={classes.tableHeadCell}>City</TableCell>
                            <TableCell className={classes.tableHeadCell}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clients?.map((client: any, index: any) => (
                            <TableRow
                                key={index}
                                className={classes.tableRow}
                                hover
                            >
                                <TableCell
                                    onClick={() => handleTableRowClick(client)}
                                    className={classes.tableCell}>
                                    {index + 1}
                                </TableCell>

                                <TableCell
                                    onClick={() => handleTableRowClick(client)}
                                    className={classes.tableCell}>
                                    {client.name}
                                </TableCell>
                                <TableCell
                                    onClick={() => handleTableRowClick(client)}
                                    className={classes.tableCell}>
                                    {client.contact}
                                </TableCell>
                                <TableCell
                                    onClick={() => handleTableRowClick(client)}
                                    className={classes.tableCell}>
                                    {client.Relationship}
                                </TableCell>
                                <TableCell
                                    onClick={() => handleTableRowClick(client)}
                                    className={classes.tableCell}>
                                    {client.city}
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                    <Button onClick={() => {
                                        setOpenDelete(true);
                                        setDeletedName(client.name);
                                    }} variant="contained" color="secondary" size="small">
                                        delete
                                    </Button>
                                    <Button onClick={() => {
                                        setShowClientModal(true)
                                        setEditedData(client)
                                    }} variant="outlined" style={{marginLeft:"10px"}} color="primary" size="small">
                                        Edit
                                    </Button>
                                    
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <AddClientModal
                open={showClientModal}
                onClose={onCloseModal}
                setShowClientModal={setShowClientModal}
                client={editedData}
            />
            <DeleteConfirmationModal
                open={openDelete}
                onClose={onCloseModal}
                onDelete={deleteClient}
            />
        </div >
    );
};

export default Client;