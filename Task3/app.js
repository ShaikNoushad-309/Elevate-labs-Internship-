import express from 'express';

const app = express();

const port = 3000;

let books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 3, title: '1984', author: 'George Orwell' },
    { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen' },
    { id: 5, title: 'The Hobbit', author: 'J.R.R. Tolkien' },
    { id: 6, title: 'The Catcher in the Rye', author: 'J.D. Salinger' },
    { id: 7, title: 'Lord of the Flies', author: 'William Golding' },
    { id: 8, title: 'Brave New World', author: 'Aldous Huxley' },
    { id: 9, title: 'The Odyssey', author: 'Homer' },
    { id: 10, title: 'Crime and Punishment', author: 'Fyodor Dostoevsky' }
];


app.use(express.json());

//  API Endpoint to read books list
app.get('/', (req, res) => {
    console.log("Got a GET request for the homepage");
    try{
        res.json({"success":true, "books":books});
    }catch(err){
        res.json({"success":false, "books":[]});
    }

});

//  API Endpoint to create books list or add new books list
app.post('/', (req, res) => {
    console.log("Got a POST request for the homepage");
    // const book = req.body;
    console.log(books);
    console.log(req.body);


    // const {id,title,author} = req.body;
    // books = [...books, {"id":id,"title":title,"author":author}];

    books.push(req.body);
    res.json({"success":true, "books":books});
});

//  API Endpoint to update a specific book in the books list
app.put('/', (req, res) => {
    console.log("Got a PUT request for the homepage");
    const {id,title,author} = req.body;
    // const book = books.find(book => book.id === id);
    // if(book){
    //     book.title = title;
    //     book.author = author;
    // }

    try{
        books.find(book => book.id === id).title = title;
        books.find(book => book.id === id).author = author;
        res.json({"success":true, "books":books});
    }catch (err){
        res.json({"success":false, "books":[]});
    }
});

//  API Endpoint to update a specific book in the books list
app.delete('/', (req, res) => {
    console.log("Got a DELETE request for the homepage");
    // books.push(req.body);
    const {id} = req.body;
    books = books.filter((book)=>{
        return  book.id !== id;
    });
    res.json({"message":"success", "books":books});
});



app.listen(port, () => console.log(`Server is running on port ${port}`));