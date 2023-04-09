module.exports = { /**
     * The function converts a given time in milliseconds to a readable format of hours, minutes, and
     * seconds.
     * @param milliseconds - The amount of time in milliseconds that you want to convert into a
     * readable format.
     * @returns {string} - The function `readableTime` returns a string that represents the time in hours,
     * minutes, and seconds, based on the input `milliseconds`. The string has the format of "hours h
     * minutes m seconds s".
     */
    readableTime(milliseconds) {
        const seconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        return `${hours}h ${minutes}m ${remainingSeconds}s`;
    }
}
