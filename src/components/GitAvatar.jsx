import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import LinkIcon from '@mui/icons-material/Link';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

export default function GitAvatar(props) {
    return (
        <div>
            <Stack direction="column" alignItems="center" gap={1}>
                <Avatar alt="Remy Sharp" src={props.userData.avatar_url} sx={{ width: 175, height: 175 }} />
                <Stack direction="row" alignItems="center" gap={1}>
                    <LinkIcon />
                    <Link rel="noreferrer" target="_blank" href={props.userData.url} underline="none" sx={{ alignItems: 'top' }}>
                        {props.userData.html_url}
                    </Link>
                </Stack>
            </Stack>
        </div >
    );
}