import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import formatDate from 'date-fns/format';
import Paper from '@material-ui/core/Paper';
import { useMutation } from 'react-admin';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch'
    },
    button: {
        margin: theme.spacing(1)
    }
}));

export const RequestNotePad = ({ record, show }) => {
    const classes = useStyles();
    const [mutate, { loading }] = useMutation();
    const [comment, setComment] = useState('');

    console.log(record);

    const handleSendComment = () => {
        if (comment.trim() === '') {
            return;
        }
        mutate(
            {
                type: 'update',
                resource: 'dispatcher-requests',
                payload: {
                    id: record.id,
                    data: {
                        productionManagementComments: [
                            ...(record.productionManagementComments || []),
                            { comment }
                        ]
                    }
                }
            },
            {
                onSuccess: () => {
                    // refresh();
                    setComment('');
                }
            }
        );
    };

    return (
        <div role="tabpanel" hidden={!show}>
            <Grid container>
                <Grid item xs={12}>
                    <p>
                        <Typography variant="h6" gutterBottom>
                            Bloc-Notes de la demande #{record.publicNumber}
                        </Typography>
                    </p>
                    <TextField
                        label="Votre commentaire"
                        style={{ margin: 8 }}
                        helperText="Attention ! Vous ne pourrez pas l'effacer !"
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
                        value={comment}
                        onChange={(event) => {
                            setComment(event.target.value);
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        endIcon={<SendIcon />}
                        onClick={handleSendComment}
                        disabled={loading || !comment || comment.trim() === ''}
                    >
                        Envoyer votre commentaire
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    {(record.productionManagementComments || []).length !==
                        0 && (
                        <TableContainer component={Paper}>
                            <Table
                                className={classes.table}
                                size="small"
                                aria-label="a dense table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell align="right">
                                            role
                                        </TableCell>
                                        <TableCell align="right">
                                            email
                                        </TableCell>
                                        <TableCell align="right">
                                            commentaire
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(
                                        record.productionManagementComments ||
                                        []
                                    ).map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {formatDate(
                                                    new Date(row.date),
                                                    'dd/MM/yyyy HH:mm'
                                                )}
                                            </TableCell>
                                            <TableCell>{row.role}</TableCell>
                                            <TableCell align="right">
                                                {row.email}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.comment}
                                                <br />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                    {!record.productionManagementComments && (
                        <p>
                            <Typography variant="h6" gutterBottom>
                                Aucun commentaires pour le moment
                            </Typography>
                        </p>
                    )}
                </Grid>
            </Grid>
        </div>
    );
};
