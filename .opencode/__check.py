with open('index.html', 'r', encoding='cp1252', errors='replace') as f:
    lines = f.readlines()
for i, line in enumerate(lines):
    s = line.strip()
    if 'app-template' in s or ('id="app"' in s and ('div' in s or 'script' in s)):
        print(f'{i+1}: {s}')
print(f'Total lines: {len(lines)}')
