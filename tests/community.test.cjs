const test=require('node:test'),assert=require('node:assert/strict');
const {communityUrl,CONTRIBUTORS,PROJECT_LINKS}=require('../dist/main/shared/community');
test('community links use the project and contributor-provided social accounts',()=>{
 assert.equal(communityUrl('source'),'https://github.com/NecoAya/VRCAL-VRChat-Asset-Library');
 assert.equal(communityUrl('necoaya-bilibili'),'https://space.bilibili.com/13551697');
 assert(CONTRIBUTORS.some(person=>person.handle==='NecoAya'&&person.name==='八云绫'));
 const links=[...PROJECT_LINKS,...CONTRIBUTORS.flatMap(person=>person.links)];assert.equal(new Set(links.map(link=>link.id)).size,links.length);
 for(const link of links){const url=new URL(communityUrl(link.id));assert.equal(url.protocol,'https:');assert(!url.username&&!url.password);}
});
test('Claude attribution identifies AI assistance without inventing a personal account',()=>{
 const claude=CONTRIBUTORS.find(person=>person.handle==='claude');
 assert(claude);assert.equal(claude.name,'Claude');assert.match(claude.role,/AI 辅助/);assert.match(claude.role,/非人工贡献者/);assert.deepEqual(claude.links,[]);
});
test('the external-link bridge rejects raw URLs, unknown IDs and prototype keys',()=>{
 for(const value of ['https://example.com','file:///C:/secret','javascript:alert(1)','__proto__','constructor','toString','missing',null,{},99])assert.throws(()=>communityUrl(value),/社区链接无效/);
});
