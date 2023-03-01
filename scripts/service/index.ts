import axios from 'axios';

export interface Book {
  key: string;
  type: string;
  title: string;
  first_sentence: string[];
  coverUrl: string;
  isbn: string[];
  lccn: string[];
  cover_i: number;
}

interface SearchBooksResponse {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  docs: Book[];
  num_found: number;
  q: string;
}

export const service = axios.create({
  baseURL: 'https://openlibrary.org'
})

export class OpenLibraryService {
  static async getNextUpBooks(title = 'the', page = 1, limit = 10): Promise<SearchBooksResponse> {
    try {

      const query = `title=${title}&limit=${limit}&page=${page}`;
      const response = await service.get<SearchBooksResponse>(`/search.json?${query}`);
      response.data.docs = response.data.docs.map((book) => {
        return {
          coverUrl: this.getCoverUrlOfBook(String(book.cover_i)),
          ...book
        }
      })
      return response.data;
    }
    catch(e) {
      console.error('error: ', e);
    }
  }

  static getCoverUrlOfBook(value: string, size = 'M'): string {
    return `https://covers.openlibrary.org/b/id/${value}-${size}.jpg`;
  }
}