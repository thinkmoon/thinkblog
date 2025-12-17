#!/usr/bin/env python3
import os
import re
import glob
import yaml
import math
import shutil

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

def generate_pagination(content_dir, posts_per_page=10):
    """Generate pagination pages for custom pagination"""

    # Count posts in the post directory
    post_dir = os.path.join(content_dir, "post")
    if not os.path.exists(post_dir):
        print(f"Post directory {post_dir} does not exist")
        return

    md_files = glob.glob(os.path.join(post_dir, "*.md"))
    total_posts = len(md_files)
    total_pages = math.ceil(total_posts / posts_per_page)

    print(f"Found {total_posts} posts, creating {total_pages} pages")

    # Create page directory if it doesn't exist
    page_dir = os.path.join(content_dir, "page")
    if os.path.exists(page_dir):
        # Remove existing pagination directories (but keep _index.md)
        for item in os.listdir(page_dir):
            item_path = os.path.join(page_dir, item)
            if os.path.isdir(item_path) and item.isdigit():
                shutil.rmtree(item_path)
                print(f"Removed old pagination directory: {item}")

    os.makedirs(page_dir, exist_ok=True)

    # Generate pagination pages
    for page_num in range(1, total_pages + 1):
        page_subdir = os.path.join(page_dir, str(page_num))
        os.makedirs(page_subdir, exist_ok=True)

        # Create _index.md for this page
        index_content = f"""---
title: "文章列表 - 第{page_num}页"
description: "所有文章的完整列表，按时间倒序排列 - 第{page_num}页"
type: "page"
layout: "list"
url: "/page/{page_num}/"
---
"""
        index_path = os.path.join(page_subdir, "_index.md")
        with open(index_path, 'w', encoding='utf-8') as f:
            f.write(index_content)

        print(f"Created pagination page: {page_num}")

    # Update the main page _index.md
    main_page_index = os.path.join(page_dir, "_index.md")
    main_index_content = f"""---
title: "文章列表"
description: "所有文章的完整列表，按时间倒序排列"
type: "page"
layout: "list"
---
"""
    with open(main_page_index, 'w', encoding='utf-8') as f:
        f.write(main_index_content)

    print("Updated main page index")

if __name__ == "__main__":
    content_dir = "content"
    convert_frontmatter(content_dir)
    generate_pagination(content_dir)
    print("Frontmatter conversion and pagination generation completed!")
