<template>
  <div v-if="config" style="padding:28px 32px; width:100%; font-family:'Plus Jakarta Sans','Inter',sans-serif;">

    <!-- Header -->
    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:24px; gap:16px; flex-wrap:wrap;">
      <div>
        <h1 style="font-size:24px; font-weight:800; color:#0f172a; margin:0 0 4px 0; letter-spacing:-0.4px;">{{ config.title }}</h1>
        <p style="font-size:13px; color:#475569; margin:0; font-weight:500;">{{ subtitleText }}</p>
      </div>
      <div style="display:flex; gap:10px; flex-wrap:wrap;">
        <button
          @click="store.openNewRecordModal()"
          style="height:40px; padding:0 18px; background:linear-gradient(135deg,#01aef0,#0056a8); color:#fff; border:0; border-radius:10px; font-size:13px; font-weight:700; cursor:pointer; box-shadow:0 4px 14px rgba(1,174,240,0.35); display:flex; align-items:center; gap:6px;"
        >
          + New {{ config.entity || 'Record' }}
        </button>
        <button
          @click="store.exportCsv(columns.map((x) => ({ key: x.key, label: x.label })), filteredRows, config)"
          style="height:40px; padding:0 16px; background:#fff; border:1px solid #cbd5e1; border-radius:10px; font-size:13px; font-weight:700; cursor:pointer; color:#334155; box-shadow:0 1px 3px rgba(0,0,0,0.04);"
        >
          Export CSV
        </button>
      </div>
    </div>

    <!-- Workflow Stage Bar -->
    <div v-if="config.type === 'workflow' && config.stages && config.stages.length > 0" style="display:flex; gap:8px; overflow-x:auto; margin-bottom:18px; padding-bottom:4px;">
      <span
        v-for="stage in config.stages"
        :key="stage"
        style="white-space:nowrap; border-radius:20px; padding:5px 14px; background:#e0f2fe; color:#0284c7; font-size:11px; font-weight:800; letter-spacing:0.3px;"
      >
        {{ stage }}
      </span>
    </div>

    <!-- Toolbar -->
    <div style="background:#fff; border:1px solid #e2e8f0; border-radius:14px; padding:14px 18px; display:flex; justify-content:space-between; align-items:center; gap:14px; margin-bottom:18px; flex-wrap:wrap; box-shadow:0 1px 4px rgba(15,23,42,0.04);">
      <div style="display:flex; align-items:center; gap:12px; flex:1; max-width:420px;">
        <input
          type="text"
          placeholder="Filter table records..."
          v-model="searchFilter"
          style="height:38px; width:100%; border:1px solid #cbd5e1; border-radius:9px; padding:0 14px; font-size:13px; outline:none; color:#0f172a; font-family:'Inter',sans-serif;"
        />
      </div>
      <div style="display:flex; align-items:center; gap:12px;">
        <span style="font-size:12.5px; color:#475569; font-weight:700; white-space:nowrap;">{{ filteredRows.length }} record(s)</span>
      </div>
    </div>

    <!-- Table Card -->
    <div style="background:#fff; border:1px solid #e2e8f0; border-radius:14px; overflow:hidden; box-shadow:0 2px 12px rgba(15,23,42,0.05);">
      <div style="overflow-x:auto;">
        <table style="width:100%; border-collapse:collapse; min-width:750px; font-size:13px;">
          <thead>
            <tr style="background:#f0f9ff; border-bottom:1px solid #e2e8f0;">
              <th
                v-for="col in columns"
                :key="col.key"
                style="padding:12px 16px; text-align:left; font-size:11px; font-weight:800; color:#0369a1; text-transform:uppercase; letter-spacing:0.6px; white-space:nowrap;"
              >
                {{ col.label }}
              </th>
              <th style="padding:12px 16px; text-align:left; font-size:11px; font-weight:800; color:#0369a1; text-transform:uppercase; letter-spacing:0.6px; white-space:nowrap;">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredRows.length === 0">
              <td :colspan="columns.length + 1" style="padding:48px; text-align:center; color:#64748b; font-weight:600;">No records found matching criteria.</td>
            </tr>
            <tr
              v-for="r in filteredRows"
              :key="r.id"
              style="border-bottom:1px solid #f1f5f9; transition:background 0.12s;"
            >
              <td
                v-for="col in columns"
                :key="col.key"
                :style="{
                  padding: '12px 16px',
                  verticalAlign: 'middle',
                  textAlign: ['currency','number0','total','quantity'].includes(col.format || '') ? 'right' : 'left',
                  fontFamily: ['currency','number0','total','quantity'].includes(col.format || '') ? 'monospace' : 'inherit',
                  fontWeight: ['code','serialNo','number'].includes(col.key) ? '700' : '500',
                  color: '#0f172a',
                  whiteSpace: 'nowrap'
                }"
              >
                <!-- Status Badge -->
                <span
                  v-if="col.format === 'status'"
                  :style="getBadgeStyle(r[col.key])"
                >
                  {{ r[col.key] || '—' }}
                </span>
                <!-- Currency -->
                <template v-else-if="col.format === 'currency'"><b>{{ money(r[col.key]) }}</b></template>
                <!-- Number -->
                <template v-else-if="col.format === 'number0'">{{ num(r[col.key]) }}</template>
                <!-- Total from lines -->
                <template v-else-if="col.format === 'total'"><b style="color:#01aef0;">{{ money(totalRecord(r, config.type)) }}</b></template>
                <!-- Quantity from lines -->
                <template v-else-if="col.format === 'quantity'"><b>{{ num(totalRecord(r, config.type)) }} Ltr</b></template>
                <!-- Party name -->
                <template v-else-if="col.key === 'partyId'"><b>{{ store.partyName(r[col.key], config) }}</b></template>
                <!-- Number -->
                <template v-else-if="typeof r[col.key] === 'number'">{{ num(r[col.key], 2) }}</template>
                <!-- Default -->
                <template v-else>{{ r[col.key] ?? '' }}</template>
              </td>
              <!-- Actions -->
              <td style="padding:10px 16px; vertical-align:middle; white-space:nowrap;">
                <div style="display:flex; align-items:center; gap:6px;">
                  <button
                    @click="store.openEditRecordModal(r.id)"
                    style="height:30px; padding:0 12px; border:1px solid #cbd5e1; background:#fff; border-radius:8px; font-size:11.5px; font-weight:700; cursor:pointer; color:#0f172a;"
                  >Edit</button>

                  <button
                    v-if="config.type === 'workflow' && config.stages && config.stages.length > 0"
                    @click="store.advanceWorkflow(r.id)"
                    style="height:30px; padding:0 12px; border:1px solid #cbd5e1; background:#fff; border-radius:8px; font-size:11.5px; font-weight:700; cursor:pointer; color:#0f172a;"
                  >Next Stage</button>

                  <button
                    v-if="['document','gatepass','voucher','journal'].includes(config.type)"
                    @click="store.togglePost(r.id)"
                    style="height:30px; padding:0 12px; border:1px solid #cbd5e1; background:#fff; border-radius:8px; font-size:11.5px; font-weight:700; cursor:pointer; color:#0f172a;"
                  >{{ r.status === 'Posted' ? 'Unpost' : 'Post' }}</button>

                  <button
                    v-if="config.convertActions && config.convertActions.length > 0"
                    @click="store.convertRecord(r.id)"
                    style="height:30px; padding:0 12px; border:1px solid #cbd5e1; background:#fff; border-radius:8px; font-size:11.5px; font-weight:700; cursor:pointer; color:#0f172a;"
                  >Convert</button>

                  <button
                    @click="store.deleteRecord(r.id)"
                    style="height:30px; padding:0 12px; border:1px solid #fecdd3; background:#fff1f2; border-radius:8px; font-size:11.5px; font-weight:700; cursor:pointer; color:#dc2626;"
                  >Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useErpStore, money, num, totalRecord } from '../stores/erpStore'

const store = useErpStore()
const searchFilter = ref('')

const config = computed(() => store.currentConfig)

const rows = computed(() => {
  if (!config.value) return []
  const datasetKey = config.value.dataset || store.activeModule
  return store.data[datasetKey] || []
})

const filteredRows = computed(() => {
  const q = searchFilter.value.toLowerCase().trim()
  if (!q) return rows.value
  return rows.value.filter((r: any) => JSON.stringify(r).toLowerCase().includes(q))
})

const subtitleText = computed(() => {
  if (!config.value) return 'Integrated module.'
  const map: Record<string, string> = {
    master: 'Create, view, edit and delete records with browser persistence.',
    workflow: 'Integrated approval and operational status workflow with CRUD controls.',
    document: 'Tax/Non-Tax invoice with line items, posting, cancellation and conversion.',
    gatepass: 'Challan and gate-pass flow with vehicle, driver and item lines.',
    voucher: 'Bank/Cash voucher with invoice settlement, withholding and posting.',
    journal: 'Balanced journal entries with debit/credit validation.'
  }
  return map[config.value.type] || 'Integrated enterprise module.'
})

const columns = computed(() => {
  const c = config.value
  if (!c) return []
  if (c.columns) return c.columns
  if (c.type === 'document') return [
    { key: 'serialNo', label: 'Doc No.' },
    { key: 'date', label: 'Date' },
    { key: 'partyId', label: 'Customer / Vendor' },
    { key: 'lines', label: 'Net Amount', format: 'total' },
    { key: 'status', label: 'Status', format: 'status' }
  ]
  if (c.type === 'gatepass') return [
    { key: 'serialNo', label: 'Doc No.' },
    { key: 'date', label: 'Date' },
    { key: 'partyId', label: 'Party' },
    { key: 'vehicleDescription', label: 'Vehicle' },
    { key: 'lines', label: 'Quantity', format: 'quantity' },
    { key: 'status', label: 'Status', format: 'status' }
  ]
  if (c.type === 'voucher') return [
    { key: 'serialNo', label: 'Voucher No.' },
    { key: 'date', label: 'Date' },
    { key: 'partyId', label: 'Party' },
    { key: 'paymentType', label: 'Type' },
    { key: 'lines', label: 'Amount', format: 'total' },
    { key: 'status', label: 'Status', format: 'status' }
  ]
  if (c.type === 'journal') return [
    { key: 'serialNo', label: 'Voucher No.' },
    { key: 'date', label: 'Date' },
    { key: 'narration', label: 'Narration' },
    { key: 'lines', label: 'Debit', format: 'total' },
    { key: 'status', label: 'Status', format: 'status' }
  ]
  return []
})

function getBadgeStyle(v: any): Record<string, string> {
  const val = String(v || '').toLowerCase().replace(/\s+/g, '-')
  let bg = '#f1f5f9'; let color = '#475569'
  if (['posted','active','approved','passed','verified','delivered','operational'].includes(val)) {
    bg = '#dcfce7'; color = '#16a34a'
  } else if (['draft','planned','pending','estimated','saved','submitted'].includes(val)) {
    bg = '#fef9c3'; color = '#a16207'
  } else if (['cancelled','canceled','blocked','suspended','rejected','inactive'].includes(val)) {
    bg = '#fee2e2'; color = '#dc2626'
  }
  return {
    display: 'inline-flex',
    alignItems: 'center',
    height: '24px',
    padding: '0 11px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '800',
    background: bg,
    color: color,
    textTransform: 'capitalize',
    whiteSpace: 'nowrap'
  }
}

</script>
