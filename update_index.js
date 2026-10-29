const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/<title>.*?<\/title>/, '<title>Sahil & Aamina — Wedding & Reception Invitation</title>');
html = html.replace(/<meta content=".*?" name="description"\/>/, '<meta content="Mr. & Mrs. Muzammil Mustaq Sayed solicit your gracious and esteemed presence on the auspicious occasion of the Reception Ceremony of their beloved son Sahil Sayed with Aamina Lashkariya." name="description"/>');
html = html.replace(/<meta content=".*?" property="og:title"\/>/g, '<meta content="Sahil & Aamina — Wedding & Reception Invitation" property="og:title"/>');
html = html.replace(/<meta content=".*?" property="og:description"\/>/, '<meta content="Mr. & Mrs. Muzammil Mustaq Sayed solicit your gracious and esteemed presence on the auspicious occasion of the Reception Ceremony of their beloved son Sahil Sayed with Aamina Lashkariya." property="og:description"/>');

fs.writeFileSync('index.html', html);
