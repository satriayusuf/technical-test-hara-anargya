<template>
    <div class="bg-white p-5 rounded">
        <div class="flex gap-4">
            <div class="w-5/6">
                <label class="text-xs text-gray-400">Cari Wilayah:</label>
                <input type="text" v-model="search" class="border w-full h-10 px-2 rounded focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" placeholder="ex: 1" @keyup.enter="handleSearch">
            </div>
            <div class="w-1/5 relative">
                <label class="text-xs text-gray-400">Filter Cari: </label>
                <div class="border p-2 rounded cursor-pointer" @click="showFilterBy">
                    {{ selectedFilter }}
                </div>
                <div v-if="isShowFilterBy" class="border absolute w-full bg-white p-2">
                    <template v-for="filter in filter_by" :key="filter">
                        <div class="my-1 p-1 hover:bg-zinc-50 cursor-pointer" @click="selectFilter(filter)">
                            {{ filter }}
                        </div>
                    </template>
                </div>
            </div>
            <div class="w-1/5 relative">
                <label class="text-xs text-gray-400">Urutkan: {{ selectedSorting.key ? selectedSorting.key === 'desc' ? 'A-Z' : 'Z-A' : null }}</label>
                <div class="border p-2 rounded cursor-pointer flex justify-between gap-2 items-center" @click="showSortBy">
                    {{ selectedSorting.value ? selectedSorting.text : 'Urutkan' }} 
                    <div v-if="selectedSorting.value" class="p-1 bg-gray-50 rounded text-xs" @click.self="clearSorting">
                        x
                    </div>
                </div>
                <div v-if="isShowSortBy" class="border absolute w-full bg-white p-2">
                    <template v-for="sort in sort_by" :key="sort">
                        <div class="my-1 p-1 hover:bg-zinc-50 cursor-pointer" @click="selectSort(sort)">
                            {{ sort }}
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <div class="mt-5">
            <div class="grid grid-cols-12 gap-4 bg-zinc-100 p-5 rounded">
                <template v-for="thead in table_head" :key="thead">
                    <div class="col-span-2">
                        {{ thead }}
                    </div>
                </template>
            </div>
            <div class="grid grid-cols-12 gap-4 p-5 rounded h-screen overflow-y-auto">
                <template v-for="region in summaryRegions" :key="region">
                    <div class="col-span-2">
                        {{ region.province_id }}
                    </div>
                    <div class="col-span-2">
                        {{ region.city_id }}
                    </div>
                    <div class="col-span-2">
                        {{ region.region_id }}
                    </div>
                    <div class="col-span-2">
                        {{ region.province_name }}
                    </div>
                    <div class="col-span-2">
                        {{ region.city_name }}
                    </div>
                    <div class="col-span-2">
                        {{ region.ref_id }}
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import province from '@/assets/js/province.js'
import city from '@/assets/js/city.js'

const regions = ref([])
const summaryRegions = ref([])
const search = ref('')
const isShowFilterBy = ref(false)
const isShowSortBy = ref(false)
const selectedFilter = ref('ID Provinsi')
const selectedSorting = {
    key: '',
    value: '',
    text: ''
}
const filter_by = [
    'ID Provinsi',
    'ID Kota'
]

const sort_by = [
    'Nama Provinsi',
    'Nama Kota'
]
const table_head = [
    'ID Provinsi',
    'ID Kota',
    'ID Wilayah',
    'Nama Provinsi',
    'Nama Kota',
    'Ref ID'
]

onMounted(() => {
    setRegions()
})

function setRegions() {
    regions.value = city.map(item => {
        return {
            province_id: item.provinsi_id,
            city_name: item.name,
            city_id: item.id,
            ref_id: item.ref_id,
            region_id: province.find(prov => prov.id === item.provinsi_id).wilayah_id,
            province_name: province.find(prov => prov.id === item.provinsi_id).name
        }
    })

    summaryRegions.value = regions.value
}

function showFilterBy () {
    isShowFilterBy.value = !isShowFilterBy.value
}

function showSortBy () {
    isShowSortBy.value = !isShowSortBy.value
}

function selectFilter (filter) {
    selectedFilter.value = filter
    isShowFilterBy.value = false
}

function selectSort (sort) {
    selectedSorting.key = selectedSorting.key === 'desc' ? 'asc' : 'desc'
    selectedSorting.text = sort
    selectedSorting.value = sort === 'Nama Provinsi' ? 'province_name' : 'city_name'
    isShowSortBy.value = false

    if(selectedSorting.value === 'province_name') {
        setSortRegionProvince()
    } else {
        setSortRegionCity()
    }
}

function setSortRegionProvince() {
    summaryRegions.value = selectedSorting.key === 'asc' ? sortDescProvince() : sortAscProvince()
}

function sortDescProvince() {
    return summaryRegions.value.sort((a, b) => {
        return b.province_name.localeCompare(a.province_name);
    });
}

function sortAscProvince() {
    return summaryRegions.value.sort((a, b) => {
        return a.province_name.localeCompare(b.province_name);
    });
}

function setSortRegionCity() {
    summaryRegions.value = selectedSorting.key === 'asc' ? sortDescCity() : sortAscCity()
}

function sortDescCity() {
    return summaryRegions.value.sort((a, b) => {
        return b.city_name.localeCompare(a.city_name);
    });
}

function sortAscCity() {
    return summaryRegions.value.sort((a, b) => {
        return a.city_name.localeCompare(b.city_name);
    });
}

function clearSorting () {
    selectedSorting.key = ''
    selectedSorting.text = ''
    selectedSorting.value = ''
}

function handleSearch () {
    if (!search.value) {
        summaryRegions.value = regions.value
    }

    else {
        if (selectedFilter.value === 'ID Provinsi') {
            summaryRegions.value = regions.value.filter(region => region?.province_id === Number(search.value))
        } else {
            summaryRegions.value = regions.value.filter(region => region?.city_id === Number(search.value))
        }
    }

}
</script>