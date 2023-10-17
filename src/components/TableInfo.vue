<template>
    <table>
        <thead>
            <th v-for="(header, index) in tableHeaders" :key="index">{{ header }}</th>
        </thead>
        <tbody v-for="(info, index) in tableInfos" :key="index">
            <td v-for="property in tableProperties" :key="property">
                {{ info[property] }}
            </td>
        </tbody>
    </table>
</template>

<script lang="ts">
    export default {
        name : 'TableInfo',
        props : {
            tableHeaders: Array<string>,
            tableInfos: Array,
            tableProperties: Array<string>
        } 
    };
</script>
