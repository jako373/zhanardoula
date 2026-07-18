const attempts = new Map<string, { count: number; reset: number }>();

export async function POST(request: Request) {
  const ip = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for") || "local";
  const now = Date.now();
  const rate = attempts.get(ip);
  if (rate && rate.reset > now && rate.count >= 5) return Response.json({ error: "Өтінім тым жиі жіберілді. Бірнеше минуттан кейін қайталаңыз." }, { status: 429 });
  attempts.set(ip, !rate || rate.reset < now ? { count: 1, reset: now + 10 * 60_000 } : { ...rate, count: rate.count + 1 });
  try {
    const p = await request.json() as Record<string, string>;
    if (p.website) return Response.json({ ok: true, url: "/" });
    const name = p.name?.trim();
    const phone = p.phone?.trim();
    if (!name || name.length < 2) return Response.json({ error: "Атыңызды дұрыс жазыңыз." }, { status: 400 });
    if (!phone || !/^[+0-9 ()-]{10,20}$/.test(phone)) return Response.json({ error: "Телефон нөмірін дұрыс жазыңыз." }, { status: 400 });
    if (!p.consent) return Response.json({ error: "Жеке мәліметтерді өңдеуге келісім қажет." }, { status: 400 });
    const message = [`Сәлеметсіз бе, Жанар! Сайт арқылы кеңес алғым келеді.`, ``, `Атым: ${name}`, `Телефон: ${phone}`, `Болжамды мерзім: ${p.dueDate || "көрсетілмеген"}`, `Қызмет: ${p.service || "анықталмаған"}`, p.message ? `Хабарлама: ${p.message.slice(0, 500)}` : ""].filter(Boolean).join("\n");
    return Response.json({ ok: true, url: `https://wa.me/77013684924?text=${encodeURIComponent(message)}` });
  } catch { return Response.json({ error: "Өтінімді өңдеу мүмкін болмады." }, { status: 400 }); }
}
