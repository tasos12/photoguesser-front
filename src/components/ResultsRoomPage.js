import Image from "next/image";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import ScoreContainer from "./shared/ScoreContainer";
import CircularProgress from "@mui/joy/CircularProgress";
import Chip from "@mui/joy/Chip";
import ImageContainer from "./shared/ImageContainer";

export default function ResultsRoomPage(props) {
    const results = props.context.results;
    const totalScore = props.context.totalScore;
    const maxTotalScore = props.context.room.settings.photoCount * 100
    
    let performance = "Excellent";
    let color = "success";
    if (totalScore/maxTotalScore < 0.33) {
        performance = "Poor";
        color = "danger";
    } else if (totalScore/maxTotalScore < 0.66) {
        performance = "Average";
        color = "warning";
    } else if (totalScore/maxTotalScore < 1) {
        performance = "Very good";
        color = "success";
    }

    return (
        <Stack direction="column" alignItems="center" spacing={2} sx={{pb: 5}}>
            <Stack direction="column" alignItems="center" spacing={3}>
                <Typography
                    component={"h2"}
                    level="h2"
                    sx={{ textAlign: "center" }}
                >
                    Total Score
                </Typography>
                <CircularProgress
                    determinate
                    value={totalScore/maxTotalScore * 100}
                    color={color}
                    sx={{
                        fontSize: "1.5rem",
                        "--CircularProgress-size": "156px",
                        "--CircularProgress-progress-thickness": "8px",
                        "--CircularProgress-track-thickness": "8px",
                    }}
                >
                    <span style={{fontWeight:700}}>
                        {totalScore}
                    </span>
                    /{maxTotalScore}
                </CircularProgress>
                <Stack direction="column" alignItems="center" spacing={1}>
                    <Typography
                        component={"h4"}
                        level="h4"
                        sx={{ textAlign: "center" }}
                    >
                        Performance
                    </Typography>
                    <Chip
                        component={"h5"}
                        variant="plain"
                        color={color}
                        sx={{ textAlign: "center", fontWeight: 700, fontSize: "28px" }}
                    >
                        {performance}
                    </Chip>
                </Stack>
            </Stack>
            <Stack
                component="section"
                direction="column"
                alignItems="center"
            >
                {
                    results.map((result, index) => {
                        return (
                            <Stack
                                component="div"
                                key={index}
                                direction="column"
                                alignItems="center"
                                spacing={2}
                                sx={{py: 2}}
                            >
                                <Divider/>
                                <ImageContainer src={result.imageSrc} alt={result.imageSrc}/>
                                <ScoreContainer score={result.score} year={result.year} />
                            </Stack>
                        );
                    })
                }
            </Stack>
            <Button onClick={()=> props.setContext({page: "main"})}>
                Back to Lobby
            </Button>
        </Stack>
    );
}