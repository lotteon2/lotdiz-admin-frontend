<template>
    <div class="sort">
        <div 
            class="sort-option" 
            v-for="sortOption in sortOptions" 
            :key="sortOption.value" 
            :class="{ 'selected': requestedSort === sortOption.value }">
            <a href="#" @click="changeSort(sortOption.value)">{{ sortOption.label }}</a>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name : 'ConditionBar',
        props : {
            sortOptions: Array,
            requestedSort: String,
            changeSort: Function
        }
    };
</script>
