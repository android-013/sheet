const sheetId = "1IPMZmcUqCFy0Mk-PjNbIkMDfVpo4yrSIv9Fw6BRYXI4";  // Replace with your Sheet ID
const apiKey = "AIzaSyCuTxrr8asiw3m_viVwVrFL8rkUzoOCib0";    // Replace with your Google API Key
const sheetName = "Monochrome";       // Change if needed


async function fetchData() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayData(data.values);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function displayData(data) {
    const tableHeader = document.getElementById("table-header");
    const tableBody = document.getElementById("table-body");

    // Clear existing data
    tableHeader.innerHTML = "";
    tableBody.innerHTML = "";

    // Set Table Headers
    data[0].forEach(header => {
        let th = document.createElement("th");
        th.textContent = header;
        tableHeader.appendChild(th);
    });

    // Set Table Rows
    data.slice(1).forEach(row => {
        let tr = document.createElement("tr");
        row.forEach(cell => {
            let td = document.createElement("td");
            td.textContent = cell;
            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
    });
}

setInterval(fetchData, 60000);