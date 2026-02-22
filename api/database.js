export default async function handler(req, res) {
    const GOOGLE_URL = process.env.GOOGLE_DB_URL;
    if (!GOOGLE_URL) return res.status(500).json({ error: 'Configuração ausente' });

    if (req.method === 'GET') {
        try {
            const response = await fetch(GOOGLE_URL);
            const data = await response.json();
            res.status(200).json(data);
        } catch (e) { res.status(500).json({ error: 'Falha na leitura' }); }
    } else if (req.method === 'POST') {
        try {
            await fetch(GOOGLE_URL, { method: 'POST', body: JSON.stringify(req.body) });
            res.status(200).json({ success: true });
        } catch (e) { res.status(500).json({ error: 'Falha na escrita' }); }
    }
}
