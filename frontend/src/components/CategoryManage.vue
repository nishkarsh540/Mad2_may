<template>
  <div>
    <h2>Category Management</h2>

    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search Categories"
      @input="filterCategories"
    />

    <form @submit.prevent="addCategory">
      <input
        type="text"
        v-model="newCategoryName"
        placeholder="Enter Category Name"
        required
      />
      <button type="submit">Add Category</button>
    </form>

    <table v-if="filteredCategories.length > 0">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in filteredCategories" :key="category.id">
          <td>
            <input
              type="text"
              v-model="category.name"
              :disabled="category.id !== editingCategoryId"
            />
          </td>

          <td>
            <button
              v-if="category.id !== editingCategoryId"
              @click="startEditing(category)"
            >
              Edit
            </button>
            <button v-else @click="saveCategory(category)">Save</button>
            <button @click="deleteCategory(category)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else>
      <p>no categories found</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      categories: [],
      newCategoryName: "",
      editingCategoryId: null,
      filteredCategories: [],
    };
  },
  mounted() {
    this.loadCategories();
  },
  methods: {
    async loadCategories() {
      try {
        const access_token = localStorage.getItem("access_token");
        const response = await axios.get("http://127.0.0.1:5000/api/category", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        this.categories = response.data;
        this.filteredCategories = this.categories;
      } catch (error) {
        console.error(error);
      }
    },
    filterCategories() {
      const query = this.searchQuery.toLowerCase();
      this.filteredCategories = this.categories.filter((category) =>
        category.name.toLowerCase().includes(query)
      );
    },

    startEditing(category) {
      this.editingCategoryId = category.id;
    },

    async addCategory() {
      try {
        const access_token = localStorage.getItem("access_token");
        const response = await axios.post(
          "/api/category",
          {
            name: this.newCategoryName,
          },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        console.log(response.data);
        this.newCategoryName = "";
        this.loadCategories();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteCategory(category) {
      try {
        const access_token = localStorage.getItem("access_token");
        const response = await axios.delete("/api/category", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          data: { id: category.id },
        });
        console.log(response.data);
        this.loadCategories();
      } catch (error) {
        console.log(error);
      }
    },
    async saveCategory(category) {
      try {
        const access_token = localStorage.getItem("access_token");
        const response = await axios.put(
          "/api/category",
          { id: category.id, name: category.name },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        console.log(response.data);
        this.loadCategories();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
