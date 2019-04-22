<template>
  <div class="about">
    <v-container>
      <v-layout wrap>
        <v-flex xs12 mb-3>
          <h1 class="title">src/view/About</h1>
        </v-flex>
        <template v-for="(line, i) in lines">
          <v-flex xs1 class="text-xs-right pr-1" :key="'num' + i" style="background: dimgrey; color: black; max-width: 72px">
            {{ i + 1 }}
          </v-flex>
          <v-flex xs11 :key="'text' + i" class="pl-2">
            <span :style="`color: ${line.color}`">{{ `<${line.element}>` }}</span>
              <span v-if="line.text.length <= 1">{{ line.text[0] }}</span>
              <div v-else v-for="(p, t) in line.text" :key="t" class="pl-3">
                <span v-if="p.length > 0">{{ p }}</span>
                <br v-else />
              </div>
            <span :style="`color: ${line.color}`">{{ `</${line.element}>` }}</span>
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
      {
        color: 'lightblue',
        element: 'name',
        text: ['Blaine Landowski']
      }, {
        color: 'lightblue',
        element: 'currentJobTitle',
        text: ['IT Manager/Software Engineer']
      }, {
        color: 'lightblue',
        element: 'bio',
        text: [
          'During my 4 years in college I had two passions: Computers (hardware and software)',
          'and Theater (on stage and behind it). I was able to get a year’s worth of experience',
          'working for a large stage theater as a carpenter, but at the end of my temporary',
          'position, I made my move back to the world of programming and haven’t left.',
          '',
          'My first professional job, was as “Special Projects Director” for a growing Media',
          'Company. I assisted the company to find and work with clients, build and monitor',
          'client sites. Setup and manage a reseller’s hosting account. Build in-house projects,',
          'including two Learning Management systems (LMS) from scratch, using various',
          'languages and frameworks. I was also a speaker for the company’s tech conference',
          '3 years.',
          '',
          'I moved from there to work for a SMB Manufacturing company. Currently I am',
          'helping to develop custom CRM, and job/time management system, as well as',
          'support their other IT needs.'
          ]
      }
      // ,
      // '<currentJobTitle>IT Manager/Software Engineer</currectJobTitle>',
      // '<bio></bio>',
      // 'Hi, my name is Blaine Landowski. I’m a fullstack web developer. What that means,',
      // ' it that I build sites and applications that help businesses and non-profits',
      // ' succeed. I enjoy working with clients.'
    ]
  })
}
</script>