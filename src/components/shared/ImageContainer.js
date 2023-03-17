import Stack from '@mui/joy/Stack';
import Image from 'next/image';

export default function ImageContainer(props) {
    return(
        <Stack
            height= "56vh"
            width="80vw"
            minWidth={340}
            maxWidth={1024}
            sx={{ 
                border: "1px solid #000000",
                backgroundColor: "#000000",
                position: "relative", 
            }}
        >
            <Image
                onLoadingComplete={props.onLoadingComplete}
                style={{ objectFit: "contain" }}
                src={props.src}
                alt={props.alt}
                fill={true}
            />
        </Stack>
    )
}