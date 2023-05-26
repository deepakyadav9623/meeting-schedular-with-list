import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
    TextField,
    Typography,
    makeStyles,
    createStyles,
    Theme,
} from '@material-ui/core';


interface AddCLientModalProps {
    open: boolean;
    onClose: () => void;
    setShowClientModal: React.Dispatch<React.SetStateAction<boolean>>;
    client?: Client;
}


interface FormValues {
    fullName: string;
    Relationship: string;
    email: string;
    city: string;
}
interface Client {
    id: number;
    name: string;
    Relationship: string;
    contact: string;
    city: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '1000px',
            width: '500px',
            margin: 'auto',
            // marginTop: theme.spacing(4),
            padding: theme.spacing(3),
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[3],
            borderRadius: theme.shape.borderRadius,
        },
        textField: {
            marginBottom: theme.spacing(2),
            // marginRight: theme.spacing(2),
        },
        submitButton: {
            marginTop: theme.spacing(2),
            alignSelf: 'flex-end',
        },
        errorMessage: {
            color: theme.palette.error.main,
        },
    })
);

const validationSchema = Yup.object({
    fullName: Yup.string().required('Required'),
    Relationship: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    city: Yup.string().required('Required'),
});

const AddClientModal: React.FC<AddCLientModalProps> = ({ open, onClose, setShowClientModal, client }) => {

    const classes = useStyles();

    const initialValues: FormValues = !!client ? {
        fullName: client.name,
        Relationship: client.Relationship,
        email: client.contact,
        city: client.city,
    } : {
        fullName: '',
        Relationship: '',
        email: '',
        city: '',
    };

    const handleSubmit = (values: FormValues) => {
        // console.log('Form submitted:', values);
        const data = JSON.parse(localStorage.getItem("clients") || "[]")
        const updatedValues = {
            "id": !!client ? client.id : data.length + 1,
            "name": values.fullName,
            "text": values.fullName,
            "value": values.fullName,
            "contact": values.email,
            "Relationship": values.Relationship,
            "city": values.city
        };
        if (client) {
            const index = data.findIndex((c: Client) => c.id === client.id);
            data[index] = updatedValues;
        } else {
            data.push(updatedValues);
        }
        localStorage.setItem('clients', JSON.stringify(data))
        setShowClientModal(false);
    };



    return (
        <Dialog open={open} onClose={onClose}>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                {({ errors, touched, values }) => (
                    <Form className={classes.form}>
                        <Typography variant="h5" align="center" gutterBottom>
                            {!!client ? "Edit Client" : "Add Client"}
                        </Typography>
                        <DialogContent>
                            <Field
                                className={classes.textField}
                                name="fullName"
                                label="Full Name"
                                as={TextField}
                                variant="outlined"
                                error={touched.fullName && Boolean(errors.fullName)}
                                helperText={touched.fullName && errors.fullName}
                            />
                            <Field
                                className={classes.textField}
                                name="Relationship"
                                label="Relationship"
                                as={TextField}
                                variant="outlined"
                                error={touched.Relationship && Boolean(errors.Relationship)}
                                helperText={touched.Relationship && errors.Relationship}
                            />
                            <Field
                                className={classes.textField}
                                name="email"
                                label="Email"
                                type="email"
                                as={TextField}
                                variant="outlined"
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                            />
                            <Field
                                className={classes.textField}
                                name="city"
                                label="City"
                                as={TextField}
                                variant="outlined"
                                error={touched.city && Boolean(errors.city)}
                                helperText={touched.city && errors.city}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={onClose} color="primary">
                                Cancel
                            </Button>
                            <Button
                                // className={classes.submitButton}
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Submit
                            </Button>
                        </DialogActions>
                    </Form>
                )}
            </Formik>

        </Dialog>
    );
};

export default AddClientModal;