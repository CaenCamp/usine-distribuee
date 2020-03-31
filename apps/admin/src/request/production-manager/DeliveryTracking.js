import "date-fns";
import React, { useReducer, useState } from "react";
import { useMutation, useRefresh } from "react-admin";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import formatDate from "date-fns/format";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: { maxWidth: 650, margin: "auto" },
    table: {
        minWidth: 600,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "25ch",
    },
}));

const defaultFormValues = {
    number: null,
    date: new Date(),
    responsible: null,
    maskSmallSizeDelivered: 0,
    maskLargeSizeDelivered: 0,
};

const reducer = (state, { field, value }) => {
    return {
        ...state,
        [field]: value,
    };
};

export default ({ record }) => {
    const classes = useStyles();
    const [mutate, { loading }] = useMutation();
    const refresh = useRefresh();

    const [formValues, setFormValues] = useReducer(reducer, defaultFormValues);
    const [formError, setFormError] = useState({});

    const resetFormValues = () => {
        Object.keys(defaultFormValues).forEach((key) => {
            setFormValues({ field: key, value: defaultFormValues[key] });
        });
        setFormError({});
    };

    const validateForm = values => {
        const checkError = {};
        if (!values.date) {
            checkError.date = "Vous devez indiquer une date";
        }
        if (!values.number) {
            checkError.number = "Vous devez indiquer une date";
        }
        if (!values.responsible) {
            checkError.responsible = "Vous devez indiquer qui est le livreur";
        }
        if (!values.maskSmallSizeDelivered && !values.maskLargeSizeDelivered) {
            checkError.quantity = "Vous devez indiquer ou moins une quantité.";
        }

        return checkError;
    };

    const handleDeliverClick = () => {
        const error = validateForm(formValues);
        if (Object.keys(error).length) {
            setFormError(error);
            return;
        }
        mutate(
            {
                type: "update",
                resource: "dispatcher-requests",
                payload: {
                    id: record.id,
                    data: {
                        deliveryTracking: [
                            ...(record.deliveryTracking || []),
                            formValues,
                        ],
                    },
                },
            },
            {
                onSuccess: () => {
                    refresh();
                    resetFormValues();
                },
            }
        );
    };

    if (!record) {
        return null;
    }

    return (
        <Card className={classes.root}>
            <CardContent>
                <p>
                    <Typography variant="h5" gutterBottom>
                        Gestion des livraisons
                    </Typography>
                </p>
                {(record.deliveryTracking || []).length !== 0 && (
                    <TableContainer component={Paper}>
                        <Table
                            className={classes.table}
                            size="small"
                            aria-label="a dense table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell align="right">Livreur</TableCell>
                                    <TableCell align="right">
                                        Quantité
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(record.deliveryTracking || []).map((row) => (
                                    <TableRow key={row.name}>
                                        <TableCell component="th" scope="row">
                                            {row.number}
                                        </TableCell>
                                        <TableCell>
                                            {formatDate(
                                                new Date(row.date),
                                                "dd/MM/yyyy HH:mm"
                                            )}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.responsible}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.maskSmallSizeDelivered} modèle standard<br />
                                            {row.maskLargeSizeDelivered} modèle long<br />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                <p>
                    <Typography variant="h6" gutterBottom>
                        Ajouter une livraison
                    </Typography>
                    <Grid container justify="space-between">
                        <Grid item xs={5}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                        disableToolbar
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Date"
                                        value={formValues.date}
                                        fullWidth
                                        onChange={(value) =>
                                            setFormValues({
                                                field: "date",
                                                value,
                                            })
                                        }
                                        KeyboardButtonProps={{
                                            "aria-label": "change date",
                                        }}
                                        required
                                        number
                                        helperText={formError.date}
                                        error={!!formError.date}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                label="Numéro BL"
                                id="deliveryNumber"
                                value={formValues.number}
                                fullWidth
                                onChange={(event) => {
                                    setFormValues({
                                        field: "number",
                                        value: event.currentTarget.value,
                                    });
                                    setFormError({});
                                }}
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                                helperText={formError.number}
                                error={!!formError.number}
                            />
                        </Grid>
                        <Grid item xs={11}>
                            <TextField
                                id="standard-full-width"
                                label="Livreur"
                                fullWidth
                                margin="normal"
                                value={formValues.responsible}
                                onChange={(event) => {
                                    setFormValues({
                                        field: "responsible",
                                        value: event.currentTarget.value,
                                    });
                                    setFormError({});
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                                helperText={formError.responsible}
                                error={!!formError.responsible}
                            />
                        </Grid>
                    </Grid>
                    <Typography variant="subtitle1" style={{ marginTop: '1em' }}>
                        Nombre de visières livrées
                    </Typography>
                    <Grid container justify="space-between">
                        <Grid item xs={5}>
                            <TextField
                                label="Modèle standard (24 cm)"
                                id="smallMask"
                                defaultValue={0}
                                value={formValues.maskSmallSizeDelivered}
                                onChange={(event) => {
                                    setFormValues({
                                        field: "maskSmallSizeDelivered",
                                        value: parseInt(
                                            event.currentTarget.value,
                                            10
                                        ),
                                    });
                                    setFormError({});
                                }}
                                fullWidth
                                type="number"
                                max={record.maskSmallSizeQuantity}
                                margin="normal"
                                helperText={formError.quantity}
                                error={!!formError.quantity}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                label="Modèle long (34 cm)"
                                id="largeMask"
                                defaultValue={0}
                                value={formValues.maskLargeSizeDelivered}
                                onChange={(event) => {
                                    setFormValues({
                                        field: "maskLargeSizeDelivered",
                                        value: parseInt(
                                            event.currentTarget.value,
                                            10
                                        ),
                                    });
                                    setFormError({});
                                }}
                                fullWidth
                                type="number"
                                max={record.maskLargeSizeQuantity}
                                margin="normal"
                                helperText={formError.quantity}
                                error={!!formError.quantity}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        style={{ marginTop: "2rem" }}
                        color="primary"
                        variant="contained"
                        disabled={
                            loading ||
                            (formValues.maskSmallSizeDelivered + formValues.maskLargeSizeDelivered) < 1 ||
                            Object.keys(formError).length
                        }
                        onClick={handleDeliverClick}
                    >
                        Déclarer la livraison
                    </Button>
                </p>
            </CardContent>
        </Card>
    );
};
