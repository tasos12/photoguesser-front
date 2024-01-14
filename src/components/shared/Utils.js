import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export function calculatePerformanceAndColor(score, maxScore) {
    let performance = "Excellent";
    let color = "success";
    if (score/maxScore < 0.33) {
        performance = "Poor";
        color = "danger";
    } else if (score/maxScore < 0.66) {
        performance = "Average";
        color = "warning";
    } else if (score/maxScore < 1) {
        performance = "Very good";
        color = "success";
    }

    return [performance, color];
} 

export function calculatePosition(index) {
    let position;
    if (index === 0) {
        position = <EmojiEventsIcon sx={{ color: "rgba(255,190,0, 1)" }}/>;
    } else if (index === 1) {
        position = <EmojiEventsIcon sx={{ color: "rgba(192,192,192,1)" }}/>;
    } else if (index === 2) {
        position = <EmojiEventsIcon sx={{ color:"rgba(205,127,50, 1)" }}/>;
    } else {
        position = index + 1;
    }
    return position;
}