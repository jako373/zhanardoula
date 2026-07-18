import Link from "next/link";

export default function NotFound() {
  return <main className="legal"><p className="eyebrow">404</p><h1>Бұл бет табылмады</h1><p>Сілтемені тексеріңіз немесе басты бетке оралыңыз.</p><Link className="primary" href="/">Басты бетке</Link></main>;
}
