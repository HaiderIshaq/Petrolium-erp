<template>
  <aside
    :class="[
      'fixed inset-y-0 left-0 z-30 flex flex-col w-[282px] bg-[#171b21] text-[#eef1f5] shadow-[8px_0_28px_rgba(0,0,0,0.13)] transition-transform duration-200 ease-in-out',
      store.mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
    ]"
  >
    <!-- Brand Header -->
    <div class="h-[76px] px-[17px] py-[13px] flex items-center gap-3 border-b border-white/10 shrink-0">
      <div class="w-[43px] h-[43px] rounded-[13px] bg-gradient-to-b from-[#01aef0] to-[#0056a8] grid place-items-center text-white font-black text-lg tracking-wider shadow-md">
        PP
      </div>
      <div class="flex flex-col leading-tight">
        <b class="text-[13px] font-bold tracking-[0.7px] text-white">PURE PETROLEUM</b>
        <span class="text-[11px] text-[#9ba5b1]">Enterprise ERP</span>
      </div>
    </div>

    <!-- Navigation Group Accordion -->
    <nav class="flex-1 overflow-y-auto px-[9px] py-[11px] space-y-[7px]">
      <section v-for="group in store.navGroups" :key="group.title" class="select-none">
        <button
          type="button"
          @click="store.toggleGroup(group.title)"
          class="w-full border-0 bg-transparent text-[#9ba5b1] py-2 px-[9px] grid grid-cols-[23px_1fr_18px] gap-[6px] items-center text-left text-[12.5px] font-bold tracking-[0.3px] hover:text-white transition-colors cursor-pointer"
        >
          <span class="text-center">{{ group.icon || '•' }}</span>
          <span class="truncate">{{ group.title }}</span>
          <span class="text-right text-xs">{{ store.groupOpen[group.title] !== false ? '−' : '+' }}</span>
        </button>

        <div v-if="store.groupOpen[group.title] !== false" class="grid gap-[2px] mt-[2px]">
          <button
            v-for="item in group.items"
            :key="item.key"
            type="button"
            @click="store.go(item.key)"
            :class="[
              'h-[41px] rounded-[10px] flex items-center gap-[12px] px-[10px] text-left w-full text-[13.5px] font-medium transition-all duration-150 cursor-pointer',
              store.activeModule === item.key
                ? 'bg-gradient-to-b from-[#01aef0] to-[#0056a8] text-white shadow-[0_8px_20px_rgba(1,174,240,0.25)] font-semibold'
                : 'bg-transparent text-[#bec6cf] hover:bg-white/[0.055] hover:text-white'
            ]"
          >
            <span class="w-[30px] h-[30px] rounded-[8px] bg-white/[0.07] grid place-items-center text-[12px] font-extrabold text-white shrink-0">
              {{ getIcon(item.key) }}
            </span>
            <span class="truncate">{{ item.label }}</span>
          </button>
        </div>
      </section>
    </nav>

    <!-- Sidebar Footer -->
    <div class="p-3 border-t border-white/10 shrink-0">
      <div class="bg-[#222831] rounded-[10px] p-[10px_11px] flex justify-between items-center text-white">
        <span class="text-[10px] text-[#98a2ad] uppercase tracking-wider font-semibold">Financial Year</span>
        <b class="text-[11px] font-bold text-white">2026–27</b>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useErpStore, iconForModule } from '../stores/erpStore'

const store = useErpStore()

function getIcon(key: string) {
  return iconForModule(key)
}
</script>
