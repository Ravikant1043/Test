const fs = require('fs');

function convertToDecimal(base, value) {
    return parseInt(value, base);
}

function lagrangeInterpolation(points, x_value) {
    let result = 0;
    let k = points.length;

    for (let i = 0; i < k; i++) {
        let term = points[i][1];
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                term *= (x_value - points[j][0]) / (points[i][0] - points[j][0]);
            }
        }
        result += term;
    }

    return Math.round(result);
}

function findConstantTerm(data) {
    let k = data.keys.k;
    let points = [];

    for (let key in data) {
        if (!isNaN(key)) {
            let x = parseInt(key);
            let base = parseInt(data[key].base);
            let y = convertToDecimal(base, data[key].value);
            points.push([x, y]);
        }
    }
    return lagrangeInterpolation(points, 0);
}

function FetchData(filename) {
    try {
        const jsonData = fs.readFileSync(filename, 'utf8');
        const data = JSON.parse(jsonData);
        console.log(findConstantTerm(data));
    } catch (error) {
        console.error("File is not supported", error);
    }
}
// give the data in the json format in the file name called data.json
FetchData('data.json');
