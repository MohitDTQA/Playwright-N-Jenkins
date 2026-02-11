#!/bin/bash
cd "$(dirname "$0")"

echo '{'
echo '  "screenshots": ['
first=true
find . -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) | while read -r file; do
  filename=$(basename "$file")
  filepath="${file#./}"
  if [ "$first" = true ]; then
    first=false
  else
    echo ','
  fi
  echo -n "    {\"name\": \"$filename\", \"path\": \"$filepath\"}"
done
echo ''
echo '  ],'
echo '  "videos": ['
first=true
find . -type f \( -name "*.webm" -o -name "*.mp4" \) | while read -r file; do
  filename=$(basename "$file")
  filepath="${file#./}"
  if [ "$first" = true ]; then
    first=false
  else
    echo ','
  fi
  echo -n "    {\"name\": \"$filename\", \"path\": \"$filepath\"}"
done
echo ''
echo '  ]'
echo '}'