<template>
  <v-app>
    <v-main>
      <v-navigation-drawer class="text-center" width="320">
        <v-card>
          <v-toolbar>
            <template #title>
              <RouterLink style="text-decoration: none; color: black;" to="/">Blalan.dev</RouterLink>
            </template>
          </v-toolbar>

          <v-card-text>
            <v-avatar image="@/assets/profile-avatar.jpg" size="160" />
            <div class="text-h4">Blaine Landowski</div>
            <div class="text-h5">Web Developer</div>
          </v-card-text>
        </v-card>
        <v-list>
          <v-list-item to="/about">About</v-list-item>
          <v-list-item to="/experience">Experience</v-list-item>
          <v-list-item to="/skills">Skills</v-list-item>
          <v-list-item to="/projects">Projects</v-list-item>
          <v-list-item to="/contact">Contact</v-list-item>
        </v-list>
      </v-navigation-drawer>
      <div class="mt-16">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
</script>
