import Stack from "@mui/joy/Stack";
import Chip from "@mui/joy/Chip";

export default function ScoreContainer(props) {

    let color = "success";
    if(props.score < 33) color = "danger";
    else if(props.score < 66) color = "warning";

    return (
        <Stack
            direction="column"
            spacing={1}
        >
            <div style={{ width: "100%", textAlign: "center" }}>
                <Chip
                    color={color}
                    variant="solid"
                    sx={{
                        fontSize: "1.2rem",
                    }}
                >
                    Score: {" "}
                    <span style={{ fontWeight: 700 }}>
                        {props.score}
                    </span>
                </Chip>
            </div>
            <Chip
                color="neutral"
                variant="soft"
                sx={{
                    fontSize: "1.2rem",
                }}
            >
                Selected: {" "}
                <span style={{ fontWeight: 700 }}>
                    {props.selectedYear}
                </span>
                {" | "} Original: {" "}
                <span style={{ fontWeight: 700 }}>
                    {props.year}
                </span>
                <br/>
            </Chip>
        </Stack>
    )
}