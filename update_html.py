import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Front page Industries bullet
html = html.replace('<span class="tc-label">Industries:</span> <strong>Hotels', '<span class="tc-label">Industries:</span> <strong>&bull; Hotels')

# 2. Back page Industries bullet
html = html.replace('<span class="ind-label">Industries:</span> Hotels', '<span class="ind-label">Industries:</span> &bull; Hotels')

# 3. Sri Shiv Prakash same line
html = html.replace('<span class="l-first">SRI SHIV</span>\n                              <span class="l-last">PRAKASH</span>', '<span class="l-first">SRI SHIV</span> <span class="l-last">PRAKASH</span>')

# 4. FREELANCE WEB & DIGITAL MARKETING same line
html = html.replace('<span style="font-size: 2.5pt; letter-spacing: 1px; opacity: 0.9; display: block; margin-bottom: 0.5px;">FREELANCE</span>\n                                  <span style="font-size: 3.2pt; letter-spacing: 0.2px; display: block;">WEB & DIGITAL MARKETING</span>', '<span style="font-size: 3.2pt; letter-spacing: 0.2px;"><span style="font-size: 2.5pt; letter-spacing: 1px; opacity: 0.9; margin-right: 3px;">FREELANCE</span> WEB & DIGITAL MARKETING</span>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Updated HTML successfully!')
