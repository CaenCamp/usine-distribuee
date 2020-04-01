import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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
import TableRow from '@material-ui/core/TableRow';
import formatDate from 'date-fns/format';
import Paper from '@material-ui/core/Paper';
import {
    useMutation,
    CRUD_GET_ONE_SUCCESS,
    GET_ONE,
    FETCH_END
} from 'react-admin';

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
    },
    commentDate: {
        fontSize: '0.9rem',
        fontStyle: 'italic',
        fontWeight: 300
    },
    commentContent: {
        fontSize: '1rem',
        fontWeight: 500,
        margin: '1rem'
    }
}));

const sortComment = (a, b) => {
    if (a.id > b.id) return -1;
    if (b.id > a.id) return 1;

    return 0;
};

const CommentRow = ({ comment, classes }) => (
    <TableRow>
        <TableCell component="th" scope="row">
            <p className={classes.commentDate}>
                Posté le{' '}
                {formatDate(new Date(comment.date), 'dd/MM/yyyy HH:mm')} par{' '}
                {comment.email} ({comment.role})
            </p>
            <p className={classes.commentContent}>{comment.comment}</p>
        </TableCell>
    </TableRow>
);

export const RequestNotePad = ({ record, show, resource }) => {
    const classes = useStyles();
    const [mutate, { loading }] = useMutation();
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();

    const handleSendComment = () => {
        if (comment.trim() === '') {
            return;
        }
        mutate(
            {
                type: 'update',
                resource,
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
                    dispatch({
                        type: CRUD_GET_ONE_SUCCESS,
                        payload: {
                            ...record,
                            productionManagementComments: [
                                ...(record.productionManagementComments || []),
                                { comment }
                            ]
                        },
                        meta: {
                            resource: 'it-should-not-be-the-right-resource',
                            fetchResponse: GET_ONE,
                            fetchStatus: FETCH_END
                        }
                    });
                    setComment('');
                }
            }
        );
    };

    return (
        <div role="tabpanel" hidden={!show}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        style={{ marginTop: '1rem' }}
                    >
                        Commentaires de la demande #{record.publicNumber}
                    </Typography>
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
                                <TableBody>
                                    {(record.productionManagementComments || [])
                                        .sort(sortComment)
                                        .map((row) => (
                                            <CommentRow
                                                key={row.id}
                                                comment={row}
                                                classes={classes}
                                            />
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
