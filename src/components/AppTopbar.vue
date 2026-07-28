<template>
  <header
    class="h-[76px] sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-[#e4e8ed] flex items-center justify-between px-4 sm:px-6 shadow-xs">
    <!-- Top Left -->
    <div class="flex items-center gap-3">
      <button type="button" @click="store.mobileOpen = !store.mobileOpen"
        class="md:hidden w-[38px] h-[38px] border border-[#e4e8ed] bg-white rounded-[10px] grid place-items-center text-gray-700 font-bold hover:bg-gray-50 active:scale-95 transition-transform cursor-pointer"
        aria-label="Toggle Navigation Menu">
        ☰
      </button>
      <div class="flex flex-col">
        <span class="text-[10px] text-[#6b7480] uppercase tracking-[0.6px] font-extrabold">
          Pure Petroleum ERP
        </span>
        <b class="text-[15px] font-bold text-[#17202a] truncate max-w-[200px] sm:max-w-none">
          {{ store.activeTitle }}
        </b>
      </div>
    </div>

    <!-- Top Actions -->
    <div class="flex items-center gap-3">
      <!-- Search Bar -->
      <label
        class="hidden sm:flex h-[40px] w-[220px] lg:w-[285px] border border-[#e4e8ed] rounded-[11px] bg-[#f8f9fa] items-center relative focus-within:border-[#01aef0] focus-within:ring-2 focus-within:ring-[#01aef0]/15 transition-all">
        <span class="pl-3 text-[#77818d] text-sm">⌕</span>
        <input type="text" placeholder="Search modules..." v-model="searchInput" @keydown="onKeyDown"
          class="border-0 bg-transparent outline-none flex-1 px-3 text-xs text-[#17202a] placeholder-[#77818d]" />
      </label>

      <!-- User Profile & Logout Button -->
      <div class="flex items-center gap-2.5 pl-2 border-l border-gray-100 sm:border-l-0">
        <div
          class="w-[36px] h-[36px] rounded-[10px] bg-[#01aef0] text-white grid place-items-center font-extrabold text-xs shadow-xs">
          {{ store.authUser?.avatar || 'SA' }}
        </div>
        <div class="hidden md:flex flex-col">
          <b class="text-xs font-bold text-[#17202a] leading-tight">{{ store.authUser?.name || 'Syed Asif Ali' }}</b>
          <small class="text-[10px] text-[#6b7480] font-medium leading-tight truncate max-w-[140px]">
            {{ store.role }}
          </small>
        </div>
        <button
          type="button"
          @click="handleLogout"
          title="Log Out"
          class="ml-2 px-2.5 py-1.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
        >
          <span>Log Out</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useErpStore } from '../stores/erpStore'

const store = useErpStore()
const router = useRouter()
const searchInput = ref('')

watch(searchInput, (val) => {
  store.searchQuery = val
})

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'Enter' && searchInput.value.length > 1) {
    const q = searchInput.value.toLowerCase()
    const found = store.allModules.find((m) => m.label.toLowerCase().includes(q))
    if (found) {
      store.go(found.key)
    }
  }
}

function handleLogout() {
  store.logout()
  router.push('/login')
}
</script>
