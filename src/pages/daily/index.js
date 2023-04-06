import Head from 'next/head'
import { useContext } from 'react';
import styles from '@/styles/Home.module.css'
import { CssVarsProvider } from "@mui/joy/styles";
import GameRoomPage from '@/components/GameRoomView';
import ResultsRoomPage from '@/components/ResultsRoomView';
import { extendedTheme } from '@/components/shared/ExtendedTheme';
import { ViewContext } from '@/contexts/ViewContext';

export default function Home() {
    const context = useContext(ViewContext)

    let view;
    if (context.page === "game") {
        view = <GameRoomPage/>
    } else if (context.page === "results") {
        view = <ResultsRoomPage/>
    }

    return (
        <>
        <Head>
            <title>Daily - Photoguesser</title>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
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