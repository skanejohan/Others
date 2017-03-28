using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using System.IO;
using Microsoft.Framework.Runtime;

namespace Books.Models
{
    public class Data
    {
        enum DataMode { Memory, Database }
        private static DataMode dataMode = DataMode.Memory;
        private static List<Author> Authors = new List<Author>();

        public static List<Author> GetAuthors()
        {
            switch (dataMode)
            {
                case DataMode.Memory:
                    return Authors;
                default:
                    throw new NotImplementedException();
            }
        }

        public static Author GetAuthor(string Id)
        {
            switch (dataMode)
            {
                case DataMode.Memory:
                    return Authors.Find(a => a.Id == new Guid(Id));
                default:
                    throw new NotImplementedException();
            }
        }

        public static void AddAuthor(Author a)
        {
            switch (dataMode)
            {
                case DataMode.Memory:
                    Authors.Add(a);
                    break;
                default:
                    throw new NotImplementedException();
            }
        }

        public static void EditAuthor(Author a)
        {
            switch (dataMode)
            {
                case DataMode.Memory:
                    Author author = Authors.Find(auth => auth.Id == a.Id);
                    if (author != null)
                    {
                        author.Name = a.Name;
                    }
                    break;
                default:
                    throw new NotImplementedException();
            }
        }

        public static void DeleteAuthor(Author a)
        {
            switch (dataMode)
            {
                case DataMode.Memory:
                    Authors.RemoveAll(author => author.Id == a.Id);
                    break;
                default:
                    throw new NotImplementedException();
            }
        }

        public static Book GetBook(string Id)
        {
            switch (dataMode)
            {
                case DataMode.Memory:
                    foreach (Author a in Authors)
                    {
                        Book book = a.Books.Find(b => b.Id == new Guid(Id));
                        if (book != null)
                        {
                            return book;
                        }
                    }
                    return null;
                default:
                    throw new NotImplementedException();
            }
        }

        public static void AddBook(Author a, Book b)
        {
            switch (dataMode)
            {
                case DataMode.Memory:
                    a.Books.Add(b);
                    break;
                default:
                    throw new NotImplementedException();
            }
        }

        public static void EditBook(Book b)
        {
            switch (dataMode)
            {
                case DataMode.Memory:
                    Book book = GetBook(b.Id.ToString());
                    if (book != null)
                    {
                        book.Title = b.Title;
                        book.PublishedIn = b.PublishedIn;
                    }
                    break;
                default:
                    throw new NotImplementedException();
            }
        }

        public static void DeleteBook(Book b)
        {
            switch (dataMode)
            {
                case DataMode.Memory:
                    foreach (Author a in Authors)
                    {
                        a.Books.RemoveAll(book => book.Id == b.Id);
                    }
                    break;
                default:
                    throw new NotImplementedException();
            }
        }

        public static string DataDirectory = "";

        public static void LoadData()
        {
            string json = File.ReadAllText(DataDirectory + @"\data.json");
            Authors = JsonConvert.DeserializeObject<List<Author>>(json);
        }
    }
}
