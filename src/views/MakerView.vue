<template>
  <div class="info">
    <div class="condition">
      <div class="search">
        <select class="search-select">
          <option class="search-select-option" value="all">전체</option>
          <option class="search-select-option" value="makerName">이름</option>
          <option class="search-select-option" value="makerPhoneNumber">전화번호</option>
        </select>
        <div class="search-input-container">
          <input class="search-input" type="text">
        </div>
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
        <th>이름</th>
        <th>문의 이메일</th>
        <th>문의 전화번호</th>
        <th>카카오톡 URL</th>
        <th>홈페이지 URL</th>
        <th>SNS URL</th>
        <th>등록일</th>
      </thead>
      <tbody v-for="maker in getMakerResponseDtos" :key="maker.makerId">
        <td>{{ maker.makerName }}</td>
        <td>{{ maker.makerEmail }}</td>
        <td>{{ maker.makerPhoneNumber }}</td>
        <td>{{ maker.makerKakaoUrl }}</td>
        <td>{{ maker.makerHomeUrl }}</td>
        <td>{{ maker.makerSnsUrl }}</td>
        <td>{{ maker.createdAt }}</td>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { getMakers } from '@/services/maker/MakerAPIService';
  import type { GetMakerResponseDto } from '@/services/maker/MakerDto';

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

</script>
  
<style>
@import "../assets/css/info.css";
@import "../assets/css/conditionbar.css";
@import "../assets/css/tableview.css";
</style>
