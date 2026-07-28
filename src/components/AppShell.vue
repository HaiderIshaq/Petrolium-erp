<template>
  <div
    style="display:flex; min-height:100vh; background:#f1f5f9; font-family:'Inter',system-ui,-apple-system,sans-serif; color:#0f172a; -webkit-font-smoothing:antialiased;">

    <!-- ══════════════════════════════════════
         SIDEBAR
    ══════════════════════════════════════ -->
    <aside :style="sidebarStyle">

      <!-- Brand & Collapse Toggle (ChatGPT Style) -->
      <div :style="brandHeaderStyle">
        <template v-if="!isCollapsed">
          <div style="display:flex; align-items:center; gap:12px; min-width:0;">
            <div
              style="width:40px; height:40px; border-radius:12px; background:linear-gradient(135deg,#01aef0,#0056a8); color:#fff; display:grid; place-items:center; flex-shrink:0; font-weight:900; font-size:14px; letter-spacing:0.5px; box-shadow:0 4px 14px rgba(1,174,240,0.35);">
              PP
            </div>
            <div style="min-width:0;">
              <div
                style="font-size:12px; font-weight:800; color:#0f172a; letter-spacing:0.6px; line-height:1.2; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                PURE PETROLEUM</div>
              <div style="font-size:10.5px; color:#64748b; font-weight:600; letter-spacing:0.2px;">Enterprise ERP</div>
            </div>
          </div>

          <button @click="toggleSidebarCollapse()" title="Collapse Sidebar"
            style="width:32px; height:32px; border-radius:8px; border:1px solid #e2e8f0; background:#f8fafc; color:#64748b; display:grid; place-items:center; cursor:pointer; transition:all 0.15s;"
            @mouseenter="($event.currentTarget).style.background = '#e2e8f0'"
            @mouseleave="($event.currentTarget).style.background = '#f8fafc'">
            <PanelLeftClose :size="16" />
          </button>
        </template>

        <!-- Collapsed Mode: Hover logo to reveal Expand Toggle -->
        <template v-else>
          <button @click="toggleSidebarCollapse()" @mouseenter="isLogoHovered = true"
            @mouseleave="isLogoHovered = false" title="Expand Sidebar"
            style="width:40px; height:40px; border-radius:12px; border:0; background:transparent; display:grid; place-items:center; cursor:pointer; position:relative; padding:0; margin:auto;">
            <div v-if="!isLogoHovered"
              style="width:40px; height:40px; border-radius:12px; background:linear-gradient(135deg,#01aef0,#0056a8); color:#fff; display:grid; place-items:center; font-weight:900; font-size:14px; letter-spacing:0.5px; box-shadow:0 4px 14px rgba(1,174,240,0.35); transition:all 0.15s;">
              PP
            </div>
            <div v-else
              style="width:40px; height:40px; border-radius:12px; background:#f1f5f9; border:1px solid #cbd5e1; color:#01aef0; display:grid; place-items:center; transition:all 0.15s;">
              <PanelLeftOpen :size="18" />
            </div>
          </button>
        </template>
      </div>

      <!-- Nav -->
      <nav
        style="flex:1; overflow-y:auto; overflow-x:hidden; padding:12px 10px; scrollbar-width:thin; scrollbar-color:#334155 transparent;">

        <!-- ── DASHBOARD (Standard Nav Item) ── -->
        <div style="margin-bottom:6px;">
          <!-- Collapsed Mode: Dashboard Icon Button -->
          <div v-if="isCollapsed" style="display:flex; justify-content:center; margin-bottom:4px;">
            <button @click="store.go('dashboard')" title="Dashboard"
              :style="getCollapsedGroupBtnStyle({ title: 'Overview', items: [{ key: 'dashboard' }] })">
              <LayoutDashboard :size="18" />
            </button>
          </div>

          <!-- Expanded Mode: Standard Nav Item Button -->
          <button v-else @click="store.go('dashboard')" :style="getItemBtnStyle('dashboard')">
            <LayoutDashboard :size="16"
              :style="{ color: store.activeModule === 'dashboard' ? '#01aef0' : '#64748b', flexShrink: 0 }" />
            <span
              style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-size:13.5px; font-weight:500;">Dashboard</span>
          </button>
        </div>

        <!-- ── ALL NAV GROUPS ── -->
        <div v-for="group in store.navGroups.filter(g => g.title !== 'Overview')" :key="group.title"
          style="margin-bottom:8px;">

          <!-- Collapsed Mode: Group Icon Trigger -->
          <div v-if="isCollapsed" style="display:flex; justify-content:center; margin-bottom:4px;">
            <button @click="toggleFlyoutMenu(group, $event)" :title="group.title"
              :style="getCollapsedGroupBtnStyle(group)">
              <component :is="getGroupIcon(group.title)" :size="18" />
            </button>
          </div>

          <!-- Expanded Mode: Normal Accordion -->
          <template v-else>
            <!-- Group Header Toggle -->
            <button @click="store.toggleGroup(group.title)"
              style="width:100%; background:transparent; border:0; padding:8px 10px; display:flex; align-items:center; gap:10px; cursor:pointer; border-radius:8px; margin-bottom:3px;">
              <component :is="getGroupIcon(group.title)" :size="17" style="color:#64748b; flex-shrink:0;" />
              <span
                style="flex:1; text-align:left; font-size:13px; font-weight:700; letter-spacing:0.3px; color:#475569; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">{{
                  group.title }}</span>
              <ChevronDown v-if="store.groupOpen[group.title] !== false" :size="15" style="color:#94a3b8;" />
              <ChevronRight v-else :size="15" style="color:#94a3b8;" />
            </button>

            <!-- Group Sub-Items -->
            <div v-if="store.groupOpen[group.title] !== false"
              style="padding-left:6px; display:flex; flex-direction:column; gap:2px;">
              <button v-for="item in group.items" :key="item.key" @click="store.go(item.key)"
                :style="getItemBtnStyle(item.key)">
                <component :is="getNavIcon(item.key)" :size="16"
                  :style="{ color: store.activeModule === item.key ? '#01aef0' : '#64748b', flexShrink: 0 }" />
                <span
                  style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-size:13.5px; font-weight:500;">{{
                    item.label }}</span>
              </button>
            </div>
          </template>

        </div>
      </nav>

      <!-- Sidebar Footer -->
      <div v-if="!isCollapsed" style="padding:12px; border-top:1px solid #e2e8f0; flex-shrink:0;">
        <div
          style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:9px 14px; display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center; gap:6px;">
            <CalendarDays :size="13" style="color:#64748b;" />
            <span
              style="font-size:10px; color:#64748b; font-weight:700; text-transform:uppercase; letter-spacing:0.5px;">Financial
              Year</span>
          </div>
          <b style="font-size:11.5px; color:#0f172a; font-weight:800;">{{ store.company.financialYear || '2026–27'
          }}</b>
        </div>
      </div>
    </aside>

    <!-- ══════════════════════════════════════
         COLLAPSED FLOATING FLYOUT DROPDOWN MENU
    ══════════════════════════════════════ -->
    <div v-if="isCollapsed && activeFlyoutGroup" :style="flyoutMenuStyle">
      <!-- Flyout Header -->
      <div
        style="padding:14px 18px; border-bottom:1px solid #e2e8f0; background:#f8fafc; display:flex; align-items:center; justify-content:space-between;">
        <div style="display:flex; align-items:center; gap:10px;">
          <component :is="getGroupIcon(activeFlyoutGroup.title)" :size="18" style="color:#01aef0;" />
          <span style="font-size:13.5px; font-weight:700; letter-spacing:0.3px; color:#0f172a;">{{
            activeFlyoutGroup.title
          }}</span>
        </div>
        <button @click="activeFlyoutGroup = null"
          style="background:transparent; border:0; color:#64748b; cursor:pointer; font-size:15px; display:grid; place-items:center;">✕</button>
      </div>

      <!-- Flyout Sub-Items List -->
      <div style="padding:8px; overflow-y:auto; flex:1; display:flex; flex-direction:column; gap:2px;">
        <button v-for="item in activeFlyoutGroup.items" :key="item.key" @click="store.go(item.key)"
          :style="getFlyoutItemBtnStyle(item.key)">
          <component :is="getNavIcon(item.key)" :size="16"
            :style="{ color: store.activeModule === item.key ? '#01aef0' : '#64748b', flexShrink: 0 }" />
          <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-size:13px;">{{ item.label
          }}</span>
        </button>
      </div>
    </div>

    <!-- Backdrop for Flyout Menu when active -->
    <div v-if="isCollapsed && activeFlyoutGroup" @click="activeFlyoutGroup = null"
      style="position:fixed; inset:0; z-index:90; background:transparent;"></div>

    <!-- ══════════════════════════════════════
         MAIN AREA (Margin adjusts on collapse)
    ══════════════════════════════════════ -->
    <div :style="mainAreaStyle">

      <!-- TOPBAR (CLEAN NO SEARCH BAR) -->
      <header
        style="height:66px; position:sticky; top:0; z-index:20; background:rgba(255,255,255,0.98); backdrop-filter:blur(12px); border-bottom:1px solid #e2e8f0; display:flex; align-items:center; justify-content:space-between; padding:0 32px; flex-shrink:0; box-shadow:0 1px 6px rgba(15,23,42,0.04);">

        <!-- Left: Dynamic Breadcrumb -->
        <div style="display:flex; align-items:center; gap:8px; font-size:13px; font-weight:600; color:#475569;">
          <Home :size="15" style="color:#01aef0; flex-shrink:0;" />
          <span style="color:#64748b;">Pure Petroleum ERP</span>
          <ChevronRight :size="14" style="color:#94a3b8;" />
          <span style="color:#64748b;">{{ activeGroupTitle }}</span>
          <ChevronRight :size="14" style="color:#94a3b8;" />
          <span style="color:#0f172a; font-weight:800;">{{ store.activeTitle }}</span>
        </div>

        <!-- Right: Notifications & User Profile Dropdowns -->
        <div style="display:flex; align-items:center; gap:14px; position:relative;">

          <!-- Ask AI Button (Executive AI CTA) -->
          <button @click="isAiChatOpen = true"
            style="height:38px; padding:0 16px; background:linear-gradient(135deg,#01aef0 0%,#0056a8 100%); color:#fff; border:1px solid rgba(255,255,255,0.25); border-radius:10px; font-size:12.5px; font-weight:800; letter-spacing:0.2px; cursor:pointer; display:flex; align-items:center; gap:7px; box-shadow:0 4px 14px rgba(1,174,240,0.35); transition:all 0.2s ease;"
            @mouseenter="($event.currentTarget).style.transform = 'translateY(-1px) scale(1.02)'"
            @mouseleave="($event.currentTarget).style.transform = 'none'">
            <Sparkles :size="15" style="color:#fff;" />
            <span>Ask AI</span>
            <span
              style="width:6px; height:6px; border-radius:50%; background:#4ade80; box-shadow:0 0 6px #4ade80;"></span>
          </button>

          <!-- Notification Bell Trigger -->
          <div style="position:relative;">
            <button @click="toggleNotifications"
              style="width:38px; height:38px; border:1px solid #cbd5e1; background:#fff; border-radius:10px; display:grid; place-items:center; cursor:pointer; position:relative; box-shadow:0 1px 3px rgba(0,0,0,0.04);">
              <Bell :size="17" style="color:#475569;" />
              <span v-if="unreadCount > 0"
                style="position:absolute; top:7px; right:7px; width:8px; height:8px; background:#ef4444; border-radius:50%; border:1.5px solid #fff;"></span>
            </button>

            <!-- Notifications Dropdown Popover -->
            <div v-if="isNotificationOpen"
              style="position:absolute; top:48px; right:0; width:340px; background:#fff; border:1px solid #e2e8f0; border-radius:14px; box-shadow:0 10px 40px rgba(15,23,42,0.18); z-index:100; overflow:hidden;">
              <div
                style="padding:14px 16px; border-bottom:1px solid #e2e8f0; background:#f8fafc; display:flex; justify-content:space-between; align-items:center;">
                <div style="display:flex; align-items:center; gap:8px;">
                  <b style="font-size:13px; font-weight:800; color:#0f172a;">Notifications</b>
                  <span v-if="unreadCount > 0"
                    style="background:#e0f2fe; color:#0284c7; font-size:10px; font-weight:800; padding:2px 8px; border-radius:10px;">{{
                      unreadCount }} new</span>
                </div>
                <button v-if="notifications.length > 0" @click="clearNotifications"
                  style="background:transparent; border:0; color:#01aef0; font-size:11.5px; font-weight:700; cursor:pointer;">Clear
                  All</button>
              </div>

              <div style="max-height:280px; overflow-y:auto;">
                <div v-if="notifications.length === 0"
                  style="padding:32px; text-align:center; color:#94a3b8; font-size:12.5px; font-weight:600;">
                  No unread notifications
                </div>
                <div v-for="n in notifications" :key="n.id"
                  style="padding:12px 16px; border-bottom:1px solid #f1f5f9; display:flex; gap:12px; align-items:flex-start; background:#fff;">
                  <div
                    style="width:32px; height:32px; border-radius:9px; background:#f0f9ff; display:grid; place-items:center; flex-shrink:0; margin-top:2px;">
                    <Bell :size="15" style="color:#01aef0;" />
                  </div>
                  <div style="flex:1; min-width:0;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:2px;">
                      <b style="font-size:12px; color:#0f172a; font-weight:700;">{{ n.title }}</b>
                      <small style="font-size:10px; color:#94a3b8; font-weight:500;">{{ n.time }}</small>
                    </div>
                    <p style="font-size:11.5px; color:#64748b; margin:0; line-height:1.3; font-weight:500;">{{ n.desc }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Divider -->
          <div style="width:1px; height:28px; background:#e2e8f0;"></div>

          <!-- User Profile Dropdown Trigger -->
          <div style="position:relative;">
            <div @click="toggleProfile"
              style="display:flex; align-items:center; gap:12px; cursor:pointer; padding:5px 12px; border-radius:12px; background:#f8fafc; border:1px solid #e2e8f0;">
              <div
                style="width:36px; height:36px; border-radius:10px; background:linear-gradient(135deg,#01aef0,#0056a8); color:#fff; display:grid; place-items:center; font-weight:800; font-size:12.5px; flex-shrink:0; letter-spacing:0.5px; box-shadow:0 2px 8px rgba(1,174,240,0.3);">
                SA</div>
              <div>
                <b
                  style="font-size:13px; font-weight:800; color:#0f172a; display:block; line-height:1.2; letter-spacing:-0.1px;">Syed
                  Asif Ali</b>
                <small style="font-size:10.5px; color:#64748b; font-weight:600;">{{ store.role }}</small>
              </div>
              <ChevronDown :size="14" style="color:#64748b; margin-left:4px;" />
            </div>

            <!-- Profile Dropdown Popover -->
            <div v-if="isProfileOpen"
              style="position:absolute; top:52px; right:0; width:240px; background:#fff; border:1px solid #e2e8f0; border-radius:14px; box-shadow:0 10px 40px rgba(15,23,42,0.18); z-index:100; overflow:hidden; padding:6px;">
              <div style="padding:10px 12px; border-bottom:1px solid #f1f5f9; margin-bottom:4px;">
                <b style="font-size:13px; color:#0f172a; display:block;">Syed Asif Ali</b>
                <span style="font-size:11px; color:#64748b;">asif.ali@purepetroleum.com</span>
              </div>

              <button @click="store.go('companySettings'); isProfileOpen = false"
                style="display:flex; align-items:center; gap:10px; width:100%; padding:9px 12px; border:0; background:transparent; border-radius:8px; font-size:12.5px; font-weight:600; color:#334155; cursor:pointer; text-align:left;"
                @mouseenter="($event.currentTarget).style.background = '#f8fafc'"
                @mouseleave="($event.currentTarget).style.background = 'transparent'">
                <Building2 :size="15" style="color:#01aef0;" />
                <span>Company Settings</span>
              </button>

              <button @click="store.go('users'); isProfileOpen = false"
                style="display:flex; align-items:center; gap:10px; width:100%; padding:9px 12px; border:0; background:transparent; border-radius:8px; font-size:12.5px; font-weight:600; color:#334155; cursor:pointer; text-align:left;"
                @mouseenter="($event.currentTarget).style.background = '#f8fafc'"
                @mouseleave="($event.currentTarget).style.background = 'transparent'">
                <Shield :size="15" style="color:#01aef0;" />
                <span>Roles & Permissions</span>
              </button>

              <button @click="store.resetDemoData(); isProfileOpen = false"
                style="display:flex; align-items:center; gap:10px; width:100%; padding:9px 12px; border:0; background:transparent; border-radius:8px; font-size:12.5px; font-weight:600; color:#334155; cursor:pointer; text-align:left;"
                @mouseenter="($event.currentTarget).style.background = '#f8fafc'"
                @mouseleave="($event.currentTarget).style.background = 'transparent'">
                <RotateCcw :size="15" style="color:#01aef0;" />
                <span>Reset Demo Data</span>
              </button>

              <div style="height:1px; background:#f1f5f9; margin:4px 0;"></div>

              <button @click="onLogout"
                style="display:flex; align-items:center; gap:10px; width:100%; padding:9px 12px; border:0; background:transparent; border-radius:8px; font-size:12.5px; font-weight:700; color:#dc2626; cursor:pointer; text-align:left;"
                @mouseenter="($event.currentTarget).style.background = '#fff1f2'"
                @mouseleave="($event.currentTarget).style.background = 'transparent'">
                <LogOut :size="15" style="color:#dc2626;" />
                <span>Log Out</span>
              </button>
            </div>
          </div>

        </div>
      </header>

      <!-- PAGE CONTENT -->
      <main style="flex:1;">
        <DashboardView v-if="store.activeModule === 'dashboard'" />
        <DataModuleView
          v-else-if="config && ['master', 'workflow', 'document', 'gatepass', 'voucher', 'journal'].includes(config.type)" />
        <ReportModuleView v-else-if="config && config.type === 'report'" />
        <AnalyticsModuleView v-else-if="config && config.type === 'analytics'" />
        <SettingsModuleView v-else-if="config && config.type === 'settings'" />
        <div v-else style="padding:60px; text-align:center; color:#64748b;">
          <LayoutDashboard :size="44" style="margin:0 auto 12px; opacity:0.3;" />
          <p style="font-size:14px; font-weight:600;">Select a module from the sidebar.</p>
        </div>
      </main>

      <!-- FOOTER -->
      <footer
        style="height:52px; background:#fff; border-top:1px solid #e2e8f0; display:flex; align-items:center; justify-content:center; padding:0 32px; flex-shrink:0;">
        <div style="display:flex; align-items:center; gap:10px;">
          <span
            style="font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:0.8px; color:#94a3b8;">POWERED
            BY</span>
          <a href="https://lex9.com" target="_blank" rel="noopener noreferrer" title="Visit LEX9 Systems"
            style="display:inline-flex; align-items:center; transition:opacity 0.15s ease;">
            <img :src="lex9Logo" alt="LEX9 Systems"
              style="height:22px; width:auto; object-fit:contain; cursor:pointer;" />
          </a>
          <span style="color:#cbd5e1; font-weight:300; font-size:14px; margin:0 4px;">|</span>
          <span style="font-size:12px; color:#94a3b8; font-weight:600; letter-spacing:0.1px;">© 2026 Pure Petroleum. All
            rights reserved.</span>
        </div>
      </footer>
    </div>



    <!-- Record Modal -->
    <RecordModal v-if="store.modalState" />

    <!-- AI Chatbot Drawer -->
    <AiChatDrawer :isOpen="isAiChatOpen" @close="isAiChatOpen = false" />

    <!-- Toasts -->
    <ToastNotification />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useErpStore } from '../stores/erpStore'

const store = useErpStore()
const router = useRouter()
const route = useRoute()

// ─── Assets ───
import lex9Logo from '../assets/image/lex9.png'
import DashboardView from './DashboardView.vue'
import DataModuleView from './DataModuleView.vue'
import ReportModuleView from './ReportModuleView.vue'
import AnalyticsModuleView from './AnalyticsModuleView.vue'
import SettingsModuleView from './SettingsModuleView.vue'
import RecordModal from './RecordModal.vue'
import ToastNotification from './ToastNotification.vue'
import AiChatDrawer from './AiChatDrawer.vue'

// ─── Lucide Icons ───
import {
  ChevronDown, ChevronRight, Home, Bell, Zap, Wifi,
  LayoutDashboard, Users, Truck, Package, Warehouse, Building2,
  UserCheck, UsersRound, FileText, ShoppingCart, ClipboardList,
  ArrowRightLeft, Receipt, CreditCard, BarChart3, PieChart,
  TrendingUp, Ship, DollarSign, BookOpen, Landmark, Scale,
  Target, BriefcaseBusiness, CalendarDays, Settings, Shield,
  ActivitySquare, ClipboardCheck, PlugZap, Gauge, Droplets,
  SlidersHorizontal, Layers, PanelLeftClose, PanelLeftOpen,
  RotateCcw, LogOut, Sparkles
} from '@lucide/vue'

const config = computed(() => store.currentConfig)

// ── Dropdowns State ──
const isNotificationOpen = ref(false)
const isProfileOpen = ref(false)
const isAiChatOpen = ref(false)
const unreadCount = ref(3)

const notifications = ref([
  { id: 1, title: 'New Invoice Posted', desc: 'Sales Tax Invoice #ST-2026-089 posted for PSO Dealers.', time: '5m ago' },
  { id: 2, title: 'Reorder Stock Alert', desc: 'Premier Euro-5 Motor Gasoline stock below 500,000 Ltr level.', time: '30m ago' },
  { id: 3, title: 'Tanker Dispatch En-Route', desc: 'Tanker #KHI-8921 dispatched to Keamari Terminal.', time: '1h ago' }
])

function toggleNotifications() {
  isNotificationOpen.value = !isNotificationOpen.value
  isProfileOpen.value = false
}

function toggleProfile() {
  isProfileOpen.value = !isProfileOpen.value
  isNotificationOpen.value = false
}

function clearNotifications() {
  notifications.value = []
  unreadCount.value = 0
}

function onLogout() {
  isProfileOpen.value = false
  store.logout()
  router.push('/login')
}

const activeGroupTitle = computed(() => {
  const currentKey = store.activeModule
  if (currentKey === 'dashboard') return 'Overview'
  for (const group of store.navGroups) {
    if (group.items.some((i: any) => i.key === currentKey)) {
      return group.title
    }
  }
  return 'Module'
})

// ── Collapsible Sidebar & Flyout State ──
const isCollapsed = ref(false)
const isLogoHovered = ref(false)
const activeFlyoutGroup = ref<any | null>(null)
const flyoutPosTop = ref(60)

// ── Computed Style Objects for Fail-Safe Vue Template Parsing ──
const sidebarStyle = computed(() => ({
  position: 'fixed' as const,
  top: 0,
  left: 0,
  bottom: 0,
  width: isCollapsed.value ? '68px' : '280px',
  background: '#ffffff',
  borderRight: '1px solid #e2e8f0',
  display: 'flex',
  flexDirection: 'column' as const,
  zIndex: 40,
  boxShadow: '2px 0 16px rgba(15,23,42,0.03)',
  transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
}))

const brandHeaderStyle = computed(() => ({
  height: '66px',
  padding: isCollapsed.value ? '0 12px' : '0 16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: isCollapsed.value ? 'center' : 'space-between',
  borderBottom: '1px solid #e2e8f0',
  flexShrink: 0
}))

const dashboardBtnStyle = computed(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: isCollapsed.value ? 'center' : 'flex-start',
  gap: '12px',
  width: '100%',
  height: '42px',
  padding: isCollapsed.value ? '0' : '0 14px',
  borderRadius: '10px',
  border: store.activeModule === 'dashboard' ? '1px solid #bae6fd' : '1px solid #e2e8f0',
  marginBottom: '10px',
  cursor: 'pointer',
  fontFamily: 'Inter, sans-serif',
  fontSize: '13px',
  fontWeight: store.activeModule === 'dashboard' ? '800' : '600',
  color: store.activeModule === 'dashboard' ? '#01aef0' : '#334155',
  background: store.activeModule === 'dashboard'
    ? '#e0f7fe'
    : '#f8fafc',
  boxShadow: store.activeModule === 'dashboard' ? '0 2px 8px rgba(1,174,240,0.15)' : 'none',
  transition: 'all 0.15s ease'
}))

const mainAreaStyle = computed(() => ({
  marginLeft: isCollapsed.value ? '68px' : '280px',
  flex: 1,
  display: 'flex',
  flexDirection: 'column' as const,
  minHeight: '100vh',
  minWidth: 0,
  transition: 'margin-left 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
}))

const flyoutMenuStyle = computed(() => ({
  position: 'fixed' as const,
  left: '74px',
  top: `${flyoutPosTop.value}px`,
  width: '250px',
  maxHeight: '78vh',
  background: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '14px',
  boxShadow: '0 20px 50px rgba(15,23,42,0.12)',
  zIndex: 100,
  display: 'flex',
  flexDirection: 'column' as const,
  overflow: 'hidden'
}))

function getCollapsedGroupBtnStyle(group: any) {
  const active = isGroupActive(group)
  const isFlyoutOpen = activeFlyoutGroup.value?.title === group.title
  return {
    width: '44px',
    height: '44px',
    borderRadius: '11px',
    border: '0',
    background: isFlyoutOpen
      ? '#e0f7fe'
      : active ? '#e0f7fe' : 'transparent',
    color: active || isFlyoutOpen ? '#01aef0' : '#64748b',
    display: 'grid',
    placeItems: 'center',
    cursor: 'pointer',
    transition: 'all 0.15s'
  }
}

function getItemBtnStyle(key: string) {
  const active = store.activeModule === key
  return {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    height: '38px',
    padding: '0 10px',
    borderRadius: '8px',
    border: '0',
    fontSize: '13.5px',
    fontWeight: active ? '700' : '500',
    color: active ? '#01aef0' : '#475569',
    background: active ? '#e0f7fe' : 'transparent',
    borderLeft: active ? '3px solid #01aef0' : '3px solid transparent',
    boxShadow: active ? '0 2px 8px rgba(1,174,240,0.1)' : 'none',
    cursor: 'pointer',
    textAlign: 'left' as const,
    marginBottom: '2px',
    transition: 'all 0.15s ease'
  }
}

function getFlyoutItemBtnStyle(key: string) {
  const active = store.activeModule === key
  return {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    height: '38px',
    padding: '0 12px',
    borderRadius: '8px',
    border: '0',
    fontSize: '13px',
    fontWeight: active ? '800' : '500',
    color: active ? '#01aef0' : '#475569',
    background: active ? '#e0f7fe' : 'transparent',
    cursor: 'pointer',
    textAlign: 'left' as const,
    marginBottom: '2px'
  }
}

function toggleSidebarCollapse() {
  isCollapsed.value = !isCollapsed.value
  activeFlyoutGroup.value = null
}

function onDashboardClick() {
  store.go('dashboard')
  activeFlyoutGroup.value = null
}

function isGroupActive(group: any) {
  return group.items.some((i: any) => i.key === store.activeModule)
}

function toggleFlyoutMenu(group: any, event: MouseEvent) {
  if (activeFlyoutGroup.value?.title === group.title) {
    activeFlyoutGroup.value = null
  } else {
    activeFlyoutGroup.value = group
    const target = event.currentTarget as HTMLElement
    if (target) {
      const rect = target.getBoundingClientRect()
      flyoutPosTop.value = Math.min(rect.top, window.innerHeight - 350)
    }
  }
}

function onFlyoutItemClick(key: string) {
  store.go(key)
  activeFlyoutGroup.value = null
}

// ── Nav Item → Lucide Icon map ──
function getNavIcon(key: string) {
  const map: Record<string, any> = {
    dashboard: LayoutDashboard,
    customers: Users,
    vendors: BriefcaseBusiness,
    items: Package,
    depots: Warehouse,
    outlets: Building2,
    vehicles: Truck,
    drivers: UserCheck,
    employees: UsersRound,
    salesQuotations: FileText,
    salesOrders: ShoppingCart,
    deliveryChallans: ClipboardList,
    outwardGatePasses: ArrowRightLeft,
    salesTaxInvoices: Receipt,
    salesNonTaxInvoices: Receipt,
    pricing: DollarSign,
    creditControls: Scale,
    salesReport: BarChart3,
    purchaseRequisitions: ClipboardCheck,
    rfqs: FileText,
    purchaseOrders: ShoppingCart,
    inwardGatePasses: ArrowRightLeft,
    purchasesSalesTax: Receipt,
    purchasesNonTax: Receipt,
    goodsReceipts: ClipboardList,
    stockTransfers: ArrowRightLeft,
    stockAdjustments: SlidersHorizontal,
    inventoryBalance: Layers,
    inventoryLedger: BookOpen,
    purchaseReport: BarChart3,
    chartOfAccounts: BookOpen,
    journalVouchers: FileText,
    bankPayments: CreditCard,
    bankReceipts: CreditCard,
    cashPayments: DollarSign,
    cashReceipts: DollarSign,
    accountsLedger: BookOpen,
    customerBalance: Users,
    vendorBalance: BriefcaseBusiness,
    trialBalance: Scale,
    profitLoss: TrendingUp,
    balanceSheet: Landmark,
    costCenters: Target,
    profitCenters: PieChart,
    budgets: BarChart3,
    costAllocations: FileText,
    budgetVariance: ActivitySquare,
    profitability: TrendingUp,
    importContracts: Ship,
    lettersOfCredit: FileText,
    shipments: Ship,
    clearingCosts: DollarSign,
    landedCosts: Layers,
    importDocuments: FileText,
    tanks: Droplets,
    tankerDispatches: Truck,
    dipReadings: Gauge,
    tankReconciliation: Scale,
    productMovements: ArrowRightLeft,
    lossGainAnalysis: BarChart3,
    priceNotifications: Bell,
    users: Shield,
    approvals: ClipboardCheck,
    auditTrail: ActivitySquare,
    companySettings: Settings,
  }
  return map[key] || FileText
}

// ── Nav Group → Lucide Icon ──
function getGroupIcon(title: string) {
  const map: Record<string, any> = {
    'Overview': LayoutDashboard,
    'Master Data': Layers,
    'SD · Sales & Distribution': ShoppingCart,
    'MM · Materials Management': Package,
    'FI · Financial Accounting': Landmark,
    'CO · Controlling': PieChart,
    'Import Management': Ship,
    'OMC Operations': PlugZap,
    'Administration': Shield,
  }
  return map[title] || FileText
}


function syncFromPath() {
  // If URL has leftover hash (e.g. /dashboard#/outwardGatePasses), clean it up
  if (window.location.hash) {
    const hashKey = window.location.hash.replace(/^#\/?/, '').split('?')[0]
    const cleanKey = hashKey.startsWith('module/') ? hashKey.replace('module/', '') : hashKey
    const targetPath = (!cleanKey || cleanKey === 'login' || cleanKey === 'dashboard') ? '/' : `/${cleanKey}`
    window.history.replaceState({}, '', window.location.origin + targetPath)
  }

  let rawPath = window.location.pathname.replace(/^\//, '').split('?')[0]
  if (rawPath.startsWith('module/')) rawPath = rawPath.replace('module/', '')

  if (!rawPath || rawPath === 'login' || rawPath === 'dashboard') {
    store.activeModule = 'dashboard'
  } else if (store.moduleConfigs[rawPath]) {
    store.activeModule = rawPath
  } else {
    store.activeModule = 'dashboard'
  }
}

onMounted(() => {
  syncFromPath()
  window.addEventListener('popstate', syncFromPath)
})
</script>
