"use client";
export default function ErrorPage({reset}:{reset:()=>void}){return <main className="legal"><p className="eyebrow">Жүйелік қате</p><h1>Бір нәрсе дұрыс болмады</h1><p>Бетті қайта жүктеп көріңіз. Мәселе қайталанса, WhatsApp арқылы хабарласыңыз.</p><button className="primary" onClick={reset}>Қайта көру</button></main>}
