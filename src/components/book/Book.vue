<template>
  <div v-if="currentBook" class="edit-form">
    <h4>Book</h4>
    <form>
      <div class="form-group col-md-12">
        <label for="title">Title</label>
        <input type="text" id="title" v-model="currentBook.title" name="title" class="form-control" />
      </div>
      <div class="form-group col-md-12">
        <label for="author">Author</label>
        <input
          type="text"
          id="author"
          v-model="currentBook.author"
          name="author"
          class="form-control"
        />
      </div>
      <div class="form-group col-md-12">
        <label for="country">Country</label>
        <input
          type="text"
          id="country"
          v-model="currentBook.country"
          name="country"
          class="form-control"
        />
      </div>
      <!-- <div class="form-group col-md-12">
        <label for="imageLink">Image Link</label>
        <input
          type="text"
          id="image_link"
          v-model="currentBook.imageLink"
          name="imageLink"
          class="form-control"
        />
      </div> -->
      <div class="form-group col-md-12">
        <label for="language">Language</label>
        <input
          type="text"
          id="language"
          v-model="currentBook.language"
          name="language"
          class="form-control"
        />
      </div>
      <div class="form-group col-md-12">
        <label for="link">Book Link</label>
        <input
          type="text"
          id="link"
          v-model="currentBook.link"
          name="link"
          class="form-control"
        />
      </div>
      <div class="form-group col-md-12">
        <label for="pages">Pages</label>
        <input
          type="text"
          id="pages"
          v-model="currentBook.pages"
          name="pages"
          class="form-control"
        />
      </div>
      <div class="form-group col-md-12">
        <label for="year">Year</label>
        <input
          type="text"
          id="year"
          v-model="currentBook.year"
          name="year"
          class="form-control"
        />
      </div>
    </form>
    <button class="btn btn-danger mr-2" @click="deleteBook">Delete</button>

    <button type="submit" class="btn btn-success mr-2" @click="updateBook">Update</button>

     <button type="submit" class="btn btn-warning" @click="cancel">Cancel</button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Book...</p>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import BooksDataService from "../../services/BooksDataService";
import { IBook } from '../../types';

export default class Book extends Vue {
  private currentBook: any = {} as any;
  private message = "";

  getBook(id: any) {
    BooksDataService.get(id)
      .then(response => {
        this.currentBook = response.data;
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateBook() {
    BooksDataService.update(this.currentBook._id, this.currentBook)
      .then(response => {
        console.log(response.data);
        this.message = "The book was updated successfully!";
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteBook() {
    BooksDataService.delete(this.currentBook._id)
      .then(response => {
        console.log(response.data);
        this.$router.push({ name: "books" });
      })
      .catch(e => {
        console.log(e);
      });
  }

  cancel() {
    this.$router.push({ name: "books" });
  }

  mounted() {
    this.message = "";
    this.getBook(this.$route.params._id);
  }
}
</script>

<style scoped>
.edit-form {
  max-width: 750px;
  margin: auto;
}
form label {
  float: left;
}
</style>