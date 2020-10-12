<template>
  <div>
    <div class="col-md-12 form-wrapper" v-if="!submitted">
      <h2>Add Book</h2>
      <form id="add-book-form" @submit.prevent="addBook">
        <div class="form-group col-md-12">
          <label for="title">Title</label>
          <input
            type="text"
            id="title"
            v-model="book.title"
            name="title"
            class="form-control"
            placeholder="Enter title"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="author">Author</label>
          <input
            type="text"
            id="author"
            v-model="book.author"
            name="author"
            class="form-control"
            placeholder="Enter author"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="country">Country</label>
          <input
            type="text"
            id="country"
            v-model="book.country"
            name="country"
            class="form-control"
            placeholder="Enter country"
          />
        </div>
        <!-- <div class="form-group col-md-12">
          <label for="imageLink">Image Link</label>
          <input
            type="text"
            id="image_link"
            v-model="book.imageLink"
            name="imageLink"
            class="form-control"
            placeholder="Enter Image Link"
          />
        </div> -->
        <div class="form-group col-md-12">
          <label for="language">Language</label>
          <input
            type="text"
            id="language"
            v-model="book.language"
            name="language"
            class="form-control"
            placeholder="Enter Language"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="link">Book Link</label>
          <input
            type="text"
            id="link"
            v-model="book.link"
            name="link"
            class="form-control"
            placeholder="Enter Book Link"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="pages">Pages</label>
          <input
            type="text"
            id="pages"
            v-model="book.pages"
            name="pages"
            class="form-control"
            placeholder="Enter Book Pages"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="year">Year</label>
          <input
            type="text"
            id="year"
            v-model="book.year"
            name="year"
            class="form-control"
            placeholder="Enter Book Year"
          />
        </div>
        <div class="form-group col-md-4 pull-right btn-group">
          <button class="btn btn-success" @click="saveBook" type="submit">Submit</button>
          <button class="btn btn-warning" @click="cancel" type="submit">Cancel</button>
        </div>
      </form>
    </div>
    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newBook">Add</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import BooksDataService from "../../services/BooksDataService";
import { IBook } from "../../types/index";

export default class AddBook extends Vue {
  private book: IBook = {
    id: null,
    author: "",
    country: "",
    imageLink: "",
    language: "",
    link: "",
    pages: 0,
    title: "",
    year: 0
  };

  private submitted = false;

  saveBook() {
    const data = {
      author: this.book.author,
      country: this.book.country,
      imageLink: this.book.imageLink || '',
      language: this.book.language,
      link: this.book.link,
      pages: this.book.year,
      title: this.book.title,
      year: this.book.year
    };

    BooksDataService.create(data)
      .then(response => {
        this.book.id = response.data.id;
        console.log(response.data);
        this.submitted = true;
      })
      .catch(e => {
        console.log(e);
      });

      setTimeout(() => this.$router.push({ name: 'books' }), 2000);
  }

  newBook() {
    this.submitted = false;
    this.book = {} as IBook;
  }

  cancel() {
    this.$router.push({ name: "books" });
  }
}
</script>

<style scoped>
.submit-form {
  max-width: 300px;
  margin: auto;
}
form label {
  float: left;
}

.btn-group button {
  margin: 10px;
} 
</style>