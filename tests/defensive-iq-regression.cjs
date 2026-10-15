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
for(const t of app.termsByCategory("Defensive IQ Pack")) {
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

console.log("PASS: Defensive IQ Pack regressions including four P2 fixes.");
