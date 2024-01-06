import Head from 'next/head'
import { useState, useContext, useEffect } from 'react';
import styles from '@/styles/Home.module.css'
import { CssVarsProvider } from "@mui/joy/styles";
import GameRoomView from '@/components/views/daily/GameRoomView';
import ResultsRoomView from '@/components/views/daily/ResultsRoomView';
import LoadingView from '@/components/views/LoadingView';
import { extendedTheme } from '@/components/shared/ExtendedTheme';
import { ViewContext } from '@/contexts/ViewContext';


export default function Home() {
    const context = useContext(ViewContext)
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if(loaded) return;
        setLoaded(true);

        const endpoint = "/daily/latest";
        fetch(process.env.NEXT_PUBLIC_API_URL + endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            return res.json();
        }).then((res) => {
            if(res.status !== 200) 
                throw new Error();

            context.setRoom({ 
                photos: res.data.photoIDs,
                settings: res.data.settings,
            }); 
            context.setView("game");
        });
    }, [context, loaded]);

    let view;
    if (context.view === "game") {
        view = <GameRoomView/>
    } else if (context.view === "results") {
        view = <ResultsRoomView/>
    } else {
        view = <LoadingView />;
    }

    return (
        <>
        <Head>
            <title>Daily - Photoguesser</title>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <meta
                name="description"
                content="
                        Try the daily challenge! 
                        Guess the year of 5 selected photos.
                        "
            />
            <meta 
                name="keywords" 
                content="
                        photoguesser daily,
                        photo guesser daily,
                        guess the year daily,
                        guess the photo year daily,
                        guess the year game daily,
                        guess the photo game daily,
                        guess the picture daily,
                        guess the picture game daily,
                        guess the year of a photograph daily,
                        guess the year of a photo game daily,
                        guess the year of a photograph game daily,
                        "
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
    )
}