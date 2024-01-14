import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import Chip from "@mui/joy/Chip";
import Table from "@mui/joy/Table";

import ScoreContainer from "@/components/shared/ScoreContainer";
import ImageContainer from "@/components/shared/ImageContainer";
import CustomCircularProgress from "@/components/shared/CustomCircularProgress";
import { ViewContext } from "@/contexts/ViewContext";

import { getRoomPlayersTotalScore } from "@/components/api/PlayerService";
import { calculatePerformanceAndColor, calculatePosition } from "@/components/shared/Utils";

export default function ResultsRoomView() {
    const [players, setPlayers] = useState([]);
    const { push } = useRouter();
    const context = useContext(ViewContext)
    const results = context.results;
    const totalScore = context.totalScore;
    const maxTotalScore = context.room.settings.photoCount * 100

    useEffect(() => {
        getRoomPlayersTotalScore(context.room.id).then((players) => {
            setPlayers(players);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            getRoomPlayersTotalScore(context.room.id).then((players) => {
                setPlayers(players);
            }).catch((err) => {
                console.log(err);
            });
        }, 5000);
        return () => clearInterval(interval);
    }, []);
    
    const [performance, performanceColor] = calculatePerformanceAndColor(totalScore, maxTotalScore);

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
                    color={performanceColor}
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
                        variant="solid"
                        color={performanceColor}
                        sx={{ textAlign: "center", fontWeight: 700, fontSize: "28px" }}
                    >
                        {performance}
                    </Chip>
                </Stack>
            </Stack>
            <Divider />
            <Typography
                component={"h2"}
                level="h2"
                sx={{ textAlign: "center" }}
            >
                Scoreboard
            </Typography>
            <Stack 
                direction="column" 
                alignItems="center" 
                spacing={3} 
                sx={{ height: "280px", overflow: 'auto', borderRadius: "10px" }}
            >
                <Table stickyHeader>
                    <thead style={{ "--TableCell-headBackground": "rgba(220, 220, 200, 1)" }}>
                        <tr>
                            <th>Position</th>
                            <th>Player</th>
                            <th>TotalScore</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        players.map((player, index) => {
                            return (
                                <tr key={index}>
                                    <td>{calculatePosition(index)}</td>
                                    <td>{player.name}</td>
                                    <td>{player.score}</td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </Table>
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
                                <Typography component={"h3"} level="h3" sx={{ px: 2 }}>
                                    {result.description}
                                </Typography>
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