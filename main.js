const fs = require('fs');

let fileToRead = "f_libraries_of_the_world";

let inputInStr = fs.readFileSync(`./txtFiles/${ fileToRead }.txt`).toString();

let inputs = inputInStr.split("\n");

// Filter out empty lines
let filteredInputs = inputs.filter(elem => elem !== "");

//Days available to scan
let days = filteredInputs[0].split(" ")[2];

//Create an array of objects that will contain libraryIndex, daysToSignUp, books
let libraries = [];
let currLib = 0;
//Library line starts at 2
for (let i = 2; i < filteredInputs.length; i++) {
    libraries.push({
        libraryIndex: currLib++,
        daysToSignUp: parseInt(filteredInputs[i].split(" ")[1]),
        booksScanPerDay: parseInt(filteredInputs[i].split(" ")[2]),
        books: filteredInputs[++i].split(" ").map(book => parseInt(book))
    });
}

//Those can process more books should be scanned later
//Arrange the libraries according booksScanPerDay
libraries.sort((a, b) => {
    return a.booksScanPerDay - b.booksScanPerDay;
});

// console.log(libraries);

//Compare the libraries that can be scanned at that amount of time
//Contains object with 2 properties: libraryIndex and books
let librariesCanBeScanned = [];

for (let i = 0; i < libraries.length; i++) {
    let element = libraries[i];
    days -= element.daysToSignUp;
    if (days <= 0) {
        break;
    }

    librariesCanBeScanned.push({
        libraryIndex: element.libraryIndex,
        books: element.books
    });
}

// console.log(librariesCanBeScanned);

let output = "";

//An array to store all the sent books
let sentBooks = [];

//Output in format
//First line is how many libraries to scan, can be determined by librariesCanBeScanned.length
console.log(librariesCanBeScanned.length);
output = output + librariesCanBeScanned.length + "\n";
//Next is library to be scanned
for (let i = 0; i < librariesCanBeScanned.length; i++) {
    let element = librariesCanBeScanned[i];
    //Books that are meant to be scanned
    //At least by using these few lines duplicate books are not sent
    let booksToBeSent = [];
    element.books.forEach(elem => {
        if (!sentBooks.includes(elem)) {
            booksToBeSent.push(elem);
            sentBooks.push(elem);
        }
    });
    //Id of the library and number of books to be sent for scanning
    console.log(element.libraryIndex, booksToBeSent.length);
    output = output + element.libraryIndex + " " + booksToBeSent.length + "\n";
    console.log(booksToBeSent.join(" "));
    output = output + booksToBeSent.join(" ") + "\n";
}

fs.writeFileSync(`./output/${ fileToRead.split("_")[0] }_output.txt`, output);
