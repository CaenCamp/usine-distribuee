import 'date-fns';
import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: { maxWidth: 800, margin: "auto" },
    table: {
        minWidth: 650,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },
}));

function createData(date, deliver, maskSmallSizeDelivered, maskLargeSizeDelivered) {
    return { date, deliver, maskSmallSizeDelivered, maskLargeSizeDelivered };
}

const rows = [
    createData('30/03/2020', 'Armée', 0, 5),
    createData('31/03/2020', 'UPS', 5, 0),
];

export default ({ record }) => {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const handleDateChange = (date) => {
        setSelectedDate(date);
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
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell align="right">Livreur</TableCell>
                                <TableCell align="right">Petites visières</TableCell>
                                <TableCell align="right">Grandes visières</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.date}
                                    </TableCell>
                                    <TableCell align="right">{row.deliver}</TableCell>
                                    <TableCell align="right">{row.maskSmallSizeDelivered}</TableCell>
                                    <TableCell align="right">{row.maskLargeSizeDelivered}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <p>
                    <Typography variant="h6" gutterBottom>
                        Ajouter une livraison
                    </Typography>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                                disableToolbar
                                format="dd/MM/yyyy"
                                margin="normal"
                                fullWidth
                                id="date-picker-inline"
                                label="Date de la livraison"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <TextField
                        id="standard-full-width"
                        label="Livreur"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        label="Nombre de masque modèle standard"
                        id="smallMask"
                        defaultValue={0}
                        fullWidth
                        type="number"
                        margin="normal"
                    />
                    <TextField
                        label="Nombre de masque modèle large"
                        id="largeMask"
                        defaultValue={0}
                        fullWidth
                        type="number"
                        margin="normal"
                    />
                    <Button style={{ marginTop: '2rem' }} color="primary" variant="contained">Déclarer la livraison</Button>
                </p>
            </CardContent>
        </Card>
    );
};
