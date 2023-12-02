#!/bin/bash

# Check if an argument is provided
if [ $# -eq 0 ]; then
    echo "Usage: $0 <number>"
    exit 1
fi

# Get the input number
number=$1

# Create the folder
folder_name="day $number"
mkdir "$folder_name"

# Change to the created folder
cd "$folder_name" || exit

# Create the files
touch a.ts b.ts input.txt sample.txt

# Add content to a.ts
echo "const input = await Bun.file(\"sample.txt\").text();" >> a.ts
echo "" >> a.ts
echo "console.log(input.split(\"\\n\"));" >> a.ts
echo "" >> a.ts
echo "input.split(\"\\n\");" >> a.ts

echo "Folder '$folder_name' created successfully with files: a.ts, b.ts, input.txt, sample.txt."
