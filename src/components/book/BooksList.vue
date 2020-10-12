<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search book"
          v-model="search"
          @keyup.enter="searchBook"
        />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="submit" @click="searchBook">Search</button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Books List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(book, index) in books"
          :key="index"
          @click="setActiveBook(book, index)"
        >{{ book.title }}</li>
      </ul>
    </div>
    
    <div class="col-md-6">
      <h4>Book Details</h4>
      <div v-if="currentBook">
        <h4>{{currentBook.title}}</h4>
        <div>
          <label>
            <strong>Author:</strong>
          </label>
          {{ currentBook.author }}
        </div>
        <div>
          <label>
            <strong>Country:</strong>
          </label>
          {{ currentBook.country }}
        </div>
        <div>
          <label>
            <strong>Language:</strong>
          </label>
          {{ currentBook.language }}
        </div>
        <div>
          <label>
            <strong>Book Link:</strong>
          </label>
          <!-- <a v-bind:href=${{currentBook.link}} target="_blank">{{currentBook.link}}</a> -->
          <a :href="currentBook.link" target="_blank">{{ currentBook.link }}</a>
        </div>
        <div>
          <label>
            <strong>Pages:</strong>
          </label>
          {{ currentBook.pages }}
        </div>
        <div>
          <label>
            <strong>Year Published:</strong>
          </label>
          {{ currentBook.year }}
        </div>

        <a class="badge badge-warning" :href="'/books/' + currentBook._id">Edit</a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Book...</p>
      </div>
      
    </div>
    <div class="base-pagination col-md-4">
    <pagination
   :total-pages="5"
   :total="32"
   :per-page="5"
   :current-page="currentPage"
   @pagechanged="onPageChange"
  />
    </div>
  </div>
  
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import BooksDataService from "../../services/BooksDataService";
import Pagination  from "./Pagination.vue";
import { IBook } from "../../types";

export default class BooksList extends Vue {
  private books: IBook[] = [];
  private pagedBooks: IBook[] = [];
  private currentBook: any = null;
  private currentIndex = -1;
  private search = "";
  private visibleItemsPerPageCount = 5;
  private pageCount = 0;
  private currentPage = 0;
  private isPreviousButtonDisabled = false;
  private isNextButtonDisabled = false;

  fetchBooks() {
    BooksDataService.getAll()
      .then(response => {
        this.books = response.data;
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.fetchBooks();
    this.currentBook = null;
    this.currentIndex = -1;
  }

  setActiveBook(book: IBook, index: number) {
    this.currentBook = book;
    this.currentIndex = index;
  }

  searchBook() {
    BooksDataService.findBook(this.search)
      .then(response => {
        if (response.data.length > 0) {
          this.books = response.data;
        }
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  async pageChangeHandle(value: any) {
    switch (value) {
      case "next":
        this.currentPage += 1;
        break;
      case "previous":
        this.currentPage -= 1;
        break;
      default:
        this.currentPage = value;
    }
    if (this.currentPage === 1) {
      this.isPreviousButtonDisabled = true;
    }
    if (this.currentPage === this.pageCount) {
      this.isNextButtonDisabled = true;
    }
    
    this.pagedBooks = this.books.slice(this.currentPage);
  }

  mounted() {
    this.fetchBooks();
    this.pageCount = Math.ceil(
      this.books.length / this.visibleItemsPerPageCount
    );
    this.pagedBooks = this.books.slice(0, this.pageCount);
    console.log(this.pagedBooks);
  }
}
</script>

<style scoped>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}

li {
  cursor: pointer;
}

.list-group-item:hover {
  background: lightblue;
}

.base-pagination {
  margin: 0 auto;
  width: 50%
}
</style>