<template>
  <div class="info">
    <div class="condition">
      <div class="search">
      </div>
      <div class="sort">
        <div class="sort-createdAt"><a href="">등록일순</a></div>
        <div class="sort-name"><a href="">이름순</a></div>
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
  import { getMakers, getMakerSearchResult } from '@/services/maker/MakerAPIService';
  import type { GetMakerResponseDto, GetMakerSearchResponseDto } from '@/services/maker/MakerDto';

  // ref: 뷰에서 컴포넌트 또는 DOM에 접근하기 위해 사용하는 속성(마운트된 요소에만 적용 가능)
  const getMakerResponseDtos = ref<GetMakerResponseDto[]>([]);
  const getMakerSearchResponseDtos = ref<GetMakerSearchResponseDto[]>([]);

  // 회원 정보 조회
  // 컴포넌트가 마운트 된 후 API 호출
  onMounted(async () => {
    try {
      const response: Array<GetMakerResponseDto> = await getMakers(0, 20, "createdAt,desc");
      getMakerResponseDtos.value = response;
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  });

  // 회원 정보 검색
  onMounted(async () => {
    try {
      const response: Array<GetMakerSearchResponseDto> = await getMakerSearchResult("이우엽", 0, 20, "createdAt,desc");
      getMakerSearchResponseDtos.value = response;
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  });

</script>
  
<style>
@import "../assets/css/info.css";
@import "../assets/css/conditionbar.css";
@import "../assets/css/tableview.css";
</style>
