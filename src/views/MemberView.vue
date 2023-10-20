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
        :tableInfos="getMemberResponseDtos"
        :tableProperties="tableProperties"/>
    <PageNavBar
        :totalPages="totalPages"
        :requestedPage="requestedPage"
        :changePage="changePage"/>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { getMemberSearchResult, getMembers } from '@/services/member/MemberAPIService';
  import type { GetMemberResponseDto, GetMemberPageResponseDto } from '@/services/member/MemberDto';
  import TableInfo from '@/components/TableView.vue';
  import SortBar from '@/components/Sort.vue';
  import SearchBar from '@/components/Search.vue';
  import PageNavBar from '@/components/PageNavbar.vue';

  // ref: 뷰에서 컴포넌트 또는 DOM에 접근하기 위해 사용하는 속성(마운트된 요소에만 적용 가능)
  const getMemberResponseDtos = ref<GetMemberResponseDto[]>([]);
  const totalPages = ref<number>(1);

  const sortOptions = [
    { label: '등록일순', value: 'createdAt,desc' },
    { label: '이름순', value: 'memberName,desc' },
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

    // 회원 정보 조회
    const response: GetMemberPageResponseDto<GetMemberResponseDto>  = await getMembers(page, size, sort);
    getMemberResponseDtos.value = response.members;

    totalPages.value = response.totalPages;
  });

  // 검색 이벤트
  let search = ref<string>("");
  const onSearch = async (searchTerm: string) => {
    const response: GetMemberPageResponseDto<GetMemberResponseDto> = 
      await getMemberSearchResult(searchTerm, requestedPage.value, requestedSize.value, requestedSort.value);
    getMemberResponseDtos.value = response.members;

    // 검색값 다시 세팅
    search.value = searchTerm;

    // 총 페이지 수 다시 계산
    totalPages.value = response.totalPages;
  }

  const changePage = async (page: number) => {
    requestedPage.value = page;
    // 회원 정보 조회
    const response: GetMemberPageResponseDto<GetMemberResponseDto> = 
      await getMemberSearchResult(search.value, requestedPage.value, requestedSize.value, requestedSort.value);
    getMemberResponseDtos.value = response.members;

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
      const response: GetMemberPageResponseDto<GetMemberResponseDto> = 
        await getMemberSearchResult(search.value, requestedPage.value, requestedSize.value, requestedSort.value);
      getMemberResponseDtos.value = response.members;

      
      // 총 페이지 수 다시 계산
      totalPages.value = response.totalPages;

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

</style>
