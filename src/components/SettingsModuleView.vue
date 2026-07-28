<template>
  <div style="padding:28px 32px; width:100%; font-family:'Plus Jakarta Sans','Inter',sans-serif;">

    <!-- Header -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; gap:16px; flex-wrap:wrap;">
      <div>
        <h1 style="font-size:24px; font-weight:800; color:#0f172a; margin:0 0 4px 0; letter-spacing:-0.4px;">Company Settings</h1>
        <p style="font-size:13px; color:#475569; margin:0; font-weight:500;">Company identity, financial year and system preferences.</p>
      </div>
      <button
        @click="onSave"
        style="height:40px; padding:0 20px; background:linear-gradient(135deg,#01aef0,#0056a8); color:#fff; border:0; border-radius:10px; font-size:13px; font-weight:700; cursor:pointer; box-shadow:0 4px 14px rgba(1,174,240,0.35); display:flex; align-items:center; gap:6px;"
      >
        <Save :size="15" />
        Save Settings
      </button>
    </div>

    <!-- Settings Card -->
    <div style="background:#fff; border:1px solid #e2e8f0; border-radius:14px; box-shadow:0 2px 12px rgba(15,23,42,0.05); overflow:hidden;">
      <div style="padding:16px 20px; border-bottom:1px solid #e2e8f0; background:#f8fafc; display:flex; align-items:center; gap:8px;">
        <Building2 :size="16" style="color:#01aef0;" />
        <span style="font-size:13px; font-weight:800; color:#0f172a;">Company Information</span>
      </div>
      <div style="padding:24px; display:grid; grid-template-columns:repeat(3,1fr); gap:20px;">
        <label v-for="(val, key) in companyForm" :key="key" style="display:flex; flex-direction:column; gap:6px;">
          <span style="font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:0.5px; color:#475569;">
            {{ String(key).replace(/([A-Z])/g, ' $1') }}
          </span>
          <input
            type="text"
            v-model="companyForm[key]"
            style="height:40px; border:1px solid #cbd5e1; border-radius:9px; padding:0 12px; font-size:13px; outline:none; color:#0f172a; background:#fff; width:100%; font-family:'Inter',sans-serif;"
          />
        </label>

        <!-- Role -->
        <label style="display:flex; flex-direction:column; gap:6px;">
          <span style="font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:0.5px; color:#475569;">Demo Role</span>
          <select
            v-model="selectedRole"
            style="height:40px; border:1px solid #cbd5e1; border-radius:9px; padding:0 12px; font-size:13px; outline:none; color:#0f172a; background:#fff; cursor:pointer; font-family:'Inter',sans-serif;"
          >
            <option v-for="r in rolesList" :key="r" :value="r">{{ r }}</option>
          </select>
        </label>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useErpStore } from '../stores/erpStore'
import type { CompanyInfo } from '../stores/erpStore'
import { Building2, Save } from '@lucide/vue'

const store = useErpStore()

const companyForm = ref<CompanyInfo>({ ...store.company })
const selectedRole = ref(store.role)

const rolesList = [
  'System Administrator',
  'Finance Manager',
  'Sales Manager',
  'Supply Chain Manager',
  'Depot Manager',
  'Auditor'
]

function onSave() {
  store.saveSettings(companyForm.value, selectedRole.value)
}
</script>
