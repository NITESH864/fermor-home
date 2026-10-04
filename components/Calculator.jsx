"use client";
import { useState } from "react";
import { sip, emi, inr } from "@/lib/finance";

function Slider({ label, value, set, min, max, step, fmt }) {
  const id = label.replace(/\s/g, "-");
  return (
    <div className="mb-5">
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="text-sm text-mute">{label}</label>
        <span className="num font-display text-lg font-semibold">{fmt(value)}</span>
      </div>
      <input id={id} type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => set(+e.target.value)} />
    </div>
  );
}

function Chart({ series }) {
  const W = 400, H = 150, max = series[series.length - 1].value || 1, last = series.length - 1 || 1;
  const pts = (k) => series.map((p, i) => `${(i / last) * W},${H - (p[k] / max) * (H - 6)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mt-4 h-36 w-full" role="img"
      aria-label="Growth of invested amount versus total value over time">
      <polygon points={`0,${H} ${pts("value")} ${W},${H}`} fill="var(--color-leaf)" opacity=".85" />
      <polygon points={`0,${H} ${pts("invested")} ${W},${H}`} fill="var(--color-sun)" />
    </svg>
  );
}

export default function Calculator() {
  const [tab, setTab] = useState("sip");
  const [m, setM] = useState(10000), [sr, setSr] = useState(12), [sy, setSy] = useState(15);
  const [p, setP] = useState(4000000), [lr, setLr] = useState(8.5), [ly, setLy] = useState(20);
  const S = sip(m, sr, sy), E = emi(p, lr, ly);
  const tabs = [["sip", "SIP"], ["emi", "Home loan EMI"]];

  return (
    <div className="rounded-3xl bg-white p-5 shadow-[0_20px_50px_-25px_rgba(23,32,58,.45)] sm:p-7">
      <div role="tablist" className="mb-6 inline-flex rounded-full bg-paper p-1">
        {tabs.map(([k, l]) => (
          <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${tab === k ? "bg-ink text-white" : "text-mute"}`}>
            {l}
          </button>
        ))}
      </div>

      {tab === "sip" ? (
        <>
          <Slider label="Monthly investment" value={m} set={setM} min={500} max={200000} step={500} fmt={inr} />
          <Slider label="Expected return (p.a.)" value={sr} set={setSr} min={1} max={20} step={0.5} fmt={(v) => v + "%"} />
          <Slider label="Duration" value={sy} set={setSy} min={1} max={40} step={1} fmt={(v) => v + " yrs"} />
          <p className="mt-6 text-sm text-mute">You would have</p>
          <p className="num font-display text-4xl font-bold sm:text-5xl" aria-live="polite">{inr(S.fv)}</p>
          <p className="num mt-1 text-sm text-mute">
            <span className="font-medium text-ink">{inr(S.invested)}</span> invested, <span className="font-medium text-leaf">{inr(S.gain)}</span> earned
          </p>
          <Chart series={S.series} />
          <details className="mt-4 border-t border-paper pt-3 text-sm">
            <summary className="cursor-pointer font-medium">Show the math</summary>
            <p className="num mt-2 text-mute">FV = P × [((1 + i)ⁿ − 1) / i] × (1 + i)</p>
            <p className="num text-mute">P = {inr(m)}, i = {sr}% ÷ 12 = {(sr / 12).toFixed(3)}%, n = {sy * 12} months</p>
            <p className="mt-2 text-mute">Assumes a constant return and investment at the start of each month. Real returns vary, and tax and expense ratio are not included.</p>
          </details>
        </>
      ) : (
        <>
          <Slider label="Loan amount" value={p} set={setP} min={100000} max={20000000} step={100000} fmt={inr} />
          <Slider label="Interest rate (p.a.)" value={lr} set={setLr} min={5} max={16} step={0.05} fmt={(v) => v.toFixed(2) + "%"} />
          <Slider label="Tenure" value={ly} set={setLy} min={1} max={30} step={1} fmt={(v) => v + " yrs"} />
          <p className="mt-6 text-sm text-mute">Monthly EMI</p>
          <p className="num font-display text-4xl font-bold sm:text-5xl" aria-live="polite">{inr(E.emi)}</p>
          <p className="num mt-1 text-sm text-mute">
            You repay <span className="font-medium text-ink">{inr(E.total)}</span>, of which <span className="font-medium text-leaf">{inr(E.interest)}</span> is interest
          </p>
          <div className="mt-4 flex h-3 overflow-hidden rounded-full" aria-hidden>
            <div className="bg-sun" style={{ width: `${(p / E.total) * 100}%` }} />
            <div className="flex-1 bg-leaf" />
          </div>
          <details className="mt-4 border-t border-paper pt-3 text-sm">
            <summary className="cursor-pointer font-medium">Show the math</summary>
            <p className="num mt-2 text-mute">EMI = P × r × (1 + r)ⁿ ÷ ((1 + r)ⁿ − 1)</p>
            <p className="num text-mute">P = {inr(p)}, r = {lr}% ÷ 12 = {(lr / 12).toFixed(3)}%, n = {ly * 12}</p>
            <p className="mt-2 text-mute">Reducing-balance method. Processing fees and prepayments are not included.</p>
          </details>
        </>
      )}
    </div>
  );
}
