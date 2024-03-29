import { createContext, useState } from 'react';

export const ViewContext = createContext();

export default function ViewProvider ({ children }) {

    const [view , setView] = useState("main");
    const [room, setRoom] = useState({});
    const [player, setPlayer] = useState({});
    const [totalScore, setTotalScore] = useState(0);
    const [results, setResults] = useState([]);

    return (
        <ViewContext.Provider 
            value={{
                view, setView,
                room, setRoom,
                player, setPlayer,
                totalScore, setTotalScore,
                results, setResults,
            }}
        >
            {children}
        </ViewContext.Provider>
    )
}