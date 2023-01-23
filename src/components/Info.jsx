import * as React from 'react';
import Stack from '@mui/material/Stack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Typography } from '@mui/material';
export default function Info(props) {
    return (
        <div>
            <Stack gap={2}>
                <Typography variant="h4" align="left" >
                    {props.userData.name}
                </Typography>
                <Typography variant="p" align="left">
                    {props.userData.bio}
                </Typography>
                <Stack direction="row" gap={1}>
                    <LocationOnIcon />
                    <Typography variant="p" align="left">
                        {props.userData.location}
                    </Typography>
                </Stack>
                <Typography variant="p" align="left">
                    Twitter: {props.userData.twitter_username}
                </Typography>
            </Stack>
        </div >
    );
}