"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";

const phone = "77013684924";
const wa = (message: string) => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
const mainMessage = "Сәлеметсіз бе, Жанар! Доула қызметі туралы кеңес алғым келеді.";

const services = [
  ["01", "Психологиялық дайындық", "Уайымды жұмсартып, өз сезіміңізді түсінуге және босануға сабырмен дайындалуға арналған жеке әңгіме."],
  ["02", "Тыныс алу және босаңсу", "Толғақ кезінде қолдануға болатын тыныс ырғағы, денені босаңсыту және жайлы қалыптарды бірге үйренеміз."],
  ["03", "Босану жоспары", "Сіздің қалауыңыз бен шекараңызды ескеретін, дәрігермен талқылауға ыңғайлы жоспар құрамыз."],
  ["04", "Серіктеспен дайындық", "Жұбайыңызға не істеу керегін, қандай сөздер мен жанасулар қолдау болатынын түсіндіремін."],
  ["05", "Босану кезіндегі сүйемелдеу", "Келісілген форматта жаныңызда болып, тыныс, қозғалыс және эмоциялық қолдауды үздіксіз ұсынамын."],
  ["06", "Босанғаннан кейінгі кезең", "Алғашқы күндердегі сезімдеріңізді тыңдап, демалыс пен жаңа рөлге бейімделуге жұмсақ қолдау көрсетемін."],
];

const packages = [
  ["Танысу кеңесі", "Алғашқы сұрақтарды талқылап, сізге қай формат сәйкес келетінін анықтаймыз.", ["30–40 минуттық әңгіме", "Қажеттілікті анықтау", "Келесі қадамдарға ұсыныс"]],
  ["Босануға дайындық", "Жеке кездесулер арқылы сабырлы әрі саналы дайындық жоспарын құрамыз.", ["Жеке дайындық жоспары", "Тыныс пен босаңсу", "Серіктеске арналған нұсқау"]],
  ["Толық сүйемелдеу", "Жүктіліктің соңғы кезеңінен босанғаннан кейінгі алғашқы күндерге дейінгі тұтас қолдау.", ["Дайындық кездесулері", "Босану кезіндегі қолдау", "Босанғаннан кейінгі байланыс"]],
];

const faqs = [
  ["Доула деген кім?", "Доула — жүктілік, босану және босанғаннан кейінгі кезеңде әйелге эмоциялық, ақпараттық және практикалық қолдау көрсететін маман."],
  ["Доула акушерді немесе дәрігерді алмастыра ма?", "Жоқ. Доула медициналық диагностика, емдеу немесе акушерлік көмек көрсетпейді. Медициналық шешімдер дәрігермен бірге қабылданады."],
  ["Сүйемелдеуге қай уақытта жазылған дұрыс?", "Өзіңізге ыңғайлы кез келген уақытта жазыла аласыз. Ертерек танысу бір-бірімізді жақсырақ түсінуге және асықпай дайындалуға мүмкіндік береді."],
  ["Қызмет тек Атырау қаласында көрсетіле ме?", "Бетпе-бет сүйемелдеу Атырау қаласында өтеді. Кейбір дайындық кеңестерін онлайн форматта келісуге болады."],
  ["Алғашқы кеңес қалай өтеді?", "WhatsApp арқылы уақыт белгілейміз. Әңгімеде күткеніңізді, сұрақтарыңызды және сізге ыңғайлы қолдау форматын талқылаймыз."],
  ["Жолдасым дайындыққа қатыса ала ма?", "Әрине. Серіктестің қатысуы отбасыға ортақ түсінік қалыптастырып, босану кезінде нақты қолдау көрсетуіне көмектеседі."],
  ["Қызмет құны қанша?", "Құны таңдалған формат пен қажеттілікке байланысты. WhatsApp арқылы хабарласып, нақты бағасын біліңіз."],
];

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [status, setStatus] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("Жіберілуде…");
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error);
      setStatus("Рақмет! WhatsApp терезесі ашылады.");
      window.location.href = data.url;
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Қате шықты. Қайта көріңіз.");
    }
  }

  return (
    <main>
      <header className="header">
        <a href="#top" className="brand"><span>Ж</span><b>Жанар</b><small>Доула · Атырау</small></a>
        <button className="menuBtn" aria-label="Мәзірді ашу" aria-expanded={menu} onClick={() => setMenu(!menu)}><i/><i/></button>
        <nav className={menu ? "open" : ""} aria-label="Негізгі мәзір">
          {[['Басты бет','#top'],['Қызметтер','#services'],['Мен туралы','#about'],['Қалай өтеді?','#process'],['Сұрақтар','#faq']].map(([t,h]) => <a key={h} href={h} onClick={()=>setMenu(false)}>{t}</a>)}
          <a className="navCta" href={wa(mainMessage)}>Байланысу</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="heroCopy reveal">
          <p className="eyebrow">Атыраудағы жеке доула қолдауы</p>
          <h1>Босануға сеніммен және тыныштықпен дайындалыңыз</h1>
          <p className="lead">Менің атым — Жанар. Атырау қаласында болашақ аналарға босануға дайындық кезінде эмоциялық, ақпараттық және практикалық қолдау көрсетемін.</p>
          <div className="actions"><a className="primary" href={wa(mainMessage)}>WhatsApp арқылы кеңес алу <b>↗</b></a><a className="textLink" href="#services">Қызметтерді көру <span>↓</span></a></div>
          <p className="micro">Жауапты өзім беремін · Әңгіме құпия сақталады</p>
        </div>
        <div className="heroVisual">
          <Image src="/hero-zhanar.jpg" alt="Доула Жанар жұмыс орнында" width={930} height={1280} priority sizes="(max-width: 900px) 100vw, 50vw" />
          <div className="note"><span>✦</span><p>Сіздің таңдауыңыз —<br/><b>әрдайым басты орында</b></p></div>
        </div>
      </section>

      <section className="section services" id="services">
        <div className="sectionHead"><div><p className="eyebrow">Қолдау бағыттары</p><h2>Сізге қалай<br/><em>көмектесемін?</em></h2></div><p>Әр жүктілік пен әр отбасының тарихы бөлек. Сондықтан қолдау форматы да сіздің жағдайыңызға сай құрылады.</p></div>
        <div className="serviceGrid">{services.map(([n,t,d])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p><a href={wa(`Сәлеметсіз бе, Жанар! «${t}» қызметі туралы толығырақ білгім келеді.`)}>Толығырақ білу <b>→</b></a></article>)}</div>
      </section>

      <section className="about" id="about">
        <div className="aboutVisual"><Image src="/doula-support.webp" alt="Доула мен болашақ ана жылы әңгімелесіп отыр" width={1024} height={1024} sizes="(max-width: 900px) 100vw, 50vw"/><p>«Әйел өзін тыңдағанда,<br/>өз күшін қайта табады»</p></div>
        <div className="aboutCopy"><p className="eyebrow">Мен туралы</p><h2>Сіздің жаныңызда —<br/><em>асықпай, бағаламай</em></h2><blockquote>«Әр әйел босану кезінде өзін қауіпсіз, естілген және қолдау көргендей сезінуге лайық.»</blockquote><p>Менің мақсатым — сіздің шешімдеріңізді құрметтеп, маңызды кезеңде жаныңыздан табылу. Доула ретінде кеңістігіңізді сақтап, сұрақтарыңызды реттеуге және ішкі сеніміңізге сүйенуге көмектесемін.</p><div className="credentials"><div><small>БІЛІМІ</small><b>Ақпарат кейін енгізіледі</b></div><div><small>СЕРТИФИКАТЫ</small><b>Ақпарат кейін енгізіледі</b></div><div><small>ТӘЖІРИБЕСІ</small><b>Ақпарат кейін енгізіледі</b></div></div></div>
      </section>

      <section className="section process" id="process"><div className="centerHead"><p className="eyebrow">Бірге жұмыс істеу</p><h2>Сүйемелдеу қалай өтеді?</h2><p>Түсінікті төрт қадам. Әр кезеңде сіздің жайлылығыңыз бен таңдауыңыз маңызды.</p></div><div className="steps">{[['01','WhatsApp арқылы танысу','Қысқа хабарлама жазып, алғашқы сұрағыңызды қоясыз.'],['02','Алғашқы кеңес','Қажеттіліктеріңізді, күткеніңізді және қолдау форматын талқылаймыз.'],['03','Жеке дайындық жоспары','Сізге және отбасыңызға сай нақты әрі икемді жоспар құрамыз.'],['04','Келісілген сүйемелдеу','Таңдалған форматта сабырлы, тұрақты қолдау көрсетемін.']].map((x,i)=><article key={x[0]}><span>{x[0]}</span>{i<3&&<i/>}<h3>{x[1]}</h3><p>{x[2]}</p></article>)}</div></section>

      <section className="section packages"><div className="sectionHead"><div><p className="eyebrow">Қызмет пакеттері</p><h2>Өзіңізге ыңғайлы<br/><em>қолдауды таңдаңыз</em></h2></div><p>Бағалар мен нақты құрам алғашқы әңгімеде сіздің қажеттілігіңізге қарай нақтыланады.</p></div><div className="packageGrid">{packages.map((x,i)=><article key={x[0] as string} className={i===1?'featured':''}>{i===1&&<label>ЖИІ ТАҢДАЛАДЫ</label>}<small>0{i+1}</small><h3>{x[0] as string}</h3><p>{x[1] as string}</p><ul>{(x[2] as string[]).map(y=><li key={y}>✓ {y}</li>)}</ul><a href={wa(`Сәлеметсіз бе, Жанар! «${x[0]}» қызметі туралы кеңес алғым келеді.`)}>Бағасын нақтылау <span>↗</span></a></article>)}</div></section>

      <section className="section faq" id="faq"><div className="faqIntro"><p className="eyebrow">Жиі қойылатын сұрақтар</p><h2>Сұрағыңызға<br/><em>жауап табыңыз</em></h2><p>Тағы бір нәрсе білгіңіз келсе, WhatsApp арқылы тікелей жаза аласыз.</p><a className="textLink" href={wa(mainMessage)}>Жанарға сұрақ қою <span>↗</span></a></div><div className="accordion">{faqs.map(([q,a],i)=><details key={q} open={i===0}><summary><span>{String(i+1).padStart(2,'0')}</span>{q}<b>＋</b></summary><p>{a}</p></details>)}</div></section>

      <section className="contact" id="contact"><div className="contactCopy"><p className="eyebrow">Алғашқы қадам</p><h2>Бұл маңызды кезеңде<br/><em>жалғыз қалмаңыз</em></h2><p>Сұрақтарыңызды қойып, сізге сәйкес қолдау форматын бірге анықтайық.</p><a className="primary light" href={wa(mainMessage)}>Жанарға WhatsApp арқылы жазу <b>↗</b></a><small>Доула медициналық маманды алмастырмайды. Шұғыл жағдайда дәрігерге немесе 103 нөміріне хабарласыңыз.</small></div><form onSubmit={submit}><h3>Кеңеске өтінім</h3><label>Атыңыз<input name="name" required minLength={2} placeholder="Атыңызды жазыңыз"/></label><label>Телефон нөмірі<input name="phone" required pattern="[+0-9 ()-]{10,20}" placeholder="+7 7__ ___ __ __"/></label><label>Болжамды босану мерзімі<input name="dueDate" type="month"/></label><label>Қажетті қызмет<select name="service"><option>Танысу кеңесі</option><option>Босануға дайындық</option><option>Толық сүйемелдеу</option></select></label><label>Қысқаша хабарлама<textarea name="message" rows={3} placeholder="Сұрағыңызды жазыңыз"/></label><input className="honey" name="website" tabIndex={-1} autoComplete="off"/><label className="consent"><input type="checkbox" name="consent" required/> Жеке мәліметтерімді осы өтінімге жауап беру үшін өңдеуге келісемін.</label><button className="primary" type="submit">Өтінімді WhatsApp-қа жіберу <b>↗</b></button><p className="formStatus" aria-live="polite">{status}</p></form></section>

      <footer><a href="#top" className="brand"><span>Ж</span><b>Жанар</b><small>Доула · Атырау</small></a><div><b>Байланыс</b><a href="tel:+77013684924">+7 701 368 49 24</a><a href={wa(mainMessage)}>WhatsApp</a></div><div><b>Құжаттар</b><a href="/privacy">Құпиялық саясаты</a><a href="/terms">Пайдалану шарттары</a></div><p>© 2026 Жанар — Доула<br/>Атырау қаласы</p></footer>
      <a className="floatingWa" href={wa(mainMessage)} aria-label="WhatsApp арқылы жазу"><span>✆</span><b>WhatsApp-қа жазу</b></a>
    </main>
  );
}
