import { test, expect } from '@playwright/test';

test.describe('Singlish to Sinhala Conversion Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForLoadState('networkidle');
  });

  // ===================== POSITIVE TEST CASES =====================
  const positiveTestCases = [
    {
      id: 'Pos_Fun_0001',
      input: 'Mama nidhaaganna yanavaa',
      expected: 'මම නිදාගන්න යනවා'
    },
    {
      id: 'Pos_Fun_0002',
      input: 'Mama school gihin aevilla, eeka passe oyaata call ekak aragena hariyata kiyannam, eeka avashYA dheyak nam mama eeka balalaa hondhatama kiyala dhennan haridha?',
      expected: 'මම school ගිහින් ඇවිල්ල, ඒක පස්සෙ ඔයාට call එකක් අරගෙන හරියට කියන්නම්, ඒක අවශ්‍ය දෙයක් නම් මම ඒක බලලා හොන්දටම කියල දෙන්නන් හරිද?'
    },
    {
      id: 'Pos_Fun_0003',
      input: 'mata thuvaala vune maava accident vuna nisaa.',
      expected: 'මට තුවාල වුනෙ මාව accident වුන නිසා.'
    },
    // ඔබේ අනෙක් test cases මෙහි add කරන්න...
  ];

  // ===================== NEGATIVE TEST CASES =====================
  const negativeTestCases = [
    {
      id: 'Neg_Fun_0001',
      input: 'apiraeetakannapaangenaavaa',
      expected: 'අපි රෑට කන්න පාන් ගෙනාවා'
    },
    {
      id: 'Neg_Fun_0002',
      input: 'supiri kellanee, let\'s go shopping',
      expected: 'සුපිරි කෙල්ලනේ, let\'s go shopping'
    },
    // ඔබේ අනෙක් negative test cases මෙහි add කරන්න...
  ];

  // ===================== POSITIVE TESTS LOOP =====================
  for (const testCase of positiveTestCases) {
    test(`${testCase.id}: ${testCase.input.substring(0, 30)}...`, async ({ page }) => {
      const inputField = page.locator('textarea[placeholder="Input Your Singlish Text Here."]');
      await inputField.fill(testCase.input);
      
      await page.waitForTimeout(2000);
      
      const outputField = page.locator('div.bg-slate-50.whitespace-pre-wrap');
      const actualOutput = await outputField.textContent();
      
      const cleanedActualOutput = actualOutput?.trim().replace(/\s+/g, ' ');
      const cleanedExpectedOutput = testCase.expected.trim().replace(/\s+/g, ' ');
      
      expect(cleanedActualOutput).toBe(cleanedExpectedOutput);
    });
  }

  // ===================== NEGATIVE TESTS LOOP =====================
  for (const testCase of negativeTestCases) {
    test(`${testCase.id}: ${testCase.input.substring(0, 30)}...`, async ({ page }) => {
      const inputField = page.locator('textarea[placeholder="Input Your Singlish Text Here."]');
      await inputField.fill(testCase.input);
      
      await page.waitForTimeout(2000);
      
      const outputField = page.locator('div.bg-slate-50.whitespace-pre-wrap');
      const actualOutput = await outputField.textContent();
      
      const cleanedActualOutput = actualOutput?.trim().replace(/\s+/g, ' ');
      const cleanedExpectedOutput = testCase.expected.trim().replace(/\s+/g, ' ');
      
      expect(cleanedActualOutput).not.toBe(cleanedExpectedOutput);
    });
  }

  // ===================== UI TEST =====================
  test('Pos_UI_0001: Sinhala output updates automatically in real-time', async ({ page }) => {
    const inputField = page.locator('textarea[placeholder="Input Your Singlish Text Here."]');
    const outputField = page.locator('div.bg-slate-50.whitespace-pre-wrap');
    
    const textToType = 'Mama gedhara yanavaa';
    
    // Initial output empty එකක්ද බලන්න
    const initialOutput = await outputField.textContent();
    expect(initialOutput?.trim()).toBe('');
    
    for (let i = 0; i < textToType.length; i++) {
      await inputField.press(textToType[i]);
      await page.waitForTimeout(100);
    }
    
    await page.waitForTimeout(1000);
    const finalOutput = await outputField.textContent();
    expect(finalOutput?.trim()).toBeTruthy();
    
    await inputField.fill('');
    await page.waitForTimeout(1000);
    const clearedOutput = await outputField.textContent();
    expect(clearedOutput?.trim()).toBe('');
  });

  // ===================== WEBSITE LOAD TEST =====================
  test('Verify website loads correctly', async ({ page }) => {
    await expect(page).toHaveTitle(/Swift Translator/i);
    
    const inputField = page.locator('textarea[placeholder="Input Your Singlish Text Here."]');
    await expect(inputField).toBeVisible();
    
    const outputField = page.locator('div.bg-slate-50.whitespace-pre-wrap');
    await expect(outputField).toBeVisible();
  });
});