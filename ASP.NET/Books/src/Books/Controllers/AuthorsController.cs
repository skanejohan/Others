using Books.Models;
using Microsoft.AspNet.Mvc;

namespace Books.Controllers
{
    public class AuthorsController : BaseController
    {

        [HttpGet("authors")] // display the list of all authors
        public IActionResult Index()
        {
            return View("index", Data.GetAuthors());
        }

        [HttpGet("authors/add")] // display the details page for a new author
        public IActionResult Add()
        {
            ViewData["Title"] = "New author";
            return View("details");
        }

        [HttpPost("authors/add")] // add the new new author and redirect to "authors"
        public IActionResult Add(Author a)
        {
            Data.AddAuthor(a);
            return DefaultView();
        }

        [HttpGet("authors/{id}/edit")] // display the details page for an existing author
        public IActionResult Edit(string id)
        {
            ViewData["Title"] = "Edit author";
            return PerformForAuthor(id, a => { return View("details", a); });
        }

        [HttpPost("authors/{id}/edit")] // edit the author and redirect to "authors"
        public IActionResult Edit(Author a)
        {
            Data.EditAuthor(a);
            return DefaultView();
        }

        [HttpGet("authors/{id}/delete")] // display the "really delete?" page
        public IActionResult Delete(string id)
        {
            return PerformForAuthor(id, a => { return View("delete", a); });
        }

        [HttpPost("authors/{id}/delete")] // delete the author
        public IActionResult Delete(Author a)
        {
            Data.DeleteAuthor(a);
            return Redirect("/authors");
        }

    }
}
