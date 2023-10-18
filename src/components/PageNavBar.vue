<template>
    <div class="pages">
      <a href="#" v-if="requestedPage !== 0" @click="changePage(requestedPage - 1)">
        <div class="back-page-btn-container">
          <img class="back-page-btn" src="/img/back-page-btn.svg">
        </div>
      </a>
      <li v-for="pageNumber in totalPages" :key="pageNumber">
        <a href="#" @click="changePage(pageNumber - 1)">
          <div class="page-btn" :class="{'selected': (requestedPage + 1) === pageNumber }">
            {{ pageNumber }}
          </div>
        </a>
      </li>
      
      <a href="#" v-if="(requestedPage !== (totalPages - 1)) && (totalPages !== 1)" @click="changePage(requestedPage + 1)">
        <div class="front-page-btn-container">
          <img class="front-page-btn" src="/img/front-page-btn.svg">
        </div>
      </a>
    </div>
</template>

<script lang="ts">
    export default {
        name : 'PageNavBar',
        props : {
            totalPages: Number,
            requestedPage: Number,
            changePage: Function
        }
    };
</script>
