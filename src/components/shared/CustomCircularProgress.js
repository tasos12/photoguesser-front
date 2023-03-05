import { useState, useEffect } from "react";
import CircularProgress from "@mui/joy/CircularProgress";

export default function CustomCircularProgress(props) {
    const reverse = props.reverse
    const value = props.value
    const [progress, setProgress] = useState(0);
    if(reverse) setProgress(100);

    useEffect(() => {
        if (progress >= value) return;
        const interval = setInterval(() => {
            if(reverse) 
                setProgress((prevProgress) => prevProgress - 0.2);
            else 
                setProgress((prevProgress) => prevProgress + 0.2);
        }, 1);
        return () => clearInterval(interval);
    }, [reverse, progress, value]);

    return(
        <CircularProgress
            determinate
            value={progress}
            sx={props.style}
            color={props.color}
        >
            {props.children}
        </CircularProgress>
    );
}