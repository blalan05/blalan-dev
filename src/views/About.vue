<template>
  <div class="about">
    <v-container>
      <v-layout wrap>
        <v-flex xs12 mb-3>
          <h1 class="title">src/view/About</h1>
        </v-flex>
        <template v-for="(line, i) in lines">
          <v-flex xs1 class="text-xs-right pr-1" :key="'num' + i" style="background: dimgrey; color: black">
            {{ i + 1 }}
          </v-flex>
          <v-flex xs11 :key="'text' + i" class="pl-2">
            {{ line }}
          </v-flex>
        </template>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  name: 'about',
  data: () => ({
    lines: [
      'Hi, my name is Blaine Landowski. I’m a fullstack web developer. What that means,',
      ' it that I build sites and applications that help businesses and non-profits',
      ' succeed. I enjoy working with clients.'
    ]
  })
}
</script>