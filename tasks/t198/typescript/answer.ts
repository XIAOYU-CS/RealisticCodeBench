function sortImageArraysByScore(
    imageScores: number[], 
    imageNames: string[], 
    imageIDs: (string | number)[]
): { resultScores: number[], resultNames: string[], resultIDs: (string | number)[] } {
    // Combine scores, names, and IDs into an array of objects
    const imageData = imageScores.map((score, index) => ({
        score,
        name: imageNames[index],
        id: imageIDs[index]
    }));

    // Sort imageData by scores in ascending order
    imageData.sort((a, b) => a.score - b.score);

    // Destructure the sorted imageData back into separate arrays
    const resultScores: number[] = [];
    const resultNames: string[] = [];
    const resultIDs: (string | number)[] = [];

    imageData.forEach(data => {
        resultScores.push(data.score);
        resultNames.push(data.name);
        resultIDs.push(data.id);
    });

    return { resultScores, resultNames, resultIDs };
}
