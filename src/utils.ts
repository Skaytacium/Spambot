export function objsize(obj: object) {
    let size = 0;
    
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }

    return size;
}