function runMemoryAllocation() {
    var blockSizeInput = document.getElementById("blockSize").value;
    var processSizeInput = document.getElementById("processSize").value;

    var blockSize = blockSizeInput.split(",").map(Number);
    var processSize = processSizeInput.split(",").map(Number);

    var outputDiv = document.getElementById("output");
    outputDiv.innerHTML = ""; // Clear previous output

    // Display block and process sizes
    outputDiv.innerHTML += "<p><strong>Block Sizes:</strong> " + blockSize + "</p>";
    outputDiv.innerHTML += "<p><strong>Process Sizes:</strong> " + processSize + "</p>";

    // Run the provided JavaScript code
    outputDiv.innerHTML += "<p><strong>Output:</strong></p>";
    
    // Execute the provided JavaScript functions
    outputDiv.innerHTML += "<p><strong>First Fit:</strong></p>";
    implimentFirstFit(blockSize, blockSize.length, processSize, processSize.length, outputDiv);

    outputDiv.innerHTML += "<p><strong>Best Fit:</strong></p>";
    implimentBestFit(blockSize, blockSize.length, processSize, processSize.length, outputDiv);

    outputDiv.innerHTML += "<p><strong>Worst Fit:</strong></p>";
    implimentWorstFit(blockSize, blockSize.length, processSize, processSize.length, outputDiv);
}

function implimentFirstFit(blockSize, blocks, processSize, processes, outputDiv) {
    const allocate = new Array(processes).fill(-1);
    const occupied = new Array(blocks).fill(0);

    for (let i = 0; i < processes; i++) {
        for (let j = 0; j < blocks; j++) {
            if (!occupied[j] && blockSize[j] >= processSize[i]) {
                allocate[i] = j;
                occupied[j] = 1;
                break;
            }
        }
    }

    let output = "\nProcess No.\tProcess Size\tBlock no.";
    for (let i = 0; i < processes; i++) {
        output += `${i + 1} \t\t\t ${processSize[i]} \t\t\t ${allocate[i] !== -1 ? allocate[i] + 1 : "Not Allocated"}<br>`;
    }
    outputDiv.innerHTML += output;
}

function implimentBestFit(blockSize, blocks, processSize, processes, outputDiv) {
    const allocation = new Array(processes).fill(-1);

    for (let i = 0; i < processes; i++) {
        let indexPlaced = -1;
        for (let j = 0; j < blocks; j++) {
            if (blockSize[j] >= processSize[i]) {
                if (indexPlaced === -1)
                    indexPlaced = j;
                else if (blockSize[j] < blockSize[indexPlaced])
                    indexPlaced = j;
            }
        }
        if (indexPlaced !== -1) {
            allocation[i] = indexPlaced;
            blockSize[indexPlaced] -= processSize[i];
        }
    }

    let output = "\nProcess No.\tProcess Size\tBlock no.";
    for (let i = 0; i < processes; i++) {
        output += `${i + 1} \t\t\t ${processSize[i]} \t\t\t ${allocation[i] !== -1 ? allocation[i] + 1 : "Not Allocated"}<br>`;
    }
    outputDiv.innerHTML += output;
}

function implimentWorstFit(blockSize, blocks, processSize, processes, outputDiv) {
    const allocation = new Array(processes).fill(-1);
    const occupied = new Array(blocks).fill(0);

    for (let i = 0; i < processes; i++) {
        let indexPlaced = -1;
        for (let j = 0; j < blocks; j++) {
            if (blockSize[j] >= processSize[i] && !occupied[j]) {
                if (indexPlaced === -1)
                    indexPlaced = j;
                else if (blockSize[indexPlaced] < blockSize[j])
                    indexPlaced = j;
            }
        }
        if (indexPlaced !== -1) {
            allocation[i] = indexPlaced;
            occupied[indexPlaced] = 1;
            blockSize[indexPlaced] -= processSize[i];
        }
    }

    let output = "\nProcess No.\tProcess Size\tBlock no.";
    for (let i = 0; i < processes; i++) {
        output += `${i + 1} \t\t\t ${processSize[i]} \t\t\t ${allocation[i] !== -1 ? allocation[i] + 1 : "Not Allocated"}<br>`;
    }
    outputDiv.innerHTML += output;
}