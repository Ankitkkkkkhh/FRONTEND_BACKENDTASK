let express = require("express");
let app = express();
app.use(express.json());


let books = [
  { id: 1, title: "Book 1", author: "Author1" },
  { id: 2, title: "Book 2", author: "Author2" },
];

// GET all books
app.get("/books", (req, res) => {
  res.json(books);
});

// POST a new book
app.post("/books", (req, res) => {
  const { title, author } = req.body;

  // Validation
  if (!title || !author) {
    return res.status(400).json({ error: "Title and author are required" });
  }

  const newBook = {
    id: books.length > 0 ? books[books.length - 1].id + 1 : 1,
    title,
    author,
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT update book by ID
app.put("/books/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let { title, author } = req.body;
  console.log(req.body);
  
  let index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    if (!title || !author) {
      return res.status(400).json({ error: "TiTle and author are required" });
    }

    books[index] = { ...books[index], title, author };
    res.json(books[index]);
  } else {
    res.status(404).json({ error: "Book not fouNd" });
  }
});

// DELETE book by ID
app.delete("/books/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    let deletedBook = books.splice(index, 1)[0];
    res.json(deletedBook);
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(3000, () => {
  console.log("Server is started on http://localhost:3000");
});
// as``