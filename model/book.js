const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "books.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Book {
  constructor(id, title, author) {
    (this.id = id), (this.title = title), (this.author = author);
  }
  save() {
    getProductsFromFile((books) => {
      const booksCollection = [...books];
      let theBookInd;
      if (booksCollection.length > 0) {
        booksCollection.forEach((book) => {
          if (book.id === this.id) {
            theBookInd = booksCollection.indexOf(book);
          }
        });
      }
      if (theBookInd !== undefined) {
        booksCollection[theBookInd] = this;
      } else {
        this.id = Math.random().toString();
        booksCollection.push(this);
      }
      fs.writeFile(p, JSON.stringify(booksCollection), (err) => {
        console.log(err);
      });
    });
  }
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static deleteById(id) {
    getProductsFromFile((books) => {
      const updatedbooks = books.filter((prod) => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedbooks), (err) => {
        // if (!err) {
        //   Cart.deleteProduct(id, book.price);
        // }
      });
    });
  }
};
