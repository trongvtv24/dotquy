import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

(async () => {
    console.log("Reading cookies...");
    const cookiesRaw = fs.readFileSync('cookies.json', 'utf-8');
    const cookiesData = JSON.parse(cookiesRaw);

    console.log("Launching browser...");
    const browser = await chromium.launch({ headless: false }); // Show browser so user can see it
    const context = await browser.newContext();

    // Fix SameSite issues
    const fixedCookies = cookiesData.cookies.map(c => {
        if (!c.sameSite || c.sameSite.toLowerCase() === "unspecified") {
            c.sameSite = "Lax";
        } else {
            c.sameSite = c.sameSite.charAt(0).toUpperCase() + c.sameSite.slice(1).toLowerCase();
        }
        return c;
    });

    await context.addCookies(fixedCookies);

    const page = await context.newPage();

    console.log("Navigating to Supabase SQL editor...");
    await page.goto("https://supabase.com/dashboard/project/mlwjmeajrxacbwphyety/sql/new");

    console.log("Waiting for Monaco editor...");
    try {
        await page.waitForSelector('.monaco-editor', { timeout: 30000 });
    } catch (e) {
        console.log("Monaco editor not found! Taking snapshot...");
        await page.screenshot({ path: 'editor-error.png' });
        const bodyHtml = await page.evaluate(() => document.body.innerText);
        console.log("Page text snippet: ", bodyHtml.substring(0, 1000));
        await browser.close();
        throw e;
    }

    // Give it a second to fully initialize
    await page.waitForTimeout(2000);

    console.log("Loading SQL query...");
    const sqlPath = path.resolve('../supabase/migrations/00008_create_comments.sql');
    const sql = fs.readFileSync(sqlPath, 'utf-8');

    console.log("Injecting SQL into editor...");
    await page.click('.monaco-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Backspace');
    await page.keyboard.insertText(sql);

    await page.waitForTimeout(1000);

    console.log("Clicking RUN button...");
    // Find the run button. Should contain the text "Run"
    await page.locator('button:has-text("Run")').first().click();

    console.log("Waiting for query to execute...");
    await page.waitForTimeout(5000);

    console.log("Closing browser...");
    await browser.close();
    console.log("Done!");
})().catch(err => {
    console.error("Error:", err);
    process.exit(1);
});
