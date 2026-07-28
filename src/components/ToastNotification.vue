<template>
  <div style="position:fixed; right:24px; bottom:24px; z-index:120; display:flex; flex-direction:column; gap:8px; pointer-events:none;">
    <div
      v-for="toast in store.toasts"
      :key="toast.id"
      style="background:linear-gradient(135deg,#1c2229 0%,#2d3748 100%); color:#fff; border-radius:12px; padding:12px 18px; box-shadow:0 12px 32px rgba(0,0,0,0.25); font-size:12.5px; font-weight:600; pointer-events:auto; display:flex; align-items:center; gap:8px; border:1px solid rgba(255,255,255,0.1); font-family:'Inter',sans-serif;"
    >
      <span style="color:#22c55e;">✓</span>
      <span>{{ toast.message }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useErpStore } from '../stores/erpStore'

const store = useErpStore()
</script>
