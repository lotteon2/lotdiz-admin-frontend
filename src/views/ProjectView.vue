<template>
  <div class="content-header">
    <SearchBar @search-request="onSearch"/>
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
import {ref, onMounted, onBeforeMount} from 'vue';
import {getProjects, getProjectSearchResult, authorizeProject} from '@/services/project/ProjectAPIService';
import type {GetProjectResponseDto, GetProjectPageResponseDto} from '@/services/project/ProjectDto';
import TableInfo from '@/components/TableView.vue';
import SortBar from '@/components/Sort.vue';
import SearchBar from '@/components/Search.vue';
import PageNavBar from '@/components/PageNavbar.vue';

let search = ref<string>("");

const sortOptions = [
  {label: '등록일순', value: 'createdAt,desc'},
  {label: '이름순', value: 'projectName,desc'},
];

const requestedSort = ref<string>(sortOptions[0].value);
const requestedPage = ref<number>(0);
const requestedSize = ref<number>(10);

const getProjectResponseDtos
    = ref<Array<GetProjectResponseDto>>(new Array<GetProjectResponseDto>());
const totalPages = ref<number>(1);

onBeforeMount(async () => {
  await fetchData();
});

const fetchData = async (
    page: number = requestedPage.value,
    size: number = requestedSize.value,
    sort: string = requestedSort.value) => {
  const response: GetProjectPageResponseDto<GetProjectResponseDto> =
      await getProjects(page, size, sort);
  getProjectResponseDtos.value = response.projects;

  updateTotalPages(response);
};

const fetchSearchData = async (
    searchTerm: string = "",
    page: number = requestedPage.value,
    size: number = requestedSize.value,
    sort: string = requestedSort.value) => {
  const response: GetProjectPageResponseDto<GetProjectResponseDto> =
      await getProjectSearchResult(searchTerm, page, size, sort);
  getProjectResponseDtos.value = response.projects;

  updateTotalPages(response);
};

const onSearch = async (searchTerm: string) => {
  if (searchTerm !== "") {
    await fetchSearchData(searchTerm);
  } else {
    await fetchData();
  }
  search.value = searchTerm;
};

const changeSort = async (sort: string) => {
  if (search.value !== "") {
    await fetchSearchData(search.value, requestedPage.value, requestedSize.value, sort);
  } else {
    await fetchData(requestedPage.value, requestedSize.value, sort);
  }
  requestedSort.value = sort;
};

const changePage = async (page: number) => {
  if (search.value !== "") {
    await fetchSearchData(search.value, page);
  } else {
    await fetchData(page);
  }
  requestedPage.value = page;
}

const authProject = async (projectId: number) => {
  // 프로젝트 인증
  await authorizeProject(projectId);
  // 리렌더링
  if (search.value !== "") {
    await fetchSearchData(search.value);
  } else {
    await fetchData();
  }
}

const updateTotalPages = (response: GetProjectPageResponseDto<GetProjectResponseDto>) => {
  totalPages.value = response.totalPages;
}

const tableHeaders = ["프로젝트명", "카테고리", "메이커명", "남은 기간", "인증 상태", "등록일"];
const tableProperties = ["projectName", "categoryName", "makerName", "projectDueDate", "projectIsAuthorized", "createdAt"];
</script>

<style>
</style>
