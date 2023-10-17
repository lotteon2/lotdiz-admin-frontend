<template>
  <div class="member">
    <h1>회원 페이지</h1>
    <h2>회원 정보 조회</h2>
    <li v-for="member in getMemberResponseDtos" :key="member.memberId">
      {{ member }}
    </li>
    <h2>회원 정보 검색</h2>
    <li v-for="member in getMemberSearchResponseDtos" :key="member.memberId">
      {{ member }}
    </li>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { getMembers, getMemberSearchResult } from '@/services/member/MemberAPIService';
  import type { GetMemberResponseDto, GetMemberSearchResponseDto } from '@/services/member/MemberDto';

  // ref: 뷰에서 컴포넌트 또는 DOM에 접근하기 위해 사용하는 속성(마운트된 요소에만 적용 가능)
  const getMemberResponseDtos = ref<GetMemberResponseDto[]>([]);
  const getMemberSearchResponseDtos = ref<GetMemberSearchResponseDto[]>([]);

  // 회원 정보 조회
  // 컴포넌트가 마운트 된 후 API 호출
  onMounted(async () => {
    try {
      const response: Array<GetMemberResponseDto> = await getMembers(0, 20, "createdAt,desc");
      getMemberResponseDtos.value = response;
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  });

  // 회원 정보 검색
  onMounted(async () => {
    try {
      const response: Array<GetMemberSearchResponseDto> = await getMemberSearchResult("이우엽", 0, 20, "createdAt,desc");
      getMemberSearchResponseDtos.value = response;
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  });

</script>
  
<style>
</style>
