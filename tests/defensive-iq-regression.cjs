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
    "\nreturn {defaults:()=>DEFAULT_TERMS,terms:()=>TERMS,legacy:()=>LEGACY_DEFENSE_DEFAULTS,questions:()=>DEFENSIVE_IQ_QUESTIONS,termsByCategory,diagramMoves,courtSvg,showPicker,startQuiz,quizQuestions:()=>state.quizQuestions,importTermsObject};");
  return {app:fn(document,localStorage,{scrollTo(){}},()=>{},()=>true,x=>JSON.parse(JSON.stringify(x)),{warn(){},log(){}}),nodes};
}
const {app,nodes} = makeApp();
assert.equal(app.defaults().length,66,"Expected 66 default terms");
assert.equal(new Set(app.defaults().map(x=>x.id)).size,66,"Expected distinct IDs");
assert.equal(app.termsByCategory("Defensive IQ Pack").length,27,"Expected 27 defensive terms");
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
app.startQuiz("defensiveIQ","Defensive IQ Pack");
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
console.log("PASS: 66 terms; 27 defensive entries; 27 scenarios; 16 distinct diagrams; saved data migration.");
