export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
    
    if (!CLAUDE_API_KEY) {
        return res.status(500).json({ error: 'API key not configured' });
    }

    try {
        const { system, messages } = req.body;

        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': CLAUDE_API_KEY,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-sonnet-4-20250514',
                max_tokens: 1000,
                system: system,
                messages: messages
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            console.error('API Error:', data);
            throw new Error(data.error?.message || 'API request failed');
        }

        // Extract the text from the response
        const responseText = data.content && data.content[0] && data.content[0].text 
            ? data.content[0].text 
            : 'I apologize, but I am having trouble responding right now. Please try again.';

        res.status(200).json({ response: responseText });
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ 
            error: error.message,
            response: 'I apologize, but I am having trouble connecting right now. Please try again in a moment.'
        });
    }
}