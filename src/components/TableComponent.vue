<template>
  <table>
    <thead>
    <th v-for="(header, index) in tableHeaders" :key="index">{{ header }}</th>
    </thead>
    <tbody v-for="(info, index) in tableInfos" :key="index">
    <td v-for="property in tableProperties" :key="property">
      <div v-if="(property === 'projectIsAuthorized') && info[property] === true">
        <button class="project-auth-btn" type="button" disabled>인증</button>
      </div>
      <div v-else-if="(property === 'projectIsAuthorized') && info[property] === false">
        <button class="project-unauth-btn" type="button" @click="handleAuthorize(info.projectId)">미인증</button>
      </div>
      <div v-else>{{ info[property] }}</div>
    </td>
    </tbody>
  </table>
</template>

<script setup lang="ts">

const props = defineProps({
  tableHeaders: {
    type: Array<string>,
    required: true
  },
  tableInfos: {
    type: Array<any>,
    required: true
  },
  tableProperties: {
    type: Array<string>,
    required: true
  },
  authorizeProject: {
    type: Function,
    required: false
  }
});

const handleAuthorize = (projectId: string) => {
  if(props.authorizeProject) {
    props.authorizeProject(projectId);
  }
}
</script>

<style scoped>
@import "@/assets/css/tableview.css";
</style>