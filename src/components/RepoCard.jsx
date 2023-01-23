import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Chip } from '@mui/material';
import { Stack } from '@mui/system';
function RepoCard(props) {
    return (<div>
        <Card sx={{ minWidth: 275 }} variant="outlined">
            <CardContent>
                <Typography variant="h5" align="left" component="div" sx={{ mb: 1 }} color="#4F93D1">
                    {props.repo.name}
                </Typography>
                <Typography variant="body2" align="left" sx={{ mb: 2 }}>
                    {props.repo.description}
                    <br />
                </Typography>
                <Stack direction="row" spacing={1}>
                    {
                        props.repo.topics.map(topic => {
                            return (
                                <Chip label={topic} key={topic} color="primary" />
                            )
                        })
                    }
                </Stack>
            </CardContent>
        </Card>
    </div>);
}

export default RepoCard;