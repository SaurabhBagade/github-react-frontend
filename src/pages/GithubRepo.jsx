import React, { useEffect, useState } from 'react';
import config from "../config/config"
import { Button, OutlinedInput } from '@mui/material';
import { useSnackbar } from "notistack";
import Personal from '../sections/Personal';
import axios from "axios";
import RepoCard from '../components/RepoCard';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import { Stack } from '@mui/system';
import { Chip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';


function GithubRepo() {
    const [isLoading, setIsLoading] = useState(true);
    const [repoData, setRepoData] = useState([])
    const [userData, setUserData] = useState({})
    const [userFound, setUserFound] = useState(true)
    const [searchText, setSearchText] = useState('')
    const [limitPresent, setLimitPresent] = useState(true)
    const [pageLimit, setPageLimit] = useState(0)
    let [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const { enqueueSnackbar } = useSnackbar();

    const handlePageChange = async (event, value) => {
        setIsLoading(true)
        setPage(value);
        await performRepoAPICall()
    };

    const chipChange = async (opt) => {
        if ((page == 1 && opt == "-") || (page == pageLimit && opt == "+")) {
            return;
        } else if (opt == "-") {
            setIsLoading(true)
            setPage(--page)
            await performRepoAPICall()
            return
        } else if (opt == "+") {
            setIsLoading(true)
            setPage(++page)
            await performRepoAPICall()
            return
        }
    }

    const performRepoAPICall = async () => {
        try {
            let data = await axios.get(`${config.baseUrl}/v1/github/get-repos/${searchText == '' ? 'johnpapa' : searchText}?page=${page}&limit=${limit}`)
            const resp = data.data
            setRepoData(resp)
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
            if (e.response && e.response.status === 500) {
                setLimitPresent(false)
                enqueueSnackbar(e.response.message, {
                    variant: "warning",
                    autoHideDuration: 5000
                })
            } else if (e.response && e.response.status === 404) {
                setLimitPresent(true)
                setUserFound(false)
                enqueueSnackbar(e.response.data.message, {
                    variant: "warning",
                    autoHideDuration: 5000
                })
            }
            else {
                enqueueSnackbar(e.message, {
                    variant: "warning",
                    autoHideDuration: 5000
                })
            }
            return []
        }
    };


    const performUserAPICall = async () => {
        try {
            let data = await axios.get(`${config.baseUrl}/v1/github/get-personal-info/${searchText == '' ? 'johnpapa' : searchText}`).catch(() => {
                setIsLoading(false)
            })
            const resp = data.data
            setUserData(resp)
            let pagination = parseInt(resp.public_repos / limit);
            if (pageLimit % limit != 0) {
                pagination++;
            }
            setPageLimit(pagination)
            if (data.data == "Error") {
                setUserFound(false)
            }
        } catch (e) {
            setIsLoading(false)
            if (e.response && e.response.status === 500) {
                setLimitPresent(false)
                enqueueSnackbar(e.response.message, {
                    variant: "warning",
                    autoHideDuration: 5000
                })
            } else if (e.response && e.response.status === 404) {
                setLimitPresent(true)
                setUserFound(false)
                enqueueSnackbar(e.response.data.message, {
                    variant: "warning",
                    autoHideDuration: 5000
                })
            }
            else {
                enqueueSnackbar(e.message, {
                    variant: "warning",
                    autoHideDuration: 5000
                })
            }
            return []
        }
    };

    const performSearch = async () => {
        try {
            setSearchText('')
            setIsLoading(true)
            setRepoData([])
            setUserData({})
            await performUserAPICall()
            await performRepoAPICall()
        } catch (e) {
            setIsLoading(false)
            setUserFound(false)
            setLimitPresent(false)
            if (e.response && e.response.status === 500) {
                enqueueSnackbar(e.response.message, {
                    variant: "warning",
                    autoHideDuration: 5000
                })
            } else {
                enqueueSnackbar(e.message, {
                    variant: "warning",
                    autoHideDuration: 5000
                })
            }
            return []
        }
    };



    useEffect(() => {
        const justRun = async () => {
            await performSearch()
        }
        justRun()
    }, [])

    if (isLoading) {
        return (
            <Grid container justifyContent="center">
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    my={10}
                >
                    <CircularProgress />
                    <Typography variant="h4" component="div">
                        Loading
                    </Typography>
                </Stack>
            </Grid>
        );
    } else {
        return (<div>
            <Stack gap={2}>
                <Stack direction="row" gap={4} justifyContent="center" alignItems="center">
                    <OutlinedInput fullWidth margin='dense' placeholder='Enter a valid github username' sx={{ my: 2 }} onChange={(e) => setSearchText(e.target.value)} />
                    <Button variant="contained" onClick={() => performSearch()}>
                        Search
                    </Button>
                </Stack>
                {
                    userFound
                        ? <div>
                            <Personal userData={userData} />
                            <Stack gap={4} alignItems="center"
                                justifyContent="center">
                                <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 3, md: 6 }} alignItems="center"
                                    justifyContent="center" sx={{ px: 4 }}>
                                    {repoData.map(repo => {
                                        return (
                                            <Grid item key={repo.id} id={repo.id} xs={6} md={6} >
                                                <RepoCard repo={repo} />
                                            </Grid>)
                                    })}
                                </Grid>
                                <Pagination count={pageLimit} variant="outlined" shape="rounded" color="primary" hidePrevButton hideNextButton page={page} onChange={handlePageChange} />
                                <Stack direction="row" justifyContent="space-between" alignItems="center"
                                    spacing={30}>
                                    <Chip icon={<ArrowBackIcon />} color="primary" onClick={() => { chipChange("-") }} />
                                    <Chip icon={<ArrowForwardIcon />} color="primary" onClick={() => { chipChange("+") }} />
                                </Stack>
                            </Stack>
                        </div>
                        : <div>
                            <Stack gap={4} alignItems="center"
                                justifyContent="center">
                                <Grid container justifyContent="center">
                                    <Stack
                                        direction="column"
                                        justifyContent="center"
                                        alignItems="center"
                                        spacing={2}
                                        my={10}
                                    >
                                        <SentimentVeryDissatisfiedIcon sx={{ fontSize: 60 }} />
                                        {
                                            limitPresent ?
                                                <Typography variant="h4" component="div">
                                                    No User Exists with this Username ..
                                                </Typography>
                                                :
                                                <Typography variant="h4" component="div">
                                                    The github API limit is exceeded ...
                                                </Typography>
                                        }

                                    </Stack>
                                </Grid>
                                <Pagination count={10} variant="outlined" shape="rounded" color="primary" hidePrevButton hideNextButton page={page} onChange={handlePageChange} />
                                <Stack direction="row" justifyContent="space-between" alignItems="center"
                                    spacing={30}>
                                    <Chip icon={<ArrowBackIcon />} color="primary" />
                                    <Chip icon={<ArrowForwardIcon />} color="primary" />
                                </Stack>
                            </Stack>
                        </div>
                }

            </Stack>
        </div>);
    }
}

export default GithubRepo;