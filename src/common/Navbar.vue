<template>
  <aside class="sidebar">
    <div class="logo">
      <div class="logo-text">lotdiz</div>
    </div>
    <nav>
      <!-- [:class] activeLink객체가 조건에 만족하면 class 태그에 active-link를 추가한다 -->
      <!-- [@click] 이 태그의 클릭 이벤트가 있으면 setActiveLink 함수를 호출한다 -->
      <RouterLink class="router-link" :class="{ 'active-link': isActiveLink('')}"
                  to="/">
        <div class="router-img">
          <img :src="isActiveLink('') ? logoImg.home.active : logoImg.home.inactive">
        </div>
        <div class="router-text">대시보드</div>
      </RouterLink>
      <RouterLink class="router-link" :class="{ 'active-link': isActiveLink('member')}"
                  to="/member">
        <div class="router-img">
          <img :src="isActiveLink('member') ? logoImg.member.active : logoImg.member.inactive">
        </div>
        <div class="router-text">회원 정보</div>
      </RouterLink>
      <RouterLink class="router-link" :class="{ 'active-link': isActiveLink('project')}"
                  to="/project">
        <div class="router-img">
          <img :src="isActiveLink('project') ? logoImg.project.active : logoImg.project.inactive">
        </div>
        <div class="router-text">프로젝트 정보</div>
      </RouterLink>
      <RouterLink class="router-link" :class="{ 'active-link': isActiveLink('maker')}"
                  to="/maker">
        <div class="router-img">
          <img :src="isActiveLink('maker') ? logoImg.maker.active : logoImg.maker.inactive">
        </div>
        <div class="router-text">메이커 정보</div>
      </RouterLink>
    </nav>
  </aside>
</template>

<script lang="ts">
export default {
  // 객체 또는 함수의 형태로 vue 인스턴스가 사용할 정보를 가지고 있는 속성
  data() {
    return {
      activeLink: '',
      logoImg: {
        home: {
          inactive: "/img/home.svg",
          active: "/img/home-active.svg",
        },
        member: {
          inactive: "/img/member.svg",
          active: "/img/member-active.svg",
        },
        project: {
          inactive: "/img/project.svg",
          active: "/img/project-active.svg",
        },
        maker: {
          inactive: "/img/maker.svg",
          active: "/img/maker-active.svg",
        }
      }
    }
  },
  // vue 인스턴스가 사용할 함수를 저장하고 있는 속성
  methods: {
    isActiveLink(link: string) {
      if (this.$route.path === "/") {
        return link === "";
      }
      return this.$route.name === link;
    },
  },
}
</script>

<style scoped>
@import "@/assets/css/navbar.css";
</style>