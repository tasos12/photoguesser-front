import { Fragment, useEffect, useState } from "react";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import CircularProgress from "@mui/joy/CircularProgress";
import Slider from "@mui/joy/Slider";
import ScoreContainer from "./shared/ScoreContainer";
import ImageContainer from "./shared/ImageContainer";

export default function GameRoomPage(props) {
    const imageEndpoint = "https://photoguesser.s3.eu-central-1.amazonaws.com/"
    const initialTimer = props.context.room.settings.timer;
    const photos = props.context.room.photos;
    
    const startDate = 1900;
    const endDate = 2022;

    const [timer, setTimer] = useState(initialTimer);
    const [index, setIndex] = useState(0);
    const [submit, setSubmit] = useState(false);
    const [next, setNext] = useState(true);
    const [imageSrc, setImageSrc] = useState("");
    const [selectedYear, setSelectedYear] = useState(1960);
    const [showScore, setShowScore] = useState(false);
    const [photoYear, setPhotoYear] = useState(0);
    const [score, setScore] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [results, setResults] = useState([]);
    const [disabledControls, setDisabledControls] = useState(true);

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

    useEffect(() => {
        if (!next) return;
        if (index === photos.length) {
            props.setContext({
                page: "results",
                room: props.context.room,
                totalScore: totalScore,
                results: results,
            });
        }
        setDisabledControls(true);
        const endpoint = "/photos/getPhoto?id=" + photos[index];
        fetch(props.apiURL + endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            
            setNext(false);
            return res.json();
        }).then((res) => {
            if (res.status !== 200) throw new Error(res.message);
            setImageSrc(imageEndpoint + res.data.name + ".jpg");
        }).catch((err) => {
            console.log(err);
        });
    }, [photos, totalScore, results, index, next, props]);

    useEffect(() => {
        if (!submit) return;

        const idParam = "id=" + photos[index];
        const yearParam = "year=" + selectedYear;
        const endpoint = "/photos/getScore?" + idParam + "&" + yearParam;
        fetch(props.apiURL + endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            setSubmit(false);
            return res.json()
        }
        ).then((res) => {
            if(res.status !== 200)
                throw new Error(res.message);
            setPhotoYear(res.data.year);
            setScore(res.data.score);
            setTotalScore((prevScore) => prevScore + res.data.score);
            setShowScore(true);
            setResults((prevResults) => [...prevResults, {
                imageSrc: imageSrc,
                score: res.data.score,
                selectedYear: selectedYear,
                year: res.data.year,
            }]);
        }).catch((err) => {
            console.log(err);
        });
    }, [photos, index, imageSrc, selectedYear, submit, props.apiURL])

    const handleSubmitClick = () => {
        setDisabledControls(true);
        setSubmit(true);
    }

    const handleNextClick = () => {
        setIndex((prevIndex) => prevIndex + 1);
        setSelectedYear(1960);
        setDisabledControls(false);
        setShowScore(false);
        setTimer(initialTimer);
        setNext(true);
    }


    return (
        <Stack
            direction="column"
            alignItems="center"
            width="100%"
            spacing={3}
        >
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
                        sx={{ width: "90%", "--Slider-track-size": "6px" }}
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
