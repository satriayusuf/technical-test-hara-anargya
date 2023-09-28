<template>
    <div class="w-72 h-auto border bg-white">
        <div class="m-5">
            <div class="font-bold text-2xl">
                {{ title }}
            </div>
            <div class="mt-8">
                <template v-for="menu in menus" :key="menu">
                    <div 
                        class="p-2 rounded flex gap-2 my-2 items-center cursor-pointer hover:bg-blue-50"
                        :class="{
                            'bg-blue-100' : route.path === menu.path
                        }"
                        @click="handleRedirectTo(menu.path)"
                    >
                        <div>
                            <img :src="menu.icon" alt="">
                        </div>
                        <div>
                            {{ menu.text }}
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const title = 'heylink.'
const menus = [
    {
        path: '/dashboard',
        text: 'Dasboard',
        icon: '/icon/dashboard.svg'
    },
    {
        path: '/overview',
        text: 'Overview',
        icon: '/icon/overview.svg'
    }
]

function handleRedirectTo (path) {
    router.push(path)
}
</script>