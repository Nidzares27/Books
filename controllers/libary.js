const Book = require("../model/book");

exports.getIndex = (req, res, next) => {
  Book.fetchAll((books) => {
    res.render("index", {
      books: books,
    });
  });
};

exports.getAddBook = (req, res, next) => {
  res.render("add-book");
};

exports.postAddBook = (req, res, next) => {
  const title = req.body.title;
  const author = req.body.author;

  const newBook = new Book(null, title, author);
  newBook.save();
  res.redirect("/");
};

exports.getEditBook = (req, res, next) => {
  const bkId = req.body.bookId;
  Book.fetchAll((books) => {
    const theBook = books.find((book) => {
      return book.id === bkId;
    });
    res.render("edit-book", {
      theBk: theBook,
      bookId: bkId,
    });
  });
};

exports.postEditBook = (req, res, next) => {
  const bkId = req.body.bookId;
  const title = req.body.title;
  const author = req.body.author;
  const newBook = new Book(bkId, title, author);
  newBook.save();
  res.redirect("/");
};

exports.postDeleteBook = (req, res, next) => {
  const bkId = req.body.bookId;
  Book.deleteById(bkId);
  res.redirect("/");
};
