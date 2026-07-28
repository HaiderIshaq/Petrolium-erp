<template>
  <div>
    <!-- Backdrop Overlay -->
    <div
      v-if="isOpen"
      @click="$emit('close')"
      style="position:fixed; inset:0; background:rgba(15,23,42,0.4); backdrop-filter:blur(3px); z-index:90; transition:opacity 0.25s;"
    ></div>

    <!-- Right Side Sliding AI Chatbot Panel -->
    <aside
      :style="{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: '430px',
        maxWidth: '100vw',
        background: '#ffffff',
        boxShadow: '-10px 0 40px rgba(15,23,42,0.18)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        fontFamily: '\'Plus Jakarta Sans\',\'Inter\',sans-serif'
      }"
    >
      <!-- Clean White Panel Header -->
      <div style="padding:16px 20px; border-bottom:1px solid #e2e8f0; background:#ffffff; color:#0f172a; display:flex; align-items:center; justify-content:space-between;">
        <div style="display:flex; align-items:center; gap:12px;">
          <div style="width:42px; height:42px; border-radius:12px; background:#e0f7fe; border:1px solid #bae6fd; display:grid; place-items:center; position:relative;">
            <Bot :size="22" style="color:#01aef0;" />
            <span style="position:absolute; bottom:2px; right:2px; width:9px; height:9px; border-radius:50%; background:#22c55e; border:2px solid #ffffff;"></span>
          </div>
          <div>
            <div style="display:flex; align-items:center; gap:6px;">
              <b style="font-size:15px; font-weight:800; letter-spacing:-0.2px; color:#0f172a;">Pure Petroleum AI</b>
              <span style="font-size:9.5px; font-weight:800; background:#e0f7fe; color:#0056a8; border:1px solid #bae6fd; padding:2px 7px; border-radius:10px; letter-spacing:0.5px;">COPILOT</span>
            </div>
            <div style="font-size:11px; color:#64748b; font-weight:500; display:flex; align-items:center; gap:6px; margin-top:2px;">
              <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:#22c55e;"></span>
              <span>Real-time Telemetry · v3.4</span>
            </div>
          </div>
        </div>

        <div style="display:flex; align-items:center; gap:8px;">
          <button
            @click="clearChat"
            title="Reset Conversation"
            style="width:34px; height:34px; border-radius:9px; border:1px solid #e2e8f0; background:#f8fafc; color:#64748b; display:grid; place-items:center; cursor:pointer; transition:all 0.15s;"
            @mouseenter="($event.currentTarget).style.background='#e2e8f0'"
            @mouseleave="($event.currentTarget).style.background='#f8fafc'"
          >
            <RotateCcw :size="15" />
          </button>
          <button
            @click="$emit('close')"
            title="Close Assistant"
            style="width:34px; height:34px; border-radius:9px; border:1px solid #e2e8f0; background:#f8fafc; color:#64748b; display:grid; place-items:center; cursor:pointer; transition:all 0.15s;"
            @mouseenter="($event.currentTarget).style.background='#e2e8f0'"
            @mouseleave="($event.currentTarget).style.background='#f8fafc'"
          >
            <X :size="18" />
          </button>
        </div>
      </div>

      <!-- Quick Suggested Prompts Bar -->
      <div style="padding:10px 14px; background:#f8fafc; border-bottom:1px solid #e2e8f0; display:flex; gap:8px; overflow-x:auto; scrollbar-width:none;">
        <button
          v-for="chip in suggestedChips"
          :key="chip.label"
          @click="sendQuickPrompt(chip.label)"
          style="white-space:nowrap; font-size:11.5px; font-weight:700; color:#0056a8; background:#e0f7fe; border:1px solid #bae6fd; padding:6px 13px; border-radius:18px; cursor:pointer; transition:all 0.15s; display:flex; align-items:center; gap:6px; box-shadow:0 1px 3px rgba(0,0,0,0.03);"
          @mouseenter="($event.currentTarget).style.background='#d0f1fe'"
          @mouseleave="($event.currentTarget).style.background='#e0f7fe'"
        >
          <component :is="chip.icon" :size="13" style="color:#01aef0;" />
          <span>{{ chip.label }}</span>
        </button>
      </div>

      <!-- Messages Feed Area -->
      <div ref="feedRef" style="flex:1; overflow-y:auto; padding:20px; display:flex; flex-direction:column; gap:18px; background:#f8fafc;">
        
        <div v-for="msg in messages" :key="msg.id" :style="{ display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start' }">
          
          <!-- Message Sender Badge -->
          <div style="display:flex; align-items:center; gap:6px; margin-bottom:5px;">
            <span v-if="msg.sender === 'ai'" style="font-size:11px; font-weight:800; color:#01aef0; text-transform:uppercase; letter-spacing:0.6px; display:flex; align-items:center; gap:4px;">
              <div style="width:18px; height:18px; border-radius:5px; background:linear-gradient(135deg,#01aef0,#0056a8); color:#fff; display:grid; place-items:center;">
                <Sparkles :size="11" />
              </div>
              Copilot AI
            </span>
            <span v-else style="font-size:11px; font-weight:800; color:#475569; text-transform:uppercase; letter-spacing:0.6px; display:flex; align-items:center; gap:4px;">
              <div style="width:18px; height:18px; border-radius:5px; background:#64748b; color:#fff; display:grid; place-items:center;">
                <User :size="11" />
              </div>
              Syed Asif
            </span>
            <small style="font-size:10px; color:#94a3b8; font-weight:600; margin-left:4px;">{{ msg.time }}</small>
          </div>

          <!-- Message Bubble -->
          <div
            :style="{
              maxWidth: '90%',
              padding: '13px 17px',
              borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              background: msg.sender === 'user' ? 'linear-gradient(135deg,#01aef0 0%,#0056a8 100%)' : '#ffffff',
              color: msg.sender === 'user' ? '#ffffff' : '#0f172a',
              border: msg.sender === 'user' ? '0' : '1px solid #e2e8f0',
              boxShadow: msg.sender === 'user' ? '0 4px 14px rgba(1,174,240,0.3)' : '0 3px 12px rgba(15,23,42,0.04)',
              fontSize: '13px',
              lineHeight: '1.55',
              fontWeight: '500'
            }"
          >
            <!-- Formatted Content -->
            <div v-html="msg.text"></div>

            <!-- Embed Data Card -->
            <div v-if="msg.dataCard" style="margin-top:12px; padding:12px 14px; background:#f0f9ff; border:1px solid #bae6fd; border-radius:12px; box-shadow:0 2px 8px rgba(1,174,240,0.08);">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                <b style="font-size:12px; color:#0f172a; font-weight:800;">{{ msg.dataCard.title }}</b>
                <span style="font-size:10px; font-weight:800; color:#16a34a; background:#dcfce7; padding:2px 7px; border-radius:8px;">VERIFIED</span>
              </div>
              <div style="font-size:18px; font-weight:800; color:#01aef0; letter-spacing:-0.3px; margin:2px 0 4px;">{{ msg.dataCard.value }}</div>
              <small style="font-size:11px; color:#475569; font-weight:600; display:block;">{{ msg.dataCard.sub }}</small>
            </div>
          </div>

        </div>

        <!-- AI Typing Indicator -->
        <div v-if="isThinking" style="display:flex; align-items:center; gap:10px; padding:12px 16px; background:#fff; border:1px solid #e2e8f0; border-radius:16px; width:fit-content; boxShadow:0 4px 14px rgba(15,23,42,0.05);">
          <div style="width:24px; height:24px; border-radius:7px; background:linear-gradient(135deg,#01aef0,#0056a8); color:#fff; display:grid; place-items:center;">
            <Cpu :size="13" />
          </div>
          <div style="display:flex; flex-direction:column;">
            <span style="font-size:12px; font-weight:700; color:#0f172a;">AI Engine Thinking...</span>
            <span style="font-size:10.5px; color:#64748b; font-weight:500;">Querying petroleum ERP live datastream</span>
          </div>
        </div>

      </div>

      <!-- Input Footer Area -->
      <div style="padding:16px; border-top:1px solid #e2e8f0; background:#ffffff; box-shadow:0 -4px 14px rgba(15,23,42,0.03);">
        <form @submit.prevent="handleSend" style="display:flex; gap:10px; align-items:center;">
          <div style="position:relative; flex:1;">
            <input
              v-model="inputText"
              type="text"
              placeholder="Ask Copilot AI about revenue, tanks, LCs or dealers..."
              style="width:100%; height:44px; border:1.5px solid #cbd5e1; border-radius:12px; padding:0 14px 0 38px; font-size:13px; outline:none; color:#0f172a; font-family:'Plus Jakarta Sans',sans-serif; transition:all 0.15s;"
              @focus="($event.target as HTMLElement).style.borderColor='#01aef0'"
              @blur="($event.target as HTMLElement).style.borderColor='#cbd5e1'"
            />
            <Sparkles :size="16" style="position:absolute; left:12px; top:14px; color:#01aef0;" />
          </div>

          <button
            type="submit"
            :disabled="!inputText.trim()"
            style="height:44px; width:44px; border-radius:12px; background:linear-gradient(135deg,#01aef0 0%,#0056a8 100%); border:0; color:#fff; display:grid; place-items:center; cursor:pointer; box-shadow:0 4px 14px rgba(1,174,240,0.35); transition:all 0.15s; flex-shrink:0;"
            @mouseenter="($event.currentTarget).style.transform='scale(1.04)'"
            @mouseleave="($event.currentTarget).style.transform='none'"
          >
            <Send :size="17" />
          </button>
        </form>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px; padding:0 2px;">
          <small style="font-size:10.5px; color:#94a3b8; font-weight:600;">Press Enter to query ERP neural index</small>
          <span style="font-size:10px; font-weight:800; color:#01aef0; background:#e0f7fe; padding:2px 8px; border-radius:8px;">AI COPILOT v3.4</span>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import {
  Bot, Sparkles, Send, X, RotateCcw, User, Cpu,
  TrendingUp, Warehouse, Wallet, Ship
} from '@lucide/vue'

const props = defineProps<{
  isOpen: boolean
}>()

defineEmits(['close'])

const feedRef = ref<HTMLElement | null>(null)
const inputText = ref('')
const isThinking = ref(false)

const suggestedChips = [
  { label: 'Today Sales & Revenue', icon: TrendingUp },
  { label: 'Keamari Tank Stock',      icon: Warehouse },
  { label: 'Overdue Dealer Credit',  icon: Wallet },
  { label: 'Incoming Import LCs',    icon: Ship }
]

const messages = ref<Array<{
  id: number
  sender: 'user' | 'ai'
  text: string
  time: string
  dataCard?: { title: string; value: string; sub: string }
}>>([
  {
    id: 1,
    sender: 'ai',
    text: 'Hello <b>Syed Asif</b>! I am your <b>Pure Petroleum ERP Copilot AI</b>. Ask me anything about live terminal inventory, gross revenue trajectory, dealer credit risk aging, or crude cargo shipping LCs.',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
])

function scrollToBottom() {
  nextTick(() => {
    if (feedRef.value) {
      feedRef.value.scrollTop = feedRef.value.scrollHeight
    }
  })
}

function clearChat() {
  messages.value = [
    {
      id: Date.now(),
      sender: 'ai',
      text: 'Conversation telemetry reset. How can I assist with OMC operations today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]
}

function sendQuickPrompt(promptText: string) {
  inputText.value = promptText
  handleSend()
}

function handleSend() {
  const query = inputText.value.trim()
  if (!query) return

  const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  // Push User message
  messages.value.push({
    id: Date.now(),
    sender: 'user',
    text: query,
    time: nowTime
  })

  inputText.value = ''
  isThinking.value = true
  scrollToBottom()

  // Simulate AI Neural Processing with rich ERP data logic
  setTimeout(() => {
    isThinking.value = false
    const qLower = query.toLowerCase()

    let responseText = ''
    let dataCardObj: any = undefined

    if (qLower.includes('revenue') || qLower.includes('sales') || qLower.includes('today')) {
      responseText = 'Gross OMC Sales Revenue for FY 2025-26 is currently <b>PKR 4.85 Billion</b> (+14.2% over target PKR 4.25B). Daily dispatch volume is averaging <b>4.85 Million Liters</b> across 485 active retail outlets.'
      dataCardObj = {
        title: 'Gross Revenue Performance',
        value: 'PKR 4.85 Billion',
        sub: '+14.2% MoM Growth | Avg OMC Margin: Rs 12.80 / Ltr'
      }
    } else if (qLower.includes('tank') || qLower.includes('stock') || qLower.includes('keamari') || qLower.includes('hsd') || qLower.includes('depot')) {
      responseText = 'Real-time Terminal Storage Telemetry:<br/>• <b>Keamari Terminal Karachi</b>: 12.4M / 15.0M Ltr HSD Euro-5 (82% Full)<br/>• <b>Machike Depot Sheikhupura</b>: 8.9M / 10.0M Ltr PMG Euro-5 (89% Full)<br/>• <b>Shikarpur Terminal</b>: 6.5M / 8.0M Ltr HSD Euro-5 (81% Full)'
      dataCardObj = {
        title: 'Keamari Terminal HSD Level',
        value: '12.4 Million Liters',
        sub: '82% Tank Capacity (Optimal Operational Buffer)'
      }
    } else if (qLower.includes('credit') || qLower.includes('dealer') || qLower.includes('overdue') || qLower.includes('receivable')) {
      responseText = 'Dealer Credit Exposure Analysis: Total receivables stand at <b>PKR 1.18 Billion</b>. <b>88.5% is fully secured</b> via Bank Guarantees. 4 dealers are currently in 61-90 days overdue category.'
      dataCardObj = {
        title: 'Dealer Receivables Exposure',
        value: '88.5% Bank Guaranteed',
        sub: 'PKR 1.18B Credit Portfolio Across 485 Dealer Networks'
      }
    } else if (qLower.includes('cargo') || qLower.includes('lc') || qLower.includes('vessel') || qLower.includes('import') || qLower.includes('ship')) {
      responseText = 'Import Logistics Pipeline: <b>12 Cargo Tankers</b> scheduled.<br/>• <b>MT Keamari Star</b> (LC-2026-0891): 45,000 MT Arabian Light Crude at Pier 1 (Discharging, PKR 780M LC).<br/>• <b>MT Indus Pioneer</b>: 38,000 MT HSD Euro-5 arriving July 26 at Port Qasim FOTCO.'
      dataCardObj = {
        title: 'Discharging Vessel Pier 1',
        value: 'MT Keamari Star',
        sub: '45,000 MT Crude Oil | LC PKR 780.0M'
      }
    } else {
      responseText = `Query "<b>${query}</b>" processed across Petroleum ERP telemetry index. Operations are running within standard baseline across 485 OMC outlets and 4 primary depots.`
    }

    messages.value.push({
      id: Date.now() + 1,
      sender: 'ai',
      text: responseText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      dataCard: dataCardObj
    })

    scrollToBottom()
  }, 650)
}

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    scrollToBottom()
  }
})
</script>
