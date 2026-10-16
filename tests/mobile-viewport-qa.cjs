// Isolated Chromium mobile viewport QA. Requires npm package "playwright".
"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const http = require("node:http");
const { chromium } = require("playwright");
const root = path.resolve(__dirname,"..");
const mime = {".html":"text/html; charset=utf-8",".png":"image/png",".jpg":"image/jpeg",".svg":"image/svg+xml",".css":"text/css; charset=utf-8",".js":"application/javascript; charset=utf-8"};
const server = http.createServer((req,res)=>{
  const pathname=decodeURIComponent(new URL(req.url,"http://127.0.0.1").pathname);
  const filename=path.resolve(root,"."+(pathname==="/"?"/index.html":pathname));
  if(!filename.startsWith(root+path.sep)||!fs.existsSync(filename)||fs.statSync(filename).isDirectory()){
    res.writeHead(404);res.end("Not found");return;
  }
  res.setHeader("Content-Type",mime[path.extname(filename)]||"application/octet-stream");
  fs.createReadStream(filename).pipe(res);
});
(async ()=>{
  await new Promise(resolve=>server.listen(0,"127.0.0.1",resolve));
  const port=server.address().port;
  const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
  const report=[];
  try{
    for(const width of [1280,375,320]){
      const ctx=await browser.newContext({viewport:{width,height:850},deviceScaleFactor:1,isMobile:width<500,hasTouch:width<500});
      const page=await ctx.newPage(),errors=[];
      // Isolated stub proves the embedded frame wiring without sending data
      // to Jotform or exposing local coaching information to a remote server.
      await page.route("https://form.jotform.com/**",route=>route.fulfill({
        status:200,contentType:"text/html",
        body:"<!doctype html><html><head><title>Coach QA stub</title></head><body><h1>Coach review test stub</h1></body></html>"
      }));
      page.on("pageerror",e=>errors.push("page: "+e.message));
      page.on("console",m=>{if(m.type()==="error")errors.push("console: "+m.text())});
      await page.goto("http://127.0.0.1:"+port+"/",{waitUntil:"load"});
      await page.locator("#home.active").waitFor();
      async function checkOverflow(label) {
        const m=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));
        assert.equal(m.width,width,width+"px "+label+": layout viewport unexpectedly expanded to "+m.width);
        assert.ok(m.scroll<=m.width+1,width+"px "+label+": document overflow "+m.scroll+">"+m.width);
      }
      await checkOverflow("home");
      const buttons=await page.locator(".footer-nav button").evaluateAll(btns=>btns.map(b=>{
        const r=b.getBoundingClientRect();
        return {name:b.textContent.trim(),left:r.left,right:r.right,visible:r.width>10&&r.left>=-1&&r.right<=innerWidth+1};
      }));
      assert.equal(buttons.length,6,width+"px six nav buttons");
      assert.ok(buttons.every(b=>b.visible),width+"px clipped bottom nav "+JSON.stringify(buttons));
      await page.locator('.footer-nav button[data-nav="coach"]').click();
      await page.locator("#edit.active").waitFor();
      const invite=page.locator("#coachReviewInvitation");
      assert.ok(await invite.isEditable(),width+"px invitation must be editable in Coach Tools");
      assert.match(await invite.inputValue(),/27 defensive concepts/);
      assert.match(await invite.inputValue(),/form\.jotform\.com\/262882658690069/);
      const reviewLink=page.locator('#coachReviewPanel a[href="https://form.jotform.com/262882658690069"]');
      assert.equal(await reviewLink.count(),1,width+"px form link missing");
      assert.equal(await reviewLink.getAttribute("target"),"_blank");
      await invite.fill((await invite.inputValue())+"\\nCoach QA note (synthetic).");
      await page.locator("#copyCoachInvitationBtn").click();
      await page.waitForFunction(()=>document.getElementById("coachReviewInvitationStatus").textContent.trim().length>0);
      const copyStatus=await page.locator("#coachReviewInvitationStatus").innerText();
      assert.match(copyStatus,/copied|selected/i,width+"px invitation copy failed");
      const disclosure=page.locator(".coach-review-embed");
      await disclosure.locator("summary").click();
      assert.ok(await disclosure.evaluate(el=>el.open),width+"px embedded form disclosure did not open");
      assert.equal(await page.locator("#coachReviewFrame").getAttribute("src"),"https://form.jotform.com/262882658690069");
      await page.frameLocator("#coachReviewFrame").getByText("Coach review test stub").waitFor();
      const frameBox=await page.locator("#coachReviewFrame").boundingBox();
      assert.ok(frameBox&&frameBox.width>120&&frameBox.x+frameBox.width<=width+1,width+"px embedded form frame is clipped");
      await checkOverflow("coach review");
      await page.locator('.footer-nav button[data-nav="home"]').click();
      await page.locator("#home.active").waitFor();
      await page.locator('#home button[onclick="startFlashcards(DEFENSIVE_IQ_PACK_KEY)"]').click();
      await page.locator("#flashcards.active").waitFor();
      assert.match(await page.locator("#cardProgress").innerText(),/\/\s*27/);
      await checkOverflow("study");
      await page.locator('.footer-nav button[data-nav="home"]').click();
      await page.locator('#home button[onclick="startDiagramStudy(DEFENSIVE_IQ_PACK_KEY)"]').click();
      await page.locator("#diagramStudy.active").waitFor();
      assert.match(await page.locator("#diagramProgress").innerText(),/\/\s*27/);
      let visited=0;
      while((await page.locator("#diagramTerm").innerText()).trim()!=="X-Out Rotation"&&visited<27){
        await page.locator('#diagramStudy button[onclick="nextDiagram()"]').click();
        visited++;
      }
      assert.ok(visited<27,width+"px X-Out not reachable");
      await page.waitForTimeout(300);
      const c=await page.locator("#diagramCourt").evaluate(el=>{
        const svg=el.querySelector("svg.court");
        const texts=[...svg.querySelectorAll(".diagram-label text")];
        return {client:el.clientWidth,scroll:el.scrollWidth,svgWidth:svg.getBoundingClientRect().width,
          labels:texts.map(x=>x.textContent),
          minLabelHeight:Math.min(...texts.map(t=>t.getBoundingClientRect().height)),
          documentWidth:document.documentElement.scrollWidth,viewport:innerWidth};
      });
      assert.ok(c.labels.some(x=>x.toLowerCase().includes("first close"))&&c.labels.some(x=>x.toLowerCase().includes("second close")),width+"px X-Out label missing");
      if(width<=480){
        assert.ok(c.scroll>c.client+100,width+"px court not horizontally pannable");
        assert.ok(c.svgWidth>=599,width+"px court downscaled");
        assert.ok(c.minLabelHeight>=11,width+"px court label too small: "+c.minLabelHeight);
        const scrolled=await page.locator("#diagramCourt").evaluate(el=>{el.scrollLeft=el.scrollWidth;return el.scrollLeft;});
        assert.ok(scrolled>100,width+"px can't pan to wing/corner");
      }else{
        assert.ok(c.svgWidth>500,width+"px desktop court unexpectedly small");
      }
      await checkOverflow("diagram");
      await page.locator('.footer-nav button[data-nav="home"]').click();
      await page.locator("#home button").filter({hasText:"Defensive IQ Quiz"}).first().click();
      await page.locator("#quiz.active").waitFor();
      assert.match(await page.locator("#quizProgress").innerText(),/\/\s*10/);
      const answers=page.locator("#answers button");
      assert.equal(await answers.count(),4,width+"px quiz options");
      await answers.first().click();
      await page.locator("#feedback.show").waitFor();
      await checkOverflow("quiz");
      assert.deepEqual(errors,[],width+"px console or page errors");
      report.push({width,svgWidth:c.svgWidth,minLabelHeight:c.minLabelHeight,pannable:c.scroll>c.client,nav:buttons.map(x=>x.name),quizOptions:4,status:"PASS"});
      await ctx.close();
    }
    console.log("PASS: Browser viewport QA");
    console.log(JSON.stringify(report,null,2));
  }finally{
    await browser.close();
    await new Promise(resolve=>server.close(resolve));
  }
})().catch(e=>{console.error("FAIL: viewport QA",e);process.exitCode=1;});