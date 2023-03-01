import { useState } from "react";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button"
import PhotoLibraryOutlined from "@mui/icons-material/PhotoLibraryOutlined";
import TimerOutlined from "@mui/icons-material/TimerOutlined";
import Settings from "@mui/icons-material/Settings";
import Key from "@mui/icons-material/Key";
import Chip from "@mui/joy/Chip";
import ContentCopy from "@mui/icons-material/ContentCopy";
import AssignmentTurnedIn from "@mui/icons-material/AssignmentTurnedIn";
import PageHeader from "./shared/PageHeader";
import SubHeader from "./shared/SubHeadder";

export default function StartRoomPage(props) {
    const [copiedToClipboard, setCopiedToClipboard] = useState(false);

    return (
        <Stack
            direction="column"
            alignItems="center"
            width="100%"
            spacing={5}
        >
            <PageHeader 
                title="Lobby"
                onPreviousClick={() => props.setContext({ page: "main" })}
            />
            <Stack
                direction="column"
                width="100%"
                justifyContent="center"
                alignItems="center"
                spacing={2}
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
                        {props.context.room.settings.photoCount}
                    </Chip>
                    <Chip
                        color="neutral"
                        sx={{ display: "flex", fontSize: "1.2rem" }}
                        startDecorator={
                            <TimerOutlined />
                        }
                    >
                        {props.context.room.settings.timer}
                    </Chip>
                </Stack>
            </Stack>
            <Stack
                direction="column"
                width="100%"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <SubHeader title="Keycode" icon={<Key />} />
                <Chip 
                    onClick={() => {
                        navigator.clipboard.writeText(props.context.room.code);
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
                    {props.context.room.code}
                </Chip>
            </Stack>

            <Button
                onClick={() => props.setContext({ page: "game", room: props.context.room })}
                size="lg"
            >
                Start Game
            </Button>
        </Stack>
    );
}