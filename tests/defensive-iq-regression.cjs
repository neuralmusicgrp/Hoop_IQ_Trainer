// Defensive IQ Pack — standalone Node regression tests (no dependencies).
// Run: node tests/defensive-iq-regression.cjs
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const twin = fs.readFileSync(path.join(root, "v3.0/hoop-iq-trainer-v3.html"), "utf8");
assert.equal(html, twin, "App mirrors differ");
const js = html.split("<script>")[1]?.split("</script>")[0];
assert.ok(js, "Main app inline script missing");
function makeApp(store = new Map()) {
  const nodes = new Map();
  function node() {
    return {innerHTML:"",textContent:"",value:"",style:{},children:[],className:"",dataset:{},
      classList:{add(){},remove(){}},appendChild(x){this.children.push(x)},
      querySelector(){return null},querySelectorAll(){return []},
      focus(){},click(){},hasAttribute(){return false},setAttribute(){}};
  }
  const document = {getElementById(k){if(!nodes.has(k))nodes.set(k,node());return nodes.get(k);},
    createElement(){return node()},querySelectorAll(){return []},body:node()};
  const localStorage = {getItem:k=>store.get(k)??null,setItem:(k,v)=>store.set(k,v)};
  const fn = new Function("document","localStorage","window","alert","confirm","structuredClone","console",js+
    "\nreturn {defaults:()=>DEFAULT_TERMS,terms:()=>TERMS,legacy:()=>LEGACY_DEFENSE_DEFAULTS,questions:()=>DEFENSIVE_IQ_QUESTIONS,termsByCategory,diagramMoves,courtSvg,showPicker,startQuiz,quizQuestions:()=>state.quizQuestions,importTermsObject,makeDefensiveIQQuestion};");
  return {app:fn(document,localStorage,{scrollTo(){}},()=>{},()=>true,x=>JSON.parse(JSON.stringify(x)),{warn(){},log(){}}),nodes};
}
const {app,nodes} = makeApp();
assert.equal(app.defaults().length,66,"Expected 66 default terms");
assert.equal(new Set(app.defaults().map(x=>x.id)).size,66,"Expected distinct IDs");
assert.equal(app.termsByCategory("__hoop_iq_defensive_pack__").length,27,"Expected 27 defensive terms");
assert.equal(Object.keys(app.legacy()).length,11,"Expected 11 legacy migrations");
assert.equal(Object.keys(app.questions()).length,27,"Expected 27 scenario questions");
for(const t of app.termsByCategory("__hoop_iq_defensive_pack__")) {
  const q=app.questions()[t.id];
  assert.ok(q,"No scenario for "+t.id);
  assert.equal(q.distractors.length,3,"Incorrect distractors "+t.id);
  assert.equal(new Set([q.correctResponse,...q.distractors]).size,4,"Repeated options "+t.id);
  assert.ok(app.courtSvg(t).includes("<svg"),"No diagram "+t.id);
}
const newest=app.defaults().filter(x=>x.diagramType.startsWith("def-"));
assert.equal(newest.length,16,"Expected 16 new diagrams");
assert.equal(new Set(newest.map(x=>JSON.stringify(app.diagramMoves(x.diagramType)))).size,16,"Repeated diagrams");
for(const t of newest) {
  const points=app.diagramMoves(t.diagramType).players;
  assert.ok(points.some(p=>String(p.n).startsWith("X")),"Missing defenders "+t.id);
  for(let i=0;i<points.length;i++)for(let j=i+1;j<points.length;j++)
    assert.ok(Math.hypot(points[i].x-points[j].x,points[i].y-points[j].y)>=38,"Marker overlap "+t.id);
}
app.showPicker("Study","Study","Test",()=>{});
assert.ok(nodes.get("pickerButtons").children.some(x=>x.innerHTML.includes("Defensive IQ Pack")));
app.startQuiz("defensiveIQ","__hoop_iq_defensive_pack__");
assert.equal(app.quizQuestions().length,10);
assert.ok(app.quizQuestions().every(x=>x.options.length===4&&x.options.includes(x.answer)));
const stored=JSON.parse(JSON.stringify(app.defaults()));
for(const term of stored)if(app.legacy()[term.id])
  for(const [field,value] of Object.entries(app.legacy()[term.id]))term[field]=value;
stored.find(x=>x.id==="low-man").coachDefinition="SAVED COACH CUSTOM";
stored.find(x=>x.id==="weak").cue="SAVED TEAM WEAK CALL";
const prior=new Map([["hoopIQTrainerV3Terms",JSON.stringify(stored)]]);
const newer=makeApp(prior).app;
assert.equal(newer.terms().length,66);
assert.equal(newer.terms().find(x=>x.id==="low-man").coachDefinition,"SAVED COACH CUSTOM");
assert.equal(newer.terms().find(x=>x.id==="weak").cue,"SAVED TEAM WEAK CALL");
assert.equal(newer.terms().find(x=>x.id==="drop").cue,app.defaults().find(x=>x.id==="drop").cue);
newer.importTermsObject({terms:[{id:"pistol",term:"Pistol",category:"Action",definition:"QA"}]});
assert.equal(newer.terms().length,66);
assert.equal(newer.terms().find(x=>x.id==="low-man").coachDefinition,"SAVED COACH CUSTOM");
assert.equal(newer.terms().find(x=>x.id==="weak").cue,"SAVED TEAM WEAK CALL");

const PACK="__hoop_iq_defensive_pack__";
for(const id of ["constructor","toString","__proto__"]){
  const term={id,term:"Coach "+id,category:"Defensive Concept",definition:"Local test definition"};
  assert.equal(app.makeDefensiveIQQuestion(term).type,"definition","prototype key in scenario lookup: "+id);
  const before=app.quizQuestions().length;
  app.startQuiz("defensiveIQ",PACK,[term]);
  assert.equal(app.quizQuestions().length,before,"prototype key entered scenario pool: "+id);
}
const saved=[...app.defaults(),{id:"custom-coach-defense",term:"Custom call",category:"Defensive IQ Pack",definition:"Team-specific"}];
const collision=makeApp(new Map([["hoopIQTrainerV3Terms",JSON.stringify(saved)]]));
assert.equal(collision.app.termsByCategory(PACK).length,27,"Pack polluted by custom category");
assert.equal(collision.app.termsByCategory("Defensive IQ Pack").length,1,"Custom category shadowed");
collision.app.showPicker("Study","Study","Test",()=>{});
const labels=collision.nodes.get("pickerButtons").children.map(x=>x.innerHTML);
assert.equal(new Set(labels).size,labels.length,"Duplicate category choice");
assert.ok(labels.some(x=>x.includes("Defensive IQ Pack (Curated)")),"Missing curated choice");
assert.ok(labels.some(x=>x.includes("Defensive IQ Pack (Saved Category)")),"Missing saved-category choice");
const recategorized=app.defaults().map(x=>({...x}));
recategorized.find(x=>x.id==="low-man").category="Team Defense";
const coach=makeApp(new Map([["hoopIQTrainerV3Terms",JSON.stringify(recategorized)]]));
assert.equal(coach.app.termsByCategory(PACK).length,27,"Coach category changed pack membership");
assert.equal(coach.app.terms().find(x=>x.id==="low-man").category,"Team Defense");
const gap=app.diagramMoves("def-gap-help");
const x2=gap.players.find(x=>x.n==="X2"),x3=gap.players.find(x=>x.n==="X3");
assert.ok(gap.playerMoves[0].d.startsWith("M"+x2.x+" "+x2.y),"Gap movement not X2");
assert.ok(!gap.playerMoves[0].d.startsWith("M"+x3.x+" "+x3.y),"Gap incorrectly moves X3");
assert.ok(gap.playerMoves[1].d.endsWith(x2.x+" "+x2.y),"Gap recovery not X2");
const xout=app.diagramMoves("def-x-out");
const wing=xout.players.find(x=>x.n===2),corner=xout.players.find(x=>x.n===3);
assert.equal(wing.x,corner.x,"X-Out receivers on different sides");
assert.ok(wing.y>corner.y,"X-Out wing/corner order");
assert.equal(xout.passes.length,2,"Missing X-Out pass sequence");
assert.ok(xout.passes[0].d.endsWith(wing.x+" "+wing.y),"X-Out pass one not wing");
assert.ok(xout.passes[1].d.endsWith(corner.x+" "+corner.y),"X-Out pass two not corner");
function sampleBezier(d){
  const v=(d.match(/-?\d+(?:\.\d+)?/g)||[]).map(Number);
  assert.equal(v.length,8,"Unexpected SVG Bezier syntax");
  const [ax,ay,bx,by,cx,cy,dx,dy]=v,p=[];
  for(let i=0;i<=100;i++){const t=i/100,s=1-t;
    p.push([s*s*s*ax+3*s*s*t*bx+3*s*t*t*cx+t*t*t*dx,s*s*s*ay+3*s*s*t*by+3*s*t*t*cy+t*t*t*dy]);
  }
  return p;
}
const paths=xout.playerMoves.map(x=>sampleBezier(x.d));
const closest=Math.min(...paths[0].map(a=>Math.min(...paths[1].map(b=>Math.hypot(a[0]-b[0],a[1]-b[1])))));
assert.ok(closest<8,"X-Out defender paths do not cross");

const pathOneStart=xout.playerMoves[0].d.match(/^M(\d+) (\d+)/);
const pathTwoStart=xout.playerMoves[1].d.match(/^M(\d+) (\d+)/);
const dx2=xout.players.find(p=>p.n==="X2"),dx3=xout.players.find(p=>p.n==="X3");
assert.equal(Number(pathOneStart[1]),dx2.x,"X2 must perform first close to wing");
assert.equal(Number(pathOneStart[2]),dx2.y,"X2 movement origin y incorrect");
assert.equal(Number(pathTwoStart[1]),dx3.x,"X3 must close toward corner");
assert.equal(Number(pathTwoStart[2]),dx3.y,"X3 movement origin y incorrect");
const wingEnd=paths[0].at(-1),cornerEnd=paths[1].at(-1);
assert.ok(Math.hypot(wingEnd[0]-wing.x,wingEnd[1]-wing.y)<30,"X2 wing arrival not at receiver");
assert.ok(Math.hypot(cornerEnd[0]-corner.x,cornerEnd[1]-corner.y)<30,"X3 corner arrival not at receiver");



// P3: Source documentation, runtime copy, and static teaching-scene descriptions must agree.
const contentPack = JSON.parse(fs.readFileSync(path.join(root,"content/defensive-iq-pack.review.json"),"utf8"));
const coachDoc = fs.readFileSync(path.join(root,"docs/defensive-iq-pack-coach-review.md"),"utf8");
const allEntries = [...contentPack.existingRevisions,...contentPack.newEntries,...contentPack.supplementalCoverageRevisions];
assert.equal(allEntries.length,27,"Review pack must contain 27 teaching entries");
assert.equal((coachDoc.match(/\*\*Category:\*\* undefined/g)||[]).length,0,"Undefined coach-review categories");
const six = ["over","under","high-drop","low-drop","ice-down","weak"];
for(const id of six){
  const title=allEntries.find(x=>x.id===id)?.term;
  const section=coachDoc.split("### "+title+" — ")[1]?.split("\n### ")[0];
  assert.ok(section && section.includes("**Category:** Defensive Coverage"),"Coverage category metadata not inherited: "+id);
}
for(const id of ["hedge-show","blitz-trap","defensive-communication"]){
  const e = allEntries.find(x=>x.id===id);
  assert.ok(e && e.diagramNote,"Missing reviewed diagram instruction "+id);
  assert.equal(app.defaults().find(x=>x.id===id)?.diagramNote,e.diagramNote,"Runtime and source diagram-note mismatch "+id);
  assert.ok(coachDoc.includes("**Diagram instruction:** "+e.diagramNote),"Coach document disagrees with source "+id);
}
const comm = app.diagramMoves("def-communication");
assert.equal(comm.players.filter(p=>String(p.n).startsWith("X")).length,4,"Four-defender communication scene drift");
assert.ok(allEntries.find(x=>x.id==="defensive-communication").diagramNote.includes("four-defender"),"Communication note doesn't disclose representative 4-player diagram");
assert.ok(allEntries.find(x=>x.id==="hedge-show").diagramNote.includes("not separately drawn"),"Hedge note overclaims scene");
assert.ok(allEntries.find(x=>x.id==="blitz-trap").diagramNote.includes("not illustrated"),"Blitz note overclaims scene");
assert.equal(app.termsByCategory("__hoop_iq_defensive_pack__").length,27,"Pack count drift after note cleanup");

const priorState=app.defaults().map(x=>({...x}));
priorState.find(x=>x.id==="low-man").cue="LOCAL LOW";
priorState.find(x=>x.id==="pistol").cue="LOCAL PISTOL";
priorState.push({id:"team-special",term:"Team Special",category:"Team Defense",definition:"Coach original"});
const progress='{"sessionCount":7,"missedTerms":["low-man"]}';
const store=new Map([["hoopIQTrainerV3Terms",JSON.stringify(priorState)],["hoopIQTrainerV3Progress",progress]]);
const patchApp=makeApp(store).app;
patchApp.importTermsObject({terms:[{id:"pistol",term:"Pistol",category:"Action",definition:"NEW"}]});
assert.equal(patchApp.terms().length,67,"Lost custom term");
assert.equal(patchApp.terms().find(x=>x.id==="low-man").cue,"LOCAL LOW","Lost unrelated coach edit");
assert.equal(patchApp.terms().find(x=>x.id==="pistol").cue,"LOCAL PISTOL","Lost omitted field");
assert.equal(patchApp.terms().find(x=>x.id==="pistol").definition,"NEW","Patch not applied");
assert.ok(patchApp.terms().some(x=>x.id==="team-special"),"Custom record discarded");
assert.equal(store.get("hoopIQTrainerV3Progress"),progress,"Progress mutated");
patchApp.importTermsObject({mode:"replace",terms:[{id:"pistol",term:"Pistol",category:"Action",definition:"REPLACED"}]});
assert.equal(patchApp.terms().length,66,"Explicit full replacement failed");
assert.ok(!patchApp.terms().some(x=>x.id==="team-special"),"Explicit replace retained custom record");
assert.equal(patchApp.terms().find(x=>x.id==="low-man").cue,app.defaults().find(x=>x.id==="low-man").cue);
const fullCopy=makeApp(new Map([["hoopIQTrainerV3Terms",JSON.stringify(priorState)]])).app;
fullCopy.importTermsObject({terms:app.defaults()});
assert.equal(fullCopy.terms().length,66,"Full snapshot replacement count changed");
assert.ok(!fullCopy.terms().some(x=>x.id==="team-special"),"Full snapshot retained omitted custom");



assert.match(html, /@media \(max-width: 480px\)/);
assert.match(html, /grid-template-columns: repeat\(6, minmax\(0, 1fr\)\)/);
assert.match(html, /\.court-wrap svg\.court \{[\s\S]*?min-width: 600px/);
assert.match(html, /id="diagramCourt" tabindex="0"/);

// Coach review is an explicit, editable handoff in the Coach Tools screen,
// not a sent message or an automatic change to coach sign-off.
const coachSection = html.split('<section id="edit" class="screen">')[1]?.split('<section id="data" class="screen">')[0];
assert.ok(coachSection && coachSection.includes('id="coachReviewPanel"'),"Coach review is outside Coach Tools");
assert.ok(coachSection.includes('id="coachReviewJump"'),"Coach review quick link is missing");
assert.ok(coachSection.includes('id="coachReviewInvitation"'),"Editable coach invitation absent");
assert.ok(coachSection.includes('id="copyCoachInvitationBtn"'),"Coach invitation copy control absent");
assert.ok(coachSection.includes('id="coachReviewFrame"'),"Embeddable coach review form absent");
assert.ok(coachSection.includes('src="https://form.jotform.com/262882658690069"'),"Unexpected coach-review form URL");
assert.ok(coachSection.includes('href="https://form.jotform.com/262882658690069"'),"External form fallback link missing");
assert.ok(coachSection.includes('rel="noopener noreferrer"'),"External coach review link missing opener protection");
assert.ok(coachSection.includes('loading="lazy"'),"External form must not load eagerly on dashboard");
assert.ok(coachSection.includes("Coach approval pending"),"Proposed content incorrectly presented as approved");
assert.ok(html.includes("async function copyCoachReviewInvitation()"),"Copy handler missing");

console.log("PASS: P2, P3, import and mobile CSS checks.");
