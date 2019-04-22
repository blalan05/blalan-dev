<template>
  <v-app dark>
    <v-navigation-drawer app light width="320">
      <v-card>
        <v-toolbar flat>
          <router-link :to="'/'" style="text-decoration: none; color: black;">
            <v-toolbar-title>blalan.DEV</v-toolbar-title>
          </router-link>
        </v-toolbar>
        <v-card-text class="text-xs-center">
          <v-avatar size="160" class="mb-3">
            <v-img :src="require('./assets/profile-avaatar.jpg')" alt="Blaine Landowski Profile Avaatar"></v-img>
          </v-avatar>
          <div class="title">Blaine Landowski</div>
          <div class="subheading">
            Full Stack Developer
          </div>
        </v-card-text>
      </v-card>
      <v-list>
        <v-list-item v-for="nav in navigation" :key="nav.name" :to="nav.link">
          <v-list-item-avatar><v-icon :color="nav.color">{{ nav.icon }}</v-icon></v-list-item-avatar>
          <v-list-item-title class="text-uppercase text-xs-center">{{ nav.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    navigation: [
      {
        name: 'About',
        color: 'green lighten-2',
        link: '/about',
        icon: 'fas fa-user'
      }, {
        name: 'Experience',
        color: 'blue',
        link: '/experience',
        icon: 'fas fa-briefcase'
      }, {
        name: 'Skills',
        color: 'purple',
        link: '/skills',
        icon: 'fas fa-chart-bar'
      }, {
        name: 'Projects',
        color: 'red lighten-2',
        link: '/projects',
        icon: 'fas fa-sitemap'
      }, {
        name: 'Contact',
        color: 'grey',
        link: '/contact',
        icon: 'fas fa-envelope'
      }
    ]
  })
}
</script>

