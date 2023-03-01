import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import ArrowBackIosNewOutlined from "@mui/icons-material/ArrowBackIosNewOutlined";

export default function PageHeader(props) {
    return(
        <Typography
            width="100%"
            component={"h2"}
            level="h2"
            sx={{ 
                display: "flex",
                justifyContent: "center",
                position: "relative",
             }}
        >
            <Button
                onClick={props.onPreviousClick}
                variant="solid"
                size="md"
                sx={{ p: 1, position: "absolute", left: 24, top: 0 }}
            >
                <ArrowBackIosNewOutlined />
            </Button>
            <span>{props.title}</span>
        </Typography>
    )
}