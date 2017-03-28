using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Books.Models
{
    public class Author
    {
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }

        public List<Book> Books { get; set; }

        public Author()
        {
            Id = Guid.NewGuid();
            Books = new List<Book>();
        }

    }
}
