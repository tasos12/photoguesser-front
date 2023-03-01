import Stack from "@mui/joy/Stack";
import Chip from "@mui/joy/Chip";

export default function ScoreContainer(props) {

    let color = "success";
    if(props.score < 33) color = "danger";
    else if(props.score < 66) color = "warning";

    return (
        <Stack
            direction="row"
            spacing={2}
        >
            <Chip
                color="info"
                variant="soft"
                sx={{
                    fontSize: "1.2rem",
                }}
            >
                Year: {" "}
                <span style={{ fontWeight: 700 }}>
                    {props.year}
                </span>
            </Chip>
            <Chip
                color={color}
                sx={{
                    fontSize: "1.2rem",
                }}
            >
                Score: {" "}
                <span style={{ fontWeight: 700 }}>
                    {props.score}
                </span>
            </Chip>

        </Stack>
    )
}