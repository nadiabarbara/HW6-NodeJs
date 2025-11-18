// code written by Nadia & Razi 

const fs = require('fs');

// Array of input file names
const inputFiles = [
    'file1.txt',
    'file2.txt',
    'file3.txt'
];

// Output file name
const outputFile = 'output.txt';

// Function to copy lines from input files to the output file
function copylines() {
    // Read all files into arrays of lines
    const fileLines = inputFiles.map(file => {
        try {
            return fs.readFileSync(file, 'utf-8').split('\n');
        } catch (error) {
            console.error(`Error reading file ${file}: ${error.message}`);
            return [];
        }
    });

    const outputStream = fs.createWriteStream(outputFile);

    const indices = new Array(inputFiles.length).fill(0); // track current line for each file
    let linesToCopy = 1; // start with 1 line per file

    let done = false;
    while (!done) {
        done = true; // assume all files are done

        for (let f = 0; f < fileLines.length; f++) {
            const lines = fileLines[f];
            let copied = 0;
            while (copied < linesToCopy && indices[f] < lines.length) {
                outputStream.write(lines[indices[f]] + '\n');
                indices[f]++;
                copied++;
                done = false; // still lines left to copy
            }
        }

        linesToCopy++; // increase number of lines to copy next round
    }

    outputStream.end();
    console.log(`Content copied to ${outputFile}`);
}

copylines();