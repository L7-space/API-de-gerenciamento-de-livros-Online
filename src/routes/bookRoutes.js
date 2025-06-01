const express = require('express');
const router = express.Router();
const Book = require('../../models/book');


router.post('/books', async (req, res) => {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
});

router.get('/books', async (req, res) => {
    const books = await Book.find();
    res.json(books);
});


router.get('/books/:id', async (req, res) => {
    const book = await Book.findById(req.params.id);
    res.json(book);
});


router.put('/books/:id', async (req, res) => {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(book);
});


router.delete('/books/:id', async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

module.exports = router;