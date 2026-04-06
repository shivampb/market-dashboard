import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from "recharts";

/* ── PALETTE ─────────────────────────────────────── */
const C = {
  bg:        "#F0F4FA",
  surface:   "#FFFFFF",
  border:    "#DDE6F5",
  borderMid: "#C4D4EE",
  navy:      "#0B2A5C",
  blue1:     "#1554B0",
  blue2:     "#2279D9",
  blue3:     "#48A3F5",
  blue4:     "#A8CEFF",
  blue5:     "#DCF0FF",
  teal:      "#0891B2",
  tealLight: "#E0F7FF",
  slate:     "#64748B",
  slateL:    "#94A3B8",
  text:      "#0F1C33",
  textMid:   "#334E7A",
  textLight: "#607090",
  white:     "#FFFFFF",
  success:   "#0F7A5A",
  warn:      "#B45309",
  danger:    "#B91C1C",
  seg: ["#1554B0","#2279D9","#48A3F5","#0891B2","#0B2A5C","#A8CEFF","#64748B"],
};

/* ── DATA ────────────────────────────────────────── */
const globalMarket = [
  { year:"2019", global:52.7, india:3.1 },
  { year:"2020", global:92.5, india:6.8 },
  { year:"2021", global:78.3, india:5.9 },
  { year:"2022", global:67.4, india:5.2 },
  { year:"2023", global:71.8, india:5.9 },
  { year:"2024", global:78.2, india:6.7 },
  { year:"2025F", global:85.6, india:7.6 },
  { year:"2026F", global:93.4, india:8.6 },
  { year:"2027F", global:101.9, india:9.8 },
  { year:"2028F", global:111.2, india:11.1 },
  { year:"2029F", global:121.3, india:12.6 },
  { year:"2030F", global:132.4, india:14.3 },
];

const products = [
  { name:"Surgical Gloves",  size:1840, cagr:9.2,  share:31 },
  { name:"Medical Masks",    size:1420, cagr:11.4, share:24 },
  { name:"Surgical Gowns",   size:980,  cagr:8.7,  share:16 },
  { name:"Shoe Covers",      size:520,  cagr:7.3,  share:9  },
  { name:"Surgical Caps",    size:380,  cagr:6.9,  share:6  },
  { name:"Drapes & Covers",  size:340,  cagr:8.1,  share:6  },
  { name:"Other PPE",        size:290,  cagr:7.5,  share:5  },
  { name:"Sterile Packs",    size:200,  cagr:8.9,  share:3  },
];

const endUsers = [
  { name:"Govt Hospitals",           value:38, color:C.blue1 },
  { name:"Private Hospitals",        value:29, color:C.blue2 },
  { name:"Clinics & Nursing Homes",  value:16, color:C.blue3 },
  { name:"Diagnostic Centers",       value:10, color:C.teal  },
  { name:"Ambulatory Centers",       value: 7, color:C.blue4 },
];

const regions = [
  { name:"West India",  share:31, size:2.08, growth:12.1 },
  { name:"South India", share:28, size:1.88, growth:14.7 },
  { name:"North India", share:26, size:1.74, growth:10.4 },
  { name:"East India",  share:15, size:1.01, growth: 8.3 },
];

const competitors = [
  { name:"3M (USA)",              share:14.2 },
  { name:"Honeywell (USA)",       share: 9.8 },
  { name:"Kimberly-Clark (USA)",  share: 8.4 },
  { name:"Ansell (AUS)",          share: 7.1 },
  { name:"Medline (USA)",         share: 6.3 },
  { name:"India Manufacturers",   share:18.6 },
  { name:"Others",                share:35.6 },
];

const rawMat = [
  { month:"Jan'24", nitrile:112, latex:98,  pp:105 },
  { month:"Mar'24", nitrile:118, latex:102, pp:108 },
  { month:"May'24", nitrile:108, latex:99,  pp:111 },
  { month:"Jul'24", nitrile:115, latex:104, pp:116 },
  { month:"Sep'24", nitrile:121, latex:107, pp:119 },
  { month:"Nov'24", nitrile:119, latex:105, pp:122 },
  { month:"Jan'25", nitrile:124, latex:109, pp:118 },
  { month:"Mar'25", nitrile:128, latex:112, pp:121 },
];

const drivers = [
  { subject:"Hospital Infra",    score:88 },
  { subject:"Govt Health Spend", score:82 },
  { subject:"Infection Awareness",score:79},
  { subject:"Regulatory Mandates",score:91},
  { subject:"Pandemic Readiness", score:75},
  { subject:"Surgical Volumes",  score:84 },
];

const trends = [
  { name:"Biodegradable PPE",           momentum:72, horizon:"2025–27" },
  { name:"Latex-Free Alternatives",     momentum:88, horizon:"Ongoing" },
  { name:"Anti-microbial Coatings",     momentum:65, horizon:"2026–28" },
  { name:"Smart PPE (IoT)",             momentum:41, horizon:"2027+"   },
  { name:"India PLI Export Push",       momentum:84, horizon:"2024–26" },
  { name:"Centralised Govt Procurement",momentum:79, horizon:"2024–25" },
];

const TABS = ["Market Overview","Product Segments","End-User Analysis","Competitive Landscape","Supply & Pricing","Trends & Forecast"];

/* ── HELPERS ─────────────────────────────────────── */
const CustomTT = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:10, padding:"10px 14px", boxShadow:"0 4px 20px rgba(11,42,92,0.12)", fontSize:12 }}>
      <div style={{ fontWeight:700, color:C.navy, marginBottom:5, fontSize:11, letterSpacing:"0.04em" }}>{label}</div>
      {payload.map((p,i)=>(
        <div key={i} style={{ color:p.color||C.blue1, margin:"2px 0", fontSize:11 }}>
          {p.name}: <strong>{p.value}</strong>
        </div>
      ))}
    </div>
  );
};

const Tag = ({ children, color=C.blue1 }) => (
  <span style={{ background:`${color}14`, color, border:`1px solid ${color}30`, borderRadius:20, padding:"2px 10px", fontSize:10, fontWeight:700, letterSpacing:"0.05em" }}>
    {children}
  </span>
);

const Divider = () => <div style={{ height:1, background:C.border, margin:"0 0 18px" }} />;

/* ── CARD ────────────────────────────────────────── */
const Card = ({ children, style={}, accent }) => (
  <div style={{
    background: C.white,
    border: `1.5px solid ${C.border}`,
    borderRadius: 16,
    padding: "22px 24px",
    boxShadow: "0 2px 12px rgba(11,42,92,0.06)",
    borderTop: accent ? `3px solid ${accent}` : `1.5px solid ${C.border}`,
    ...style
  }}>{children}</div>
);

const CardTitle = ({ children, sub }) => (
  <div style={{ marginBottom:sub?4:16 }}>
    <div style={{ fontSize:13, fontWeight:800, color:C.navy, letterSpacing:"0.01em" }}>{children}</div>
    {sub && <div style={{ fontSize:10, color:C.slateL, marginTop:2, marginBottom:14, letterSpacing:"0.04em", textTransform:"uppercase" }}>{sub}</div>}
  </div>
);

const KPICard = ({ icon, label, value, delta, deltaPos=true, accent=C.blue1 }) => (
  <div style={{
    background: C.white,
    border: `1.5px solid ${C.border}`,
    borderRadius:14,
    padding:"18px 20px",
    boxShadow:"0 2px 10px rgba(11,42,92,0.05)",
    borderLeft:`4px solid ${accent}`,
    display:"flex", flexDirection:"column", gap:4,
  }}>
    <div style={{ fontSize:20 }}>{icon}</div>
    <div style={{ fontSize:22, fontWeight:900, color:C.navy, letterSpacing:"-0.03em", lineHeight:1 }}>{value}</div>
    <div style={{ fontSize:11, color:C.textLight, marginTop:1 }}>{label}</div>
    {delta && (
      <div style={{ marginTop:4, display:"inline-flex", alignItems:"center", gap:4 }}>
        <span style={{ fontSize:10, fontWeight:700, color:deltaPos?C.success:C.danger, background:deltaPos?"#ECFDF5":"#FEF2F2", padding:"2px 8px", borderRadius:20 }}>
          {deltaPos?"▲":"▼"} {delta}
        </span>
      </div>
    )}
  </div>
);

const ProgressRow = ({ label, pct, value, growth, color=C.blue2 }) => (
  <div style={{ padding:"9px 0", borderBottom:`1px solid ${C.border}` }}>
    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
      <span style={{ fontSize:11, color:C.textMid, fontWeight:600 }}>{label}</span>
      <div style={{ display:"flex", gap:8, alignItems:"center" }}>
        {value && <span style={{ fontSize:11, color:C.slate }}>{value}</span>}
        {growth && <Tag color={C.teal}>+{growth}%</Tag>}
        <span style={{ fontSize:11, fontWeight:800, color:C.navy }}>{pct}%</span>
      </div>
    </div>
    <div style={{ height:6, borderRadius:4, background:C.blue5, overflow:"hidden" }}>
      <div style={{ height:"100%", width:`${pct}%`, background:`linear-gradient(90deg,${color},${C.blue3})`, borderRadius:4, transition:"width 0.6s ease" }} />
    </div>
  </div>
);

const InsightBox = ({ text, color=C.blue1 }) => (
  <div style={{ background:`${color}08`, border:`1px solid ${color}22`, borderLeft:`3px solid ${color}`, borderRadius:"0 8px 8px 0", padding:"10px 14px", marginTop:14, fontSize:11, color:C.textMid, lineHeight:1.7 }}>
    {text}
  </div>
);

/* ── MAIN ────────────────────────────────────────── */
export default function Dashboard() {
  const [tab, setTab] = useState(TABS[0]);

  return (
    <div style={{ background:C.bg, minHeight:"100vh", fontFamily:"'Outfit','Segoe UI',sans-serif", color:C.text }}>

      {/* ── HEADER ── */}
      <div style={{ background:C.white, borderBottom:`1.5px solid ${C.border}`, position:"sticky", top:0, zIndex:100, boxShadow:"0 2px 16px rgba(11,42,92,0.07)" }}>
        <div style={{ maxWidth:1320, margin:"0 auto", padding:"0 28px" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 0" }}>
            {/* Logo area */}
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <div style={{ width:40, height:40, borderRadius:10, background:`linear-gradient(135deg,${C.blue1},${C.blue3})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, boxShadow:`0 4px 12px ${C.blue1}40` }}>
                🏥
              </div>
              <div>
                <div style={{ fontSize:15, fontWeight:900, color:C.navy, letterSpacing:"0.02em" }}>HOSPITAL DISPOSABLES</div>
                <div style={{ fontSize:9, color:C.slateL, letterSpacing:"0.14em", textTransform:"uppercase", marginTop:1 }}>Market Intelligence · Global & India · 2024–2030</div>
              </div>
            </div>
            {/* Badges */}
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {[
                { icon:"📊", label:"Secondary Research" },
                { icon:"🌐", label:"WHO / MoHFW Data" },
                { icon:"📈", label:"CAGR: 9.1% Global" },
                { icon:"🇮🇳", label:"India: 10.8% CAGR" },
              ].map((b,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"center", gap:5, background:C.blue5, border:`1px solid ${C.blue4}`, borderRadius:20, padding:"4px 12px", fontSize:10, color:C.blue1, fontWeight:600 }}>
                  <span>{b.icon}</span><span>{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* TABS */}
          <div style={{ display:"flex", gap:0, overflowX:"auto", borderTop:`1px solid ${C.border}` }}>
            {TABS.map(t=>{
              const active = tab===t;
              return (
                <button key={t} onClick={()=>setTab(t)} style={{
                  padding:"11px 18px", fontSize:11, fontWeight:active?700:500,
                  color:active?C.blue1:C.slate,
                  background:"transparent", border:"none", cursor:"pointer",
                  borderBottom:active?`2.5px solid ${C.blue1}`:"2.5px solid transparent",
                  whiteSpace:"nowrap", letterSpacing:"0.03em",
                  transition:"all 0.15s",
                }}>{t}</button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── PAGE BODY ── */}
      <div style={{ maxWidth:1320, margin:"0 auto", padding:"26px 28px" }}>

        {/* ════════════════ MARKET OVERVIEW ════════════════ */}
        {tab==="Market Overview" && (<>
          {/* KPI row */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))", gap:14, marginBottom:22 }}>
            <KPICard icon="🌐" label="Global PPE Market (2024)" value="$78.2B" delta="9.1% CAGR to 2030" accent={C.blue1} />
            <KPICard icon="🇮🇳" label="India Market Size (2024)" value="$6.7B" delta="10.8% CAGR — Fastest APAC" accent={C.blue2} />
            <KPICard icon="🏥" label="India Global Rank" value="#4" delta="After USA · China · Germany" accent={C.teal} />
            <KPICard icon="💊" label="Projected 2030 (Global)" value="$132.4B" delta="Organic + Aging Population" accent={C.blue3} />
            <KPICard icon="🚀" label="India 2030 Forecast" value="$14.3B" delta="PLI + Ayushman Bharat push" accent={C.navy} />
          </div>

          {/* Global trend chart */}
          <Card style={{ marginBottom:18 }}>
            <CardTitle sub="Source: WHO · Grand View Research · Mordor Intelligence · F = Forecast">
              🌐 Global PPE Market vs India Market Size — 2019 to 2030 (USD Billion)
            </CardTitle>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={globalMarket}>
                <defs>
                  <linearGradient id="gG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={C.blue2} stopOpacity={0.18}/>
                    <stop offset="100%" stopColor={C.blue2} stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="gI" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={C.teal} stopOpacity={0.2}/>
                    <stop offset="100%" stopColor={C.teal} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" stroke={C.border} />
                <XAxis dataKey="year" tick={{ fill:C.slateL, fontSize:10 }} axisLine={false} tickLine={false}/>
                <YAxis tick={{ fill:C.slateL, fontSize:10 }} axisLine={false} tickLine={false}/>
                <Tooltip content={<CustomTT/>}/>
                <Legend wrapperStyle={{ fontSize:11, color:C.slate }}/>
                <Area type="monotone" dataKey="global" name="Global Market ($B)" stroke={C.blue2} strokeWidth={2.5} fill="url(#gG)"/>
                <Area type="monotone" dataKey="india" name="India Market ($B)" stroke={C.teal} strokeWidth={2.5} fill="url(#gI)"/>
              </AreaChart>
            </ResponsiveContainer>
            <InsightBox text="💡 COVID-19 spiked the global PPE market to $92.5B in 2020 — a 75% surge. Post-correction, organic drivers (aging populations, surgical volume growth, infection mandates) sustain a stable 9.1% CAGR trajectory to $132.4B by 2030." />
          </Card>

          {/* Region + End-User */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
            <Card>
              <CardTitle sub="Market share & CAGR by geography · India 2024">🗺️ Regional Market Distribution</CardTitle>
              {regions.map((r,i)=>(
                <ProgressRow key={i} label={r.name} pct={r.share} value={`$${r.size}B`} growth={r.growth} color={C.seg[i]}/>
              ))}
              <InsightBox text="💡 South India leads CAGR at +14.7% — driven by rapid private hospital expansion in Bengaluru, Hyderabad, and Chennai corridors." color={C.teal}/>
            </Card>
            <Card>
              <CardTitle sub="Demand share by facility type · India 2024">🏥 End-User Segment Split</CardTitle>
              <div style={{ display:"flex", gap:10 }}>
                <ResponsiveContainer width={150} height={150}>
                  <PieChart>
                    <Pie data={endUsers} cx="50%" cy="50%" outerRadius={65} innerRadius={38} dataKey="value" paddingAngle={2}>
                      {endUsers.map((e,i)=><Cell key={i} fill={e.color} stroke={C.white} strokeWidth={2}/>)}
                    </Pie>
                    <Tooltip formatter={v=>`${v}%`} contentStyle={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:8, fontSize:11 }}/>
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center", gap:6 }}>
                  {endUsers.map((e,i)=>(
                    <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                        <div style={{ width:8, height:8, borderRadius:"50%", background:e.color }}/>
                        <span style={{ fontSize:11, color:C.textMid }}>{e.name}</span>
                      </div>
                      <span style={{ fontSize:11, fontWeight:800, color:C.navy }}>{e.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <InsightBox text="💡 Government hospitals command 38% of total demand, making public-sector tender cycles the single most important procurement channel in India." color={C.blue1}/>
            </Card>
          </div>
        </>)}

        {/* ════════════════ PRODUCT SEGMENTS ════════════════ */}
        {tab==="Product Segments" && (<>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:20 }}>
            {products.slice(0,4).map((p,i)=>(
              <KPICard key={i} icon={["🧤","😷","🥼","👟"][i]} label={p.name} value={`$${p.size}M`} delta={`CAGR ${p.cagr}% → 2030`} accent={C.seg[i]}/>
            ))}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"3fr 2fr", gap:18, marginBottom:18 }}>
            <Card>
              <CardTitle sub="India market size per product category · USD Million · 2024">📦 Product-wise Market Size</CardTitle>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={products} layout="vertical" barCategoryGap="25%">
                  <CartesianGrid strokeDasharray="4 4" stroke={C.border} horizontal={false}/>
                  <XAxis type="number" tick={{ fill:C.slateL, fontSize:10 }} axisLine={false} tickLine={false}/>
                  <YAxis type="category" dataKey="name" width={115} tick={{ fill:C.textMid, fontSize:10 }} axisLine={false} tickLine={false}/>
                  <Tooltip content={<CustomTT/>}/>
                  <Bar dataKey="size" name="Market Size ($M)" radius={[0,6,6,0]}>
                    {products.map((p,i)=><Cell key={i} fill={C.seg[i%C.seg.length]}/>)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>
            <Card>
              <CardTitle sub="Annualised growth rate 2024–2030">📈 CAGR by Product Category</CardTitle>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={products} barCategoryGap="30%">
                  <CartesianGrid strokeDasharray="4 4" stroke={C.border}/>
                  <XAxis dataKey="name" tick={{ fill:C.slateL, fontSize:8 }} axisLine={false} tickLine={false} angle={-30} textAnchor="end" height={52}/>
                  <YAxis tick={{ fill:C.slateL, fontSize:10 }} axisLine={false} tickLine={false} domain={[5,13]}/>
                  <Tooltip content={<CustomTT/>}/>
                  <Bar dataKey="cagr" name="CAGR %" radius={[4,4,0,0]}>
                    {products.map((p,i)=><Cell key={i} fill={C.seg[i%C.seg.length]}/>)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
          <Card>
            <CardTitle sub="Key intelligence flags per product vertical">🔎 Product Intelligence Highlights</CardTitle>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:12 }}>
              {[
                { icon:"🧤", color:C.blue1, title:"Surgical Gloves — $1.84B",  text:"NBR Nitrile now commands 68% of glove demand as latex allergies rise among healthcare workers. Powder-free mandates expanding globally." },
                { icon:"😷", color:C.blue2, title:"Medical Masks — 11.4% CAGR", text:"Fastest-growing segment. NABH accreditation mandates N95-level compliance in all ICCU wards, driving upgrade from basic 3-ply to higher-grade respirators." },
                { icon:"🥼", color:C.teal,  title:"Surgical Gowns — AAMI Level 3", text:"Non-woven SMS fabric replacing traditional cotton in tier-1 hospitals. Fluid-resistant Level-3 gowns gaining share in high-risk surgical departments." },
                { icon:"🇮🇳", color:C.navy, title:"India PLI Export Push",       text:"India PPE export crossed $1.2B in 2023, targeting $5B by 2026 under Production Linked Incentive scheme. ISO 13485 adoption up 48% among mid-tier manufacturers." },
              ].map((c,i)=>(
                <div key={i} style={{ background:C.bg, border:`1.5px solid ${C.border}`, borderLeft:`4px solid ${c.color}`, borderRadius:"0 10px 10px 0", padding:"14px 16px" }}>
                  <div style={{ fontSize:13, fontWeight:700, color:C.navy, marginBottom:6 }}>{c.icon} {c.title}</div>
                  <div style={{ fontSize:11, color:C.textLight, lineHeight:1.7 }}>{c.text}</div>
                </div>
              ))}
            </div>
          </Card>
        </>)}

        {/* ════════════════ END-USER ANALYSIS ════════════════ */}
        {tab==="End-User Analysis" && (<>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:20 }}>
            <KPICard icon="🏛️" label="Govt Hospital Demand Share" value="38%" delta="Repeat procurement cycles dominant" accent={C.blue1}/>
            <KPICard icon="🏥" label="Private Hospital Growth" value="+16.2%" delta="Fastest facility-type expansion 2024" accent={C.blue2}/>
            <KPICard icon="🔬" label="Diagnostic Lab Segment" value="$670M" delta="10% of total India market" accent={C.teal}/>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:18, marginBottom:18 }}>
            <Card>
              <CardTitle sub="Quarterly demand trend by facility type · Units ×1000">📊 Quarterly Demand by End-User (Indexed Growth)</CardTitle>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={[
                  { seg:"Govt Hospitals", q1:42, q2:48, q3:51, q4:58 },
                  { seg:"Private Hospitals", q1:28, q2:31, q3:35, q4:39 },
                  { seg:"Diagnostic Labs", q1:18, q2:22, q3:25, q4:27 },
                  { seg:"Nursing Homes", q1:12, q2:15, q3:18, q4:21 },
                  { seg:"Ambulatory", q1:8, q2:10, q3:13, q4:16 },
                ]} layout="vertical">
                  <CartesianGrid strokeDasharray="4 4" stroke={C.border} horizontal={false}/>
                  <XAxis type="number" tick={{ fill:C.slateL, fontSize:10 }} axisLine={false} tickLine={false}/>
                  <YAxis type="category" dataKey="seg" width={110} tick={{ fill:C.textMid, fontSize:10 }} axisLine={false} tickLine={false}/>
                  <Tooltip content={<CustomTT/>}/>
                  <Legend wrapperStyle={{ fontSize:10, color:C.slate }}/>
                  <Bar dataKey="q1" name="Q1" fill={`${C.blue1}55`} radius={[0,3,3,0]}/>
                  <Bar dataKey="q2" name="Q2" fill={`${C.blue2}77`} radius={[0,3,3,0]}/>
                  <Bar dataKey="q3" name="Q3" fill={C.blue3} radius={[0,3,3,0]}/>
                  <Bar dataKey="q4" name="Q4" fill={C.blue1} radius={[0,3,3,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </Card>
            <Card>
              <CardTitle sub="Procurement pattern intelligence">🧠 Buyer Behaviour Insights</CardTitle>
              {[
                { icon:"🔄", color:C.blue1, label:"Repeat Buy Rate", val:"87.3%", note:"Govt hospitals reorder quarterly via central tender" },
                { icon:"📋", color:C.blue2, label:"Avg Contract Duration", val:"2.1 yrs", note:"Private hospital supply agreements" },
                { icon:"💰", color:C.teal,  label:"Avg Tender Size", val:"₹28.4L", note:"Govt hospital annual PPE tender value" },
                { icon:"📦", color:C.navy,  label:"Annual Units/Bed", val:"~1,200", note:"Average disposable units consumed per hospital bed" },
              ].map((m,i)=>(
                <div key={i} style={{ padding:"10px 0", borderBottom:`1px solid ${C.border}` }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontSize:11, color:C.textMid }}>{m.icon} {m.label}</span>
                    <span style={{ fontSize:13, fontWeight:800, color:m.color }}>{m.val}</span>
                  </div>
                  <div style={{ fontSize:10, color:C.slateL, marginTop:3 }}>{m.note}</div>
                </div>
              ))}
            </Card>
          </div>
        </>)}

        {/* ════════════════ COMPETITIVE LANDSCAPE ════════════════ */}
        {tab==="Competitive Landscape" && (<>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, marginBottom:18 }}>
            <Card>
              <CardTitle sub="Source: Grand View Research · MarketsandMarkets · 2024">🏢 Global Market Share by Player</CardTitle>
              <div style={{ display:"flex", gap:16, alignItems:"center" }}>
                <ResponsiveContainer width={160} height={160}>
                  <PieChart>
                    <Pie data={competitors} cx="50%" cy="50%" outerRadius={72} innerRadius={42} dataKey="share" paddingAngle={2}>
                      {competitors.map((c,i)=><Cell key={i} fill={C.seg[i%C.seg.length]} stroke={C.white} strokeWidth={2}/>)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ flex:1 }}>
                  {competitors.map((c,i)=>(
                    <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:`1px solid ${C.border}` }}>
                      <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                        <div style={{ width:7, height:7, borderRadius:"50%", background:C.seg[i%C.seg.length] }}/>
                        <span style={{ fontSize:11, color:C.textMid }}>{c.name}</span>
                      </div>
                      <span style={{ fontSize:11, fontWeight:800, color:C.navy }}>{c.share}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <InsightBox text="💡 India Manufacturers collectively hold 18.6% — the second-largest single-country block, accelerating with PLI scheme support." color={C.blue2}/>
            </Card>
            <Card>
              <CardTitle sub="Strategic positioning of global top players">🏅 Competitor Positioning Matrix</CardTitle>
              {[
                { name:"3M (USA)",             rev:"$8.2B PPE", focus:"Respirators, N95, Industrial PPE",        strength:"R&D depth, brand trust" },
                { name:"Honeywell (USA)",       rev:"$4.1B PPE", focus:"Industrial + Medical crossover",          strength:"Global distribution network" },
                { name:"Kimberly-Clark (USA)",  rev:"$3.8B HC",  focus:"Surgical gowns, drapes, sterile packs",  strength:"Long-term hospital contracts" },
                { name:"Ansell (AUS)",          rev:"$1.7B",     focus:"Surgical & exam gloves",                  strength:"Latex-free innovation" },
                { name:"India Manufacturers",   rev:"$1.2B exp", focus:"Cost-competitive PPE, export focus",      strength:"PLI support, price advantage" },
              ].map((p,i)=>(
                <div key={i} style={{ padding:"9px 0", borderBottom:`1px solid ${C.border}` }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontSize:11, fontWeight:700, color:C.navy }}>{p.name}</span>
                    <Tag color={C.blue2}>{p.rev}</Tag>
                  </div>
                  <div style={{ fontSize:10, color:C.textLight, marginTop:3 }}>{p.focus}</div>
                  <div style={{ fontSize:9, color:C.slateL, marginTop:2 }}>Strength: {p.strength}</div>
                </div>
              ))}
            </Card>
          </div>
          <Card>
            <CardTitle sub="Organised vs unorganised sector split · India hospital disposables">📊 India Market — Manufacturer Concentration by Tier (2024)</CardTitle>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
              {[
                { pct:28, label:"Tier-1 Organised", color:C.blue1, sub:"ISO / CE certified — Kimberly-Clark India, Unimed, Tronex India, Surgitech" },
                { pct:39, label:"Tier-2 Mid-scale", color:C.blue2, sub:"GSM-approved domestic producers — Rajkot, Ahmedabad, Delhi NCR manufacturing clusters" },
                { pct:33, label:"Unorganised / SME", color:C.blue4, sub:"Local producers for rural & tier-3 hospital demand — price-driven procurement channel" },
              ].map((t,i)=>(
                <div key={i} style={{ background:C.bg, border:`1.5px solid ${C.borderMid}`, borderTop:`3px solid ${t.color}`, borderRadius:12, padding:"16px 18px" }}>
                  <div style={{ fontSize:32, fontWeight:900, color:t.color, letterSpacing:"-0.03em" }}>{t.pct}%</div>
                  <div style={{ fontSize:12, fontWeight:700, color:C.navy, margin:"4px 0" }}>{t.label}</div>
                  <div style={{ fontSize:10, color:C.textLight, lineHeight:1.6 }}>{t.sub}</div>
                </div>
              ))}
            </div>
          </Card>
        </>)}

        {/* ════════════════ SUPPLY & PRICING ════════════════ */}
        {tab==="Supply & Pricing" && (<>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:20 }}>
            <KPICard icon="🧪" label="Nitrile Price Rise (Jan'24→Mar'25)" value="+14.3%" delta="Malaysia supply tightness" deltaPos={false} accent={C.blue1}/>
            <KPICard icon="🌿" label="Natural Latex Index Change" value="+14.3%" delta="Thailand/Vietnam weather impact" deltaPos={false} accent={C.blue2}/>
            <KPICard icon="🏭" label="Polypropylene (Meltblown)" value="+15.2%" delta="China export restrictions" deltaPos={false} accent={C.teal}/>
            <KPICard icon="📦" label="China Dependency — Raw Mat." value="62%" delta="PLI targets 40% by 2027" deltaPos={false} accent={C.navy}/>
          </div>
          <Card style={{ marginBottom:18 }}>
            <CardTitle sub="Base Jan 2024 = 100 · Source: ICIS · Bloomberg Commodities · CRISIL">📉 Raw Material Price Index (Monthly)</CardTitle>
            <ResponsiveContainer width="100%" height={230}>
              <LineChart data={rawMat}>
                <CartesianGrid strokeDasharray="4 4" stroke={C.border}/>
                <XAxis dataKey="month" tick={{ fill:C.slateL, fontSize:10 }} axisLine={false} tickLine={false}/>
                <YAxis tick={{ fill:C.slateL, fontSize:10 }} axisLine={false} tickLine={false} domain={[90,135]}/>
                <Tooltip content={<CustomTT/>}/>
                <Legend wrapperStyle={{ fontSize:11, color:C.slate }}/>
                <Line type="monotone" dataKey="nitrile" name="Nitrile (Gloves)" stroke={C.blue1} strokeWidth={2.5} dot={{ r:3, fill:C.blue1 }}/>
                <Line type="monotone" dataKey="latex"   name="Natural Latex"    stroke={C.blue3} strokeWidth={2.5} dot={{ r:3, fill:C.blue3 }}/>
                <Line type="monotone" dataKey="pp"      name="Polypropylene"    stroke={C.teal}  strokeWidth={2.5} dot={{ r:3, fill:C.teal  }}/>
              </LineChart>
            </ResponsiveContainer>
          </Card>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
            <Card>
              <CardTitle sub="Identified disruption risks with impact rating · 2025">🔗 Supply Chain Risk Flags</CardTitle>
              {[
                { risk:"Malaysia NBR Production Slowdown",    impact:"HIGH",   color:C.danger, detail:"Top glove makers reducing output 15% due to rising energy costs." },
                { risk:"China PP Meltblown Export Controls",  impact:"MEDIUM", color:C.warn,   detail:"Mask filter media supply strained; India rerouting via Vietnam." },
                { risk:"Red Sea Shipping Disruptions",        impact:"MEDIUM", color:C.warn,   detail:"+18–22 days avg lead time. Freight cost up 38% YoY to India." },
                { risk:"Domestic Latex Shortage (India)",     impact:"LOW",    color:C.teal,   detail:"Kerala output stabilising; transition to synthetics underway." },
              ].map((r,i)=>(
                <div key={i} style={{ padding:"10px 0", borderBottom:`1px solid ${C.border}` }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontSize:11, fontWeight:600, color:C.navy }}>{r.risk}</span>
                    <span style={{ fontSize:9, fontWeight:700, color:r.color, background:`${r.color}12`, padding:"2px 9px", borderRadius:20, border:`1px solid ${r.color}30` }}>{r.impact}</span>
                  </div>
                  <div style={{ fontSize:10, color:C.textLight, marginTop:4, lineHeight:1.5 }}>{r.detail}</div>
                </div>
              ))}
            </Card>
            <Card>
              <CardTitle sub="India market procurement price benchmarks · 2024">💰 Indicative Price Benchmarks</CardTitle>
              {[
                { product:"Nitrile Exam Gloves (100 pc)",  low:"₹280", high:"₹420", trend:"↑" },
                { product:"N95 Respirator Mask (per pc)",  low:"₹42",  high:"₹85",  trend:"↑" },
                { product:"3-Ply Surgical Mask (50 pc)",   low:"₹60",  high:"₹95",  trend:"→" },
                { product:"SMS Surgical Gown (per pc)",    low:"₹38",  high:"₹72",  trend:"↑" },
                { product:"PP Shoe Cover (100 pc)",        low:"₹90",  high:"₹140", trend:"→" },
                { product:"Bouffant Surgical Cap (100 pc)",low:"₹65",  high:"₹110", trend:"→" },
              ].map((p,i)=>(
                <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 0", borderBottom:`1px solid ${C.border}` }}>
                  <span style={{ fontSize:11, color:C.textMid }}>{p.product}</span>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <span style={{ fontSize:11, color:C.slate }}>{p.low} – {p.high}</span>
                    <span style={{ fontSize:14, color:p.trend==="↑"?C.danger:C.teal, fontWeight:700 }}>{p.trend}</span>
                  </div>
                </div>
              ))}
              <InsightBox text="💡 Price benchmarks sourced from GeM portal, HITES (HLL Lifecare), and central govt published tender awards." color={C.blue2}/>
            </Card>
          </div>
        </>)}

        {/* ════════════════ TRENDS & FORECAST ════════════════ */}
        {tab==="Trends & Forecast" && (<>
          <Card style={{ marginBottom:18 }}>
            <CardTitle sub="Based on patent filings · regulatory activity · procurement pilots · investment flow">🚀 Emerging Market Trends — Momentum Score & Horizon</CardTitle>
            {trends.map((t,i)=>{
              const color = t.momentum>80?C.blue1:t.momentum>65?C.blue2:C.blue3;
              return (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:16, padding:"11px 0", borderBottom:`1px solid ${C.border}` }}>
                  <div style={{ flex:1, fontSize:11, color:C.navy, fontWeight:600 }}>{t.name}</div>
                  <div style={{ width:200, height:7, borderRadius:4, background:C.blue5, overflow:"hidden" }}>
                    <div style={{ height:"100%", width:`${t.momentum}%`, background:`linear-gradient(90deg,${color},${C.blue3})`, borderRadius:4 }}/>
                  </div>
                  <div style={{ fontSize:11, fontWeight:800, color, width:28, textAlign:"right" }}>{t.momentum}</div>
                  <Tag color={C.slate}>{t.horizon}</Tag>
                </div>
              );
            })}
          </Card>
          <div style={{ display:"grid", gridTemplateColumns:"3fr 2fr", gap:18 }}>
            <Card>
              <CardTitle sub="India hospital disposables market · USD Billion · 2023–2030">📊 India Market Growth Forecast</CardTitle>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={globalMarket.slice(4)}>
                  <defs>
                    <linearGradient id="fI" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={C.blue1} stopOpacity={0.2}/>
                      <stop offset="100%" stopColor={C.blue1} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" stroke={C.border}/>
                  <XAxis dataKey="year" tick={{ fill:C.slateL, fontSize:10 }} axisLine={false} tickLine={false}/>
                  <YAxis tick={{ fill:C.slateL, fontSize:10 }} axisLine={false} tickLine={false}/>
                  <Tooltip content={<CustomTT/>}/>
                  <Area type="monotone" dataKey="india" name="India Market ($B)" stroke={C.blue1} strokeWidth={2.5} fill="url(#fI)"/>
                  <Area type="monotone" dataKey="global" name="Global Market ($B)" stroke={C.blue3} strokeWidth={1.5} fill="none" strokeDasharray="5 3"/>
                </AreaChart>
              </ResponsiveContainer>
              <InsightBox text="💡 India is on track to become the world's 2nd largest PPE exporter by 2028 — behind China — supported by PLI incentives and WHO-compliant manufacturing scale-up." color={C.blue1}/>
            </Card>
            <Card>
              <CardTitle sub="Key projections for India hospital disposables sector">🔮 2030 Intelligence Summary</CardTitle>
              {[
                { label:"India Market Size by 2030",      value:"$14.3B", color:C.blue1 },
                { label:"Market CAGR 2024–2030",          value:"10.8%",  color:C.blue2 },
                { label:"Projected PPE Export (India)",   value:"$5.0B",  color:C.teal  },
                { label:"Surgical Volume by 2030",        value:"80M+/yr",color:C.navy  },
                { label:"New Hospital Beds (Ayushman)",   value:"150,000",color:C.blue3 },
                { label:"ISO-certified Indian PPE Firms", value:"2,800+", color:C.slate },
              ].map((m,i)=>(
                <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:`1px solid ${C.border}` }}>
                  <span style={{ fontSize:11, color:C.textLight }}>{m.label}</span>
                  <span style={{ fontSize:13, fontWeight:900, color:m.color }}>{m.value}</span>
                </div>
              ))}
              <InsightBox text="💡 Regulatory Compliance is the #1 demand driver (score 91/100) — CDSCO amendments now mandate ISO 10282 for all hospital glove procurement above ₹5L." color={C.teal}/>
            </Card>
          </div>
        </>)}

      </div>

      {/* FOOTER */}
      <div style={{ borderTop:`1.5px solid ${C.border}`, background:C.white, marginTop:30, padding:"14px 28px", textAlign:"center", fontSize:10, color:C.slateL, letterSpacing:"0.06em" }}>
        DATA SOURCES: WHO · GRAND VIEW RESEARCH · MORDOR INTELLIGENCE · IBEF · ICIS · BLOOMBERG COMMODITIES · CDSCO · MoHFW · GeM PORTAL · HITES (HLL LIFECARE)
        &nbsp;·&nbsp; FOR MARKET RESEARCH USE ONLY
      </div>
    </div>
  );
}
