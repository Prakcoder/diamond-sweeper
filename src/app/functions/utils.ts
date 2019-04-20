function getRandomNumber(max: number) {
    return Math.floor(Math.random() * (max + 1));
}

function* pairGenerator(max: number) {
    yield <DiamondCord>[getRandomNumber(max), getRandomNumber(max)];
}

function generateUniquePairs(size: number) {
    const pairs: DiamondCord[] = [];
    while (pairs.length !== size) {
        const newPair = pairGenerator(size).next().value;
        if (!pairs.find(pair => comparePairs(pair, newPair))) {
            pairs.push(newPair);
        }
    }
    return pairs;
}

export function comparePairs(pair: [number, number], newPair: [number, number]): boolean {
    return getPairKey(pair) === getPairKey(newPair);
}

function getPairKey(pair: DiamondCord) {
    return pair[0] + '-' + pair[1];
}



export type DiamondCord = [number, number];
