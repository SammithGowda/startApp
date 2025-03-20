function minPlanesRequired(airports) {
    let n = airports.length;
    if (n === 0 || airports[0] === 0) return -1; // Cannot move from the first airport

    let planesUsed = 0;
    let maxReach = 0; 
    let i = 0;

    while (i < n - 1) {
        planesUsed++;
        maxReach = Math.max(maxReach, i + airports[i]);

        if (maxReach >= n - 1) return planesUsed;

        let nextIndex = i; 
        for (let j = i + 1; j <= Math.min(i + airports[i], n - 1); j++) { 
            if (j + airports[j] > nextIndex + airports[nextIndex]) {
                nextIndex = j;
            }
        }

        if (nextIndex === i) return -1; // Cannot move forward

        i = nextIndex; // Move to the best next airport
    }

    return planesUsed;
}

let arr =[2,1,2,3,1]
// let arr=[1,6,3,4,5,0,0,0,6]
console.log(minPlanesRequired(arr))