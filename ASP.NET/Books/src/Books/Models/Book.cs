using System;

namespace Books.Models
{
    public class Book
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public DateTime PublishedIn { get; set; }

        //public bool Owns { get; set; }

        //public bool Read { get; set; }

        public Book()
        {
            Id = Guid.NewGuid();
        }
    }
}
