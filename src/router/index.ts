import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";



const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "books",
    alias: "/books",
    component: () => import('../components/book/BooksList.vue')
  },
  {
    path: "/books/:_id",
    name: "book-details",
    component: () => import("../components/book/Book.vue")
  },
  {
    path: "/addBook",
    name: "add",
    component: () => import("../components/book/AddBook.vue")
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
