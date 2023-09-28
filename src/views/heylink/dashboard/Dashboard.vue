<template>
    <div class="grid grid-cols-12 gap-4">
        <template v-for="analytic in analytics" :key="analytic">
            <div class="col-span-4">
                <card-analytic
                :name="analytic.name"
                :total="analytic.total"
                :percentage="analytic.percentage"
                :is-profit="analytic.isProfit"
                />
            </div>
        </template>
    </div>
    <card-list />
</template>

<script setup>
import cardAnalytic from '@/views/heylink/dashboard/child/card-analytic.vue';
import cardList from '@/views/heylink/dashboard/child/card-list.vue';
const analytics = [
    {
        name: 'pending',
        total: '2.480,30',
        percentage: '2,15%',
        isProfit: true,
    },
    {
        name: 'paid',
        total: '84.310',
        percentage: '1.10%',
        isProfit: false,
    },
    {
        name: 'rejected',
        total: '12.155',
        percentage: '2,15%',
        isProfit: true,
    }
]
</script>