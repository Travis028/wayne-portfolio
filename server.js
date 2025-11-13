const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3002;

app.use(express.static(__dirname));

// Auto-reload functionality
app.get('/reload-check', (req, res) => {
    res.json({ reload: true });
});

app.get('/', (req, res) => {
    const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    const autoReloadScript = `
    <script>
        setInterval(() => {
            fetch('/reload-check')
                .then(() => location.reload())
                .catch(() => {});
        }, 2000);
    </script>
    `;
    res.send(html.replace('</body>', autoReloadScript + '</body>'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Auto-reload enabled - changes will refresh automatically!');
});