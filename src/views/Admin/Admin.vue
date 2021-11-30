<template>
  <div class="container">
    <h1 class="text-center mt-2">Admin page</h1>
    <p>Links:</p>
    <ul>
      <li>
        <router-link to="/admin/art" class="nav-link">Art List</router-link>
      </li>
      <li>
        <router-link to="/admin/colors" class="nav-link">
          Color List
        </router-link>
      </li>
      <li>
        <router-link to="/admin/users" class="nav-link">User List</router-link>
      </li>
    </ul>
  </div>
</template>
