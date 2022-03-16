function generateNumber(string) {
    let number = 0;
    for (let i = 0; i < string.length; i++) {
        number += string.charCodeAt(i);
    }
    return number;
}

function getPercent(number) {
    if(number < 100) return `${number}%`;
    return `${number.toString().slice(0, 2)}.${number.toString().slice(2)}%`;
}
