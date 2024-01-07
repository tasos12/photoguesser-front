import { useState, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Footer from "@/components/shared/Footer";
import CircularProgress from "@mui/joy/CircularProgress";
import { ViewContext } from "@/contexts/ViewContext";

export default function MainView() {
    const context = useContext(ViewContext);
    const { push } = useRouter();
    const [roomCode, setRoomCode] = useState("");
    const [error, setError] = useState("");

    const handleCreateClick = () => {
        context.setView("create");
    };

    const handleJoinClick = () => {
        setError(<CircularProgress size="md" />);

        const endpoint = "/rooms/connect?code=" + roomCode;
        fetch(process.env.NEXT_PUBLIC_API_URL + endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            return res.json();
        }).then((res) => {
            if(res.status !== 200) 
                throw new Error(res.message);

            context.setRoom({ 
                id: res.data.id,
                code: res.data.code, 
                photos: res.data.photoIDs,
                settings: res.data.settings,
            }); 
            context.setView("start");
        }).catch((err) => {
            setError("Could not join room.");
        });
    };

    const handleDailyClick = () => {
        push("/daily");
    };

    return (
        <Stack
            direction="column"
            alignItems="center"
            spacing={4}
            width="100%"
            sx={{ overflowX: "hidden" }}
        >
            <Image src="/logo.svg" alt="photoguesser" width={200} height={160}/>
            <Typography
                component={"h1"}
                level="h1"
                sx={{ 
                    textAlign: "center", 
                    fontWeight: 700,
                }}
            >
                Photoguesser
            </Typography>
            <Typography
                component={"h2"}
                level="h4"
                sx={{
                    textAlign: "center",
                    fontWeight: 700,
                    color: "grey",
                }}
            >
                Guess the year!
            </Typography>
            <Stack 
                component={"div"} 
                direction={"row"} 
                spacing={2} 
                sx={{ display: 'flex', width: "100%", maxWidth: "340px" }}
            >
                <Button                
                    component={"h3"}
                    color="info"
                    onClick={handleDailyClick}
                    size="lg"
                    sx={{ flex: 0.5 }}
                >
                    Daily Challenge
                </Button>
                <Button
                    component={"h3"}
                    color="primary"
                    onClick={handleCreateClick}
                    size="lg"
                    sx={{ flex: 0.5 }}
                >
                    Create Game
                </Button>
            </Stack>
            <Typography component={"h3"} level="h3">
                Or
            </Typography>
            <Input
                sx={{ width: "100%", maxWidth: "360px" }}
                onChange={(e) => setRoomCode(e.target.value)}
                size="lg"
                placeholder="Insert room code and"
                endDecorator={
                    <Button
                        component={"h3"}
                        sx={{ px: 2 }}
                        onClick={handleJoinClick}
                        variant="plain"
                        size="lg"
                    >
                        Join Game
                    </Button>
                }
            />
            <Typography
                component={"h4"}
                level="h4"
                sx={{ color: "red", fontWeight: 700, height: "40px" }}
            >
                {error}
            </Typography>
            <Footer />
        </Stack>
    );
}
