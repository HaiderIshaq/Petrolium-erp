<template>
  <div v-if="config" style="padding:28px 32px; width:100%; font-family:'Plus Jakarta Sans','Inter',sans-serif;">

    <!-- Header -->
    <div style="margin-bottom:24px;">
      <h1 style="font-size:24px; font-weight:800; color:#0f172a; margin:0 0 4px 0; letter-spacing:-0.4px;">{{ config.title }}</h1>
      <p style="font-size:13px; color:#475569; margin:0; font-weight:500;">Filter parameters, generate reports, and export to CSV.</p>
    </div>

    <!-- Filters Bar -->
    <div style="background:#fff; border:1px solid #e2e8f0; border-radius:14px; padding:18px 20px; margin-bottom:18px; box-shadow:0 1px 4px rgba(15,23,42,0.04); display:flex; gap:14px; flex-wrap:wrap; align-items:flex-end;">
      <label style="display:flex; flex-direction:column; gap:6px; min-width:150px;">
        <span style="font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:0.5px; color:#475569;">From Date</span>
        <input type="date" v-model="fromDate" style="height:38px; border:1px solid #cbd5e1; border-radius:9px; padding:0 12px; font-size:13px; outline:none; color:#0f172a; font-family:'Inter',sans-serif;" />
      </label>
      <label style="display:flex; flex-direction:column; gap:6px; min-width:150px;">
        <span style="font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:0.5px; color:#475569;">To Date</span>
        <input type="date" v-model="toDate" style="height:38px; border:1px solid #cbd5e1; border-radius:9px; padding:0 12px; font-size:13px; outline:none; color:#0f172a; font-family:'Inter',sans-serif;" />
      </label>
      <label style="display:flex; flex-direction:column; gap:6px; flex:1; min-width:200px;">
        <span style="font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:0.5px; color:#475569;">Filter Text</span>
        <input type="text" placeholder="Search account, party, product or document..." v-model="searchFilter" style="height:38px; border:1px solid #cbd5e1; border-radius:9px; padding:0 14px; font-size:13px; outline:none; color:#0f172a; width:100%; font-family:'Inter',sans-serif;" />
      </label>
      <div style="display:flex; gap:10px;">
        <button @click="onDisplay" style="height:38px; padding:0 20px; background:linear-gradient(135deg,#01aef0,#0056a8); color:#fff; border:0; border-radius:10px; font-size:13px; font-weight:700; cursor:pointer; box-shadow:0 4px 14px rgba(1,174,240,0.35);">Display</button>
        <button @click="onExportCsv" style="height:38px; padding:0 16px; background:#fff; border:1px solid #cbd5e1; border-radius:10px; font-size:13px; font-weight:700; cursor:pointer; color:#334155;">Export CSV</button>
      </div>
    </div>

    <!-- Report Output Table -->
    <div v-if="store.reportShown" style="background:#fff; border:1px solid #e2e8f0; border-radius:14px; box-shadow:0 2px 12px rgba(15,23,42,0.05); overflow:hidden;">
      <div style="padding:16px 20px; border-bottom:1px solid #e2e8f0; background:#f8fafc; display:flex; justify-content:space-between; align-items:flex-start; gap:16px;">
        <div>
          <span style="font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:1px; color:#01aef0;">{{ store.company.name }}</span>
          <h2 style="font-size:17px; font-weight:800; color:#0f172a; margin:4px 0 2px; letter-spacing:-0.2px;">{{ config.title }}</h2>
          <span style="font-size:12px; color:#64748b; font-weight:600;">{{ fromDate }} to {{ toDate }} · {{ filteredReportRows.length }} rows found</span>
        </div>
        <div style="text-align:right;">
          <b style="display:block; font-size:13px; font-weight:800; color:#0f172a;">Lahore Head Office</b>
          <span style="font-size:11.5px; color:#64748b; font-weight:600;">Pakistan</span>
        </div>
      </div>
      <div style="overflow-x:auto;">
        <table style="width:100%; border-collapse:collapse; min-width:750px; font-size:13px;">
          <thead>
            <tr style="background:#f8fafc; border-bottom:1px solid #e2e8f0;">
              <th v-for="col in reportDef.cols" :key="col[0]" style="padding:12px 16px; text-align:left; font-size:11px; font-weight:800; color:#475569; text-transform:uppercase; letter-spacing:0.6px; white-space:nowrap;">
                {{ col[1] }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredReportRows.length === 0">
              <td :colspan="reportDef.cols.length" style="padding:48px; text-align:center; color:#64748b; font-weight:600;">No matching records for the selected filters.</td>
            </tr>
            <tr
              v-for="(r, idx) in filteredReportRows"
              :key="idx"
              style="border-bottom:1px solid #f1f5f9;"
            >
              <td
                v-for="col in reportDef.cols"
                :key="col[0]"
                :style="{
                  padding: '12px 16px',
                  verticalAlign: 'middle',
                  textAlign: typeof getCell(r, col[0]) === 'number' ? 'right' : 'left',
                  fontFamily: typeof getCell(r, col[0]) === 'number' ? 'monospace' : 'inherit',
                  fontWeight: typeof getCell(r, col[0]) === 'number' ? '700' : '500',
                  whiteSpace: 'nowrap',
                  color: '#0f172a'
                }"
              >
                <template v-if="col[0] === 'status'">
                  <span :style="getStatusStyle(getCell(r, col[0]))">{{ getCell(r, col[0]) }}</span>
                </template>
                <template v-else-if="typeof getCell(r, col[0]) === 'number'">
                  {{ isMoneyOrNumField(col[0]) ? money(Number(getCell(r, col[0]))) : num(Number(getCell(r, col[0]))) }}
                </template>
                <template v-else>{{ getCell(r, col[0]) ?? '' }}</template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-else style="background:#fff; border:1px solid #e2e8f0; border-radius:14px; padding:60px 20px; text-align:center; color:#64748b; font-size:13.5px; font-weight:600; box-shadow:0 1px 4px rgba(15,23,42,0.04);">
      Set date parameters and click <b style="color:#01aef0;">Display</b> to view report output.
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useErpStore, money, num, totalRecord } from '../stores/erpStore'

const store = useErpStore()

const fromDate = ref(store.reportFrom)
const toDate = ref(store.reportTo)
const searchFilter = ref(store.reportSearch)

const config = computed(() => store.currentConfig)

const reportDef = computed((): { rows: any[]; cols: [string, string][] } => {
  const type = config.value?.reportType
  const data = store.data

  if (type === 'sales') {
    const docs = [...(data.salesTaxInvoices || []), ...(data.salesNonTaxInvoices || [])]
    return {
      rows: docs.map((r) => ({
        date: r.date,
        document: r.serialNo,
        party: store.partyName(r.partyId, { partyDataset: 'customers' } as any),
        net: totalRecord(r, 'document'),
        status: r.status
      })),
      cols: [['date','Date'],['document','Invoice'],['party','Customer / Dealer'],['net','Net Sales'],['status','Status']]
    }
  }
  if (type === 'purchase') {
    const docs = [...(data.purchasesSalesTax || []), ...(data.purchasesNonTax || [])]
    return {
      rows: docs.map((r) => ({
        date: r.date,
        document: r.serialNo,
        party: store.partyName(r.partyId, { partyDataset: 'vendors' } as any),
        net: totalRecord(r, 'document'),
        status: r.status
      })),
      cols: [['date','Date'],['document','Invoice'],['party','Vendor'],['net','Net Purchase'],['status','Status']]
    }
  }
  if (type === 'accountsLedger') {
    return { rows: data.ledgerEntries || [], cols: [['date','Date'],['voucher','Voucher'],['accountName','Account'],['description','Description'],['debit','Debit'],['credit','Credit'],['balance','Balance']] }
  }
  if (type === 'customerBalance') {
    return { rows: data.customers || [], cols: [['code','Code'],['name','Customer'],['creditLimit','Credit Limit'],['balance','Balance'],['status','Status']] }
  }
  if (type === 'vendorBalance') {
    return { rows: data.vendors || [], cols: [['code','Code'],['name','Vendor'],['balance','Balance'],['status','Status']] }
  }
  if (type === 'inventoryBalance') {
    return { rows: data.items || [], cols: [['code','Code'],['description','Product / Material'],['unit','Unit'],['stock','Current Stock'],['reorderLevel','Reorder Level'],['salesRate','Sales Rate']] }
  }
  if (type === 'inventoryLedger') {
    return { rows: data.inventoryTransactions || [], cols: [['date','Date'],['document','Document'],['depot','Depot'],['description','Product'],['quantityIn','In'],['quantityOut','Out'],['balance','Balance']] }
  }
  if (type === 'trialBalance') {
    const coa = data.chartOfAccounts || []
    return {
      rows: coa.map((a: any) => ({ code: a.code, name: a.name, debit: Number(a.balance) > 0 ? Number(a.balance) : 0, credit: Number(a.balance) < 0 ? Math.abs(Number(a.balance)) : 0 })),
      cols: [['code','Account'],['name','Description'],['debit','Debit'],['credit','Credit']]
    }
  }
  if (type === 'auditTrail') {
    return { rows: data.auditTrail || [], cols: [['dateTime','Date & Time'],['user','User'],['action','Action'],['module','Module'],['reference','Reference'],['details','Details']] }
  }
  return { rows: [], cols: [] }
})

const filteredReportRows = computed(() => {
  const def = reportDef.value
  const q = searchFilter.value.toLowerCase().trim()
  const fDate = fromDate.value
  const tDate = toDate.value
  return def.rows.filter((r: any) => {
    const matchDate = (!fDate || !r.date || String(r.date) >= fDate) && (!tDate || !r.date || String(r.date) <= tDate)
    const matchQuery = !q || JSON.stringify(r).toLowerCase().includes(q)
    return matchDate && matchQuery
  })
})

function onDisplay() {
  store.reportFrom = fromDate.value
  store.reportTo = toDate.value
  store.reportSearch = searchFilter.value
  store.reportShown = true
}

function onExportCsv() {
  const def = reportDef.value
  const cols = def.cols.map((c: [string, string]) => ({ key: c[0], label: c[1] }))
  store.exportCsv(cols, filteredReportRows.value)
}

function isMoneyOrNumField(key: string) {
  const k = key.toLowerCase()
  return ['net','amount','balance','creditlimit','debit','credit','salesrate','value','revenue','cost','budget','actual'].some((x) => k.includes(x))
}

function getCell(row: any, key: string): any {
  return row[key]
}

function getStatusStyle(v: any): Record<string, string> {
  const s = String(v || '').toLowerCase()
  let bg = '#f1f5f9'; let color = '#475569'
  if (['posted','active','approved','delivered','operational'].includes(s)) { bg = '#dcfce7'; color = '#16a34a' }
  else if (['draft','planned','pending','saved','submitted'].includes(s)) { bg = '#fef9c3'; color = '#a16207' }
  else if (['cancelled','blocked','suspended','rejected'].includes(s)) { bg = '#fee2e2'; color = '#dc2626' }
  return { display: 'inline-flex', alignItems: 'center', height: '24px', padding: '0 11px', borderRadius: '20px', fontSize: '11px', fontWeight: '800', background: bg, color, whiteSpace: 'nowrap' }
}
</script>
