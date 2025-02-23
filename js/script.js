const sheetId = "YOUR_SHEET_ID";  // Replace with your actual Google Sheet ID
const apiKey = "YOUR_API_KEY";    // Replace with your actual API Key
const sheetName = "Sheet1";       // Change if your sheet has a different name

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

fetchData();
// No additional code needed here