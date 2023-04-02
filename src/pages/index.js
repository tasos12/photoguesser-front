import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { CssVarsProvider } from "@mui/joy/styles";
import MainPage from "@/components/MainPage";
import CreateRoomPage from '@/components/CreateRoomPage';
import { useState } from 'react';
import StartRoomPage from '@/components/StartRoomPage';
import GameRoomPage from '@/components/GameRoomPage';
import ResultsRoomPage from '@/components/ResultsRoomPage';
import { extendedTheme } from '@/components/shared/ExtendedTheme';

export default function Home() {
    // const apiURL = "http://localhost:8080/api/v1";
    const apiURL = "https://api.photo-guesser.com/api/v1"
    const [context, setContext] = useState( {
        page: "main",
        room: {}
    });

    let view;
    if(context.page === "create")  {
        view =  <CreateRoomPage
                    apiURL={apiURL}
                    context={context}
                    setContext={setContext}
                />
    } else if (context.page === "start") {
        view = 
                <StartRoomPage
                    apiURL={apiURL}
                    context={context}
                    setContext={setContext}
                />
    } else if (context.page === "game") {
        view = 
                <GameRoomPage
                    apiURL={apiURL}
                    context={context}
                    setContext={setContext}
                />
    } else if (context.page === "results") {
        view = 
                <ResultsRoomPage
                    apiURL={apiURL}
                    context={context}
                    setContext={setContext}
                />
    } else {
        view =  
                <MainPage
                    apiURL={apiURL}
                    context={context}
                    setContext={setContext}
                />
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
                <link rel="icon" href="/favicon.ico" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="/favicon.ico" />
                <link rel="apple-touch-icon-precomposed" href="/favicon.ico" />
                <meta name="author" content="Tasos Gkagkas" />
                <meta name="copyright" content="Tasos Gkagkas" />
                <meta charSet="UTF-8" />
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
