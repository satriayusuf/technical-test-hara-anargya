<template>
    <div class="flex bg-[#F7F8FA] min-h-screen h-full max-h-full">
            <sidebar />
            <div class="w-full">
                <navbar />

                <div class="m-5">
                    <router-view />
                </div>
            </div>
    </div>
</template>
<script setup>
import sidebar from '@/layouts/child/sidebar.vue'
import navbar from '@/layouts/child/navbar.vue'
</script>