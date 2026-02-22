export default async function handler(req, res) {
    const GOOGLE_URL = process.env.GOOGLE_DB_URL;
    if (!GOOGLE_URL) return res.status(500).json({ error: 'Configuração ausente' });

    if (req.method === 'GET') {
        try {
            const response = await fetch(GOOGLE_URL);
            const data = await response.json();
            return res.status(200).json(data);
        } catch (e) { 
            return res.status(500).json({ error: 'Falha na leitura' }); 
        }
    } else if (req.method === 'POST') {
        try {
            await fetch(GOOGLE_URL, { 
                method: 'POST', 
                headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // <- ISSO DESTRAVA O GOOGLE
                body: JSON.stringify(req.body) 
            });
            return res.status(200).json({ success: true });
        } catch (e) { 
            return res.status(500).json({ error: 'Falha na escrita' }); 
        }
    }
}
