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
        if (!pairs.find(pair => areSameCoordinates(pair, newPair))) {
            pairs.push(newPair);
        }
    }
    return pairs;
}

export function areSameCoordinates(pair: [number, number], newPair: [number, number]): boolean {
    return getPairKey(pair) === getPairKey(newPair);
}

function getPairKey(pair: DiamondCord) {
    // To make comparision easier
    return pair[0] + '-' + pair[1];
}

export function getDistance(cord1: DiamondCord, cord2: DiamondCord) {
    const x = cord1[0] - cord2[0];
    const y = cord1[1] - cord2[1];
    // Distance Formula sqrt(x^2 +y^2)
    // No need to return sqrt of value because if n1 > n2 then sqrt(n1) > sqrt(n2)
    return (x * x) + (y * y);
}

export function findDirection(clickedCord: DiamondCord, nearestDiamond: DiamondCord) {
    // Return values: '' | 'left' | 'right' | 'down' | 'up' | 'left-up' | 'left-down' | 'right-up' | 'right-down';
    // We will use these values as classes directly
    let direction = '';

    const x1 = clickedCord[0];
    const y1 = clickedCord[1];
    const x2 = nearestDiamond[0];
    const y2 = nearestDiamond[1];

    if (y1 < y2) {
        direction = 'right';
    } else if (y1 > y2) {
        direction = 'left';
    }

    if (y1 !== y2 && x1 !== x2) {
        direction += '-';
    }

    if (x1 < x2) {
        direction += 'down';
    } else if (x1 > x2) {
        direction += 'up';
    }
    return direction;
}

export type DiamondCord = [number, number];
export const BOARD_SIZE = 8;
export const SAVED_GAME_ID = 'Diamond-Game-1';
