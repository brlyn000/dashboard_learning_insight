#!/bin/bash

echo "🚀 Preparing Dashboard Learning Insight for Submission..."
echo "=========================================================="

# Warna untuk output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Cek file .env.example ada
echo ""
echo "📋 Step 1: Checking .env.example files..."
if [ -f "backend/.env.example" ]; then
    echo -e "${GREEN}✅ backend/.env.example found${NC}"
else
    echo -e "${RED}❌ backend/.env.example NOT found${NC}"
    exit 1
fi

if [ -f "frontend/.env.example" ]; then
    echo -e "${GREEN}✅ frontend/.env.example found${NC}"
else
    echo -e "${RED}❌ frontend/.env.example NOT found${NC}"
    exit 1
fi

if [ -f "ml-service/.env.example" ]; then
    echo -e "${GREEN}✅ ml-service/.env.example found${NC}"
else
    echo -e "${YELLOW}⚠️  ml-service/.env.example NOT found (optional)${NC}"
fi

# 2. Hapus file .env asli (jangan sampai masuk ZIP)
echo ""
echo "🗑️  Step 2: Removing sensitive .env files..."
if [ -f "backend/.env" ]; then
    echo -e "${YELLOW}⚠️  Found backend/.env - will be excluded from ZIP${NC}"
fi
if [ -f "frontend/.env" ]; then
    echo -e "${YELLOW}⚠️  Found frontend/.env - will be excluded from ZIP${NC}"
fi
if [ -f "ml-service/.env" ]; then
    echo -e "${YELLOW}⚠️  Found ml-service/.env - will be excluded from ZIP${NC}"
fi

# 3. Cek node_modules
echo ""
echo "📦 Step 3: Checking node_modules..."
if [ -d "backend/node_modules" ]; then
    echo -e "${YELLOW}⚠️  backend/node_modules exists - will be excluded from ZIP${NC}"
fi
if [ -d "frontend/node_modules" ]; then
    echo -e "${YELLOW}⚠️  frontend/node_modules exists - will be excluded from ZIP${NC}"
fi

# 4. Cek Python cache
echo ""
echo "🐍 Step 4: Checking Python cache..."
if [ -d "ml-service/__pycache__" ]; then
    echo -e "${YELLOW}⚠️  ml-service/__pycache__ exists - will be excluded from ZIP${NC}"
fi
if [ -d "ml-service/venv" ] || [ -d "ml-service/env" ]; then
    echo -e "${YELLOW}⚠️  Python virtual environment exists - will be excluded from ZIP${NC}"
fi

# 5. Cek file wajib
echo ""
echo "📄 Step 5: Checking required files..."
required_files=(
    "README.md"
    "backend/package.json"
    "frontend/package.json"
    "ml-service/requirements.txt"
    "backend/prisma/schema.prisma"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $file${NC}"
    else
        echo -e "${RED}❌ $file NOT found${NC}"
        exit 1
    fi
done

# 6. Buat ZIP
echo ""
echo "📦 Step 6: Creating submission ZIP..."
ZIP_NAME="dashboard_learning_insight_submission.zip"

# Hapus ZIP lama jika ada
if [ -f "$ZIP_NAME" ]; then
    rm "$ZIP_NAME"
    echo "🗑️  Removed old ZIP file"
fi

# Buat ZIP dengan exclude pattern
zip -r "$ZIP_NAME" . \
    -x "*.env" \
    -x "*/node_modules/*" \
    -x "*/__pycache__/*" \
    -x "*/venv/*" \
    -x "*/env/*" \
    -x "*/.git/*" \
    -x "*.log" \
    -x "*/dist/*" \
    -x "*/build/*" \
    -x "*/.DS_Store" \
    -x "prepare_submission.sh" \
    > /dev/null 2>&1

if [ -f "$ZIP_NAME" ]; then
    SIZE=$(du -h "$ZIP_NAME" | cut -f1)
    echo -e "${GREEN}✅ ZIP created successfully: $ZIP_NAME ($SIZE)${NC}"
else
    echo -e "${RED}❌ Failed to create ZIP${NC}"
    exit 1
fi

# 7. Summary
echo ""
echo "=========================================================="
echo -e "${GREEN}🎉 Submission package ready!${NC}"
echo ""
echo "📦 File: $ZIP_NAME"
echo "📏 Size: $SIZE"
echo ""
echo "✅ Checklist:"
echo "  - Source code included"
echo "  - .env.example templates included"
echo "  - Dependencies (package.json, requirements.txt) included"
echo "  - Configuration files included"
echo "  - README.md included"
echo "  - Sensitive files (.env) excluded"
echo "  - node_modules excluded"
echo "  - Python cache excluded"
echo ""
echo "🚀 Ready to submit to Dicoding!"
echo "=========================================================="
