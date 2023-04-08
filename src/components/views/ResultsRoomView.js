import { useContext } from "react";
import { useRouter } from "next/router";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import Chip from "@mui/joy/Chip";
import ScoreContainer from "@/components/shared/ScoreContainer";
import ImageContainer from "@/components/shared/ImageContainer";
import CustomCircularProgress from "@/components/shared/CustomCircularProgress";
import { ViewContext } from "@/contexts/ViewContext";

export default function ResultsRoomView() {
    const { push } = useRouter();
    const context = useContext(ViewContext)
    const results = context.results;
    const totalScore = context.totalScore;
    const maxTotalScore = context.room.settings.photoCount * 100
    
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
                <CustomCircularProgress
                    reverse={false}
                    value={totalScore/maxTotalScore * 100}
                    color={color}
                    style={{
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
                </CustomCircularProgress>

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
                                <ScoreContainer score={result.score} year={result.year} selectedYear={result.selectedYear} />
                            </Stack>
                        );
                    })
                }
            </Stack>
            <Button onClick={()=> { 
                context.setView("main")
                push("/") 
            }}>
                Back to Lobby
            </Button>
        </Stack>
    );
}