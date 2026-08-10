const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Wrap back card contents in <div class="back-content">
html = html.replace('<div class="visiting-card card-back">\n        <div class="back-top-section">', '<div class="visiting-card card-back">\n        <div class="back-content">\n            <div class="back-top-section">');
html = html.replace('        </div>\n    </div>\n    </div>\n\n    <!-- html2pdf Library -->', '        </div>\n        </div>\n    </div>\n    </div>\n\n    <!-- html2pdf Library -->');

// Fix QR code for proper vCard encoding
html = html.replace('https://quickchart.io/qr?text=https%3A%2F%2Fwa.me%2F97335102870%3Ftext%3DHi%2520Sri%2520Mathi%252C%2520I%2520need%2520a%2520website%2520demo&size=500&margin=1', 'https://quickchart.io/qr?text=BEGIN:VCARD%0AVERSION:3.0%0AN:Mathi;M.;Sri;;%0AFN:M.%20Sri%20Mathi%0ATITLE:Full%20Stack%20Engineer%0ATEL;TYPE=WORK,VOICE:+97335102870%0ATEL;TYPE=CELL,VOICE:+919952107695%0AEMAIL;TYPE=PREF,INTERNET:srimathip789@gmail.com%0AURL:https://linkedin.com/in/srimathip789%0AEND:VCARD&margin=1&size=150');

fs.writeFileSync('index.html', html);
console.log('Fixed index.html successfully!');
