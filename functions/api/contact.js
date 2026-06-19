// Cloudflare Pages Function — POST /api/contact
// Envía el formulario de contacto por email usando Resend (API REST vía fetch).
// Variables de entorno (Cloudflare Pages → Settings → Environment variables):
//   RESEND_API_KEY  (obligatoria)
//   CONTACT_TO      (opcional, por defecto juanalcarazcine@gmail.com)
//   CONTACT_FROM    (opcional, por defecto onboarding@resend.dev; usa un dominio verificado en producción)

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export async function onRequestPost({ request, env }) {
  let data;
  try {
    data = await request.json();
  } catch {
    return json({ error: 'Petición no válida.' }, 400);
  }

  const name = (data?.name || '').toString().trim();
  const email = (data?.email || '').toString().trim();
  const message = (data?.message || '').toString().trim();

  if (!name || !email || !message) {
    return json({ error: 'Completa todos los campos.' }, 400);
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json({ error: 'Email no válido.' }, 400);
  }
  if (message.length > 5000 || name.length > 200) {
    return json({ error: 'Mensaje demasiado largo.' }, 400);
  }
  if (!env.RESEND_API_KEY) {
    return json({ error: 'El email no está configurado todavía.' }, 500);
  }

  const esc = (s) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM || 'Web Juan Alcaraz <onboarding@resend.dev>',
        to: [env.CONTACT_TO || 'juanalcarazcine@gmail.com'],
        reply_to: email,
        subject: `Nuevo mensaje web — ${name}`,
        text: `Nombre: ${name}\nEmail: ${email}\n\n${message}`,
        html: `<h2>Nuevo mensaje desde la web</h2>
<p><strong>Nombre:</strong> ${esc(name)}</p>
<p><strong>Email:</strong> ${esc(email)}</p>
<p style="white-space:pre-wrap">${esc(message)}</p>`,
      }),
    });

    if (!r.ok) {
      return json({ error: 'No se pudo enviar el email. Inténtalo por WhatsApp.' }, 502);
    }
    return json({ ok: true });
  } catch {
    return json({ error: 'Error del servidor. Inténtalo por WhatsApp.' }, 500);
  }
}
