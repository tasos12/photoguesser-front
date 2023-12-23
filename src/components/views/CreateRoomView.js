import { useState, useContext } from "react";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import Slider from "@mui/joy/Slider";
import PhotoLibraryOutlined from "@mui/icons-material/PhotoLibraryOutlined";
import TimerOutlined from "@mui/icons-material/TimerOutlined";
import PageHeader from "@/components/shared/PageHeader";
import SubHeader from "@/components/shared/SubHeadder";
import CircularProgress from "@mui/joy/CircularProgress";
import { ViewContext } from "@/contexts/ViewContext";

export default function CreateRoomView() {
    const context = useContext(ViewContext);
    const [photoCount, setPhotoCount] = useState(10);
    const [timer, setTimer] = useState(30);
    const [error, setError] = useState("");

    const handleCreate = () => {
        setError(<CircularProgress size="md" />);
        
        const endpoint = "/rooms/create";
        fetch(process.env.NEXT_PUBLIC_API_URL + endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                photoCount: photoCount,
                timer: timer,
            }),
        }).then((res) => {
            return res.json();
        }).then((res) => {
            if(res.status !== 200)
                throw new Error(res.message);

            context.setView("start");
            context.setRoom({ 
                code: res.data.code, 
                photos: res.data.photoIDs,
                settings: res.data.settings,
            }); 
        }).catch((err) => {
            setError("Could not create room.");
        });
    };

    return (
        <Stack
            direction="column"
            alignItems="center"
            width="100%"
            spacing={5}
        >
            <PageHeader 
                title="Settings"
                onPreviousClick={() => context.setView("main")}
            />
            <Stack
                width="100%"
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <SubHeader title="Photos" icon={<PhotoLibraryOutlined />} />
                <Slider
                    onChange={(e) => setPhotoCount(e.target.value)}
                    valueLabelDisplay="on"
                    value={photoCount}
                    step={5}
                    marks={[
                        { value: 5, label: "5" },
                        { value: 20, label: "20" },
                    ]}
                    min={5}
                    max={20}
                    size="lg"
                    sx={{ maxWidth: "400px", width: "90%" }}
                />
            </Stack>
            <Stack
                width="100%"
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <SubHeader title="Seconds" icon={<TimerOutlined />} />
                <Slider
                    onChange={(e) => setTimer(e.target.value)}
                    valueLabelDisplay="on"
                    value={timer}
                    step={1}
                    marks={[
                        { value: 5, label: "5" },
                        { value: 60, label: "60" },
                    ]}
                    min={5}
                    max={60}
                    size="lg"
                    sx={{ maxWidth: "400px", width: "90%" }}
                />
            </Stack>
            <Button onClick={handleCreate} size="lg" sx={{ m: 10 }}>
                Create Room
            </Button>
            <Typography
                component={"h4"}
                level="h4"
                sx={{ color: "red", fontWeight: 700, height: "50px" }}
            >
                {error}
            </Typography>
        </Stack>
    );
}