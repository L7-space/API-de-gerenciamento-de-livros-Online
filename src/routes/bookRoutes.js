const express = require('express');
const router = express.Router();
const Book = require('../../models/book');

// Criar um novo livro
router.post('/books', async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json(book);
    } catch (err) {
     res.status(400).json({ error: err.message });
    }
});

// Listar todos os livros
router.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 // Buscar livro por ID
router.get('/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ error: 'Livro não encontrado' });
        res.json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Atualizar livro por ID
router.put('/books/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) return res.status(404).json({ error: 'Livro não encontrado' });
        res.json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Remover livro por ID
router.delete('/books/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({ error: 'Livro não encontrado' });
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});module.exports = router;