import { useContext, useState } from "react";
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
import PageHeader from "../shared/PageHeader";
import SubHeader from "../shared/SubHeadder";
import { ViewContext } from "@/contexts/ViewContext";

export default function StartRoomView() {
    const context = useContext(ViewContext);
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
                onPreviousClick={() => context.setView("main")}
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
                spacing={2}
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

            <Button
                onClick={() => context.setView("game")}
                size="lg"
            >
                Start Game
            </Button>
        </Stack>
    );
}