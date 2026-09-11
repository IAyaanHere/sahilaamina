const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/<title>.*?<\/title>/, '<title>Durefishan & Bilal — Nikah Invitation</title>');
html = html.replace(/<meta content="You are warmly invited to celebrate the Nikah of Zoya Khan and Shaikh Zaid." name="description"\/>/, '<meta content="You are warmly invited to celebrate the Nikah of Durefishan and Bilal Abbas." name="description"/>');
html = html.replace(/<meta content="Zoya & Zaid — Nikah Invitation" property="og:title"\/>/g, '<meta content="Durefishan & Bilal — Nikah Invitation" property="og:title"/>');
html = html.replace(/<meta content="You are warmly invited to celebrate the Nikah of Zoya Khan and Shaikh Zaid." property="og:description"\/>/, '<meta content="You are warmly invited to celebrate the Nikah of Durefishan and Bilal Abbas." property="og:description"/>');

fs.writeFileSync('index.html', html);
