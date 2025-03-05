import express from 'express';
import { appendFileSync, readFileSync, existsSync } from 'node:fs';

const app = express();
const PORT = 3000;
const FILE_PATH = "books.txt";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/add-book', (req, res) => {
    const { bookName, isbn, author, yearPublished } = req.body;
    let result = {success: "false"}; //default for easier returning values

    if (!bookName || !isbn || !author || !yearPublished) {
        console.log("Unsuccessfully Added Book: Invalid strings or inputs. \n"); //for checking
        return res.json(result);
        }

    let existingBooks = '';
    if (existsSync(FILE_PATH)) {
        existingBooks = readFileSync(FILE_PATH, 'utf8');
    }

    if (existingBooks.includes(`${isbn}`)) {
        console.log(`Unsuccessfully Added Book: A book with ISBN ${isbn} already exixts. \n`); //for checking
        return res.json(result);
    }

    try {
        const bookEntry = `${bookName},${isbn},${author},${yearPublished}\n`;
        appendFileSync(FILE_PATH, bookEntry);   
    } catch (err) {
        console.log(result);
        console.log("Unsuccessfully Added Book: Something went wrong \n");
        return;
    }

    //set as true once all conditions are checked
    result.success = true;
    console.log(`Successfully Added Book: ${bookName}, ${isbn}, ${author}, ${yearPublished} \n`); //for checking
    return res.json(result);
});

app.get('/find-by-isbn-author', (req, res) => {

    console.log("Received query", req.query); //for checking

    let bookFound = [];
    const existingBooks = readFileSync(FILE_PATH, 'utf8');
    let books = existingBooks.split('\n');

    //loop through the books then find the matches
    for(let i = 0; i < books.length; i++){
        let bookDetails = books[i].split(','); 
        if (bookDetails.length < 4){
            continue
        }

        let book = {
            bookName: bookDetails[0],
            isbn: bookDetails[1],
            author: bookDetails[2],
            yearPublished: bookDetails[3]
        };

        if(book.isbn === req.query.isbn && book.author === req.query.author){
            bookFound.push(book);
        }
    }

    return res.json(bookFound);
});

app.get('/find-by-author', (req, res) => {

    console.log("Received query", req.query); //for checking

    let bookFound = [];
    const existingBooks = readFileSync(FILE_PATH, 'utf8');
    let books = existingBooks.split('\n');

    //loop through the books then find the matches
    for(let i = 0; i < books.length; i++){
        let bookDetails = books[i].split(','); 
        if (bookDetails.length < 4){
            continue
        }

        let book = {
            bookName: bookDetails[0],
            isbn: bookDetails[1],
            author: bookDetails[2],
            yearPublished: bookDetails[3]
        };

        if(book.author === req.query.author){
            bookFound.push(book);
        }
    }

    return res.json(bookFound);
});


app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
