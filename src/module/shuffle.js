export default function shuffleArray(arr) {
    let index = arr.length, temp, randomIndex;
    while (0 !== index) {
        randomIndex = Math.floor(Math.random() * index);
        index--;
        temp = arr[index];
        arr[index] = arr[randomIndex];
        arr[randomIndex] = temp;
    }
    return arr;
}
