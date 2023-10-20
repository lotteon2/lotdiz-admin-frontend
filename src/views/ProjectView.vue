<template>
  <div class="content-header">
    <SearchBar @search="onSearch"/>
    <SortBar
        :sortOptions="sortOptions"
        :changeSort="changeSort"
        :requestedSort="requestedSort"/>
  </div>
  <div class="content-body">
    <TableInfo
        :tableHeaders="tableHeaders"
        :tableInfos="getProjectResponseDtos"
        :tableProperties="tableProperties"
        :authorizeProject="authProject"/>
    <PageNavBar
        :totalPages="totalPages"
        :requestedPage="requestedPage"
        :changePage="changePage"/>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {getProjects, getProjectSearchResult, authorizeProject} from '@/services/project/ProjectAPIService';
import type {GetProjectResponseDto, GetProjectPageResponseDto} from '@/services/project/ProjectDto';
import TableInfo from '@/components/TableView.vue';
import SortBar from '@/components/Sort.vue';
import SearchBar from '@/components/Search.vue';
import PageNavBar from '@/components/PageNavbar.vue';

// ref: 뷰에서 컴포넌트 또는 DOM에 접근하기 위해 사용하는 속성(마운트된 요소에만 적용 가능)
const getProjectResponseDtos = ref<GetProjectResponseDto[]>([]);
const totalPages = ref<number>(1);

const sortOptions = [
  {label: '등록일순', value: 'createdAt,desc'},
  {label: '이름순', value: 'projectName,desc'},
];

// default pagenation 값 세팅
const requestedSort = ref<string>(sortOptions[0].value);
const requestedPage = ref<number>(0);
const requestedSize = ref<number>(10);

// 컴포넌트가 마운트 된 후 API 호출
onMounted(async () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const page: number = Number(urlSearchParams.get("page")) || 0;
  const size: number = Number(urlSearchParams.get("size")) || 10;
  const sort: string = urlSearchParams.get("sort") || "createdAt,desc";

  // 프로젝트 정보 조회
  const response: GetProjectPageResponseDto<GetProjectResponseDto> = await getProjects(page, size, sort);
  getProjectResponseDtos.value = response.projects;

  totalPages.value = response.totalPages;
});

let search = ref<string>("");
const onSearch = async (searchTerm: string) => {
  const response: GetProjectPageResponseDto<GetProjectResponseDto>
      = await getProjectSearchResult(searchTerm, requestedPage.value, requestedSize.value, requestedSort.value);
  getProjectResponseDtos.value = response.projects;
  search.value = searchTerm;

  totalPages.value = response.totalPages;
}

const changePage = async (page: number) => {
  requestedPage.value = page;
  // 회원 정보 조회
  const response: GetProjectPageResponseDto<GetProjectResponseDto> =
      await getProjectSearchResult(search.value, requestedPage.value, requestedSize.value, requestedSort.value);
  getProjectResponseDtos.value = response.projects;

  const urlSearchParams = new URLSearchParams(window.location.search);
  urlSearchParams.set("page", (page).toString());

  const newUrl = `${window.location.pathname}?${urlSearchParams.toString()}`;
  history.pushState(null, '', newUrl);
}

// 정렬기준 업데이트 함수
const changeSort = async (sort: string) => {
  try {
    requestedSort.value = sort;
    // 회원 정보 조회
    const response: GetProjectPageResponseDto<GetProjectResponseDto> =
        await getProjectSearchResult(search.value, requestedPage.value, requestedSize.value, requestedSort.value);
    getProjectResponseDtos.value = response.projects;

    totalPages.value = response.totalPages;

    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.set("sort", sort);

    const newUrl = `${window.location.pathname}?${urlSearchParams.toString()}`;
    history.pushState(null, '', newUrl);
  } catch (error) {
    console.error('Error fetching projects:', error);
  }
};

const authProject = async (projectId: number) => {
  // 프로젝트 인증
  await authorizeProject(projectId);

  // 프로젝트 정보 조회
  const response: GetProjectPageResponseDto<GetProjectResponseDto> =
      await getProjectSearchResult(search.value, requestedPage.value, requestedSize.value, requestedSort.value);
  getProjectResponseDtos.value = response.projects;
}

const tableHeaders = ["프로젝트명", "카테고리", "메이커명", "남은 기간", "인증 상태", "등록일"];
const tableProperties = ["projectName", "categoryName", "makerName", "projectDueDate", "projectIsAuthorized", "createdAt"];
</script>

<style>
</style>
