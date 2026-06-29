#!/usr/bin/env node
/**
 * Translation generator script
 * Run: npm run translate
 * 
 * Reads tools from data.ts, translates to Russian via MyMemory API,
 * and saves to src/lib/translations.json
 */

const fs = require('fs');
const path = require('path');

const TIMEOUT_MS = 10000; // 10s per request
const RETRY_COUNT = 3;
const DELAY_BETWEEN_REQUESTS = 200;

async function fetchWithRetry(url, retries = RETRY_COUNT) {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
      
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeout);
      
      if (response.ok) return await response.json();
    } catch (e) {
      if (attempt < retries - 1) {
        await new Promise(r => setTimeout(r, 500 * (attempt + 1)));
      }
    }
  }
  return null;
}

async function translateText(text) {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|ru`;
  const data = await fetchWithRetry(url);
  
  if (data && data.responseStatus === 200 && data.responseData?.translatedText) {
    return data.responseData.translatedText;
  }
  return null;
}

async function main() {
  console.log('🌐 AI Tools Radar - Translation Generator\n');
  
  const dataPath = path.join(__dirname, '..', 'src', 'lib', 'data.ts');
  const dataContent = fs.readFileSync(dataPath, 'utf-8');
  
  const tools = [];
  const toolRegex = /\{\s*id:\s*'([^']+)',\s*name:\s*'([^']+)',\s*description:\s*'([^']+)'/g;
  let match;
  while ((match = toolRegex.exec(dataContent)) !== null) {
    tools.push({ id: match[1], name: match[2], description: match[3] });
  }
  
  console.log(`Found ${tools.length} tools to translate\n`);
  
  // Load existing translations if any (resume capability)
  const outputPath = path.join(__dirname, '..', 'src', 'lib', 'translations.json');
  let translations = {};
  if (fs.existsSync(outputPath)) {
    try {
      translations = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));
      console.log(`Loaded ${Object.keys(translations).length} existing translations\n`);
    } catch (e) {}
  }
  
  let translated = 0;
  let skipped = 0;
  let failed = 0;
  
  for (let i = 0; i < tools.length; i++) {
    const tool = tools[i];
    
    // Skip if already translated
    if (translations[tool.id]) {
      process.stdout.write(`[${i + 1}/${tools.length}] ${tool.name} (cached) ✓\n`);
      skipped++;
      continue;
    }
    
    process.stdout.write(`[${i + 1}/${tools.length}] ${tool.name}... `);
    
    try {
      const [nameRu, descRu] = await Promise.all([
        translateText(tool.name),
        translateText(tool.description),
      ]);
      
      translations[tool.id] = {
        name: nameRu || tool.name,
        description: descRu || tool.description,
      };
      
      if (nameRu && descRu) {
        console.log(`✓`);
        translated++;
      } else {
        console.log(`⚠ partial (using English fallback)`);
        failed++;
      }
    } catch (error) {
      console.log(`✗ Error: ${error.message}`);
      translations[tool.id] = { name: tool.name, description: tool.description };
      failed++;
    }
    
    // Save progress after each translation
    fs.writeFileSync(outputPath, JSON.stringify(translations, null, 2), 'utf-8');
    
    // Rate limit
    await new Promise(r => setTimeout(r, DELAY_BETWEEN_REQUESTS));
  }
  
  console.log(`\n✅ Done!`);
  console.log(`   New translations: ${translated}`);
  console.log(`   Skipped (cached): ${skipped}`);
  console.log(`   Failed: ${failed}`);
  console.log(`   Total: ${Object.keys(translations).length}/${tools.length}`);
}

main().catch(console.error);
