#!/bin/bash
cd /usr/src/scattergories
npm run build
npm start
cd react-ui/ && npm start
