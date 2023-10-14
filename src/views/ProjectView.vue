<template>
  <div class="member">
    <h1>프로젝트 페이지</h1>
    <h2>프로젝트 정보 조회</h2>
    <li v-for="project in getProjectResponseDtos" :key="project.projectId">
      {{ project }}
    </li>
    <h2>프로젝트 인증</h2>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { getProjects, authorizeProject } from '@/services/project/ProjectAPIService';
  import type { GetProjectResponseDto } from '@/services/project/ProjectDto';

  // ref: 뷰에서 컴포넌트 또는 DOM에 접근하기 위해 사용하는 속성(마운트된 요소에만 적용 가능)
  const getProjectResponseDtos = ref<GetProjectResponseDto[]>([]);

  // 회원 정보 조회
  // 컴포넌트가 마운트 된 후 API 호출
  onMounted(async () => {
    try {
      const response: Array<GetProjectResponseDto> = await getProjects(0, 20, "createdAt,desc");
      getProjectResponseDtos.value = response;
    } catch (error) {
      console.error('Error fetching project:', error);
    }
  });
</script>
  
<style>
</style>
