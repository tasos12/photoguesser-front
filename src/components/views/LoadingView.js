import CircularProgress from '@mui/joy/CircularProgress';
import Stack from '@mui/joy/Stack';

export default function LoadingView() {
    return (
        <Stack
            component="div"
            direction="column"
            alignItems="center"
            spacing={2}
            sx={{py: 2}}
        >
            <CircularProgress size='lg'/>
        </Stack>
    )
}
