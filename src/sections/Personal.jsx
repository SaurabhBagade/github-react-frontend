import React from 'react';
import Info from '../components/Info';
import GitAvatar from '../components/GitAvatar';
import { Stack } from '@mui/system';
function Personal(props) {
    return (
        <div>
            <Stack direction="row" gap={6} margin={2} justifyContent="center" alignItems="center">
                <GitAvatar userData={props.userData} />
                <Info userData={props.userData} />
            </Stack>
        </div>
    );
}

export default Personal;