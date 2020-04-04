import React, { useState, useEffect, useCallback } from 'react';
import { useVersion, useDataProvider } from 'react-admin';
import { useMediaQuery } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Collections from '@material-ui/icons/Collections';
import AccountBox from '@material-ui/icons/AccountBox';

import { Button } from '@material-ui/core';

import RequestKPI from './graph-components/RequestKPI';
import HorizontalBar from './graph-components/HorizontalBar';
import MaskByStatus from './graph-components/MaskByStatus';

import departments from './data/departements.json';

const styles = {
    main: {
        flex: '2',
        marginRight: '1em',
        marginTop: 20
    },
    flex: {
        display: 'flex'
    },
    flexColumn: {
        display: 'flex',
        flexDirection: 'column'
    },
    leftCol: {
        flex: 1,
        marginRight: '1em'
    },
    rightCol: {
        flex: 1,
        marginLeft: '1em'
    },
    singleCol: {
        marginTop: '2em',
        marginBottom: '2em'
    }
};

const Dashboard = () => {
    const [state, setState] = useState({
        request_nb: 0,
        requester_nb: 0,
        request_by_status: { labels: [], datasets: [] },
        requester_by_dept: { labels: [], datasets: [] },
        mask_by_status: { labels: [], datasets: [] }
    });
    const version = useVersion();
    const dataProvider = useDataProvider();
    const isXSmall = useMediaQuery((theme) => theme.breakpoints.down('xs'));
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const fetchStats = useCallback(async () => {
        const { data: stats } = await dataProvider.getList('stats', {
            sort: { field: 'id', order: 'ASC' },
            pagination: { page: 1, perPage: 1 }
        });
        const request_nb = stats[0].requestNb;
        const requester_nb = stats[0].requesterNb;
        const request_by_status = {
            labels: [
                'à affecter',
                'à produire',
                'en production',
                'livrées',
                'en attente',
                'rejets et annulations'
            ],
            datasets: [
                {
                    label: 'Demandes par statut',
                    backgroundColor: 'rgba(99,255,132,0.2)',
                    borderColor: 'rgba(99,255,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(99,255,132,0.4)',
                    hoverBorderColor: 'rgba(99,255,132,1)',
                    data: [
                        stats[0].requestNbToDispatch,
                        stats[0].requestNbToBuild,
                        stats[0].requestNbInProduction,
                        stats[0].requestNbDelivered,
                        stats[0].requestNbPending,
                        stats[0].requestNbCancel
                    ]
                }
            ]
        };

        const mask_by_status = {
            labels: ['Visières'],

            datasets: [
                {
                    label: 'A produire',
                    data: [stats[0].requestedShadeToBuild],
                    backgroundColor: 'rgba(63,103,126,0.6)',
                    hoverBackgroundColor: 'rgba(50,90,100,1)'
                },
                {
                    label: 'En production',
                    data: [stats[0].requestedShadeInProduction],
                    backgroundColor: 'rgba(195,194,110,0.6)',
                    hoverBackgroundColor: 'rgba(195,194,110,1)'
                },
                {
                    label: 'Livrées',
                    data: [stats[0].requestedShadeDelivered],
                    backgroundColor: 'rgba(57,177,91,0.6)',
                    hoverBackgroundColor: 'rgba(57,177,91,1)'
                },
                {
                    label: 'Rejets et annulations',
                    data: [stats[0].requestedShadeCanceled],
                    backgroundColor: 'rgba(201,145,155,0.6)',
                    hoverBackgroundColor: 'rgba(201,145,155,1)'
                }
            ]
        };

        setState((state) => ({
            ...state,
            request_nb,
            requester_nb,
            request_by_status,
            mask_by_status
        }));
    }, [dataProvider]);

    const fetchRequesterBydept = useCallback(async () => {
        const { data: raw } = await dataProvider.getList(
            'stats/requesterByDept',
            {
                sort: { field: 'id', order: 'ASC' },
                pagination: { page: 1, perPage: 1 }
            }
        );

        var result = {
            labels: raw.map((a) => {
                let dpt = departments.find(
                    (o) => String(o.num_dep) === a.department
                );
                return dpt !== undefined ? dpt.dep_name : a.department;
            }),
            datasets: [
                {
                    label: 'Demandeurs par département',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: raw.map((a) => a.requesterNbByDepartment)
                }
            ]
        };

        setState((state) => ({ ...state, requester_by_dept: result }));
    }, [dataProvider]);

    useEffect(() => {
        fetchStats();
        fetchRequesterBydept();
    }, [version]);

    const {
        request_nb,
        requester_nb,
        request_by_status,
        requester_by_dept,
        mask_by_status
    } = state;

    const request_nb_props = {
        title: 'Nombre de demandes',
        value: request_nb,
        icon: Collections
    };
    const requester_nb_props = {
        title: 'Nombre de demandeurs',
        value: requester_nb,
        icon: AccountBox
    };

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary
        }
    }));
    const classes = useStyles();

    return isXSmall ? (
        <div>
            <div style={styles.flexColumn}>
                <RequestKPI {...request_nb_props} />
                <RequestKPI {...requester_nb_props} />
                <Button variant="contained" color="primary" href="#/requests">
                    Voir la liste des demandes
                </Button>
            </div>
        </div>
    ) : isSmall ? (
        <div style={styles.flexColumn}>
            <div style={styles.flexColumn}>
                <RequestKPI {...request_nb_props} />
                <RequestKPI {...requester_nb_props} />
                <Button variant="contained" color="primary" href="#/requests">
                    Voir la liste des demandes
                </Button>
            </div>
        </div>
    ) : (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <RequestKPI {...request_nb_props} />
                </Grid>
                <Grid item xs={6}>
                    <RequestKPI {...requester_nb_props} />
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <div>
                        <HorizontalBar
                            data={request_by_status}
                            height={250}
                            options={{
                                maintainAspectRatio: false,
                                scales: {
                                    xAxes: [
                                        {
                                            ticks: {
                                                min: 0
                                            }
                                        }
                                    ]
                                }
                            }}
                        />
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div>
                        <HorizontalBar
                            data={requester_by_dept}
                            height={250}
                            options={{
                                maintainAspectRatio: false,
                                scales: {
                                    xAxes: [
                                        {
                                            ticks: {
                                                min: 0
                                            }
                                        }
                                    ]
                                }
                            }}
                        />
                    </div>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={11}>
                    <Paper className={classes.paper}>
                        <MaskByStatus data={mask_by_status} height={250} />
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs style={{ textAlign: 'center' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        href="#/requests"
                    >
                        Voir la liste des demandes
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default Dashboard;
