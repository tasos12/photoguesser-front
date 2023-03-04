import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { CssVarsProvider } from "@mui/joy/styles";
import MainPage from "@/components/MainPage";
import CreateRoomPage from '@/components/CreateRoomPage';
import { useState } from 'react';
import StartRoomPage from '@/components/StartRoomPage';
import GameRoomPage from '@/components/GameRoomPage';
import ResultsRoomPage from '@/components/ResultsRoomPage';
import AnimatedPage from '@/components/shared/AnimatedPage';
import { extendedTheme } from '@/components/shared/ExtendedTheme';

export default function Home() {
    // const apiURL = "http://localhost:8080/api/v1";
    const apiURL = "https://photoguesser.eu-central-1.elasticbeanstalk.com/api/v1"
    const [context, setContext] = useState( {
        page: "main",
        room: {}
    });

    const setPageContext = (state) => {
        setContext(state);
    }

    let view;
    if(context.page === "create")  {
        view = 
                <AnimatedPage>
                <CreateRoomPage
                    apiURL={apiURL}
                    context={context}
                    setContext={setPageContext}
                />
                </AnimatedPage>
    } else if (context.page === "start") {
        view = <AnimatedPage>
                <StartRoomPage
                    apiURL={apiURL}
                    context={context}
                    setContext={setPageContext}
                />
                </AnimatedPage>
    } else if (context.page === "game") {
        view = <AnimatedPage>
                <GameRoomPage
                    apiURL={apiURL}
                    context={context}
                    setContext={setPageContext}
                />
                </AnimatedPage>
    } else if (context.page === "results") {
        view = <AnimatedPage>
                <ResultsRoomPage
                    apiURL={apiURL}
                    context={context}
                    setContext={setPageContext}
                />
                </AnimatedPage>
    } else {
        view =  <AnimatedPage>
                <MainPage
                    apiURL={apiURL}
                    context={context}
                    setContext={setPageContext}
                />
                </AnimatedPage>
    }

    return (
        <>
            <Head>
                <title>Photo Guesser</title>
                <meta
                    name="description"
                    content="Test your knowledge in photography or challenge your friends and discover old pieces of history together"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <CssVarsProvider theme={extendedTheme}>
                    <div 
                    style={{ 
                        width: "100vw", 
                        minWidth: "280px", 
                        maxWidth: "380px",
                        marginTop: "5vh", 
                    }}>
                        {view}
                    </div>
                </CssVarsProvider>
            </main>
        </>
    );
}
