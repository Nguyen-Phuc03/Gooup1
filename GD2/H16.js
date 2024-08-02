import fs from 'fs';
import path from 'path';
const directory = './json_files';
if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
}
function randomString(length = 10) {
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return result;
}

const filenames = Array.from({ length: 10 }, (_, i) => `file${i + 1}.json`);
filenames.forEach((filename, i) => {
    const filePath = path.join(directory, filename);
    let content;
    if (i < 5) {
        content = JSON.stringify({ key: `value${i}` });
    } else {
        content = randomString(20);
    }
    fs.writeFileSync(filePath, content, 'utf8');
});
const resultsPath = path.join(directory, 'result.txt');
const results = [];

filenames.forEach((filename) => {
    const filePath = path.join(directory, filename);
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const jsonObject = JSON.parse(data);
        console.log(jsonObject);
        results.push(`${filename}\nOK\n`);
    } catch (error) {  
            console.log(`${filename} is not a valid JSON.`);
            results.push(`${filename}\nNOK\n`);      
    }
});

fs.writeFileSync(resultsPath, results.join(''), 'utf8');
