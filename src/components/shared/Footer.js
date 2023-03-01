import Typography from "@mui/joy/Typography";

export default function Footer() {
    return(
        <Typography sx={{ fontSize: "10px", color: "black", textAlign: "center" }}>
            © Created by {" "}
            <a target="_blank" rel="noreferrer" href="https://tasosgkagkas.com">
                Tasos Gkagkas
            </a>
        </Typography>
    )
}