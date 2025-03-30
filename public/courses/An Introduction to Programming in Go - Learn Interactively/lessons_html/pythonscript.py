import os

# CSS link to be inserted
css_link = '<link rel="stylesheet" href="css/educative.css">\n'
inject_marker = "<!--mui-inject-first-->"

# Iterate over all HTML files in the current directory
for filename in os.listdir('.'):
    if filename.endswith('.html'):
        with open(filename, 'r', encoding='utf-8') as file:
            content = file.readlines()

        modified = False
        new_content = []

        for line in content:
            new_content.append(line)
            if inject_marker in line:
                new_content.append(css_link)  # Insert after marker
                modified = True

        if modified:
            with open(filename, 'w', encoding='utf-8') as file:
                file.writelines(new_content)

print("Stylesheet link injected after <!--mui-inject-first--> in all HTML files.")
