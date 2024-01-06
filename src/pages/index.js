import Head from 'next/head'
import { useContext, useState, useEffect } from 'react';
import styles from '@/styles/Home.module.css'
import { CssVarsProvider } from "@mui/joy/styles";
import MainView from "@/components/views/MainView";
import CreateRoomView from '@/components/views/multiplayer/CreateRoomView';
import StartRoomView from '@/components/views/multiplayer/StartRoomView';
import GameRoomView from '@/components/views/daily/GameRoomView';
import MultiplayerRoomView from '@/components/views/multiplayer/MultiplayerRoomView';
import ResultsRoomView from '@/components/views/multiplayer/ResultsRoomView';
import { extendedTheme } from '@/components/shared/ExtendedTheme';
import { ViewContext } from '@/contexts/ViewContext';

export default function Home() {
    const context = useContext(ViewContext)
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if(loaded) return;
        context.setView("main")
        setLoaded(true);
    }, [loaded, context]);

    let view = <MainView/>;
    if(context.view === "create")  {
        view =  <CreateRoomView/>
    } else if (context.view === "start") {
        view = <StartRoomView/>
    } else if (context.view === "game") { //Maybee remove after update
        view = <GameRoomView/>
    } else if (context.view === "results") {
        view = <ResultsRoomView/>
    } else if (context.view === "multiplayer") {
        view = <MultiplayerRoomView/>
    }
    
    return (
        <>
            <Head>
                <title>Photoguesser - Guess the year!</title>
                <meta
                    name="description"
                    content="
                            Guess the year a photo was taken!
                            Photoguesser is a game that you find clues 
                            and estimate what year a picture was taken. 
                            Play free now!
                            "
                />
                <meta 
                    name="keywords" 
                    content="
                            photoguesser,
                            photo guesser,
                            guess the year,
                            guess the photo year,
                            guess the year game,
                            guess the photo game,
                            guess the picture,
                            guess the picture game,
                            guess the year of a photograph,
                            guess the year of a photo game,
                            guess the year of a photograph game,
                            "
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta 
                    name="google-site-verification" 
                    content="ZZvhfDtR6No8XGiqztsVRwJuL0GtDTrjCBaKONWUuuQ"
                />
            </Head>
            <main className={styles.main}>
                <CssVarsProvider theme={extendedTheme}>
                    <div 
                    style={{ 
                        width: "100vw", 
                        minWidth: "280px", 
                        maxWidth: "380px",
                        marginTop: "2vh", 
                    }}>
                        {view}
                    </div>
                </CssVarsProvider>
            </main>
        </>
    );
}
