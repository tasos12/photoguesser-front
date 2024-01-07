import { Fragment, useContext, useEffect, useState } from "react";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import CircularProgress from "@mui/joy/CircularProgress";
import Slider from "@mui/joy/Slider";
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
    const [disabledControls, setDisabledControls] = useState(true);

    useEffect(() => {
        getNextPhotoRequest();
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
                justifyContent="space-around"
                width="100%"
            >
                <Chip size="lg" color="neutral">
                    {totalScore}
                </Chip>
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
                <Chip size="lg" color="neutral">
                    {index + 1} / {photos.length}
                </Chip>
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