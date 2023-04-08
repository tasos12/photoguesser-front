import Stack from '@mui/joy/Stack';
import Image from 'next/image';
import CircularProgress from '@mui/joy/CircularProgress';

export default function ImageContainer(props) {
    return(
        <Stack
            height= "56vh"
            width="80vw"
            minWidth={340}
            maxWidth={1024}
            sx={{ 
                border: "1px solid #000000",
                borderRadius: "4px",
                backgroundColor: "#000000",
                position: "relative", 
            }}
        >
            
            {props.src === "" 
            ? <CircularProgress size='lg' sx={{ margin: "auto auto"}}/>
            : <Image
                loading='lazy'
                onLoadingComplete={props.onLoadingComplete}
                style={{ objectFit: "contain" }}
                src={props.src}
                alt={props.alt}
                fill={true}
            />}
        </Stack>
    )
}