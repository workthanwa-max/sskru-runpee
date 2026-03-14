#!/bin/bash

# กำหนดโปรเจกต์และชื่อ Bucket
PROJECT_ID=sskru-development
BUCKET_NAME=sskru-development.firebasestorage.app
CORS_FILE_PATH=scripts/set-storage-cors-dev.json

# ตรวจสอบว่ามีการติดตั้ง gcloud CLI หรือไม่
if ! type "gcloud" > /dev/null; then
  echo "gcloud CLI ไม่พบ โปรดติดตั้ง gcloud SDK."
  exit 1
fi

# อัพเดต CORS บน Bucket
gcloud storage buckets update gs://$BUCKET_NAME --cors-file=$CORS_FILE_PATH --project=$PROJECT_ID

if [ $? -eq 0 ]; then
  echo "CORS Updated!"
else
  echo "Somethine went wrong CORS."
  exit 1
fi
