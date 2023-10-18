<template>
  <div class="info">
    <div class="condition">
      <div class="search">
      </div>
      <div class="sort">
        <div 
          class="sort-option" 
          v-for="sortOption in sortOptions" 
          :key="sortOption.value" 
          :class="{ 'selected': requestedSort === sortOption.value }">
          <a href="#" @click="changeSort(sortOption.value)">{{ sortOption.label }}</a>
        </div>
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
  import { getProjects } from '@/services/project/ProjectAPIService';
  import type { GetProjectResponseDto } from '@/services/project/ProjectDto';

  // ref: 뷰에서 컴포넌트 또는 DOM에 접근하기 위해 사용하는 속성(마운트된 요소에만 적용 가능)
  const getProjectResponseDtos = ref<GetProjectResponseDto[]>([]);

  const sortOptions = [
    { label: '등록일순', value: 'createdAt,desc' },
    { label: '이름순', value: 'memberName,desc' },
  ];

  // default pagenation 값 세팅
  const requestedSort = ref<string>(sortOptions[0].value);
  const requestedPage = ref<number>(0);
  const requestedSize = ref<number>(20);

  // 컴포넌트가 마운트 된 후 API 호출
  onMounted(async () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const page: number = Number(urlSearchParams.get("page")) || 0;
    const size: number = Number(urlSearchParams.get("size")) || 20;
    const sort: string = urlSearchParams.get("sort") || "createdAt,desc";

    // 프로젝트 정보 조회
    const response: Array<GetProjectResponseDto> = await getProjects(page, size, sort);
    getProjectResponseDtos.value = response;
  });

  // 정렬기준 업데이트 함수
  const changeSort = async (sort: string) => {
    try {
      requestedSort.value = sort;
      // 회원 정보 조회
      const response: Array<GetProjectResponseDto> = await getProjects(
        requestedPage.value, requestedSize.value, sort);
      getProjectResponseDtos.value = response;

      const urlSearchParams = new URLSearchParams(window.location.search);
      urlSearchParams.set("sort", sort);

      const newUrl = `${window.location.pathname}?${urlSearchParams.toString()}`;
      history.pushState(null, '', newUrl);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };
</script>
  
<style>
@import "../assets/css/info.css";
@import "../assets/css/conditionbar.css";
@import "../assets/css/tableview.css";
</style>
