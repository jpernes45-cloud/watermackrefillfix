import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"

// Helpers
const saveProfile = (p) => localStorage.setItem("wm_customer", JSON.stringify(p))
const loadProfile = () => { try { return JSON.parse(localStorage.getItem("wm_customer")||"null") } catch { return null } }

function Header(){
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-md px-4 py-3 flex items-center gap-3">
        <span className="text-lg font-bold">💧 WaterMack</span>
        <span className="ml-auto text-xs text-slate-500">COD • Subdivision Only</span>
      </div>
    </header>
  )
}

function Counter({ value, onChange, min=1, max=20 }){
  const dec = () => onChange(Math.max(min, value-1))
  const inc = () => onChange(Math.min(max, value+1))
  return (
    <div className="flex items-center justify-center gap-4 my-4">
      <motion.button whileTap={{scale:0.9}} onClick={dec} className="px-4 py-2 rounded-xl border text-xl">−</motion.button>
      <div className="text-3xl font-bold w-12 text-center">{value}</div>
      <motion.button whileTap={{scale:0.9}} onClick={inc} className="px-4 py-2 rounded-xl border text-xl">+</motion.button>
    </div>
  )
}

function ProfileForm({ onDone }){
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [blk, setBlk] = useState("")
  const [house, setHouse] = useState("")
  const [err, setErr] = useState("")
  const blocks = Array.from({length: 60}, (_,i)=>i+1)

  const save = () => {
    setErr("")
    if (!name || !/^09\d{9}$/.test(phone) || !blk || !house) {
      setErr("Pakicomplete: Pangalan, valid Mobile (11 digits), Blk at House.")
      return
    }
    const p = { name, phone, blk: Number(blk), house }
    saveProfile(p)
    onDone(p)
  }

  return (
    <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="grid gap-3 rounded-2xl border bg-white p-4 shadow-sm">
      <div className="text-sm text-slate-600">First time lang ito. Auto‑save para next scan, diretso na.</div>
      <label className="grid gap-1">
        <span className="text-sm">Pangalan</span>
        <input className="border rounded-xl px-3 py-2" value={name} onChange={e=>setName(e.target.value)} placeholder="Hal. Juan D." />
      </label>
      <label className="grid gap-1">
        <span className="text-sm">Contact #</span>
        <input className="border rounded-xl px-3 py-2" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="09xxxxxxxxx" />
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label className="grid gap-1">
          <span className="text-sm">Blk #</span>
          <select className="border rounded-xl px-3 py-2" value={blk} onChange={e=>setBlk(e.target.value)}>
            <option value="">Piliin</option>
            {blocks.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </label>
        <label className="grid gap-1">
          <span className="text-sm">House/Lot #</span>
          <input className="border rounded-xl px-3 py-2" value={house} onChange={e=>setHouse(e.target.value)} placeholder="Lot 3 / #21-A" />
        </label>
      </div>
      <motion.button whileHover={{scale:1.01}} whileTap={{scale:0.98}} onClick={save} className="rounded-2xl px-5 py-3 bg-sky-600 text-white shadow-sm hover:shadow-md">
        Save Details
      </motion.button>
      {err && <div className="text-sm text-red-600">{err}</div>}
      <div className="text-xs text-slate-500">Privacy: locally saved on this device only.</div>
    </motion.div>
  )
}

function Refill({ profile }){
  const [qty, setQty] = useState(1)

  return (
    <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="grid gap-4 rounded-2xl border bg-white p-4 shadow-sm">
      <div className="text-sm text-slate-600">Nakalog-in bilang <b>{profile.name}</b></div>
      <div className="text-sm text-slate-600">Address: <b>Blk {profile.blk} • {profile.house}</b> — {profile.phone}</div>

      <div className="flex items-center justify-between">
        <div className="text-sm">Ilang Gallon:</div>
        <Counter value={qty} onChange={setQty} min={1} max={20} />
      </div>

      <form method="POST" action="https://formsubmit.co/jpernes45@gmail.com" className="contents">
        {/* Required fields to email */}
        <input type="hidden" name="customer_name" value={profile.name} />
        <input type="hidden" name="phone" value={profile.phone} />
        <input type="hidden" name="address" value={`Blk ${profile.blk} • ${profile.house}`} />
        <input type="hidden" name="gallons" value={qty} />
        <input type="hidden" name="payment" value="COD" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_subject" value="New WaterMack Refill Request" />
        <!-- Tip: you can set a redirect after submit by uncommenting below and replacing URL -->
        <!-- <input type="hidden" name="_next" value="https://your-site.netlify.app/?submitted=1" /> -->

        <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} type="submit" className="w-full text-center text-2xl font-bold rounded-2xl px-6 py-6 bg-emerald-600 text-white shadow hover:shadow-md">
          REFILL NA
        </motion.button>
      </form>

      <div className="text-xs text-slate-500">* All transactions are <b>COD</b>.</div>
    </motion.div>
  )
}

export default function App(){
  const [profile, setProfile] = useState(() => loadProfile())

  return (
    <div className="min-h-screen bg-sky-50 text-slate-900">
      <Header/>
      <main className="mx-auto max-w-md px-4 py-6">
        <motion.h1 initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} className="text-2xl font-bold mb-4">1‑Click Water Refill</motion.h1>
        {!profile ? <ProfileForm onDone={setProfile}/> : <Refill profile={profile}/>}
        <div className="mt-8 text-center text-xs text-slate-400">© {new Date().getFullYear()} WaterMack • Subdivision Refill</div>
      </main>
    </div>
  )
}
