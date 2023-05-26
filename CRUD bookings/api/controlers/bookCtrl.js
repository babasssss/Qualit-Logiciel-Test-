
export default (bookRepo) => {
  const listBooks = (_, res) => {
    res.send({
      data: bookRepo.listBooks()
    });
  };

  const createBook = (req, res) => {
    const book = bookRepo.createBook(req.body);
    res.status(201).send({
      data: book
    });
  }

  const updateBook = (req, res) => {
    const id = req.params.id;
    const book = bookRepo.updateBook(id, req.body);

    if (book) {
      return res.send({
        data: book
      });
    }

    res.status(404).send({
      error: `Book ${id} not found`
    });
  }

  const getBook = (req, res) => {
    const id = req.params.id;
    const book = bookRepo.findBook(id);

    if (book) {
      return res.send({
        data: book
      });
    }

    res.status(404).send({
      error: `Book ${id} not found`
    });
  }

  const deleteBook = (req, res) => {
    const id = req.params.id;
    const deletedBook = bookRepo.deleteBook(id);

    if (deletedBook) {
      res.status(200).send({
        message: 'Le livre a été supprimé avec succès',
        data: deletedBook
      })
    } else {
      res.status(404).send({
        message: 'Le livre n\'a pas été trouvé'
      })
    }
  }

  return {
    listBooks,
    createBook,
    getBook,
    updateBook,
    deleteBook
  };
}
