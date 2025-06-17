#!/bin/bash
cd /home/kavia/workspace/code-generation/communityconnect-59602-131042d1/communityconnect_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

