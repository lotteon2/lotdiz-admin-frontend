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
      :tableInfos="getMakerResponseDtos"
      :tableProperties="tableProperties"/>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { getMakerSearchResult, getMakers } from '@/services/maker/MakerAPIService';
  import type { GetMakerResponseDto } from '@/services/maker/MakerDto';
  import TableInfo from '@/components/TableInfo.vue';
  import SortBar from '@/components/SortBar.vue';
  import SearchBar from '@/components/SearchBar.vue';

  // ref: 뷰에서 컴포넌트 또는 DOM에 접근하기 위해 사용하는 속성(마운트된 요소에만 적용 가능)
  const getMakerResponseDtos = ref<GetMakerResponseDto[]>([]);

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

    // 메이커 정보 조회
    const response: Array<GetMakerResponseDto> = await getMakers(page, size, sort);
    getMakerResponseDtos.value = response;
  });

  // 검색 이벤트
  const onSearch = async (searchTerm: string) => {
    const response = await getMakerSearchResult(searchTerm, requestedPage, requestedSize, requestedSort);
    getMakerResponseDtos.value = response;
  }

  // 정렬기준 업데이트 함수
  const changeSort = async (sort: string) => {
    try {
      requestedSort.value = sort;
      // 회원 정보 조회
      const response: Array<GetMakerResponseDto> = await getMakers(
        requestedPage.value, requestedSize.value, sort);
      getMakerResponseDtos.value = response;

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
@import "../assets/css/info.css";
@import "../assets/css/conditionbar.css";
@import "../assets/css/tableview.css";
</style>
