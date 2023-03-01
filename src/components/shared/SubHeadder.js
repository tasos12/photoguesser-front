import Typography from "@mui/joy/Typography";

export default function SubHeader(props) {
    return(
        <Typography
            component={"h3"}
            level="h3"
            sx={{ ml: -5, p: 1, display: "flex", alignItems: "center" }}
        >
            {props.icon}
            <span style={{ marginLeft: "10px" }}>{props.title}</span>
        </Typography>
    );
}