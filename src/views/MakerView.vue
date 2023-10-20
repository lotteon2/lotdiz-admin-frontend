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
        :tableInfos="getMakerResponseDtos"
        :tableProperties="tableProperties"/>
    <PageNavBar
        :totalPages="totalPages"
        :requestedPage="requestedPage"
        :changePage="changePage"/>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { getMakerSearchResult, getMakers } from '@/services/maker/MakerAPIService';
  import type { GetMakerResponseDto, GetMakerPageResponseDto } from '@/services/maker/MakerDto';
  import TableInfo from '@/components/TableView.vue';
  import SortBar from '@/components/Sort.vue';
  import SearchBar from '@/components/Search.vue';
  import PageNavBar from '@/components/PageNavbar.vue';

  // ref: 뷰에서 컴포넌트 또는 DOM에 접근하기 위해 사용하는 속성(마운트된 요소에만 적용 가능)
  const getMakerResponseDtos = ref<GetMakerResponseDto[]>([]);
  const totalPages = ref<number>(1);

  const sortOptions = [
    { label: '등록일순', value: 'createdAt,desc' },
    { label: '이름순', value: 'makerName,desc' },
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

    // 메이커 정보 조회
    const response: GetMakerPageResponseDto<GetMakerResponseDto> = await getMakers(page, size, sort);
    getMakerResponseDtos.value = response.makers;

    // 총 페이지 다시 계산
    totalPages.value = response.totalPages;
  });

  // 검색 이벤트
  let search = ref<string>("");
  const onSearch = async (searchTerm: string) => {
    const response: GetMakerPageResponseDto<GetMakerResponseDto>
       = await getMakerSearchResult(searchTerm, requestedPage.value, requestedSize.value, requestedSort.value);
    getMakerResponseDtos.value = response.makers;
    search.value = searchTerm;

    // 총 페이지 다시 계산
    totalPages.value = response.totalPages;
  }

  const changePage = async (page: number) => {
    requestedPage.value = page;
    // 회원 정보 조회
    const response: GetMakerPageResponseDto<GetMakerResponseDto> =
      await getMakerSearchResult(search.value, requestedPage.value, requestedSize.value, requestedSort.value);
      getMakerResponseDtos.value = response.makers;

    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.set("page", (page).toString());

    const newUrl = `${window.location.pathname}?${urlSearchParams.toString()}`;
    history.pushState(null, '', newUrl);
  }

  // 정렬기준 업데이트 함수
  const changeSort = async (sort: string) => {
    try {
      requestedSort.value = sort;
      // 메이커 정보 조회
      const response: GetMakerPageResponseDto<GetMakerResponseDto> = 
        await getMakerSearchResult(search.value, requestedPage.value, requestedSize.value, requestedSort.value);
      getMakerResponseDtos.value = response.makers;

      // 총 페이지 다시 계산
      totalPages.value = response.totalPages;

      const urlSearchParams = new URLSearchParams(window.location.search);
      urlSearchParams.set("sort", sort);

      const newUrl = `${window.location.pathname}?${urlSearchParams.toString()}`;
      history.pushState(null, '', newUrl);
    } catch (error) {
      console.error('Error fetching makers:', error);
    }
  };

  const tableHeaders = ["이름", "문의 이메일", "문의 전화번호", "카카오톡 URL", "홈페이지 URL", "SNS URL", "등록일"];
  const tableProperties = ["makerName", "makerEmail", "makerPhoneNumber", "makerKakaoUrl", "makerHomeUrl", "makerSnsUrl", "createdAt"];
</script>
  
<style>
</style>
