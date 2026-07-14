import io

# Try different encodings
for enc in ['utf-8', 'cp1252', 'latin-1', 'utf-16']:
    try:
        with io.open('index.html', 'r', encoding=enc) as f:
            content = f.read()
        lines = content.split('\n')
        print(f'=== {enc} works ({len(lines)} lines) ===')
        for i, line in enumerate(lines):
            stripped = line.strip()
            if 'id="app"' in line and ('<div' in line):
                print(f'#app opens at line {i+1}: {line.rstrip()[:100]}')
            if stripped == '</div>' or stripped.startswith('</div>'):
                indent = len(line) - len(line.lstrip())
                print(f'</div> at line {i+1}, indent={indent}')
            if '</footer>' in stripped:
                print(f'</footer> at line {i+1}')
        break
    except Exception as e:
        print(f'{enc}: {e}')
