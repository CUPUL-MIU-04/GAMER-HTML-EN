import os

# TU CÓDIGO DE ADSENSE (personalizado)
adsense_script_head = '''<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3869365676003245"
     crossorigin="anonymous"></script>'''

adsense_ad_unit = '''
<!-- Anuncio AdSense - Responsivo -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-3869365676003245"
     data-ad-slot="1234567890"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
'''

# Buscar y modificar TODOS los HTML
for root, dirs, files in os.walk('.'):
    for file in files:
        if file.endswith('.html'):
            file_path = os.path.join(root, file)
            print(f"Modificando: {file_path}")
            
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Insertar en <head> (solo si no existe)
            if 'adsbygoogle.js' not in content:
                content = content.replace('<head>', f'<head>\n{adsense_script_head}')
            
            # Insertar anuncio después de <body> (o antes de </body>)
            if '<body>' in content and adsense_ad_unit not in content:
                content = content.replace('<body>', f'<body>\n{adsense_ad_unit}')
            elif '</body>' in content and adsense_ad_unit not in content:
                content = content.replace('</body>', f'{adsense_ad_unit}\n</body>')
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)

print("✅ ¡Anuncios agregados en todos los HTML!")
