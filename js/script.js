const sheetId = "1IPMZmcUqCFy0Mk-PjNbIkMDfVpo4yrSIv9Fw6BRYXI4";  // Replace with your Sheet ID
const apiKey = "AIzaSyCuTxrr8asiw3m_viVwVrFL8rkUzoOCib0";    // Replace with your Google API Key
const sheetName = "Sheet1";       // Change if needed

async function fetchData() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        allData = data.values;
        displayData(allData);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function displayData(data) {
    const tableHeader = document.getElementById("table-header");
    const tableBody = document.getElementById("table-body");

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

document.addEventListener("DOMContentLoaded", function () {
    const tableContainer = document.getElementById("table-container");
    const scrollbar = document.querySelector(".scrollbar");

    scrollbar.addEventListener("scroll", function () {
        tableContainer.scrollLeft = scrollbar.scrollLeft;
    });

    tableContainer.addEventListener("scroll", function () {
        scrollbar.scrollLeft = tableContainer.scrollLeft;
    });
});

function searchTable() {
    let input = document.getElementById("search-box").value.toLowerCase();
    const tableBody = document.getElementById("table-body");
    const rows = tableBody.getElementsByTagName("tr");

    for (let row of rows) {
        let text = "";
        for (let cell of row.getElementsByTagName("td")) {
            text += cell.textContent.toLowerCase() + " "; // Combine all cell texts
        }
        row.style.display = text.includes(input) ? "" : "none"; // Show/hide rows
    }
}

function slideTable(direction) {
    const container = document.getElementById('table-container');
    if (direction === 'left') {
        container.scrollLeft -= 100;
    } else if (direction === 'right') {
        container.scrollLeft += 100;
    }
}

setInterval(fetchData, 3600000); // Fetch data every hour
fetchData(); // Initial fetch
// End of snippet
