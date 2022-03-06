#!/bin/zsh

fd -H -E node_modules -E .git -t file | LANG=C xargs grep -n -v '^[[:cntrl:][:print:]]*$' --binary-files=without-match
