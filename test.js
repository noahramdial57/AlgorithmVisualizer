var coordinate = [];
var x, y;
for (x = 0; x <= 20; x += 1) {
    coordinate[x] = [];
    for (y = 0; y <= 60; y += 1) {
        coordinate[x][y] = [x, y]
    }
}

let table = [
            [{ state: 'empty' }, { state: 'empty' }, { state: 'empty' }],
            [{ state: 'empty' }, { state: 'block' }, { state: 'goal' }],
            ]; 

let start = [0, 0];
let end = [1, 2];
let row = table.length;
let col = table[0].length;

// checks for out of bounds
function safeNeighbor(r, c) {
    if (r < 0 || r >= row) return false;
    if (c < 0 || c >= col) return false;
    if (table[r][c].state == 'block') return false;
    return true;
};

// explore all neighbors
function exploreLocation(location) {
    let r = location.r;
    let c = location.c;
    let allNeighbors = [];
    //left
    if (safeNeighbor(r, c - 1)) allNeighbors.push({
        r: r,
        c: c - 1
    });
    //right
    if (safeNeighbor(r, c + 1)) allNeighbors.push({
        r: r,
        c: c + 1
    });
    //top
    if (safeNeighbor(r - 1, c)) allNeighbors.push({
        r: r - 1,
        c: c
    });
    //bottom
    if (safeNeighbor(r + 1, c)) allNeighbors.push({
        r: r + 1,
        c: c
    });
    return allNeighbors;
};

function findPath() {
    var location = {
        r: start[0],
        c: start[1],
    };
    var queue = [];
    queue.push(location);
    while (queue.length) {
        var currentLocation = queue.shift();
        if (currentLocation.r == end[0] && currentLocation.c == end[1])
            return currentLocation;
        table[currentLocation.r][currentLocation.c].state = 'visited';
        var neighbors = exploreLocation(currentLocation);
        for (neighbor of neighbors) {
            if (table[neighbor.r][neighbor.c].state != "visited") {
                queue.push(neighbor);
                table[neighbor.r][neighbor.c]["parent"] = currentLocation;
            }
        }
    }
    return false;
};

findPath()

function printPath(path) {
    let paths = [path];
    while (true) {
        let r = path.r;
        let c = path.c;
        let parent = table[r][c].parent;
        if (parent == undefined)
            break;
        paths.push(parent);
        path = {
            r: parent.r,
            c: parent.c
        };
    }
    console.log(paths)
}

