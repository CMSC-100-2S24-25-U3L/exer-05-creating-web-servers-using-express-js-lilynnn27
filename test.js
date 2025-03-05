import needle from 'needle';

needle.post(
    'http://localhost:3000/add-book', 
    {
        bookName: 'Harry Potter and the Philosopher’s Stone',
        isbn: "978-0-7475-3269-9",  
        author: "J.K Rowling",
        yearPublished: 1997
    },
    
    { json: true }, 
    (err, res) => {
        if (err) {
            console.error('POST request error:', err);
            return;
        }
        console.log(res.body); 
    }
);

needle.post(
    'http://localhost:3000/add-book', 
    {
        bookName: 'Harry Potter and the Chamber of Secrets',
        isbn: "0-7475-3849-2",  
        author: "J.K Rowling",
        yearPublished: 1998
    },

    { json: true }, 
    (err, res) => {
        if (err) {
            console.error('POST request error:', err);
            return;
        }
        console.log(res.body); 
    }
);

needle.post(
    'http://localhost:3000/add-book', 

    {
        bookName: 'The Little Prince',
        isbn: "978-0156012195",  
        author: "Antoine Saint-Exupery",
        yearPublished: 1943
    },

    { json: true }, 
    (err, res) => {
        if (err) {
            console.error('POST request error:', err);
            return;
        }
        console.log(res.body); 
    }
);

needle.post(
    'http://localhost:3000/add-book', 

    {
        bookName: "",
        isbn: 9780156012195,  
        author: "Antoine Saint-Exupery",
        yearPublished: 1943
    },

    { json: true }, 
    (err, res) => {
        if (err) {
            console.error('POST request error:', err);
            return;
        }
        console.log(res.body); 
    }
);