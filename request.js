import needle from 'needle';

needle.get('http://localhost:3000/', (err, res) => {
    if (err) {
        console.error('GET request error:', err);
        return;
    }
    console.log(res.body); // prints "BOOK INFORMATION"
});

const book1 = {
    bookName: 'Harry Potter and the Philosopher’s Stone',
    isbn: "978-0-7475-3269-9",  // Ensure ISBN is a string
    author: "J.K. Rowling",
    yearPublished: 1997
};

const book2 = {
    bookName: 'Harry Potter and the Chamber of Secrets',
    isbn: "0-7475-3849-2",  // Ensure ISBN is a string
    author: "J.K. Rowling",
    yearPublished: 1998
};

const book3 = {
    bookName: 'The Little Prince',
    isbn: "978-0156012195",  // Ensure ISBN is a string
    author: "Antoine Saint-Exupery",
    yearPublished: 1943
};

needle.post(
    'http://localhost:3000/add-book', book1,
    
    { json: true }, // Ensures JSON formatting
    (err, res) => {
        if (err) {
            console.error('POST request error:', err);
            return;
        }
        console.log(res.body); // Should print success message
    }
);

needle.post(
    'http://localhost:3000/add-book', book2,
    { json: true }, // Ensures JSON formatting
    (err, res) => {
        if (err) {
            console.error('POST request error:', err);
            return;
        }
        console.log(res.body); // Should print success message
    }
);

needle.post(
    'http://localhost:3000/add-book', book3,
    { json: true }, // Ensures JSON formatting
    (err, res) => {
        if (err) {
            console.error('POST request error:', err);
            return;
        }
        console.log(res.body); // Should print success message
    }
);
