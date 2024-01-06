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