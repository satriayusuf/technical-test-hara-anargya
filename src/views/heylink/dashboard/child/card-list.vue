<template>
    <div class="mt-10 bg-white border w-full rounded">
        <div class="font-medium text-lg p-5">
            User List
        </div>
        <div class="w-full bg-[#FAFBFC] p-3">
            <div class="grid grid-cols-12 gap-4">
                <div class="col-span-2">
                    <div class="grid grid-cols-6 gap-4">
                        <div class="col-span-2">
                            ID
                        </div>
                        <div class="col-span-4">
                            User
                        </div>
                    </div>
                </div>
                <div class="col-span-2">
                    Date Of Birth
                </div>
                <div class="col-span-2">
                    Email
                </div><div class="col-span-2">
                    Job
                </div><div class="col-span-2">
                    Country
                </div><div class="col-span-2">
                    Action
                </div>
            </div>
        </div>

        <div class="p-3">
            <div class="grid grid-cols-12 gap-4">
                <template v-for="user in listUser" :key="user"> 
                    <div class="col-span-2 w-full line-clamp-1 break-all">
                        <div class="grid grid-cols-6 gap-4">
                            <div class="col-span-2">
                                {{ user.id }}
                            </div>
                            <div class="col-span-4">
                                {{ user.first_name }} {{ user.last_name }}
                            </div>
                        </div>
                    </div>
                    <div class="col-span-2 w-full line-clamp-1 break-all">
                        {{ handleDate(user.date_of_birth) }}
                    </div>
                    <div class="col-span-2 w-full line-clamp-1 break-all">
                        {{ user.email }}
                    </div>
                    <div class="col-span-2 w-full line-clamp-1 break-all">
                        {{ user.job }}
                    </div>
                    <div class="col-span-2 w-full line-clamp-1 break-all">
                        {{ user.country }}
                    </div>
                    <div class="col-span-2 w-full line-clamp-1 break-all">
                        <div class="flex gap-2">
                            <div>
                                <button class="py-1 p-2 bg-white rounded border text-sm">Select</button>
                            </div>
                            <div>
                                <button class="py-1 p-2 bg-white rounded border text-sm" @click="showDetail(user)">View Detail</button>
                            </div>
                        </div>
                    </div>
                </template>

            </div>
        </div>
    </div>
    <teleport to="body">
        <transition>
            <vi-modal id="modal-detail" v-if="showModal" :selected="selectedUser" @close="handleCloseModal"/>
        </transition>
    </teleport>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import viModal from '@/components/global-component/vi-modal.vue'

const listUser = ref([])
const selectedUser = ref()
const showModal = ref(false)

onMounted(() => {
    getUserList()
})

async function getUserList () {
    try {
        const { data } = await axios.get('https://api.slingacademy.com/v1/sample-data/users')
        listUser.value = data.users
    } catch (err) {
        console.error(err)
    }
}

function handleDate (date) {
    return date.split("T", 1)[0]
}

function showDetail (user) {
    selectedUser.value = user
    showModal.value = true
}
function handleCloseModal () {
    selectedUser.value = {}
    showModal.value = false
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>