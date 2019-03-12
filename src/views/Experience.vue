<template>
  <div class="experience">
    <h2>Langauges</h2>
    <v-layout>
      <v-flex shrink>
        <v-list dense>
          <v-list-tile>
            <v-list-tile-title>Expert</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title>Advanced</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title>Intermediate</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title>Novice</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title>Beginner</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-flex>
      <v-flex grow>
        <v-container fluid pa-0>
          <v-sparkline fill auto-draw :value="languagesVal" :labels="languages" :gradient="['red', 'orange', 'yellow']"></v-sparkline>
        </v-container>
      </v-flex>
    </v-layout>
    <h2>Frameworks</h2>
    <v-layout>
      <v-flex shrink>
        <v-list dense>
          <v-list-tile>
            <v-list-tile-title>Expert</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title>Advanced</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title>Intermediate</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title>Novice</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title>Beginner</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-flex>
      <v-flex grow>
        <v-container fluid pa-0>
          <v-sparkline fill auto-draw :value="frameworksVal" :labels="frameworks" :gradient="['red', 'orange', 'yellow']"></v-sparkline>
        </v-container>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {
  name: 'experience',
  data: () => ({
    languagesVal: [5, 5, 4, 5, 3],
    languages: ['HTML', 'CSS', 'JS', 'PHP', 'Nodejs'],
    frameworksVal: [4, 5, 3, 3, 4, 4, 4, 4,],
    frameworks: ['Wordpress', 'Codeigniter', 'ExpressionEngine', 'CraftPHP', 'jQuery', 'Vuejs', 'Vuetify', 'Bootstrap']
  })
}
</script>