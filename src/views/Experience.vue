<template>
  <div class="experience">
    <v-card flat max-width="960">
      <h2>Langauges</h2>
      <v-layout>
        <v-flex shrink>
          <v-list dense>
            <v-list-item>
              <v-list-item-title>Expert</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Advanced</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Intermediate</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Novice</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Beginner</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-flex>
        <v-flex grow>
          <v-sheet >
            <v-sparkline width="100" auto-draw :value="languagesVal" :labels="languages" padding="16"></v-sparkline>
          </v-sheet>
        </v-flex>
      </v-layout>
      <h2>Frameworks</h2>
      <v-layout>
        <v-flex shrink>
          <v-list dense>
            <v-list-item>
              <v-list-item-title>Expert</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Advanced</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Intermediate</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Novice</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Beginner</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-flex>
        <v-flex grow>
          <v-sheet>
            <v-sparkline width="100" auto-draw :value="frameworksVal" :labels="frameworks" padding="16"></v-sparkline>
          </v-sheet>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>
<script>
export default {
  name: 'experience',
  data: () => ({
    languagesVal: [5, 5, 4, 5, 3],
    languages: ['HTML', 'CSS', 'JS', 'PHP', 'Nodejs'],
    frameworksVal: [4, 5, 3, 3, 4, 4, 4, 4],
    frameworks: ['Wordpress', 'Codeigniter', 'ExpressionEngine', 'CraftPHP', 'jQuery', 'Vuejs', 'Vuetify', 'Bootstrap']
  })
}
</script>