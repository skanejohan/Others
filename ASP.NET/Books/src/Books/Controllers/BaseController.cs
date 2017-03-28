using Books.Models;
using Microsoft.AspNet.Mvc;

namespace Books.Controllers
{
    public class BaseController : Controller
    {
        public delegate IActionResult AuthorProc(Author a);
        public delegate IActionResult BookProc(Book b);

        protected virtual IActionResult DefaultView()
        {
            return Redirect("/");
        }

        protected IActionResult PerformForAuthor(string id, AuthorProc authorProc)
        {
            Author a = Data.GetAuthor(id);
            if (a != null)
            {
                return authorProc(a);
            }
            else
            {
                return DefaultView();
            }
        }

        protected IActionResult PerformForBook(string id, BookProc bookProc)
        {
            Book b = Data.GetBook(id);
            if (b != null)
            {
                return bookProc(b);
            }
            else
            {
                return DefaultView();
            }
        }

    }
}
