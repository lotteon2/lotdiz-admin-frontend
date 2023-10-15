<template>
  <div class="info">
    <div class="condition">
      <div class="search">
      </div>
      <div class="sort">
        <div class="sort-createdAt"><a href="">등록일순</a></div>
        <div class="sort-name"><a href="">이름순</a></div>
      </div>
    </div>
    <table>
      <thead>
        <th></th>
        <th>프로젝트명</th>
        <th>카테고리</th>
        <th>메이커명</th>
        <th>남은 기간</th>
        <th>인증 상태</th>
        <th>등록일</th>
      </thead>
      <tbody v-for="project in getProjectResponseDtos" :key="project.projectId">
        <td></td>
        <td>{{ project.projectName }}</td>
        <td>{{ project.categoryName }}</td>
        <td>{{ project.makerName }}</td>
        <td>{{ project.projectDueDate }}</td>
        <td>{{ project.projectIsAuthorized }}</td>
        <td>{{ project.createdAt }}</td>
      </tbody>
    </table>
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
@import "../assets/css/info.css";
@import "../assets/css/conditionbar.css";
@import "../assets/css/tableview.css";
</style>
