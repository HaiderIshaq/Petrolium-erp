<template>
  <div v-if="store.modalState" style="position:fixed; inset:0; z-index:100; background:rgba(15,23,42,0.65); backdrop-filter:blur(6px); display:flex; align-items:center; justify-content:center; padding:16px; overflow-y:auto;">
    <section style="background:#fff; border-radius:20px; box-shadow:0 25px 70px rgba(0,0,0,0.3); width:100%; max-width:1020px; max-height:92vh; display:flex; flex-direction:column; overflow:hidden; border:1px solid rgba(255,255,255,0.8); margin:auto;">

      <!-- Modal Header -->
      <div style="padding:18px 24px; border-bottom:1px solid #eef2f6; display:flex; justify-content:space-between; align-items:center; background:linear-gradient(180deg,#fafbfc 0%,#f4f6f8 100%);">
        <div style="display:flex; align-items:center; gap:12px;">
          <div style="width:38px; height:38px; border-radius:11px; background:linear-gradient(135deg,#01aef0,#0056a8); color:#fff; display:grid; place-items:center; font-weight:800; font-size:14px; box-shadow:0 4px 12px rgba(1,174,240,0.35);">
            <FileEdit v-if="store.modalState.editing" :size="18" />
            <Sparkles v-else :size="18" />
          </div>
          <div>
            <div style="font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.8px; color:#01aef0;">
              {{ store.modalState.editing ? 'Modify Record' : 'Create New Record' }}
            </div>
            <h2 style="font-size:17px; font-weight:800; color:#17202a; margin:2px 0 0; letter-spacing:-0.2px;">
              {{ store.modalState.editing ? 'Edit ' : 'New ' }} {{ config?.entity || 'Record' }}
            </h2>
          </div>
        </div>

        <button
          type="button"
          @click="store.closeModal()"
          style="width:34px; height:34px; border-radius:10px; border:1px solid #e2e8f0; background:#fff; color:#64748b; font-size:18px; font-weight:700; display:grid; place-items:center; cursor:pointer; transition:all 0.15s;"
          @mouseenter="($event.currentTarget).style.background='#f8fafc'"
          @mouseleave="($event.currentTarget).style.background='#fff'"
        >
          <X :size="18" />
        </button>
      </div>

      <!-- Modal Body -->
      <div style="padding:24px; overflow-y:auto; flex:1; scrollbar-width:thin;">
        <form id="recordForm" @submit.prevent>
          <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:18px;">
            <label
              v-for="f in fields"
              :key="f.key"
              :style="{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                gridColumn: f.type === 'textarea' ? '1 / -1' : 'span 1'
              }"
            >
              <span style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.5px; color:#475569;">
                {{ f.label }} <span v-if="f.required" style="color:#01aef0;">*</span>
              </span>

              <!-- Select Field -->
              <select
                v-if="f.type === 'select'"
                v-model="store.modalState.record[f.key]"
                :required="f.required"
                style="height:40px; border:1px solid #cbd5e1; border-radius:10px; padding:0 12px; font-size:13px; outline:none; color:#0f172a; background:#fff; cursor:pointer; font-family:'Inter',sans-serif; transition:all 0.15s;"
                @focus="onInputFocus"
                @blur="onInputBlur"
              >
                <option value="">Select {{ f.label }}</option>
                <option v-for="o in f.options || []" :key="o" :value="o">
                  {{ o }}
                </option>
              </select>

              <!-- Textarea Field -->
              <textarea
                v-else-if="f.type === 'textarea'"
                v-model="store.modalState.record[f.key]"
                :required="f.required"
                rows="3"
                style="border:1px solid #cbd5e1; border-radius:10px; padding:10px 12px; font-size:13px; outline:none; color:#0f172a; background:#fff; font-family:'Inter',sans-serif; resize:vertical; transition:all 0.15s;"
                @focus="onInputFocus"
                @blur="onInputBlur"
              ></textarea>

              <!-- Input Field -->
              <input
                v-else
                :type="f.type === 'number' ? 'number' : f.type === 'date' ? 'date' : 'text'"
                v-model="store.modalState.record[f.key]"
                :required="f.required"
                style="height:40px; border:1px solid #cbd5e1; border-radius:10px; padding:0 12px; font-size:13px; outline:none; color:#0f172a; background:#fff; font-family:'Inter',sans-serif; transition:all 0.15s;"
                @focus="onInputFocus"
                @blur="onInputBlur"
              />
            </label>
          </div>

          <!-- Line Items Editor -->
          <div v-if="isLineModule" style="margin-top:28px; border-top:1px solid #e2e8f0; padding-top:20px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
              <h3 style="font-size:13px; font-weight:800; color:#0f172a; text-transform:uppercase; letter-spacing:0.6px; margin:0; display:flex; align-items:center; gap:6px;">
                <Layers :size="15" style="color:#01aef0;" />
                Line Items Breakdown
              </h3>
              <button
                type="button"
                @click="store.addLineToModal()"
                style="height:34px; padding:0 14px; border:1px solid #01aef0; background:#e0f7fe; color:#01aef0; font-size:12px; font-weight:700; border-radius:8px; cursor:pointer; display:flex; align-items:center; gap:6px; transition:all 0.15s;"
              >
                <Plus :size="14" />
                Add Item Line
              </button>
            </div>

            <!-- Table -->
            <div style="border:1px solid #e2e8f0; border-radius:12px; overflow:hidden; background:#fff; box-shadow:0 1px 4px rgba(0,0,0,0.03);">
              <div style="overflow-x:auto;">
                <table style="width:100%; border-collapse:collapse; min-width:750px; font-size:12px;">
                  <thead>
                    <tr style="background:#f8fafc; border-bottom:1px solid #e2e8f0;">
                      <th v-for="k in lineKeys" :key="k" style="padding:10px 12px; text-align:left; font-size:10px; font-weight:800; color:#475569; text-transform:uppercase; letter-spacing:0.5px; white-space:nowrap;">
                        {{ String(k).replace(/([A-Z])/g, ' $1') }}
                      </th>
                      <th style="padding:10px 12px; width:44px;"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(line, idx) in store.modalState.record.lines || []" :key="line.id || idx" style="border-bottom:1px solid #f1f5f9;">
                      <td v-for="k in lineKeys" :key="k" style="padding:6px 8px;">
                        <input
                          :type="typeof line[k] === 'number' ? 'number' : 'text'"
                          v-model="line[k]"
                          style="width:100%; height:34px; padding:0 10px; border:1px solid #e2e8f0; border-radius:7px; outline:none; font-size:12px; color:#0f172a; background:#fff; font-family:'Inter',sans-serif;"
                          @focus="onInputFocus"
                          @blur="onInputBlur"
                        />
                      </td>
                      <td style="padding:6px; text-align:center; vertical-align:middle;">
                        <button
                          type="button"
                          @click="store.removeLineFromModal(idx)"
                          style="width:28px; height:28px; border-radius:6px; border:1px solid #fecdd3; background:#fff1f2; color:#e11d48; font-weight:800; font-size:14px; display:grid; place-items:center; cursor:pointer; transition:all 0.15s;"
                        >
                          <Trash2 :size="14" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Summary Bar -->
            <div style="display:flex; justify-content:flex-end; margin-top:14px;">
              <div style="background:linear-gradient(135deg,#f8fafc 0%,#edf2f7 100%); border:1px solid #cbd5e1; border-radius:12px; padding:12px 18px; width:300px; display:flex; flex-direction:column; gap:6px;">
                <div style="display:flex; justify-content:space-between; font-size:12px; color:#64748b;">
                  <span>Total Line Count:</span>
                  <b style="color:#0f172a;">{{ (store.modalState.record.lines || []).length }}</b>
                </div>
                <div style="display:flex; justify-content:space-between; font-size:14px; font-weight:800; color:#0f172a; border-top:1px solid #cbd5e1; padding-top:6px; margin-top:2px;">
                  <span>Document Total:</span>
                  <span style="color:#01aef0; font-size:16px;">
                    {{ money(Number(totalRecord(store.modalState.record, config?.type || ''))) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <!-- Modal Footer -->
      <div style="padding:16px 24px; border-top:1px solid #eef2f6; display:flex; justify-content:flex-end; gap:10px; background:#fafbfc;">
        <button
          type="button"
          @click="store.closeModal()"
          style="height:42px; padding:0 20px; border-radius:10px; border:1px solid #cbd5e1; background:#fff; font-size:13px; font-weight:700; color:#475569; cursor:pointer; transition:all 0.15s; display:flex; align-items:center; gap:6px;"
          @mouseenter="($event.currentTarget).style.background='#f8fafc'"
          @mouseleave="($event.currentTarget).style.background='#fff'"
        >
          <Ban :size="15" />
          Cancel
        </button>
        <button
          type="button"
          @click="store.saveRecord()"
          style="height:42px; padding:0 24px; border-radius:10px; background:linear-gradient(135deg,#01aef0 0%,#0056a8 100%); border:0; color:#fff; font-size:13px; font-weight:700; cursor:pointer; box-shadow:0 4px 14px rgba(1,174,240,0.35); transition:all 0.15s; display:flex; align-items:center; gap:6px;"
        >
          <Save :size="15" />
          Save Record
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useErpStore, money, totalRecord } from '../stores/erpStore'
import { FileEdit, Sparkles, X, Plus, Trash2, Layers, Save, Ban } from '@lucide/vue'

const store = useErpStore()

const config = computed(() => (store.modalState ? store.moduleConfigs[store.modalState.moduleKey] : null))

const fields = computed((): any[] => {
  if (!store.modalState) return []
  const c = config.value
  const rec = store.modalState.record || {}
  if (c && c.fields) return c.fields as any[]
  const keys = Object.keys(rec).filter(
    (k) => !['id', 'lines', 'createdAt', 'convertedTo', 'canceled'].includes(k)
  )
  return keys.map((k) => ({
    key: k,
    label: k.replace(/([A-Z])/g, ' $1').replace(/^./, (x: string) => x.toUpperCase()),
    type: typeof rec[k] === 'number' ? 'number' : k.toLowerCase().includes('date') ? 'date' : k === 'status' ? 'select' : 'text',
    options: k === 'status' ? ['Draft', 'Saved', 'Pending', 'Approved', 'Posted', 'Delivered', 'Cancelled'] : undefined,
    required: false
  }))
})

const lineKeys = computed(() => {
  if (!store.modalState) return []
  const lines = store.modalState.record?.lines || []
  if (lines.length > 0 && lines[0]) {
    return Object.keys(lines[0]).filter((k) => k !== 'id')
  }
  const type = config.value?.type
  if (type === 'journal') return ['accountCode', 'accountName', 'debit', 'credit', 'costCenter', 'description']
  if (type === 'voucher') return ['invoiceNo', 'invoiceDate', 'amount', 'whtRate', 'whtAmount', 'gstRate', 'gstAmount', 'advance', 'discount']
  return ['itemCode', 'description', 'quantity', 'unit', 'rate', 'taxRate', 'furtherTaxRate', 'discountPercent', 'packingDetail']
})

const isLineModule = computed(() => {
  return ['document', 'gatepass', 'voucher', 'journal'].includes(config.value?.type || '')
})

function onInputFocus(e: FocusEvent) {
  const el = e.target as HTMLElement
  el.style.borderColor = '#01aef0'
  el.style.boxShadow = '0 0 0 3px rgba(1, 174, 240, 0.15)'
}

function onInputBlur(e: FocusEvent) {
  const el = e.target as HTMLElement
  el.style.borderColor = '#cbd5e1'
  el.style.boxShadow = 'none'
}
</script>
