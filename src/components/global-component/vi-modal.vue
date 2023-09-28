<template>
    <div :id="props.id" class="modal w-full h-full bg-black bg-opacity-20 flex justify-center items-center">
        <div class="w-1/3 bg-white px-4 py-2 rounded">
            <div class="flex justify-end cursor-pointer" @click="closeModal">
                x
            </div>
            <div class="flex gap-4">
                <div class="w-1/4">
                    <img :src="selected.profile_picture" class="w-full h-auto" alt="">
                </div>
                <div>
                    <div class="text-xl">
                        {{ selected.first_name }} {{ selected.last_name }}
                    </div>
                    <div class="text-zinc-500">
                        {{ selected.email }}
                    </div>
                    <div class="text-zinc-500">
                        {{ selected.phone }}
                    </div>
                </div>
            </div>
            <div class="my-4 grid grid-cols-12">
                <div class="col-span-3">
                    Gender
                </div>
                <div class="col-span-1">
                    :
                </div>
                <div class="col-span-7">
                    {{ selected.gender }}
                </div>
                <div class="col-span-3">
                    Date Of Birth
                </div>
                <div class="col-span-1">
                    :
                </div>
                <div class="col-span-7">
                    {{ handleDate(selected.date_of_birth) }}
                </div>
                <div class="col-span-3">
                    Job
                </div>
                <div class="col-span-1">
                    :
                </div>
                <div class="col-span-7">
                    {{ selected.job }}
                </div>
                <div class="col-span-3">
                    Street
                </div>
                <div class="col-span-1">
                    :
                </div>
                <div class="col-span-7">
                    {{ selected.street }}
                </div>
                <div class="col-span-3">
                    City
                </div>
                <div class="col-span-1">
                    :
                </div>
                <div class="col-span-7">
                    {{ selected.city }}
                </div>
                <div class="col-span-3">
                    State
                </div>
                <div class="col-span-1">
                    :
                </div>
                <div class="col-span-7">
                    {{ selected.state }}
                </div>
                <div class="col-span-3">
                    Country
                </div>
                <div class="col-span-1">
                    :
                </div>
                <div class="col-span-7">
                    {{ selected.country }}
                </div>
                <div class="col-span-3">
                    Zip Code
                </div>
                <div class="col-span-1">
                    :
                </div>
                <div class="col-span-7">
                    {{ selected.zipcode }}
                </div>
                <div class="col-span-3">
                    Latitude
                </div>
                <div class="col-span-1">
                    :
                </div>
                <div class="col-span-7">
                    {{ selected.latitude }}
                </div>
                <div class="col-span-3">
                    Logitude
                </div>
                <div class="col-span-1">
                    :
                </div>
                <div class="col-span-7">
                    {{ selected.longitude }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
    id: {
        type: String,
        default: ''
    },
    selected: {
        type: Object,
        default: () => {}
    }
})

const emit = defineEmits(['close'])

function closeModal () {
    emit('close')
}

function handleDate (date) {
    return date.split("T", 1)[0]
}
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 0%
}
</style>