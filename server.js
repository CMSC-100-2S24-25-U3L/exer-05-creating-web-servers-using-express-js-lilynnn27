import express from 'express';
import { appendFileSync, readFileSync, existsSync } from 'node:fs';

const app = express();
const PORT = 3000;
const FILE_PATH = "books.txt";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('BOOK INFORMATION');
});

app.post('/add-book', (req, res) => {
    const { bookName, isbn, author, yearPublished } = req.body;

    if (!bookName || !isbn || !author || !yearPublished) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

    let existingBooks = '';
    if (existsSync(FILE_PATH)) {
        existingBooks = readFileSync(FILE_PATH, 'utf8');
    }

    if (existingBooks.includes(`ISBN: ${isbn}`)) {
        return res.status(400).json({ success: false, message: `A book with this ISBN ${isbn} already exists.` });
    }

    const bookEntry = `Book: ${bookName}, ISBN: ${isbn}, Author: ${author}, Year Published: ${yearPublished}\n`;
    appendFileSync(FILE_PATH, bookEntry);

    res.json({ success: true, message: `Added a Book: ${bookName}, ${isbn}, ${author}, ${yearPublished}` });
});

app.get('/add-book', (req, res) => {
    res.send('To add a book, please use a POST request with JSON data.');
}); //for testing


app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
