<template>
  <div class="min-h-screen w-full flex bg-white text-slate-900 overflow-x-hidden selection:bg-[#01aef0]/20" style="font-family: 'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif;">
    
    <!-- ══════════════════════════════════════════════════════════════
         LEFT SIDE: Light Corporate Background (Tailwind CSS)
    ══════════════════════════════════════════════════════════════ -->
    <div class="hidden lg:flex flex-1 min-h-screen bg-slate-50 relative flex-col justify-between p-12 border-r border-slate-200 overflow-hidden">
      
      <!-- Video Background -->
      <video
        autoplay
        muted
        loop
        playsinline
        class="absolute inset-0 w-full h-full object-cover pointer-events-none"
        :src="authBgVideo"
      ></video>
      <!-- Dark Overlay on top of video -->
      <div class="absolute inset-0 bg-slate-900/60 pointer-events-none"></div>
      <!-- Subtle gradient overlay for readability -->
      <div class="absolute inset-0 bg-gradient-to-b from-[#0f172a]/40 via-transparent to-[#0f172a]/70 pointer-events-none"></div>


      <!-- Top Spacer -->
      <div class="relative z-10"></div>

      <!-- CENTER CONTENT -->
      <div class="relative z-10 max-w-xl mx-auto my-auto text-center py-6">
        
        <!-- LOGO MARK ABOVE TEXT (Matching Reference Screenshot) -->
        <div class="flex flex-col items-center justify-center mb-7">
          <!-- Stylized Geometric Logo Icon -->
          <div class="w-20 h-20 mb-3 flex items-center justify-center">
            <svg width="76" height="76" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 68 L42 26 L62 48 L82 12 L82 38 L62 74 L42 52 L20 68 Z" fill="#ffffff" />
              <path d="M36 84 L52 58 L68 74 L88 42 L88 62 L68 90 L52 76 L36 84 Z" fill="#01aef0" />
            </svg>
          </div>

          <div class="text-3xl font-black tracking-tight text-white uppercase leading-none drop-shadow-lg">
            PURE PETROLEUM
          </div>
          <div class="text-[10px] font-bold tracking-[0.25em] text-slate-300 uppercase mt-1.5">
            ENTERPRISE ERP SYSTEM
          </div>
        </div>

        <!-- MAIN HEADING -->
        <h1 class="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4 tracking-tight drop-shadow-md">
          Empower Your Business With<br />Smart ERP Intelligence
        </h1>

        <!-- SUBTITLE -->
        <p class="text-sm text-slate-200 font-medium leading-relaxed mb-8 max-w-lg mx-auto">
          Seamlessly unify your Financial Accounting, Controlling, Inventory &amp; Operations in one single intelligent ecosystem.
        </p>

        <!-- 3 PILL BADGES (Matching Reference Screenshot) -->
        <div class="flex flex-wrap items-center justify-center gap-3">
          <div class="px-4 py-2 rounded-full border border-white/30 bg-white/15 backdrop-blur-sm text-xs font-semibold text-white flex items-center gap-2 shadow-sm">
            <ShieldCheck :size="15" class="text-[#01aef0]" />
            <span>Enterprise Security</span>
          </div>

          <div class="px-4 py-2 rounded-full border border-white/30 bg-white/15 backdrop-blur-sm text-xs font-semibold text-white flex items-center gap-2 shadow-sm">
            <TrendingUp :size="15" class="text-[#01aef0]" />
            <span>Real-time Analytics</span>
          </div>

          <div class="px-4 py-2 rounded-full border border-white/30 bg-white/15 backdrop-blur-sm text-xs font-semibold text-white flex items-center gap-2 shadow-sm">
            <Layers :size="15" class="text-[#01aef0]" />
            <span>FI &amp; CO Integration</span>
          </div>
        </div>

      </div>

      <!-- FOOTER COPYRIGHT -->
      <div class="relative z-10 text-center pt-6">
        <div class="text-xs font-semibold text-slate-300">
          © 2026 Pure Petroleum ERP. All rights reserved.
        </div>
      </div>

      <!-- CENTERED BOTTOM WIDGET (V | ⊙) -->
      <div class="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 bg-slate-900 text-white px-4 py-1 rounded-full flex items-center gap-2 text-[11px] font-bold shadow-md">
        <span>V</span>
        <span class="text-slate-600">|</span>
        <span class="w-2 h-2 rounded-full bg-[#01aef0] inline-block animate-pulse"></span>
      </div>

    </div>

    <!-- ══════════════════════════════════════════════════════════════
         RIGHT SIDE: Clean White Form (Tailwind CSS)
    ══════════════════════════════════════════════════════════════ -->
    <div class="w-full lg:w-[480px] xl:w-[520px] min-h-screen bg-white flex flex-col justify-between p-6 sm:p-12 shrink-0 border-l border-slate-100 overflow-y-auto">
      
      <!-- Top Spacer -->
      <div></div>

      <!-- CENTERED FORM CONTAINER -->
      <div class="my-auto w-full max-w-sm mx-auto py-6">
        
        <!-- TITLE & SUBTITLE -->
        <div class="text-center mb-6">
          <h2 class="text-3xl font-extrabold text-slate-900 tracking-tight">Log In</h2>
          <p class="text-xs text-slate-500 mt-1.5 font-normal">
            Enter your valid credential for logging in
          </p>
        </div>

        <!-- TOP RIGHT DEMO LOGIN BUTTON -->
        <div class="flex justify-end mb-4">
          <button
            type="button"
            @click="handleDemoLogin('System Administrator')"
            class="px-3.5 py-1.5 rounded-full border border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <Sparkles :size="13" class="text-[#01aef0]" />
            <span>Use Demo Login</span>
          </button>
        </div>

        <!-- LOGIN FORM -->
        <form @submit.prevent="onFormSubmit" class="flex flex-col w-full">
          
          <!-- EMAIL FIELD -->
          <div class="flex flex-col gap-1.5 w-full">
            <label class="text-xs font-semibold text-slate-700 text-left block">
              Enter your email address
            </label>
            <div class="relative w-full flex items-center">
              <Mail :size="16" class="absolute left-3.5 text-slate-400 pointer-events-none z-10" />
              <input
                v-model="email"
                type="email"
                required
                placeholder="name@example.com"
                class="w-full h-11 pl-10 pr-4 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#01aef0] focus:ring-1 focus:ring-[#01aef0] transition-colors"
              />
            </div>
          </div>

          <!-- PASSWORD FIELD -->
          <div class="flex flex-col gap-1.5 w-full mt-4">
            <label class="text-xs font-semibold text-slate-700 text-left block">
              Enter your password
            </label>
            <div class="relative w-full flex items-center">
              <Lock :size="16" class="absolute left-3.5 text-slate-400 pointer-events-none z-10" />
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                required
                placeholder="Password"
                class="w-full h-11 pl-10 pr-10 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#01aef0] focus:ring-1 focus:ring-[#01aef0] transition-colors"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3.5 text-slate-400 hover:text-slate-600 cursor-pointer p-1 z-10"
              >
                <EyeOff v-if="showPassword" :size="16" />
                <Eye v-else :size="16" />
              </button>
            </div>
          </div>

          <!-- SUBMIT BUTTON -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full h-11 mt-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs tracking-wide shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
          >
            <template v-if="!isLoading">
              <span>Log In</span>
              <ArrowRight :size="15" />
            </template>
            <template v-else>
              <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Authenticating...</span>
            </template>
          </button>
        </form>

        <!-- CHECKBOX & FORGET PASSWORD -->
        <div class="mt-5 text-center flex flex-col items-center gap-2">
          <label class="inline-flex items-center gap-2 text-xs text-slate-600 cursor-pointer select-none">
            <input
              type="checkbox"
              v-model="rememberMe"
              class="w-4 h-4 rounded border-slate-300 text-[#01aef0] focus:ring-[#01aef0] cursor-pointer"
            />
            <span>Remember your password</span>
          </label>

          <div>
            <button
              type="button"
              @click="handleDemoLogin('System Administrator')"
              class="text-xs text-slate-600 hover:text-slate-900 font-medium cursor-pointer"
            >
              Forget Password
            </button>
          </div>
        </div>



      </div>

      <!-- FOOTER IT COMPANY SECTION -->
      <div class="pt-5 border-t border-slate-100 flex flex-col items-center gap-2 text-center">
        <a
          href="https://lex9.com"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2"
          title="Visit LEX9"
        >
          <img :src="lex9Logo" alt="LEX9 IT Solutions" class="h-5 object-contain opacity-80" />
          <span class="text-[11px] text-slate-400 font-semibold tracking-wide">IT Solutions & ERP Development</span>
        </a>
        <div class="text-[10px] font-semibold" style="color: #01aef0;">
          Powered by LEX9 · Secure Enterprise Platform
        </div>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useErpStore } from '../stores/erpStore'
import lex9Logo from '../assets/image/lex9.png'
import authBgVideo from '../assets/videos/auth-bg.mp4'

import {
  Lock, Mail, Eye, EyeOff, Sparkles, ShieldCheck, ArrowRight,
  TrendingUp, Layers
} from '@lucide/vue'

const store = useErpStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const rememberMe = ref(true)
const showPassword = ref(false)
const isLoading = ref(false)

onMounted(() => {
  // Clear any existing session when landing on login view
  store.isAuthenticated = false
  localStorage.removeItem('pure_petroleum_auth')
  localStorage.removeItem('pure_petroleum_user')
})

const demoRoles = [
  { title: 'System Administrator' },
  { title: 'Finance Manager' },
  { title: 'Depot Operations Supervisor' },
  { title: 'Sales Executive' }
]

function onFormSubmit() {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    store.login(email.value || 'admin@purepetroleum.com.pk', 'System Administrator', 'Syed Asif Ali')
    router.push('/')
  }, 500)
}

function handleDemoLogin(roleTitle: string) {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    store.demoLogin(roleTitle)
    router.push('/')
  }, 350)
}
</script>
