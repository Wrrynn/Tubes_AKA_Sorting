let data = [];
let studentNames = [];

// List nama mahasiswa
const firstNames = [
    "Alice", "Bob", "Charlie", "David", "Eva", "Fay", "George", "Helen", 
    "Ivy", "Jack", "Kim", "Liam", "Mona", "Nina", "Oscar", "Paul", "Quinn", 
    "Rachel", "Sam", "Tina", "Ursula", "Victor", "Wendy", "Xander", "Yara", "Zane",
    "Reno","Irham","Dika","Fajir","Timot","Haris","Putri","ODE","Kopo", "Ganen"
];

const lastNames = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Martinez", 
    "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", 
    "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "White", "Harris",
    "Berliandu", "Malik", "Markisa", "Sasimi" , "Perdianto"
];

function generateData() {
    let n = parseInt(document.getElementById("jumlahData").value);
    data = [];
    studentNames = [];

    for (let i = 0; i < n; i++) {
        // memilih random fname dan lname
        let firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        let lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        let name =(i + 1)+ ". " + firstName + " " + lastName ; // membuat nomor

        // membuat nilai
        let score = (Math.random() * 99 + 1).toFixed(0); 

        data.push(score);
        studentNames.push(name);
    }

    displayData();
}

function displayData() {
    const resultElement = document.getElementById("hasil");
    resultElement.innerHTML = ""; // menghapus nilai sebelumnya

    // Create a table to display the data
    let table = document.createElement("table");
    table.style.width = "100%";
    table.style.border = "5px solid #2a2a2a";
    table.style.borderCollapse = "collapse";

    // Create the table header
    let thead = document.createElement("thead");
    let headerRow = document.createElement("tr");
    let nameHeader = document.createElement("th");
    nameHeader.textContent = "Nama Mahasiswa";
    nameHeader.style.padding = "8px";
    nameHeader.style.textAlign = "left";
    headerRow.appendChild(nameHeader);

    let scoreHeader = document.createElement("th");
    scoreHeader.textContent = "Nilai";
    scoreHeader.style.padding = "8px";
    scoreHeader.style.textAlign = "right";
    headerRow.appendChild(scoreHeader);
    thead.appendChild(headerRow);
    table.appendChild(thead);


    let tbody = document.createElement("tbody");
    for (let i = 0; i < studentNames.length; i++) {
        let row = document.createElement("tr");

        // membuat nama daftar
        let nameCell = document.createElement("td");
        nameCell.textContent = studentNames[i];
        nameCell.style.padding = "8px";
        nameCell.style.textAlign = "left";
        row.appendChild(nameCell);

        // membuat daftar nilai
        let scoreCell = document.createElement("td");
        scoreCell.textContent = data[i];
        scoreCell.style.padding = "8px";
        scoreCell.style.textAlign = "right";
        row.appendChild(scoreCell);

        tbody.appendChild(row);
    }
    table.appendChild(tbody);
    
    // menggabungkan 
    resultElement.appendChild(table);
}

function sortData() {
    let n = data.length;
    let mergeSortTimes = [];
    let cocktailSort_IterativeTimes = [];
    let cocktailSort_RecursiveTimes = [];
    let dataSizes = [];

    for (let i = 0; i <= n; i += 10) {
        let tempData = data.slice(0, i);

        // waktu untuk Merge Sort
        let startTime = performance.now();
        mergeSort([...tempData]);
        let endTime = performance.now();
        mergeSortTimes.push(endTime - startTime);

        let time = document.getElementById("time1");
        time.innerHTML = `Merge Sort: ${(endTime - startTime).toFixed(2)} milliseconds`;

        // Waktu untuk Cocktail Sort iterative
        startTime = performance.now();
        cocktailSort_Iterative([...tempData]);
        endTime = performance.now();
        cocktailSort_IterativeTimes.push(endTime - startTime);

        time = document.getElementById("time2");
        time.innerHTML = `Cocktail Iterative: ${(endTime - startTime).toFixed(2)} milliseconds`;

        //Waktu untuk for Cocktail Sort
        startTime = performance.now();
        cocktailSort_Recursive([...tempData]);
        endTime = performance.now();
        cocktailSort_RecursiveTimes.push(endTime - startTime);

        time = document.getElementById("time3");
        time.innerHTML = `Cocktail Recursive: ${(endTime - startTime).toFixed(2)} milliseconds`;

        dataSizes.push(i);
    }

    plotGraph(dataSizes, mergeSortTimes, cocktailSort_IterativeTimes, cocktailSort_RecursiveTimes);
    displaySortedResults();
}

function cocktailSort_Recursive(arr, start = 0, end = arr.length - 1) {
    // Base case: jika array penuh 
    if (start >= end) return arr;

    let swapped = false;

    // Forward pass
    for (let i = start; i < end; i++) {
        if (parseFloat(arr[i]) > parseFloat(arr[i + 1])) {
            [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]; // tukar elemen
            swapped = true;
        }
    }

    // jika tidak ada element yang di tukar maka return arr
    if (!swapped) return arr;

    // kurangi nilai array yng belum tersortir
    end--;

    swapped = false;

    // Backward pass
    for (let i = end; i > start; i--) {
        if (parseFloat(arr[i - 1]) > parseFloat(arr[i])) {
            [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]]; //tukar elemen
            swapped = true;
        }
    }

    // jika tidak ada element yang di tukar maka array terurut
    if (!swapped) return arr;

    // tambah jumlah arrya belum terurut 
    start++;

    // memanggil rekursif
    return cocktailSort_Recursive(arr, start, end);
}


function mergeSort(arr, start = 0, end = arr.length - 1) {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);

    // Rekursi untuk membagi array
    mergeSort(arr, start, mid);
    mergeSort(arr, mid + 1, end);

    // Gabungkan dua bagian yang sudah terurut
    let left = start;
    let right = mid + 1;
    let temp = [];

    while (left <= mid && right <= end) {
        if (arr[left] <= arr[right]) {
            temp.push(arr[left]);
            left++;
        } else {
            temp.push(arr[right]);
            right++;
        }
    }

    // Tambahkan elemen yang tersisa dari bagian kiri
    while (left <= mid) {
        temp.push(arr[left]);
        left++;
    }

    // Tambahkan elemen yang tersisa dari bagian kanan
    while (right <= end) {
        temp.push(arr[right]);
        right++;
    }

    // Salin elemen yang sudah terurut kembali ke array asli
    for (let i = 0; i < temp.length; i++) {
        arr[start + i] = temp[i];
    }
}

function cocktailSort_Iterative(arr) {
    let swapped = true;
    let start = 0;
    let end = arr.length - 1;

    while (swapped) {
        swapped = false;

        // Forward pass (left to right)
        for (let i = start; i < end; i++) {
            // Change the comparison for descending order
            if (arr[i] < arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
            }
        }

        if (!swapped) break;

        swapped = false;
        end--;

        // Backward pass (right to left)
        for (let i = end - 1; i >= start; i--) {
            // Change the comparison for descending order
            if (arr[i] < arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
            }
        }

        start++;
    }

    return arr;
}

function plotGraph(dataSizes, mergeSortTimes, cocktailSort_IterativeTimes, cocktailSort_RecursiveTimes) {
    const ctx = document.getElementById('executionGraph').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dataSizes,
            datasets: [
                {
                    label: 'Merge Sort (recursive)',
                    data: mergeSortTimes,
                    borderColor: 'blue',
                    fill: false,
                    tension: 0.1
                },
                {
                    label: 'Cocktail Sort Iterative',
                    data: cocktailSort_IterativeTimes,
                    borderColor: 'red',
                    fill: false,
                    tension: 0.1
                },
                {
                    label: 'Cocktail Sort Recursive',
                    data: cocktailSort_RecursiveTimes,
                    borderColor: 'green',
                    fill: false,
                    tension: 0.1
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Jumlah Data'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Waktu Eksekusi (ms)'
                    },
                    min: 0
                }
            },
            plugins: {
                decimation: {
                    enabled: true,
                    algorithm: 'lttb', // 'lttb' (Largest Triangle Three Buckets) is efficient for large datasets
                    samples: 100000 // Adjust this value for better performance and resolution
                }
            }
        }
    });
}


function displaySortedResults() {
    // Salin data dan nama untuk pengurutan
    let pairedData = data.map((score, index) => ({
        name: studentNames[index],
        score: parseFloat(score) // Konversi nilai ke angka agar mudah dibandingkan
    }));

    // Urutkan berdasarkan nilai secara descending
    pairedData.sort((a, b) => b.score - a.score);

    // Ambil 10 data teratas
    let top10 = pairedData.slice(0, 10);

    // Tampilkan hasil
    let resultElement = document.getElementById("result");
    resultElement.innerHTML = ""; // Bersihkan hasil sebelumnya

    top10.forEach((student, rank) => {
        let li = document.createElement("li");
        li.textContent = `${student.name}: ${student.score.toFixed(0)}`;
        resultElement.appendChild(li);
    });
}

