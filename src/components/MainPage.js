import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Footer from "./shared/Footer";
import CircularProgress from "@mui/joy/CircularProgress";


export default function MainPage(props) {
    const [join, setJoin] = useState(false);
    const [roomCode, setRoomCode] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if(!join) return;
        
        setJoin(false);
        setError(<CircularProgress size="md" />);
        const endpoint = "/rooms/connect?code=" + roomCode;
        fetch(props.apiURL + endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            return res.json();
        }).then((res) => {
            if(res.status !== 200) 
                setError("Could not join room.");

            props.setContext({ 
                page: "start", 
                room: { 
                    code: res.data.code, 
                    photos: res.data.photoIDs,
                    settings: res.data.settings,
                }
            }); 
        }).catch((err) => {
            
        });

    }, [join, roomCode, props]);

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
            <Button
                component={"div"}
                color="primary"
                onClick={() => props.setContext({ page: "create" })}
                size="lg"
            >
                Create Game
            </Button>
            <Typography component={"h2"} level="h2">
                Or
            </Typography>
            <Input
                sx={{ width: "100%", maxWidth: "360px" }}
                onChange={(e) => setRoomCode(e.target.value)}
                size="lg"
                placeholder="Insert room code and"
                endDecorator={
                    <Button
                        sx={{ px: 2 }}
                        onClick={() => setJoin(true)}
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
