export async function getRoomPlayersTotalScore(roomId) {
    const endpoint = "/player/getPlayers?id=" + roomId;
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + endpoint, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const res = await response.json();

    if (res.status !== 200 || res.data == []) 
        throw new Error(res.message);
    
    let players = [];
    res.data.forEach((player) => {
        players.push({
            name: player.name,
            score: player.totalScore,
        });
    });
    return players;    
};