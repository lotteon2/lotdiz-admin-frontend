<template>
  <div class="info">
    <div class="condition">
      <SortBar 
        :sortOptions="sortOptions" 
        :changeSort="changeSort" 
        :requestedSort="requestedSort"/>
    </div>
    <TableInfo 
      :tableHeaders="tableHeaders"
      :tableInfos="getProjectResponseDtos"
      :tableProperties="tableProperties"/>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { getProjects } from '@/services/project/ProjectAPIService';
  import type { GetProjectResponseDto } from '@/services/project/ProjectDto';
  import TableInfo from '@/components/TableInfo.vue';
  import SortBar from '@/components/SortBar.vue';

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

  const tableHeaders = ["프로젝트명", "카테고리", "메이커명", "남은 기간", "인증 상태", "등록일"];
  const tableProperties = ["projectName", "categoryName", "makerName", "projectDueDate", "projectIsAuthorized", "createdAt"];
</script>
  
<style>
@import "../assets/css/info.css";
@import "../assets/css/conditionbar.css";
@import "../assets/css/tableview.css";
</style>
