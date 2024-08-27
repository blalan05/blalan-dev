<template>
  <v-app>
    <v-main>
      <v-navigation-drawer>
        <v-toolbar title="Blalan.DEV" />
        <v-avatar :image="avatarURL" />
      </v-navigation-drawer>
      <router-view />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script lang="ts" setup>
  import avatarURL from '@/assets/profile-avaatar.jpg'
</script>
