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
        :tableInfos="getMakerResponseDtos"
        :tableProperties="tableProperties"/>
    <PageNavBar
        :totalPages="totalPages"
        :requestedPage="requestedPage"
        :changePage="changePage"/>
  </div>
</template>

<script setup lang="ts">
import {ref, onBeforeMount} from 'vue';
import {getMakerSearchResult, getMakers} from '@/services/maker/MakerAPIService';
import type {GetMakerResponseDto, GetMakerPageResponseDto} from '@/services/maker/MakerDto';
import TableInfo from '@/components/TableView.vue';
import SortBar from '@/components/Sort.vue';
import SearchBar from '@/components/Search.vue';
import PageNavBar from '@/components/PageNavbar.vue';

let search = ref<string>("");

const sortOptions = [
  {label: '등록일순', value: 'createdAt,desc'},
  {label: '이름순', value: 'makerName,desc'},
];

const requestedSort = ref<string>(sortOptions[0].value);
const requestedPage = ref<number>(0);
const requestedSize = ref<number>(10);

const getMakerResponseDtos
    = ref<Array<GetMakerResponseDto>>(new Array<GetMakerResponseDto>());
const totalPages = ref<number>(1);

onBeforeMount(async () => {
  await fetchData();
});

const fetchData = async (
    page: number = requestedPage.value,
    size: number = requestedSize.value,
    sort: string = requestedSort.value) => {
  const response: GetMakerPageResponseDto<GetMakerResponseDto>
      = await getMakers(page, size, sort);
  getMakerResponseDtos.value = response.makers;

  updateTotalPages(response);
};

const fetchSearchData = async (
    searchTerm: string = "",
    page: number = requestedPage.value,
    size: number = requestedSize.value,
    sort: string = requestedSort.value) => {
  const response: GetMakerPageResponseDto<GetMakerResponseDto>
      = await getMakerSearchResult(searchTerm, page, size, sort);
  getMakerResponseDtos.value = response.makers;

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

// pagenation
const changePage = async (page: number) => {
  if (search.value !== "") {
    await fetchSearchData(search.value, page, requestedSize.value, requestedSort.value);
  } else {
    await fetchData(page);
  }
  requestedPage.value = page;
}

const updateTotalPages = (response: GetMakerPageResponseDto<GetMakerResponseDto>) => {
  totalPages.value = response.totalPages;
}

const tableHeaders = ["이름", "문의 이메일", "문의 전화번호", "카카오톡 URL", "홈페이지 URL", "SNS URL", "등록일"];
const tableProperties = ["makerName", "makerEmail", "makerPhoneNumber", "makerKakaoUrl", "makerHomeUrl", "makerSnsUrl", "createdAt"];
</script>

<style>
</style>
