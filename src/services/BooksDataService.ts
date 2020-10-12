import http from '../utils/api-base';

class BooksDataService {
  getAll() {
    return http.get("/books");
  }

  get(id: string) {
    return http.get(`/books/${id}`);
  }

  create(data: any) {
    return http.post("/books", data);
  }

  update(id: string, data: any) {
    return http.put(`/books/${id}`, data);
  }

  delete(id: string) {
    return http.delete(`/books/${id}`);
  }

  findBook(data: any) {
    return http.get(`/books/search?data=${data}`);
  }
}

export default new BooksDataService();