import needle from 'needle';

needle.get('http://localhost:3000/', (err, res) => {
    if (err) {
        console.error('GET request error:', err);
        return;
    }
    console.log(res.body); // prints the response body (e.g., "Hello")
});

needle.post(
    'http://localhost:3000/submit-data',
    {},
    { json: true }, // Ensures the data is sent as JSON
    (err, res) => {
        if (err) {
            console.error('POST request error:', err);
            return;
        }
        console.log(res.body); // prints "Received a POST request."
    }
);

needle.post(
    'http://localhost:3000/submit-data',
    { name: 'Cleo Marie' },
    { json: true }, // Ensures JSON formatting
    (err, res) => {
        if (err) {
            console.error('POST request error:', err);
            return;
        }
        console.log(res.body);
    }
);
