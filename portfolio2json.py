import os
import json
import frontmatter

# Path to the folder containing Markdown files
portfolio_dir = "_portfolio"
portfolio_data = []

for filename in os.listdir(portfolio_dir):
    if filename.endswith(".md"):
        with open(os.path.join(portfolio_dir, filename), 'r', encoding='utf-8') as file:
            post = frontmatter.load(file)
            portfolio_data.append({
                "title": post["title"],
                "client": post["client"],
                "goal": post["goal"],
                "contributions": post["contributions"],
                "content": post.content.strip()
            })

# Save the data to a JSON file
with open("assets/js/portfolio.json", "w", encoding='utf-8') as json_file:
    json.dump(portfolio_data, json_file, ensure_ascii=False, indent=2)
