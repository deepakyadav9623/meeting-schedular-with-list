import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import DeleteConfirmationModal from './Modal/DeleteConfirmationModal';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        tableContainer: {
            margin: 'auto',
            marginTop: theme.spacing(4),
            width: '90%',
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
        firstTableCell: {
            backgroundColor: theme.palette.grey[200],
            fontWeight: 'bold',
        },
    })
);

const DynamicMeetings: React.FC = () => {
    const classes = useStyles();
    const [meetings, setMeetings] = useState([]);
    const [deleted, setDeleted] = useState<number>(1);
    const [open, setOpen] = useState<boolean>(false);
    const [deletedId, setDeletedId] = useState<number>();
    const { id } = useParams();

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("events") || "[]")
        const updatedData = data.filter((el: any) => el.clients === id);
        setMeetings(updatedData);
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("events") || "[]")
        const updatedData = data.filter((el: any) => el.clients === id);
        setMeetings(updatedData);
    }, [deleted])

    const onCloseModal = () => {
        setOpen(false);
    }
    const onDeleteModal = () => {
        const datas = JSON.parse(localStorage.getItem("events") || "[]");
        const abc = datas.filter((el: any) => el.event_id !== deletedId)
        localStorage.setItem("events", JSON.stringify(abc));
        setDeleted(deleted + 1);
        setOpen(false)
    }
    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table>
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        <TableCell className={classes.tableHeadCell}></TableCell>
                        <TableCell className={classes.tableHeadCell}>Id</TableCell>
                        <TableCell className={classes.tableHeadCell}>Event name</TableCell>
                        <TableCell className={classes.tableHeadCell}>Client name</TableCell>
                        <TableCell className={classes.tableHeadCell}>Start time</TableCell>
                        <TableCell className={classes.tableHeadCell}>End time</TableCell>
                        <TableCell className={classes.tableHeadCell}>Price($)</TableCell>
                        <TableCell className={classes.tableHeadCell}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {meetings?.map((meeting: any, index: number) => (
                        <TableRow
                            key={meeting.event_id}
                            className={classes.tableRow}
                            hover
                        >
                            <TableCell className={`${classes.tableCell} ${classes.firstTableCell}`}>
                                {new Date(meeting.start).toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                })}
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                                {index + 1}
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                                {meeting.title}
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                                {meeting.clients}
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                                {new Date(meeting.start).toLocaleTimeString()}
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                                {new Date(meeting.end).toLocaleTimeString()}
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                                {meeting.Price}
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                                <Button onClick={() => {
                                    setOpen(true);
                                    setDeletedId(meeting.event_id);
                                }} variant="contained" color="secondary" size="small">
                                    delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <DeleteConfirmationModal
                open={open}
                onClose={onCloseModal}
                onDelete={onDeleteModal}
            />
        </TableContainer>
    );
};

export default DynamicMeetings;
