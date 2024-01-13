import { Fragment, useContext, useEffect, useState } from "react";

import Stack from "@mui/joy/Stack";
import Sheet from "@mui/joy/Sheet";
import Button from "@mui/joy/Button";
import CircularProgress from "@mui/joy/CircularProgress";
import Slider from "@mui/joy/Slider";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import SportsScore from '@mui/icons-material/SportsScore'
import Radar from '@mui/icons-material/Radar'

import ScoreContainer from "@/components/shared/ScoreContainer";
import ImageContainer from "@/components/shared/ImageContainer";
import Chip from "@mui/joy/Chip";
import { ViewContext } from "@/contexts/ViewContext";

export default function MultiplayerRoomView() {
    const context = useContext(ViewContext);

    const initialTimer = context.room.settings.timer;
    const photos = context.room.photos;
    const playerId = context.player.id;
    const roomId = context.room.id;
    
    const startDate = 1900;
    const endDate = 2022;

    const [timer, setTimer] = useState(initialTimer);
    const [index, setIndex] = useState(0);
    const [imageSrc, setImageSrc] = useState("");
    const [selectedYear, setSelectedYear] = useState(1960);
    const [showScore, setShowScore] = useState(false);
    const [photoYear, setPhotoYear] = useState(0);
    const [score, setScore] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [results, setResults] = useState([]);
    const [players, setPlayers] = useState([]);
    const [disabledControls, setDisabledControls] = useState(true);

    useEffect(() => {
        getNextPhotoRequest();
        getRoomPlayersTotalScoreRequest();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            getRoomPlayersTotalScoreRequest();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (index === photos.length) {
            context.setView("results");
            context.setTotalScore(totalScore);
            context.setResults(results);
        }

        setSelectedYear(1960);
        setDisabledControls(true);
        setShowScore(false);
        setTimer(initialTimer);
        getNextPhotoRequest();
    }, [index]);

    useEffect(() => {
        if (timer === 0) {
            handleSubmitClick();
            return;
        }
        if(disabledControls)
            return;

        const interval = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer, disabledControls]);

    async function getRoomPlayersTotalScoreRequest() {
        const endpoint = "/player/getPlayers?id=" + roomId;
        await fetch(process.env.NEXT_PUBLIC_API_URL + endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            return res.json();
        }).then((res) => {
            if (res.status !== 200 || res.data == []) 
                throw new Error(res.message);
            setPlayers([]);
            res.data.forEach((player) => {
                setPlayers((prevPlayers) => [...prevPlayers, {
                    name: player.name,
                    score: player.totalScore,
                }]);
            });
        }).catch((err) => {
            console.log(err);
        });
    };

    const getNextPhotoRequest = () => {        
        const endpoint = "/photos/getPhoto?id=" + photos[index];
        fetch(process.env.NEXT_PUBLIC_API_URL + endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            return res.json();
        }).then((res) => {
            if (res.status !== 200) 
                throw new Error(res.message);
            setImageSrc(process.env.NEXT_PUBLIC_IMAGE_URL + res.data.filename);
        }).catch((err) => {
            console.log(err);
        });
    };

    const submitScoreRequest = () => {
        const endpoint = "/rooms/submit";
        fetch(process.env.NEXT_PUBLIC_API_URL + endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                playerId: playerId,
                roomId: roomId,
                photoId: photos[index],
                year: selectedYear,
            }),
        }).then((res) => {
            return res.json();
        }).then((res) => {
            if (res.status !== 200) 
                throw new Error(res.message);
            
            setScore(res.data.photoScore);
            setTotalScore(res.data.playerTotalScore);
            setPhotoYear(res.data.photoYear);
            setSelectedYear(res.data.selectedYear);
            setResults((prevResults) => [...prevResults, {
                imageSrc: imageSrc,
                score: res.data.photoScore,
                selectedYear: selectedYear,
                year: photoYear,
                description: res.data.photoName,
            }]);
            context.setTotalScore(res.data.playerTotalScore);
            setShowScore(true);
        }).catch((err) => {
            console.log(err);
        });
    };

    const handleSubmitClick = () => {
        setDisabledControls(true);
        submitScoreRequest();
    };

    const handleNextClick = () => {
        setIndex(index + 1);
    };

    return (
        <Stack
            direction="column"
            alignItems="center"
            width="100%"
            spacing={3}
        >
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
            >
                <Stack
                    direction="column"
                    alignItems="flex-start"
                    width="100%"
                    spacing={0.5}
                >
                    <Chip 
                        size="lg" 
                        color="neutral"
                        startDecorator={
                            <SportsScore />
                        }>
                        {index + 1} / {photos.length}
                    </Chip>
                    <Chip 
                        size="lg" 
                        color="neutral"
                        startDecorator={
                            <Radar />
                        }>
                        {totalScore}
                    </Chip>
                </Stack>

                <CircularProgress
                    determinate
                    value={(timer / initialTimer) * 100}
                    sx={{
                        fontSize: "1.5rem",
                        "--CircularProgress-size": "8vh",
                        "--CircularProgress-progress-thickness": "8px",
                        "--CircularProgress-track-thickness": "8px",
                    }}
                >
                    {timer}
                </CircularProgress>
                <Stack                   
                    direction="column"
                    alignItems="end"
                    width="100%"
                >
                    <Sheet 
                        sx={{
                            backgroundColor: 'rgba(0, 0, 0, 0.05)',
                            borderRadius: 'sm', 
                            overflowX: 'hidden',
                            overflowY: 'auto',
                            maxHeight: '80px',
                            width: '80%',
                        }}>
                    <List>
                        {players.map((player, index) => {
                            return (
                                <ListItem 
                                    key={player.name}
                                    sx={{ 
                                        alignItems: 'center',
                                    }}
                                >
                                    <ListItemDecorator 
                                        sx={{
                                            width: '5em', 
                                            textOverflow: 'hidden', 
                                            overflow: 'hidden',
                                        }}>
                                            {player.name}
                                    </ListItemDecorator>
                                    <ListItemContent sx={{paddingLeft: '0.2em', fontWeight: 'bold'}}>
                                        {player.score}
                                    </ListItemContent>
                                </ListItem>
                            );
                        })}
                    </List>
                    </Sheet>
                </Stack>
            </Stack>
            
            <ImageContainer 
                onLoadingComplete={() => {setDisabledControls(false)}} 
                src={imageSrc} 
                alt={imageSrc}
            />
            {!showScore && ( 
                <Fragment>
                    <Slider
                        disabled={disabledControls}
                        onChange={(e, value) => {
                            setSelectedYear(value);
                        }}
                        valueLabelDisplay="on"
                        defaultValue={1960}
                        step={1}
                        marks={[
                            { value: startDate, label: startDate.toString() },
                            { value: 1920, label: 1920 },
                            { value: 1940, label: 1940 },
                            { value: 1960, label: 1960 },
                            { value: 1980, label: 1980 },
                            { value: 2000, label: 2000 },
                            { value: endDate, label: endDate.toString() },
                        ]}
                        min={startDate}
                        max={endDate}
                        size="lg"
                        sx={{
                            width: "80vw", 
                            maxWidth: 1024, 
                            "--Slider-track-size": "6px"
                        }}
                    />
                
                    <Button
                        disabled={disabledControls}
                        onClick={handleSubmitClick}
                        size="lg"
                        sx={{ mt: "40px !important" }}
                    >
                        Submit
                    </Button>
                </Fragment>
            )}
            {showScore && (
                <Fragment>
                    <ScoreContainer score={score} year={photoYear} selectedYear={selectedYear} />
                    <Button 
                        onClick={handleNextClick}
                        size="md"
                    >
                        Next
                    </Button>
                </Fragment>
            )}
        </Stack>
    );
}