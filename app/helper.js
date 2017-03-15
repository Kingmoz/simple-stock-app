// Helper function
function getDisplayTime(timestamp) {
    let date = new Date(timestamp);
    let time = ((date.getHours() < 10) ? "0" : "") + date.getHours() + ":"
             + ((date.getMinutes() < 10) ? "0" : "") + date.getMinutes() + ":"
             + ((date.getSeconds() < 10) ? "0" : "") + date.getSeconds();

    return time;
}

function updateAppState(newData) {
    updateData(newData);
    updateChart(newData);
}
