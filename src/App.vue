<template>
  <v-app dark>
    <v-navigation-drawer app light width="360">
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
            Fullstack Developer
          </div>
        </v-card-text>
      </v-card>
      <v-list>
        <v-list-tile v-for="nav in navigation" :key="nav.name" :to="nav.link">
          <v-list-tile-content>
            <v-list-tile-avatar><v-icon :color="nav.color">{{ nav.icon }}</v-icon></v-list-tile-avatar>
          </v-list-tile-content>
          <v-list-tile-title class="text-uppercase text-xs-center">{{ nav.name }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  data: () => ({
    navigation: [
      {
        name: 'About',
        color: 'green lighten-2',
        link: '/about',
        icon: 'fa fa-user'
      }, {
        name: 'Experience',
        color: 'blue',
        link: '/experience',
        icon: 'fa fa-briefcase'
      }, {
        name: 'Projects',
        color: 'red lighten-2',
        link: '/projects',
        icon: 'fas fa-browser',
      }
    ]
  })
}
</script>
