#!/bin/bash

# Directories containing markdown files
DIRS=("docs/shopify" "docs/hubspot" "docs/architecture")

# Loop through each directory
for DIR in "${DIRS[@]}"; do
  # Find all markdown files in the directory (excluding README.md which we've already updated)
  for FILE in $(find "$DIR" -name "*.md" ! -name "README.md"); do
    # Get the title from the first header
    TITLE=$(grep -m 1 "^# " "$FILE" | sed 's/^# //')
    
    # Add front matter to the top of the file if it doesn't already have it
    if ! grep -q "^---" "$FILE"; then
      TEMP_FILE=$(mktemp)
      echo "---" > "$TEMP_FILE"
      echo "layout: default" >> "$TEMP_FILE"
      echo "title: $TITLE" >> "$TEMP_FILE"
      echo "---" >> "$TEMP_FILE"
      echo "" >> "$TEMP_FILE"
      cat "$FILE" >> "$TEMP_FILE"
      mv "$TEMP_FILE" "$FILE"
      echo "Added front matter to $FILE"
    fi
  done
done

echo "Front matter added to all documentation files." 