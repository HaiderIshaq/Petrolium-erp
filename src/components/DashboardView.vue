<template>
  <div style="padding:28px 32px; width:100%; font-family:'Plus Jakarta Sans','Inter',sans-serif;">

    <!-- ══ PAGE HEADER ══ -->
    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:24px; gap:16px; flex-wrap:wrap;">
      <div>
        <h1 style="font-size:24px; font-weight:700; color:#0f172a; margin:0 0 4px 0; letter-spacing:-0.3px;">
          Dashboard
        </h1>
        <p style="font-size:13px; color:#64748b; margin:0; font-weight:400;">
          Real-time terminal inventory, fuel dispatch trajectory, dealer credit risk & import logistics.
        </p>
      </div>

      <div style="display:flex; gap:10px; align-items:center;">
        <div style="background:#fff; border:1px solid #e2e8f0; border-radius:10px; padding:8px 14px; font-size:12.5px; color:#334155; font-weight:600; box-shadow:0 1px 3px rgba(15,23,42,0.03); display:flex; align-items:center; gap:8px;">
          <Calendar :size="15" style="color:#01aef0;" />
          <span>{{ todayDate }}</span>
        </div>
        <button
          @click="store.resetDemoData()"
          style="height:38px; padding:0 16px; background:#fff; border:1px solid #cbd5e1; border-radius:10px; font-size:12.5px; font-weight:600; color:#334155; cursor:pointer; display:flex; align-items:center; gap:6px; box-shadow:0 1px 3px rgba(15,23,42,0.03); transition:all 0.15s;"
        >
          <RotateCcw :size="14" style="color:#01aef0;" />
          Reset Demo Data
        </button>
      </div>
    </div>

    <!-- ══ 4 HIGH-VALUE METRIC CARDS (RESPONSIVE GRID) ══ -->
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:16px; margin-bottom:24px;">
      
      <!-- Card 1: Gross OMC Sales Revenue -->
      <div style="background:#fff; border:1px solid #e2e8f0; border-radius:14px; padding:20px 22px; box-shadow:0 8px 25px rgba(15,23,42,0.07), 0 2px 6px rgba(1,174,240,0.03); display:flex; flex-direction:column; justify-content:space-between; transition:transform 0.2s ease, box-shadow 0.2s ease;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:14px;">
          <span style="font-size:12.5px; font-weight:600; color:#64748b;">Gross OMC Sales Revenue</span>
          <div style="width:40px; height:40px; border-radius:10px; background:#e0f7fe; display:grid; place-items:center; flex-shrink:0;">
            <LineChart :size="20" style="color:#01aef0;" />
          </div>
        </div>
        <div>
          <div style="font-size:24px; font-weight:700; color:#0f172a; letter-spacing:-0.3px; line-height:1.2; font-variant-numeric:tabular-nums;">
            PKR 4.85 Billion
          </div>
          <div style="margin-top:10px;">
            <span style="color:#16a34a; font-weight:700; display:inline-flex; align-items:center; gap:4px; background:#dcfce7; padding:3px 10px; border-radius:12px; font-size:11.5px;">
              <TrendingUp :size="13" /> +14.2%
            </span>
          </div>
        </div>
      </div>

      <!-- Card 2: Total Fuel Dispatch Volume -->
      <div style="background:#fff; border:1px solid #e2e8f0; border-radius:14px; padding:20px 22px; box-shadow:0 8px 25px rgba(15,23,42,0.07), 0 2px 6px rgba(1,174,240,0.03); display:flex; flex-direction:column; justify-content:space-between; transition:transform 0.2s ease, box-shadow 0.2s ease;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:14px;">
          <span style="font-size:12.5px; font-weight:600; color:#64748b;">Fuel Dispatch Volume</span>
          <div style="width:40px; height:40px; border-radius:10px; background:#dcfce7; display:grid; place-items:center; flex-shrink:0;">
            <Droplets :size="20" style="color:#16a34a;" />
          </div>
        </div>
        <div>
          <div style="font-size:24px; font-weight:700; color:#0f172a; letter-spacing:-0.3px; line-height:1.2; font-variant-numeric:tabular-nums;">
            148.5 Million Ltr
          </div>
          <div style="margin-top:10px;">
            <span style="color:#16a34a; font-weight:700; display:inline-flex; align-items:center; gap:4px; background:#dcfce7; padding:3px 10px; border-radius:12px; font-size:11.5px;">
              <TrendingUp :size="13" /> +8.7%
            </span>
          </div>
        </div>
      </div>

      <!-- Card 3: Crude & Fuel Import LCs -->
      <div style="background:#fff; border:1px solid #e2e8f0; border-radius:14px; padding:20px 22px; box-shadow:0 8px 25px rgba(15,23,42,0.07), 0 2px 6px rgba(1,174,240,0.03); display:flex; flex-direction:column; justify-content:space-between; transition:transform 0.2s ease, box-shadow 0.2s ease;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:14px;">
          <span style="font-size:12.5px; font-weight:600; color:#64748b;">Crude & Cargo Import LCs</span>
          <div style="width:40px; height:40px; border-radius:10px; background:#e0f7fe; display:grid; place-items:center; flex-shrink:0;">
            <Ship :size="20" style="color:#01aef0;" />
          </div>
        </div>
        <div>
          <div style="font-size:24px; font-weight:700; color:#0f172a; letter-spacing:-0.3px; line-height:1.2; font-variant-numeric:tabular-nums;">
            PKR 2.34 Billion
          </div>
          <div style="margin-top:10px;">
            <span style="color:#01aef0; font-weight:700; display:inline-flex; align-items:center; gap:4px; background:#e0f7fe; padding:3px 10px; border-radius:12px; font-size:11.5px;">
              <TrendingUp :size="13" /> +5.4%
            </span>
          </div>
        </div>
      </div>

      <!-- Card 4: Dealer Credit Exposure -->
      <div style="background:#fff; border:1px solid #e2e8f0; border-radius:14px; padding:20px 22px; box-shadow:0 8px 25px rgba(15,23,42,0.07), 0 2px 6px rgba(1,174,240,0.03); display:flex; flex-direction:column; justify-content:space-between; transition:transform 0.2s ease, box-shadow 0.2s ease;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:14px;">
          <span style="font-size:12.5px; font-weight:600; color:#64748b;">Dealer Credit Exposure</span>
          <div style="width:40px; height:40px; border-radius:10px; background:#fef3c7; display:grid; place-items:center; flex-shrink:0;">
            <Wallet :size="20" style="color:#d97706;" />
          </div>
        </div>
        <div>
          <div style="font-size:24px; font-weight:700; color:#0f172a; letter-spacing:-0.3px; line-height:1.2; font-variant-numeric:tabular-nums;">
            PKR 1.18 Billion
          </div>
          <div style="margin-top:10px;">
            <span style="color:#d97706; font-weight:700; display:inline-flex; align-items:center; gap:4px; background:#fef3c7; padding:3px 10px; border-radius:12px; font-size:11.5px;">
              <ShieldCheck :size="13" /> 88.5% Secured
            </span>
          </div>
        </div>
      </div>

    </div>

    <!-- ══ ROW 1 CHARTS (CHART 1 & CHART 2) ══ -->
    <div style="display:grid; grid-template-columns:1.8fr 1fr; gap:20px; margin-bottom:24px;">

      <!-- CHART 1: Monthly OMC Revenue & Fuel Dispatch Trajectory (Interactive Dual-Axis Bar + Line Chart) -->
      <div style="background:#fff; border:1px solid #e2e8f0; border-radius:14px; padding:22px; box-shadow:0 8px 25px rgba(15,23,42,0.06); display:flex; flex-direction:column; justify-content:space-between;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">
          <div>
            <div style="display:flex; align-items:center; gap:8px;">
              <h2 style="font-size:15px; font-weight:700; color:#0f172a; margin:0;">
                1. Monthly Revenue & Dispatch Trajectory
              </h2>
              <span style="font-size:10px; font-weight:700; color:#01aef0; background:#e0f7fe; padding:2px 8px; border-radius:10px;">FY 2025-26</span>
            </div>
            <span style="font-size:12px; color:#64748b; font-weight:400;">
              Monthly Revenue (PKR Millions) vs Dispatch Volume (M Ltr)
            </span>
          </div>
          <div style="display:flex; align-items:center; gap:16px; font-size:12px; font-weight:600; color:#475569;">
            <div style="display:flex; align-items:center; gap:6px;">
              <div style="width:10px; height:10px; border-radius:3px; background:#01aef0;"></div>
              <span>Revenue (PKR M)</span>
            </div>
            <div style="display:flex; align-items:center; gap:6px;">
              <div style="width:10px; height:10px; border-radius:3px; background:#22c55e;"></div>
              <span>Dispatch (M Ltr)</span>
            </div>
          </div>
        </div>

        <!-- SVG Dual Axis Bar + Trend Line Chart -->
        <div style="position:relative; height:220px; width:100%; border-bottom:1px solid #e2e8f0;">
          
          <!-- Tooltip Hover Popover -->
          <div
            v-if="hoveredBarIndex !== null"
            :style="{
              position: 'absolute',
              top: '10px',
              left: `${(hoveredBarIndex / 11) * 85 + 6}%`,
              background: '#0f172a',
              color: '#fff',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '11px',
              fontWeight: '600',
              zIndex: 10,
              boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
              pointerEvents: 'none',
              transform: 'translateX(-50%)'
            }"
          >
            <div style="font-weight:700; color:#38bdf8; margin-bottom:2px;">{{ fullMonths[hoveredBarIndex].month }} 2026</div>
            <div>Revenue: <b>PKR {{ fullMonths[hoveredBarIndex].rev }}M</b></div>
            <div>Dispatch: <b>{{ fullMonths[hoveredBarIndex].vol }}M Ltr</b></div>
            <div style="color:#4ade80;">MoM Growth: +{{ fullMonths[hoveredBarIndex].growth }}%</div>
          </div>

          <!-- Horizontal Grid Lines -->
          <div style="position:absolute; inset:0; display:flex; flex-direction:column; justify-content:space-between; opacity:0.4; pointer-events:none;">
            <div style="border-bottom:1px dashed #cbd5e1; width:100%;"></div>
            <div style="border-bottom:1px dashed #cbd5e1; width:100%;"></div>
            <div style="border-bottom:1px dashed #cbd5e1; width:100%;"></div>
            <div style="border-bottom:1px dashed #cbd5e1; width:100%;"></div>
          </div>

          <!-- Dual Bar Bars -->
          <div style="position:absolute; inset:0; display:flex; align-items:flex-end; justify-content:space-between; padding:0 10px; z-index:2;">
            <div
              v-for="(m, idx) in fullMonths"
              :key="idx"
              @mouseenter="hoveredBarIndex = idx"
              @mouseleave="hoveredBarIndex = null"
              style="flex:1; display:flex; flex-direction:column; align-items:center; height:100%; justify-content:flex-end; cursor:pointer;"
            >
              <div style="display:flex; align-items:flex-end; justify-content:center; gap:3px; height:180px;">
                <div
                  :style="{
                    height: (m.rev / 550) * 100 + '%',
                    width: '11px',
                    background: hoveredBarIndex === idx ? '#0056a8' : 'linear-gradient(180deg,#01aef0 0%,#0056a8 100%)',
                    borderRadius: '4px 4px 0 0',
                    transition: 'all 0.15s ease'
                  }"
                ></div>
                <div
                  :style="{
                    height: (m.vol / 550) * 100 + '%',
                    width: '11px',
                    background: hoveredBarIndex === idx ? '#15803d' : 'linear-gradient(180deg,#22c55e 0%,#16a34a 100%)',
                    borderRadius: '4px 4px 0 0',
                    transition: 'all 0.15s ease'
                  }"
                ></div>
              </div>
              <span style="font-size:11px; font-weight:600; color:#64748b; margin-top:6px;">{{ m.month }}</span>
            </div>
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; padding-top:12px; font-size:12px; color:#475569; font-weight:500;">
          <span>Peak Month: <b style="color:#0f172a; font-weight:700;">December (PKR 520M)</b></span>
          <span>Avg OMC Margin: <b style="color:#16a34a; font-weight:700;">Rs 12.80 / Ltr</b></span>
          <span>Annual Revenue: <b style="color:#01aef0; font-weight:700;">PKR 4.85 Billion</b></span>
        </div>
      </div>

      <!-- CHART 2: Fuel Product Mix Donut & Share Breakdown -->
      <div style="background:#fff; border:1px solid #e2e8f0; border-radius:14px; padding:22px; box-shadow:0 8px 25px rgba(15,23,42,0.06); display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:4px;">
            <h2 style="font-size:15px; font-weight:700; color:#0f172a; margin:0;">
              2. Fuel Product Mix Share
            </h2>
            <PieChart :size="16" style="color:#01aef0;" />
          </div>
          <span style="font-size:12px; color:#64748b; font-weight:400;">
            148.5M Ltr Total Dispatch Allocation
          </span>
        </div>

        <!-- Donut Visual Ring + Center Metric -->
        <div style="display:flex; align-items:center; justify-content:center; position:relative; margin:14px 0;">
          <svg width="150" height="150" viewBox="0 0 42 42">
            <!-- Donut Segments -->
            <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#f1f5f9" stroke-width="5"></circle>
            
            <!-- Segment 1: HSD (39.3%) -->
            <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#01aef0" stroke-width="5" stroke-dasharray="39.3 60.7" stroke-dashoffset="25"></circle>
            <!-- Segment 2: PMG (35.1%) -->
            <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#22c55e" stroke-width="5" stroke-dasharray="35.1 64.9" stroke-dashoffset="-14.3"></circle>
            <!-- Segment 3: HOBC (14.7%) -->
            <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#0284c7" stroke-width="5" stroke-dasharray="14.7 85.3" stroke-dashoffset="-49.4"></circle>
            <!-- Segment 4: FO & Jet (10.9%) -->
            <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#d97706" stroke-width="5" stroke-dasharray="10.9 89.1" stroke-dashoffset="-64.1"></circle>
          </svg>
          <div style="position:absolute; text-align:center;">
            <b style="font-size:16px; font-weight:800; color:#0f172a; display:block; line-height:1.1;">148.5M</b>
            <span style="font-size:10px; color:#64748b; font-weight:600;">Liters Total</span>
          </div>
        </div>

        <div style="display:flex; flex-direction:column; gap:8px;">
          <div v-for="f in fuelProducts" :key="f.name" style="display:flex; justify-content:space-between; align-items:center; font-size:12px;">
            <div style="display:flex; align-items:center; gap:6px;">
              <div :style="{ width:'8px', height:'8px', borderRadius:'50%', background: f.color }"></div>
              <span style="color:#334155; font-weight:600;">{{ f.shortName }}</span>
            </div>
            <b style="color:#0f172a; font-weight:700;">{{ f.pct }}% ({{ f.vol }})</b>
          </div>
        </div>
      </div>

    </div>

    <!-- ══ ROW 2 CHARTS (CHART 3 & CHART 4) ══ -->
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:24px;">

      <!-- CHART 3: Regional Terminal Tank Stock Allocation (Multi-Depot Capacity Progress Bar Chart) -->
      <div style="background:#fff; border:1px solid #e2e8f0; border-radius:14px; padding:22px; box-shadow:0 8px 25px rgba(15,23,42,0.06);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">
          <div>
            <div style="display:flex; align-items:center; gap:8px;">
              <Warehouse :size="18" style="color:#01aef0;" />
              <h3 style="font-size:15px; font-weight:700; color:#0f172a; margin:0;">
                3. Terminal Stock Capacity & Buffer
              </h3>
            </div>
            <span style="font-size:12px; color:#64748b; font-weight:400;">
              Primary Depots Real-time Storage Volume vs Maximum Capacity
            </span>
          </div>
          <button @click="store.go('tankReconciliation')" style="font-size:11.5px; color:#01aef0; background:#e0f7fe; border:0; padding:4px 12px; border-radius:8px; font-weight:600; cursor:pointer;">
            View Tanks
          </button>
        </div>

        <div style="display:flex; flex-direction:column; gap:14px;">
          <div v-for="t in regionalTanks" :key="t.name" style="padding:12px 14px; border:1px solid #f1f5f9; border-radius:12px; background:#f8fafc;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; font-size:12.5px;">
              <div>
                <b style="color:#0f172a; font-weight:700;">{{ t.name }}</b>
                <span style="font-size:11px; color:#64748b; margin-left:6px; font-weight:500;">Product: {{ t.product }}</span>
              </div>
              <div style="text-align:right;">
                <b style="color:#0f172a; font-weight:700;">{{ t.current }} / {{ t.capacity }} M Ltr</b>
                <span :style="{ fontSize:'11px', fontWeight:'700', marginLeft:'8px', color: t.statusColor }">{{ t.pct }}% Full</span>
              </div>
            </div>
            <!-- Stacked Capacity Bar -->
            <div style="height:8px; width:100%; background:#e2e8f0; border-radius:10px; overflow:hidden; position:relative;">
              <div :style="{ width: t.pct + '%', height:'100%', background: t.color, borderRadius:'10px', transition:'width 0.4s' }"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- CHART 4: Dealer Credit Exposure & Aging Risk Analysis (Aging Bucket Bar Chart) -->
      <div style="background:#fff; border:1px solid #e2e8f0; border-radius:14px; padding:22px; box-shadow:0 8px 25px rgba(15,23,42,0.06);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">
          <div>
            <div style="display:flex; align-items:center; gap:8px;">
              <BarChart3 :size="18" style="color:#d97706;" />
              <h3 style="font-size:15px; font-weight:700; color:#0f172a; margin:0;">
                4. Dealer Credit Exposure & Aging Risk
              </h3>
            </div>
            <span style="font-size:12px; color:#64748b; font-weight:400;">
              PKR 1.18 Billion Total Receivables Distribution Across Aging Buckets
            </span>
          </div>
          <button @click="store.go('creditControls')" style="font-size:11.5px; color:#d97706; background:#fef3c7; border:0; padding:4px 12px; border-radius:8px; font-weight:600; cursor:pointer;">
            Credit Audit
          </button>
        </div>

        <!-- Aging Bucket Bars -->
        <div style="display:flex; flex-direction:column; gap:14px;">
          <div v-for="b in creditAging" :key="b.bucket" style="padding:10px 14px; border:1px solid #f1f5f9; border-radius:12px; background:#fff;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; font-size:12.5px;">
              <div style="display:flex; align-items:center; gap:8px;">
                <b style="color:#0f172a; font-weight:700;">{{ b.bucket }}</b>
                <span :style="{ fontSize:'10.5px', fontWeight:'700', padding:'2px 8px', borderRadius:'10px', background: b.badgeBg, color: b.badgeColor }">{{ b.risk }}</span>
              </div>
              <b style="color:#0f172a; font-weight:700;">PKR {{ b.amount }} Million ({{ b.pct }}%)</b>
            </div>
            <div style="height:8px; width:100%; background:#f1f5f9; border-radius:10px; overflow:hidden;">
              <div :style="{ width: b.pct + '%', height:'100%', background: b.color, borderRadius:'10px' }"></div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- ══ ROW 3 CHART: CHART 5 (Crude Oil & Cargo Import Pipeline - Ship Cargo Schedule) ══ -->
    <div style="background:#fff; border:1px solid #e2e8f0; border-radius:14px; padding:22px; box-shadow:0 8px 25px rgba(15,23,42,0.06); margin-bottom:24px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">
        <div>
          <div style="display:flex; align-items:center; gap:8px;">
            <Ship :size="18" style="color:#0284c7;" />
            <h3 style="font-size:15px; font-weight:700; color:#0f172a; margin:0;">
              5. Cargo Vessel Import & LC Logistics Schedule
            </h3>
          </div>
          <span style="font-size:12px; color:#64748b; font-weight:400;">
            12 Cargo Tankers Scheduled at Keamari & Port Qasim Oil Piers
          </span>
        </div>
        <button @click="store.go('importContracts')" style="font-size:11.5px; color:#0284c7; background:#e0f2fe; border:0; padding:5px 14px; border-radius:8px; font-weight:600; cursor:pointer;">
          View All LCs
        </button>
      </div>

      <!-- Cargo Table Schedule -->
      <div style="border:1px solid #e2e8f0; border-radius:12px; overflow:hidden; background:#fff;">
        <table style="width:100%; border-collapse:collapse; font-size:12.5px; text-align:left;">
          <thead>
            <tr style="background:#f8fafc; border-bottom:1px solid #e2e8f0; color:#475569; font-size:11px; text-transform:uppercase; letter-spacing:0.5px;">
              <th style="padding:10px 14px; font-weight:700;">Vessel / Tanker</th>
              <th style="padding:10px 14px; font-weight:700;">Product Cargo</th>
              <th style="padding:10px 14px; font-weight:700;">Volume (MT)</th>
              <th style="padding:10px 14px; font-weight:700;">LC Value (PKR)</th>
              <th style="padding:10px 14px; font-weight:700;">ETA / Port Pier</th>
              <th style="padding:10px 14px; font-weight:700;">Progress / Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="c in cargoVessels" :key="c.name" style="border-bottom:1px solid #f1f5f9;">
              <td style="padding:12px 14px; font-weight:700; color:#0f172a;">
                <div style="display:flex; align-items:center; gap:8px;">
                  <div style="width:28px; height:28px; border-radius:6px; background:#e0f2fe; display:grid; place-items:center;">
                    <Ship :size="14" style="color:#0284c7;" />
                  </div>
                  <div>
                    <b>{{ c.name }}</b>
                    <small style="display:block; font-size:10.5px; color:#64748b; font-weight:500;">Ref: {{ c.ref }}</small>
                  </div>
                </div>
              </td>
              <td style="padding:12px 14px; color:#334155; font-weight:600;">{{ c.product }}</td>
              <td style="padding:12px 14px; font-weight:700; color:#0f172a; font-family:monospace;">{{ c.volume }} MT</td>
              <td style="padding:12px 14px; font-weight:700; color:#01aef0; font-family:monospace;">PKR {{ c.lcValue }}M</td>
              <td style="padding:12px 14px; color:#475569; font-weight:500;">{{ c.eta }} · {{ c.pier }}</td>
              <td style="padding:12px 14px;">
                <div style="display:flex; align-items:center; gap:8px;">
                  <div style="flex:1; height:6px; background:#f1f5f9; border-radius:10px; overflow:hidden;">
                    <div :style="{ width: c.progress + '%', height:'100%', background: c.statusColor, borderRadius:'10px' }"></div>
                  </div>
                  <span :style="{ fontSize:'11px', fontWeight:'700', padding:'2px 8px', borderRadius:'10px', background: c.statusBg, color: c.statusColor }">{{ c.status }}</span>
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
import { ref } from 'vue'
import { useErpStore } from '../stores/erpStore'
import {
  TrendingUp, Wallet, Ship, Droplets,
  LineChart, Warehouse, Calendar, RotateCcw,
  PieChart, BarChart3, ShieldCheck
} from '@lucide/vue'

const store = useErpStore()
const todayDate = new Date().toLocaleDateString('en-PK', { weekday:'long', year:'numeric', month:'long', day:'numeric' })

const hoveredBarIndex = ref<number | null>(null)

// 1. Dual Axis Bar Chart Data (12 Months)
const fullMonths = [
  { month: 'Jan', rev: 280, vol: 250, growth: '4.2' },
  { month: 'Feb', rev: 310, vol: 275, growth: '5.1' },
  { month: 'Mar', rev: 345, vol: 310, growth: '6.8' },
  { month: 'Apr', rev: 390, vol: 350, growth: '7.5' },
  { month: 'May', rev: 425, vol: 380, growth: '8.1' },
  { month: 'Jun', rev: 485, vol: 420, growth: '12.4' },
  { month: 'Jul', rev: 450, vol: 410, growth: '9.0' },
  { month: 'Aug', rev: 465, vol: 425, growth: '9.8' },
  { month: 'Sep', rev: 480, vol: 440, growth: '10.5' },
  { month: 'Oct', rev: 495, vol: 455, growth: '11.2' },
  { month: 'Nov', rev: 510, vol: 470, growth: '11.9' },
  { month: 'Dec', rev: 520, vol: 485, growth: '13.1' }
]

// 2. Fuel Products Share Data
const fuelProducts = [
  { name: 'HSD Euro-5 (High Speed Diesel)', shortName: 'HSD Euro-5', vol: '58.4M Ltr', pct: 39.3, color: '#01aef0' },
  { name: 'PMG Euro-5 (Motor Gasoline 92)', shortName: 'PMG Euro-5', vol: '52.1M Ltr', pct: 35.1, color: '#22c55e' },
  { name: 'HOBC 97 (High Octane)',           shortName: 'HOBC 97',    vol: '21.8M Ltr', pct: 14.7, color: '#0284c7' },
  { name: 'FO & Jet A-1 (Aviation Fuel)',    shortName: 'FO & Jet A-1',vol: '16.2M Ltr', pct: 10.9, color: '#d97706' }
]

// 3. Regional Tank Allocation Data
const regionalTanks = [
  { name: 'Keamari Terminal Karachi', product: 'HSD Euro-5', current: '12.4', capacity: '15.0', pct: 82, color: '#01aef0', statusColor: '#01aef0' },
  { name: 'Machike Depot Sheikhupura',product: 'PMG Euro-5', current: '8.9',  capacity: '10.0', pct: 89, color: '#22c55e', statusColor: '#16a34a' },
  { name: 'Shikarpur OMC Terminal',  product: 'HSD Euro-5', current: '6.5',  capacity: '8.0',  pct: 81, color: '#01aef0', statusColor: '#01aef0' },
  { name: 'Rawalpindi Main Terminal', product: 'HOBC 97',    current: '2.1',  capacity: '5.0',  pct: 42, color: '#d97706', statusColor: '#d97706' }
]

// 4. Dealer Credit Aging Risk Data
const creditAging = [
  { bucket: '0 - 30 Days (Current)', amount: '680.5', pct: 57.6, risk: 'Low Risk', color: '#22c55e', badgeBg: '#dcfce7', badgeColor: '#16a34a' },
  { bucket: '31 - 60 Days (Standard)',amount: '290.2', pct: 24.5, risk: 'Normal',   color: '#01aef0', badgeBg: '#e0f7fe', badgeColor: '#0284c7' },
  { bucket: '61 - 90 Days (Overdue)', amount: '145.8', pct: 12.3, risk: 'Attention',color: '#d97706', badgeBg: '#fef3c7', badgeColor: '#b45309' },
  { bucket: '90+ Days (Critical)',    amount: '63.5',  pct: 5.6,  risk: 'High Priority',color: '#dc2626', badgeBg: '#fee2e2', badgeColor: '#dc2626' }
]

// 5. Cargo Vessels Import Schedule Data
const cargoVessels = [
  { name: 'MT Keamari Star', ref: 'LC-2026-0891', product: 'Arabian Light Crude', volume: '45,000', lcValue: '780.0', eta: 'Today', pier: 'Keamari Pier 1', progress: 95, status: 'Discharging', statusBg: '#dcfce7', statusColor: '#16a34a' },
  { name: 'MT Indus Pioneer',ref: 'LC-2026-0894', product: 'High Speed Diesel (HSD)', volume: '38,000', lcValue: '620.5', eta: '26 Jul 2026', pier: 'Port Qasim FOTCO', progress: 65, status: 'In Port', statusBg: '#e0f2fe', statusColor: '#0284c7' },
  { name: 'MT Gulf Express', ref: 'LC-2026-0902', product: 'Motor Gasoline (PMG 92)', volume: '50,000', lcValue: '840.0', eta: '29 Jul 2026', pier: 'Keamari Pier 3', progress: 35, status: 'En Route', statusBg: '#fef3c7', statusColor: '#d97706' },
  { name: 'MT Arabian Sun',  ref: 'LC-2026-0915', product: 'Aviation Fuel Jet A-1', volume: '22,000', lcValue: '310.0', eta: '02 Aug 2026', pier: 'Port Qasim FOTCO', progress: 15, status: 'Customs Clear', statusBg: '#e0f2fe', statusColor: '#0284c7' }
]
</script>
