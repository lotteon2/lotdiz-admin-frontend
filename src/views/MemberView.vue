<template>
  <div class="info">
    <div class="condition">
      <SearchBar @search="onSearch"/>
      <SortBar 
        :sortOptions="sortOptions" 
        :changeSort="changeSort" 
        :requestedSort="requestedSort"/>
    </div>
    <TableInfo 
      :tableHeaders="tableHeaders"
      :tableInfos="getMemberResponseDtos"
      :tableProperties="tableProperties"/>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, watchEffect, watch } from 'vue';
  import { getMemberSearchResult, getMembers } from '@/services/member/MemberAPIService';
  import type { GetMemberResponseDto } from '@/services/member/MemberDto';
  import TableInfo from '@/components/TableInfo.vue';
  import SortBar from '@/components/SortBar.vue';
  import SearchBar from '@/components/SearchBar.vue';

  // ref: 뷰에서 컴포넌트 또는 DOM에 접근하기 위해 사용하는 속성(마운트된 요소에만 적용 가능)
  const getMemberResponseDtos = ref<GetMemberResponseDto[]>([]);

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

    // 회원 정보 조회
    const response: GetMemberResponseDto[] = await getMembers(page, size, sort);
    getMemberResponseDtos.value = response;
  });

  // 검색 이벤트
  const onSearch = async (searchTerm: string) => {
    const response = await getMemberSearchResult(searchTerm, requestedPage, requestedSize, requestedSort);
    getMemberResponseDtos.value = response;
  }

  // 정렬기준 업데이트 함수
  const changeSort = async (sort: string) => {
    try {
      requestedSort.value = sort;
      // 회원 정보 조회
      const response: GetMemberResponseDto[] = await getMembers(
        requestedPage.value, requestedSize.value, sort);
      getMemberResponseDtos.value = response;

      const urlSearchParams = new URLSearchParams(window.location.search);
      urlSearchParams.set("sort", sort);

      const newUrl = `${window.location.pathname}?${urlSearchParams.toString()}`;
      history.pushState(null, '', newUrl);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const tableHeaders = ["이름", "이메일", "전화번호", "등록일"];
  const tableProperties = ["memberName", "memberEmail", "memberPhoneNumber", "createdAt"];
</script>
  
<style>
@import "../assets/css/info.css";
@import "../assets/css/conditionbar.css";
@import "../assets/css/tableview.css";
</style>
