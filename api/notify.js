export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Acesso negado' });

    const { tipo, data, descricao, valor = 'N/A', local = 'N/A' } = req.body;
    const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_TOKEN || !CHAT_ID) return res.status(500).json({ error: 'Chaves ausentes.' });

    let textoMensagem = '';
    const linha = "➖➖➖➖➖➖➖➖➖➖\n";

    if (tipo === 'Despesa') {
        textoMensagem = `🚨 *NOVA DESPESA* 🚨\n${linha}📉 *TIPO:* Registro de Saída\n📅 *DATA:* ${data}\n📍 *LOCAL:* ${local}\n📝 *DESCRIÇÃO:* ${descricao}\n${linha}💰 *VALOR:* *R$ ${valor}*\n${linha}_🤖 Gestor Pro_`;
    } else {
        textoMensagem = `📅 *NOVO REGISTRO* 📅\n${linha}📌 *TIPO:* ${tipo}\n🗓️ *DATA:* ${data}\n🎯 *DESCRIÇÃO:* ${descricao}\n📍 *INFO/LOCAL:* ${local}\n${linha}_🤖 Gestor Pro_`;
    }

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
    const payload = { chat_id: CHAT_ID, text: textoMensagem, parse_mode: 'Markdown' };

    try {
        await fetch(telegramUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        return res.status(200).json({ success: true });
    } catch (error) { 
        return res.status(500).json({ error: 'Erro Servidor' }); 
    }
}
