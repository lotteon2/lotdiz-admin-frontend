<template>
  <div class="member">
    <h1>메이커 페이지</h1>
    <h2>메이커 정보 조회</h2>
    <li v-for="maker in getMakerResponseDtos" :key="maker.makerId">
      {{ maker }}
    </li>
    <h2>메이커 정보 검색</h2>
    <li v-for="maker in getMakerSearchResponseDtos" :key="maker.makerId">
      {{ maker }}
    </li>
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
</style>
