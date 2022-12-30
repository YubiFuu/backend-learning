import { arrayCars, arrayNumbers, names, numbers, data } from "./data.js";

export function sortingNumbers() {
    return arrayNumbers.sort((a, b) => a - b);
}

export function sortingCars() {
    return arrayCars.sort((a, b) => a - b);
}

export function firstEltNames() {
    return names.slice(0, 1);
}

export function notFirstEltNames() {
    return names.slice(1);
}

export function lastEltNames() {
    return names.slice(-1);
}

export function notLastEltNames() {
    return names.slice(0, -1);
}

export function eins(a, b) {
    if (a > b) {
        return a - Math.ceil(Math.random() * Math.abs(a - b));
    } else if (a < b) {
        return a + Math.ceil(Math.random() * Math.abs(a - b));
    } else {
        return null;
    }
}
export const numberDouble = () => {
    let newArray = [...new Set(numbers)];
    return newArray;
};
export const loopNumbers = () => {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }
    return sum;
};
export function firstBig(a) {
    let x = a.slice(0, 1).toUpperCase();
    let y = a.slice(1);
    return x + y;
}
export function checkParam(a, b) {
    let x = a.slice(-1);
    return b == x;
}

export function sortCitiesBigPop() {
    let cities = data.filter((city) => city.population > 100000);
    return cities;
}
export function sortCitiesSmallPop() {
    let cities = data.filter((city) => city.population < 100000);
    return cities;
}
