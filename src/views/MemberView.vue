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
        :tableInfos="getMemberResponseDtos"
        :tableProperties="tableProperties"/>
    <PageNavBar
        :totalPages="totalPages"
        :requestedPage="requestedPage"
        :changePage="changePage"/>
  </div>
</template>

<!-- setup: 컴포넌트 API를 사용하기로 선언 -->
<script setup lang="ts">
import {ref, onBeforeMount } from 'vue';
import {getMemberSearchResult, getMembers} from '@/services/member/MemberAPIService';
import type {GetMemberResponseDto, GetMemberPageResponseDto} from '@/services/member/MemberDto';
import TableInfo from '@/components/TableView.vue';
import SortBar from '@/components/Sort.vue';
import SearchBar from '@/components/Search.vue';
import PageNavBar from '@/components/PageNavbar.vue';

// 검색 참조 값
let search = ref<string>("");

// 정렬 옵션
const sortOptions = [
  {label: '등록일순', value: 'createdAt,desc'},
  {label: '이름순', value: 'memberName,desc'},
];

// default pagenation 값 세팅
// ref: 뷰에서 컴포넌트 또는 DOM에 접근하기 위해 사용하는 속성(마운트된 요소에만 적용 가능)
const requestedSort = ref<string>(sortOptions[0].value);
const requestedPage = ref<number>(0);
const requestedSize = ref<number>(10);

// ref: 뷰에서 컴포넌트 또는 DOM에 접근하기 위해 사용하는 속성(마운트된 요소에만 적용 가능)
const getMemberResponseDtos = ref<Array<GetMemberResponseDto>>(new Array<GetMemberResponseDto>());
const totalPages = ref<number>(1);

/**
 * 컴포넌트가 마운트되기 전에 호출될 콜백
 */
onBeforeMount(async () => {
  await fetchData();
});

const fetchData = async (
    page: number = requestedPage.value,
    size: number = requestedSize.value,
    sort: string = requestedSort.value) => {
  try {
    const response: GetMemberPageResponseDto<GetMemberResponseDto> =
        await getMembers(page, size, sort);
    getMemberResponseDtos.value = response.members;

    updateTotalPages(response);
  } catch (error) {
    console.error('Error fetching members:', error);
  }
};

const fetchSearchData = async (
    searchTerm: string = "",
    page: number = requestedPage.value,
    size: number = requestedSize.value,
    sort: string = requestedSort.value) => {
  try {
    const response: GetMemberPageResponseDto<GetMemberResponseDto> =
        await getMemberSearchResult(searchTerm, page, size, sort);
    getMemberResponseDtos.value = response.members;

    updateTotalPages(response);
  } catch (error) {
    console.error('Error fetching members:', error);
  }
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
  if(search.value !== "") {
    await fetchSearchData(search.value, page, requestedSize.value, requestedSort.value);
  } else {
    await fetchData(page);
  }
  requestedPage.value = page;
}

// 총 페이지 수 다시 계산
const updateTotalPages = (response: GetMemberPageResponseDto<GetMemberResponseDto>) => {
  totalPages.value = response.totalPages;
}

const tableHeaders = ["이름", "이메일", "전화번호", "등록일"];
const tableProperties = ["memberName", "memberEmail", "memberPhoneNumber", "createdAt"];
</script>

<style>
</style>
