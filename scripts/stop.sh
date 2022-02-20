#!/bin/bash
set -e
pm2 list
pm2 delete server || :
pm2 delete ui || :
