module.exports = { /**
     * This function shuffles the elements of an array randomly.
     * @param array - The input array that needs to be shuffled.
     * @returns The function `shuffleArray` is returning the shuffled array.
     */
    shuffleArray(array) {
        for (let index = array.length - 1; index > 0; index--) {
            const zeroToIndex = Math.floor(Math.random() * (index + 1));
            [
                array[index], array[zeroToIndex]
            ] = [
                array[zeroToIndex], array[index]
            ];
        }
        return array;
    }
}
