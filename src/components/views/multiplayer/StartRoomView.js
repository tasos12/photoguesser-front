import { useContext, useState } from "react";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button"
import Input from "@mui/joy/Input";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";

import PhotoLibraryOutlined from "@mui/icons-material/PhotoLibraryOutlined";
import TimerOutlined from "@mui/icons-material/TimerOutlined";
import Settings from "@mui/icons-material/Settings";
import Key from "@mui/icons-material/Key";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ContentCopy from "@mui/icons-material/ContentCopy";
import AssignmentTurnedIn from "@mui/icons-material/AssignmentTurnedIn";

import PageHeader from "@/components/shared/PageHeader";
import SubHeader from "@/components/shared/SubHeadder";
import { ViewContext } from "@/contexts/ViewContext";

export default function StartRoomView() {
    const context = useContext(ViewContext);
    const [copiedToClipboard, setCopiedToClipboard] = useState(false);
    const [playerName, setPlayerName] = useState("");
    const [error, setError] = useState("");

    const handleStartGameClick = () => {
        if (playerName === "") {
            setError("Please enter a name.");
            return;
        } else if (playerName.length > 16) {
            setError("Name cannot be longer than 16 characters.");
            return;
        }

        const endpoint = "/rooms/join";
        fetch(process.env.NEXT_PUBLIC_API_URL + endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                playerName: playerName,
                roomCode: context.room.code,
            }),
        }).then((res) => {
            return res.json();
        }).then((res) => {
            if(res.status !== 200) {
                setError(res.message);
                return;
            }
            //addd code here
            context.setPlayer(res.data); 
            context.setView("multiplayer");
        }).catch((err) => {
            setError("Could not join room.");
        });
    }

    return (
        <Stack
            direction="column"
            alignItems="center"
            width="100%"
            spacing={3}
        >
            <PageHeader 
                title="Lobby"
                onPreviousClick={() => context.setView("main")}
            />
            <Stack
                direction="column"
                width="100%"
                justifyContent="center"
                alignItems="center"
                spacing={1}
            >
                <SubHeader title="Settings" icon={<Settings />} />
                <Stack direction="row" spacing={3}>
                    <Chip
                        color="neutral"
                        sx={{ 
                            display: "flex",
                            fontSize: "1.2rem",
                        }}
                        startDecorator={
                            <PhotoLibraryOutlined />
                        }
                    >
                        {context.room.settings.photoCount}
                    </Chip>
                    <Chip
                        color="neutral"
                        sx={{ display: "flex", fontSize: "1.2rem" }}
                        startDecorator={
                            <TimerOutlined />
                        }
                    >
                        {context.room.settings.timer}
                    </Chip>
                </Stack>
            </Stack>
            <Stack
                direction="column"
                width="100%"
                justifyContent="center"
                alignItems="center"
                spacing={1}
            >
                <SubHeader title="Keycode" icon={<Key />} />
                <Chip 
                    onClick={() => {
                        navigator.clipboard.writeText(context.room.code);
                        setCopiedToClipboard(true);
                        setTimeout(() => setCopiedToClipboard(false), 2000);
                    }}
                    color={ copiedToClipboard ? "success" : "primary"}
                    size="lg"
                    variant="outlined"
                    disabled={false}
                    endDecorator={
                        copiedToClipboard ?
                        <AssignmentTurnedIn/> :
                        <ContentCopy/>
                    }
                    sx={{ borderRadius: "6px", fontWeight: "bold" }}
                >
                    {context.room.code}
                </Chip>
            </Stack>
            <Stack
                direction="column"
                width="100%"
                justifyContent="center"
                alignItems="center"
                spacing={1}
            >
                <SubHeader title="Name" icon={<AccountCircle />} />
                <Input
                    sx={{ width: "80%", maxWidth: "360px" }}
                    onChange={(e) => setPlayerName(e.target.value)}
                    size="lg"
                    placeholder="Insert player name here..."
                />
            </Stack>

            <Typography
                component={"div"}
                level="h4"
                sx={{ color: "red", fontWeight: 700, height: "40px" }}
            >
                {error}
            </Typography>

            <Button
                onClick={handleStartGameClick}
                size="lg"
            >
                Start Game
            </Button>
        </Stack>
    );
}