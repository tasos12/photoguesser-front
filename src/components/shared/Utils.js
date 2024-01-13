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