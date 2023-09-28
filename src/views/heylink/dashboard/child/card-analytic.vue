<template>
    <div class="bg-white rounded border">
        <div class="flex justify-between p-5">
            <div>
                <div class="capitalize text-sm font-medium text-[#727272]">
                    {{ name }}
                </div>
                <div class="text-xl font-bold mt-2">
                    {{ `${showTotal()[0]}`}}{{ showTotal().length > 1 ? ',' : null }} <span class="text-gray-300"> {{ showTotal()[1] }}</span>
                </div>
            </div>
            <div>
                <div class="bg-zinc-200 rounded p-2">
                    <img src="/icon/sorting.svg" alt="">
                </div>
            </div>
        </div>
        <div class="bg-[#F9FAFC] p-5 flex justify-between">
            <div class="flex gap-2 items-center text-xs">
                <div class="flex items-center">
                    <img :src="handleIconStatistic()" alt="">
                    <div :class="handleColorPercentage()">
                        {{ percentage }}
                    </div>
                </div>
                <div class="text-zinc-400">
                    Last Month
                </div>
            </div>
            <div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    name: {
        type: String,
        default: ''
    },
    total: {
        type: String,
        default: ''
    },
    percentage: {
        type: String,
        default: ''
    },
    isProfit: {
        type: Boolean,
        default: null
    }
})

function showTotal () {
    return props.total.split(',')
}

function handleIconStatistic () {
    return props.isProfit ? '/icon/arrow-up.svg' : '/icon/arrow-down.svg'
}

function handleColorPercentage() {
    return props.isProfit ? 'text-green-400' : 'text-red-500'
}
</script>