export default {
    splitByFourNumbers(number) {
        return `${number.slice(0, 4)} ${number.slice(4, 8)} ${number.slice(8, 12)} ${number.slice(12, 16)}`;
    },
    getFirstSixNumbers(number) {
        return number.replace( /\s/g, "").slice(0, 6);
    },
    removeSpaces(number) {
        return number.replace( /\s/g, "");
    },
}