using Books.Models;
using Microsoft.AspNet.Mvc;

namespace Books.Controllers
{
    public class BooksController : BaseController
    {

        [HttpGet("authors/{authorId}/books")] // display the books page for an author
        public IActionResult Index(string authorId)
        {
            return PerformForAuthor(authorId, a => { return View("index", a); });
        }

        [HttpGet("authors/{authorId}/books/add")] // display the details page for a new book
        public IActionResult Add(string authorId)
        {
            return PerformForAuthor(authorId, 
                a => 
                {
                    ViewData["Title"] = "New book for " + a.Name;
                    return View("details");
                });
        }

        [HttpPost("authors/{authorId}/books/add")] // add the new new book and redirect to "books"
        public IActionResult Add(string authorId, Book b)
        {
            return PerformForAuthor(authorId,
                a =>
                {
                    Data.AddBook(a, b);
                    return RedirectToAction("index", new { authorId = authorId });
                });
        }

        [HttpGet("authors/{authorId}/books/{id}/edit")] // display the details page for an existing book
        public IActionResult Edit(string authorId, string id)
        {
            ViewData["Title"] = "Edit book";
            return PerformForBook(id, b => { return View("details", b); });
        }

        [HttpPost("authors/{authorId}/books/{id}/edit")] // edit the book and redirect to "books"
        public IActionResult Edit(string authorId, Book b)
        {
            Data.EditBook(b);
            return RedirectToAction("index", new { authorId = authorId });
        }

        [HttpGet("authors/{authorId}/books/{id}/delete")] // display the "really delete?" page
        public IActionResult Delete(string authorId, string id)
        {
            return PerformForBook(id, b => { return View("delete", b); });
        }

        [HttpPost("authors/{authorId}/books/{id}/delete")] // delete the book
        public IActionResult Delete(string authorId, Book b)
        {
            Data.DeleteBook(b);
            return RedirectToAction("index", new { authorId = authorId });
        }

    }
}
