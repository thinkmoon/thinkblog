#!/usr/bin/env python3
import os
import re
import glob
import yaml

def convert_frontmatter(content_dir):
    """Convert frontmatter from original format to Hugo format"""

    # Find all markdown files
    md_files = glob.glob(os.path.join(content_dir, "*.md"))

    for file_path in md_files:
        print(f"Processing {file_path}")

        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()

            # Split frontmatter and body
            parts = content.split('---', 2)
            if len(parts) < 3:
                print(f"Skipping {file_path} - no frontmatter found")
                continue

            frontmatter_str = parts[1]
            body = parts[2]

            # Parse YAML frontmatter
            try:
                frontmatter = yaml.safe_load(frontmatter_str)
            except yaml.YAMLError as e:
                print(f"Error parsing YAML in {file_path}: {e}")
                continue

            # Convert fields
            new_frontmatter = {}

            # Copy basic fields
            if 'title' in frontmatter:
                new_frontmatter['title'] = frontmatter['title']
            if 'date' in frontmatter:
                new_frontmatter['date'] = frontmatter['date']
            if 'modified' in frontmatter:
                new_frontmatter['lastmod'] = frontmatter['modified']

            # Convert category to categories array
            if 'category' in frontmatter:
                new_frontmatter['categories'] = [frontmatter['category']]

            # Copy tags as is
            if 'tags' in frontmatter:
                new_frontmatter['tags'] = frontmatter['tags']

            # Convert desc to description
            if 'desc' in frontmatter:
                new_frontmatter['description'] = frontmatter['desc']

            # Handle thumb as featured image
            if 'thumb' in frontmatter and frontmatter['thumb']:
                new_frontmatter['featured_image'] = frontmatter['thumb']

            # Convert back to YAML
            new_frontmatter_str = yaml.dump(new_frontmatter, allow_unicode=True, default_flow_style=False, sort_keys=False)

            # Write back to file
            new_content = f"---\n{new_frontmatter_str}---\n{body}"
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)

        except Exception as e:
            print(f"Error processing {file_path}: {e}")

if __name__ == "__main__":
    content_dir = "content"
    convert_frontmatter(content_dir)
    print("Frontmatter conversion completed!")
