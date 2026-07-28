<template>
  <div v-if="config" style="padding:28px 32px; width:100%; font-family:'Plus Jakarta Sans','Inter',sans-serif;">

    <!-- Header -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; gap:16px; flex-wrap:wrap;">
      <div>
        <h1 style="font-size:24px; font-weight:800; color:#17202a; margin:0 0 4px; letter-spacing:-0.4px;">
          {{ config.title }}
        </h1>
        <p style="font-size:13px; color:#6b7480; margin:0;">
          Management analysis & intelligence derived from real-time operational data.
        </p>
      </div>
    </div>

    <!-- KPI Summary Cards -->
    <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-bottom:24px;">
      <div
        v-for="(x, i) in analyticsModel.cards"
        :key="i"
        style="background:#fff; border:1px solid #e8ecf0; border-radius:16px; padding:20px; box-shadow:0 8px 25px rgba(15,23,42,0.07), 0 2px 6px rgba(0,143,211,0.03); display:flex; flex-direction:column; justify-content:space-between; transition:transform 0.2s ease, box-shadow 0.2s ease;"
      >
        <span style="font-size:11.5px; font-weight:600; color:#6b7480; text-transform:uppercase; letter-spacing:0.5px;">{{ x[0] }}</span>
        <b style="font-size:22px; font-weight:800; color:#17202a; margin:10px 0 4px; letter-spacing:-0.5px; font-variant-numeric:tabular-nums;">
          {{ isCount(String(x[0])) ? num(Number(x[1])) : money(Number(x[1])) }}
        </b>
        <small style="font-size:11px; color:#9ba5b1; font-weight:500;">Current period metric</small>
      </div>
    </div>

    <!-- Detailed Visual Breakdown -->
    <div style="background:#fff; border:1px solid #e8ecf0; border-radius:16px; box-shadow:0 2px 14px rgba(20,30,45,0.06); overflow:hidden;">
      <div style="padding:16px 20px; border-bottom:1px solid #f0f3f6; background:#fafbfc; display:flex; justify-content:space-between; align-items:center;">
        <h3 style="font-size:14px; font-weight:800; color:#17202a; margin:0;">Detailed Breakdown & Distribution</h3>
        <span style="font-size:11px; color:#6b7480; font-weight:600;">Comparative Metrics</span>
      </div>

      <div style="padding:24px; display:flex; flex-direction:column; gap:16px;">
        <div
          v-for="(row, idx) in analyticsModel.rows"
          :key="idx"
          style="display:grid; grid-template-columns:220px 1fr 140px; gap:16px; align-items:center;"
        >
          <span style="font-size:13px; font-weight:600; color:#17202a; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">{{ row[0] }}</span>
          <div style="height:12px; border-radius:10px; background:#eef2f6; overflow:hidden; width:100%;">
            <div
              style="height:100%; background:linear-gradient(90deg,#01aef0,#0056a8); border-radius:10px; transition:width 0.4s ease;"
              :style="{ width: `${getPct(Number(row[1] || 0))}%` }"
            ></div>
          </div>
          <b style="font-size:13px; font-family:monospace; font-weight:700; text-align:right; color:#17202a;">{{ money(Number(row[1] || 0)) }}</b>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useErpStore, money, num } from '../stores/erpStore'

const store = useErpStore()

const config = computed(() => store.currentConfig)

const analyticsModel = computed(() => {
  const type = config.value?.reportType
  const coa = store.data.chartOfAccounts || []

  if (type === 'profitLoss') {
    const rev = Math.abs(
      coa.filter((a: any) => a.group === 'Revenue').reduce((s: number, a: any) => s + Number(a.balance || 0), 0)
    )
    const cost = coa
      .filter((a: any) => a.group === 'Cost of Sales')
      .reduce((s: number, a: any) => s + Number(a.balance || 0), 0)
    const op = coa
      .filter((a: any) => a.group === 'Operating Expense')
      .reduce((s: number, a: any) => s + Number(a.balance || 0), 0)

    return {
      cards: [
        ['Revenue', rev],
        ['Cost of Sales', cost],
        ['Operating Expenses', op],
        ['Net Profit', rev - cost - op]
      ],
      rows: [
        ['Petroleum Sales', rev],
        ['Cost of Products', cost],
        ['Operating Expense', op],
        ['Net Profit', rev - cost - op]
      ]
    }
  }

  if (type === 'balanceSheet') {
    const assets = coa
      .filter((a: any) => a.group === 'Assets')
      .reduce((s: number, a: any) => s + Number(a.balance || 0), 0)
    const liab = Math.abs(
      coa.filter((a: any) => a.group === 'Liabilities').reduce((s: number, a: any) => s + Number(a.balance || 0), 0)
    )
    const eq = Math.abs(
      coa.filter((a: any) => a.group === 'Equity').reduce((s: number, a: any) => s + Number(a.balance || 0), 0)
    )

    return {
      cards: [
        ['Assets', assets],
        ['Liabilities', liab],
        ['Equity', eq],
        ['Working Capital', assets - liab]
      ],
      rows: coa
        .filter((a: any) => ['Assets', 'Liabilities', 'Equity'].includes(a.group))
        .map((a: any) => [a.name, Number(a.balance || 0)])
    }
  }

  if (type === 'budgetVariance') {
    const cc = store.data.costCenters || []
    return {
      cards: [
        ['Annual Budget', cc.reduce((s: number, r: any) => s + Number(r.annualBudget || 0), 0)],
        ['Actual Spend', cc.reduce((s: number, r: any) => s + Number(r.actual || 0), 0)],
        ['Available', cc.reduce((s: number, r: any) => s + Number(r.annualBudget || 0) - Number(r.actual || 0), 0)],
        ['Cost Centres', cc.length]
      ],
      rows: cc.map((r: any) => [r.name, Number(r.annualBudget || 0), Number(r.actual || 0)])
    }
  }

  if (type === 'profitability') {
    const pc = store.data.profitCenters || []
    return {
      cards: [
        ['Revenue', pc.reduce((s: number, r: any) => s + Number(r.revenue || 0), 0)],
        ['Cost', pc.reduce((s: number, r: any) => s + Number(r.cost || 0), 0)],
        ['Contribution', pc.reduce((s: number, r: any) => s + Number(r.revenue || 0) - Number(r.cost || 0), 0)],
        ['Profit Centres', pc.length]
      ],
      rows: pc.map((r: any) => [r.name, Number(r.revenue || 0), Number(r.cost || 0)])
    }
  }

  const tr = store.data.tankReconciliation || []
  return {
    cards: [
      ['Book Closing', tr.reduce((s: number, r: any) => s + Number(r.bookClosing || 0), 0)],
      ['Physical Closing', tr.reduce((s: number, r: any) => s + Number(r.physicalClosing || 0), 0)],
      ['Variance', tr.reduce((s: number, r: any) => s + Number(r.variance || 0), 0)],
      ['Tanks Reviewed', tr.length]
    ],
    rows: tr.map((r: any) => [`${r.depot} · ${r.tank}`, Number(r.variance || 0)])
  }
})

const maxVal = computed(() => {
  const values = analyticsModel.value.rows.flatMap((r: any[]) =>
    r.slice(1).filter((x: any) => typeof x === 'number').map(Math.abs)
  )
  return Math.max(...values, 1)
})

function getPct(val: number) {
  return Math.max(2, (Math.abs(val) / maxVal.value) * 100)
}

function isCount(label: string) {
  return ['Cost Centres', 'Profit Centres', 'Tanks Reviewed'].includes(label)
}

</script>
