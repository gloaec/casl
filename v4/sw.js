try{self["workbox:core:5.1.3"]&&_()}catch(e){}const e=(e,...t)=>{let s=e;return t.length>0&&(s+=" :: "+JSON.stringify(t)),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}try{self["workbox:routing:5.1.3"]&&_()}catch(e){}const s=e=>e&&"object"==typeof e?e:{handle:e};class n{constructor(e,t,n="GET"){this.handler=s(t),this.match=e,this.method=n}}class a extends n{constructor(e,t,s){super(({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)},t,s)}}const i=e=>new URL(String(e),location.href).href.replace(new RegExp("^"+location.origin),"");class r{constructor(){this.t=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map(e=>{"string"==typeof e&&(e=[e]);const t=new Request(...e);return this.handleRequest({request:t})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const{params:n,route:a}=this.findMatchingRoute({url:s,request:e,event:t});let i,r=a&&a.handler;if(!r&&this.s&&(r=this.s),r){try{i=r.handle({url:s,request:e,event:t,params:n})}catch(e){i=Promise.reject(e)}return i instanceof Promise&&this.i&&(i=i.catch(n=>this.i.handle({url:s,request:e,event:t}))),i}}findMatchingRoute({url:e,request:t,event:s}){const n=this.t.get(t.method)||[];for(const a of n){let n;const i=a.match({url:e,request:t,event:s});if(i)return n=i,(Array.isArray(i)&&0===i.length||i.constructor===Object&&0===Object.keys(i).length||"boolean"==typeof i)&&(n=void 0),{route:a,params:n}}return{}}setDefaultHandler(e){this.s=s(e)}setCatchHandler(e){this.i=s(e)}registerRoute(e){this.t.has(e.method)||this.t.set(e.method,[]),this.t.get(e.method).push(e)}unregisterRoute(e){if(!this.t.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this.t.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this.t.get(e.method).splice(s,1)}}let c;const o=()=>(c||(c=new r,c.addFetchListener(),c.addCacheListener()),c);function u(e,s,i){let r;if("string"==typeof e){const t=new URL(e,location.href);r=new n(({url:e})=>e.href===t.href,s,i)}else if(e instanceof RegExp)r=new a(e,s,i);else if("function"==typeof e)r=new n(e,s,i);else{if(!(e instanceof n))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});r=e}return o().registerRoute(r),r}const h={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},l=e=>[h.prefix,e,h.suffix].filter(e=>e&&e.length>0).join("-"),f=e=>e||l(h.precache),d=e=>e||l(h.runtime);function w(e){e.then(()=>{})}const p=new Set;class v{constructor(e,t,{onupgradeneeded:s,onversionchange:n}={}){this.o=null,this.u=e,this.h=t,this.l=s,this.p=n||(()=>this.close())}get db(){return this.o}async open(){if(!this.o)return this.o=await new Promise((e,t)=>{let s=!1;setTimeout(()=>{s=!0,t(new Error("The open request was blocked and timed out"))},this.OPEN_TIMEOUT);const n=indexedDB.open(this.u,this.h);n.onerror=()=>t(n.error),n.onupgradeneeded=e=>{s?(n.transaction.abort(),n.result.close()):"function"==typeof this.l&&this.l(e)},n.onsuccess=()=>{const t=n.result;s?t.close():(t.onversionchange=this.p.bind(this),e(t))}}),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,s){return await this.getAllMatching(e,{query:t,count:s})}async getAllKeys(e,t,s){return(await this.getAllMatching(e,{query:t,count:s,includeKeys:!0})).map(e=>e.key)}async getAllMatching(e,{index:t,query:s=null,direction:n="next",count:a,includeKeys:i=!1}={}){return await this.transaction([e],"readonly",(r,c)=>{const o=r.objectStore(e),u=t?o.index(t):o,h=[],l=u.openCursor(s,n);l.onsuccess=()=>{const e=l.result;e?(h.push(i?e:e.value),a&&h.length>=a?c(h):e.continue()):c(h)}})}async transaction(e,t,s){return await this.open(),await new Promise((n,a)=>{const i=this.o.transaction(e,t);i.onabort=()=>a(i.error),i.oncomplete=()=>n(),s(i,e=>n(e))})}async v(e,t,s,...n){return await this.transaction([t],s,(s,a)=>{const i=s.objectStore(t),r=i[e].apply(i,n);r.onsuccess=()=>a(r.result)})}close(){this.o&&(this.o.close(),this.o=null)}}v.prototype.OPEN_TIMEOUT=2e3;const y={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[e,t]of Object.entries(y))for(const s of t)s in IDBObjectStore.prototype&&(v.prototype[s]=async function(t,...n){return await this.v(s,t,e,...n)});try{self["workbox:expiration:5.1.3"]&&_()}catch(e){}const b=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class g{constructor(e){this.g=e,this.o=new v("workbox-expiration",1,{onupgradeneeded:e=>this.m(e)})}m(e){const t=e.target.result.createObjectStore("cache-entries",{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1}),(async e=>{await new Promise((t,s)=>{const n=indexedDB.deleteDatabase(e);n.onerror=()=>{s(n.error)},n.onblocked=()=>{s(new Error("Delete blocked"))},n.onsuccess=()=>{t()}})})(this.g)}async setTimestamp(e,t){const s={url:e=b(e),timestamp:t,cacheName:this.g,id:this.q(e)};await this.o.put("cache-entries",s)}async getTimestamp(e){return(await this.o.get("cache-entries",this.q(e))).timestamp}async expireEntries(e,t){const s=await this.o.transaction("cache-entries","readwrite",(s,n)=>{const a=s.objectStore("cache-entries").index("timestamp").openCursor(null,"prev"),i=[];let r=0;a.onsuccess=()=>{const s=a.result;if(s){const n=s.value;n.cacheName===this.g&&(e&&n.timestamp<e||t&&r>=t?i.push(s.value):r++),s.continue()}else n(i)}}),n=[];for(const e of s)await this.o.delete("cache-entries",e.id),n.push(e.url);return n}q(e){return this.g+"|"+b(e)}}class m{constructor(e,t={}){this.R=!1,this.j=!1,this.U=t.maxEntries,this.L=t.maxAgeSeconds,this.g=e,this.N=new g(e)}async expireEntries(){if(this.R)return void(this.j=!0);this.R=!0;const e=this.L?Date.now()-1e3*this.L:0,t=await this.N.expireEntries(e,this.U),s=await self.caches.open(this.g);for(const e of t)await s.delete(e);this.R=!1,this.j&&(this.j=!1,w(this.expireEntries()))}async updateTimestamp(e){await this.N.setTimestamp(e,Date.now())}async isURLExpired(e){if(this.L){return await this.N.getTimestamp(e)<Date.now()-1e3*this.L}return!1}async delete(){this.j=!1,await this.N.expireEntries(1/0)}}const q=(e,t)=>e.filter(e=>t in e),R=async({request:e,mode:t,plugins:s=[]})=>{const n=q(s,"cacheKeyWillBeUsed");let a=e;for(const e of n)a=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:a}),"string"==typeof a&&(a=new Request(a));return a},x=async({cacheName:e,request:t,event:s,matchOptions:n,plugins:a=[]})=>{const i=await self.caches.open(e),r=await R({plugins:a,request:t,mode:"read"});let c=await i.match(r,n);for(const t of a)if("cachedResponseWillBeUsed"in t){const a=t.cachedResponseWillBeUsed;c=await a.call(t,{cacheName:e,event:s,matchOptions:n,cachedResponse:c,request:r})}return c},j=async({cacheName:e,request:s,response:n,event:a,plugins:r=[],matchOptions:c})=>{const o=await R({plugins:r,request:s,mode:"write"});if(!n)throw new t("cache-put-with-no-response",{url:i(o.url)});const u=await(async({request:e,response:t,event:s,plugins:n=[]})=>{let a=t,i=!1;for(const t of n)if("cacheWillUpdate"in t){i=!0;const n=t.cacheWillUpdate;if(a=await n.call(t,{request:e,response:a,event:s}),!a)break}return i||(a=a&&200===a.status?a:void 0),a||null})({event:a,plugins:r,response:n,request:o});if(!u)return;const h=await self.caches.open(e),l=q(r,"cacheDidUpdate"),f=l.length>0?await x({cacheName:e,matchOptions:c,request:o}):null;try{await h.put(o,u)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of p)await e()}(),e}for(const t of l)await t.cacheDidUpdate.call(t,{cacheName:e,event:a,oldResponse:f,newResponse:u,request:o})},U=x,L=async({request:e,fetchOptions:s,event:n,plugins:a=[]})=>{if("string"==typeof e&&(e=new Request(e)),n instanceof FetchEvent&&n.preloadResponse){const e=await n.preloadResponse;if(e)return e}const i=q(a,"fetchDidFail"),r=i.length>0?e.clone():null;try{for(const t of a)if("requestWillFetch"in t){const s=t.requestWillFetch,a=e.clone();e=await s.call(t,{request:a,event:n})}}catch(e){throw new t("plugin-error-request-will-fetch",{thrownError:e})}const c=e.clone();try{let t;t="navigate"===e.mode?await fetch(e):await fetch(e,s);for(const e of a)"fetchDidSucceed"in e&&(t=await e.fetchDidSucceed.call(e,{event:n,request:c,response:t}));return t}catch(e){for(const t of i)await t.fetchDidFail.call(t,{error:e,event:n,originalRequest:r.clone(),request:c.clone()});throw e}};try{self["workbox:strategies:5.1.3"]&&_()}catch(e){}const N={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};let E;async function K(e,t){const s=e.clone(),n={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},a=t?t(n):n,i=function(){if(void 0===E){const e=new Response("");if("body"in e)try{new Response(e.body),E=!0}catch(e){E=!1}E=!1}return E}()?s.body:await s.blob();return new Response(i,a)}try{self["workbox:precaching:5.1.3"]&&_()}catch(e){}function O(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:n}=e;if(!n)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const a=new URL(n,location.href),i=new URL(n,location.href);return a.searchParams.set("__WB_REVISION__",s),{cacheKey:a.href,url:i.href}}class M{constructor(e){this.g=f(e),this._=new Map,this.K=new Map,this.O=new Map}addToCacheList(e){const s=[];for(const n of e){"string"==typeof n?s.push(n):n&&void 0===n.revision&&s.push(n.url);const{cacheKey:e,url:a}=O(n),i="string"!=typeof n&&n.revision?"reload":"default";if(this._.has(a)&&this._.get(a)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this._.get(a),secondEntry:e});if("string"!=typeof n&&n.integrity){if(this.O.has(e)&&this.O.get(e)!==n.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:a});this.O.set(e,n.integrity)}if(this._.set(a,e),this.K.set(a,i),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}async install({event:e,plugins:t}={}){const s=[],n=[],a=await self.caches.open(this.g),i=await a.keys(),r=new Set(i.map(e=>e.url));for(const[e,t]of this._)r.has(t)?n.push(e):s.push({cacheKey:t,url:e});const c=s.map(({cacheKey:s,url:n})=>{const a=this.O.get(s),i=this.K.get(n);return this.M({cacheKey:s,cacheMode:i,event:e,integrity:a,plugins:t,url:n})});await Promise.all(c);return{updatedURLs:s.map(e=>e.url),notUpdatedURLs:n}}async activate(){const e=await self.caches.open(this.g),t=await e.keys(),s=new Set(this._.values()),n=[];for(const a of t)s.has(a.url)||(await e.delete(a),n.push(a.url));return{deletedURLs:n}}async M({cacheKey:e,url:s,cacheMode:n,event:a,plugins:i,integrity:r}){const c=new Request(s,{integrity:r,cache:n,credentials:"same-origin"});let o,u=await L({event:a,plugins:i,request:c});for(const e of i||[])"cacheWillUpdate"in e&&(o=e);if(!(o?await o.cacheWillUpdate({event:a,request:c,response:u}):u.status<400))throw new t("bad-precaching-response",{url:s,status:u.status});u.redirected&&(u=await K(u)),await j({event:a,plugins:i,response:u,request:e===s?c:new Request(e),cacheName:this.g,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this._}getCachedURLs(){return[...this._.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.g)).match(s)}}createHandler(e=!0){return async({request:s})=>{try{const e=await this.matchPrecache(s);if(e)return e;throw new t("missing-precache-entry",{cacheName:this.g,url:s instanceof Request?s.url:s})}catch(t){if(e)return fetch(s);throw t}}}createHandlerBoundToURL(e,s=!0){if(!this.getCacheKeyForURL(e))throw new t("non-precached-url",{url:e});const n=this.createHandler(s),a=new Request(e);return()=>n({request:a})}}let T;const D=()=>(T||(T=new M),T);const S=(e,t)=>{const s=D().getURLsToCacheKeys();for(const n of function*(e,{ignoreURLParametersMatching:t,directoryIndex:s,cleanURLs:n,urlManipulation:a}={}){const i=new URL(e,location.href);i.hash="",yield i.href;const r=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some(e=>e.test(s))&&e.searchParams.delete(s);return e}(i,t);if(yield r.href,s&&r.pathname.endsWith("/")){const e=new URL(r.href);e.pathname+=s,yield e.href}if(n){const e=new URL(r.href);e.pathname+=".html",yield e.href}if(a){const e=a({url:i});for(const t of e)yield t.href}}(e,t)){const e=s.get(n);if(e)return e}};let P=!1;function A(e){P||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:n}={})=>{const a=f();self.addEventListener("fetch",i=>{const r=S(i.request.url,{cleanURLs:s,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:n});if(!r)return;let c=self.caches.open(a).then(e=>e.match(r)).then(e=>e||fetch(r));i.respondWith(c)})})(e),P=!0)}const C=[],I={get:()=>C,add(e){C.push(...e)}},k=e=>{const t=D(),s=I.get();e.waitUntil(t.install({event:e,plugins:s}).catch(e=>{throw e}))},W=e=>{const t=D();e.waitUntil(t.activate())};var B,F;self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),B={},function(e){D().addToCacheList(e),e.length>0&&(self.addEventListener("install",k),self.addEventListener("activate",W))}([{url:"/v4/assets/a.0dea9028.json",revision:"d3ee4aa856a05727328ce982655d2e94"},{url:"/v4/assets/a.187a9447.json",revision:"c4cbad323db4ce524c8584246c208058"},{url:"/v4/assets/a.2430d9e9.json",revision:"339129cccf3d1b58da8ce8acf501415e"},{url:"/v4/assets/a.26897b06.json",revision:"c1690a6bd10834e1c28560cea60f3744"},{url:"/v4/assets/a.3071e945.json",revision:"ca36ed0a5f1c22583a8fc1ea3b0d648e"},{url:"/v4/assets/a.392cf909.json",revision:"a71f9c1264c4a93a24bd69ceaf7c749b"},{url:"/v4/assets/a.3a1055aa.json",revision:"9c788732271006a1cfc28c58165f228d"},{url:"/v4/assets/a.3c02e07e.json",revision:"49a62dd65a07ef05d6363ebfa830c09b"},{url:"/v4/assets/a.3eac0367.json",revision:"db291e9819b554930d1dd9ed39ca0d21"},{url:"/v4/assets/a.427e75b4.json",revision:"190883fbac534ba009528e97b71c73bb"},{url:"/v4/assets/a.4614dc53.json",revision:"add7379b430974554d37d304418f8f0f"},{url:"/v4/assets/a.4649ce6a.json",revision:"22aac46033708aaad16f75bb468fa892"},{url:"/v4/assets/a.475825be.json",revision:"8eec29cd4811f77e022c616ec39bed1a"},{url:"/v4/assets/a.5bff56ff.json",revision:"3ad5a91b2d0dcb0edf82e33d698e4ba2"},{url:"/v4/assets/a.6a78d21e.json",revision:"05613ebf43246229f191b2b8eb24ea17"},{url:"/v4/assets/a.7a59ab5d.json",revision:"b85bf7cff0a70c3bb090b60fcd926554"},{url:"/v4/assets/a.86aea29b.json",revision:"2d15e619aa97fdb6c1590e423f8b78bb"},{url:"/v4/assets/a.8c56cf79.json",revision:"05f1a617ef885400a6754a5118a9c1ed"},{url:"/v4/assets/a.a6a8b35f.json",revision:"12c88b82486a6231e8c2828c9a98ed1c"},{url:"/v4/assets/a.a7cfc062.json",revision:"f208a59b0962a5a0b3c7a7cbee052bd9"},{url:"/v4/assets/a.b0e49197.json",revision:"0885dc384121db51d8b710b178c8a17c"},{url:"/v4/assets/a.c21a57ed.json",revision:"fd8a1a30ac40d46aefe18fc95c836cc6"},{url:"/v4/assets/a.c64e90da.json",revision:"003ce94ab31ce7f0d2145f152518fe44"},{url:"/v4/assets/a.d1ebe398.json",revision:"643e4838a7b7f5390321a14f145ce6da"},{url:"/v4/assets/a.d397cd54.json",revision:"9d8192b936cc8aa225313a429ff435ae"},{url:"/v4/assets/a.e0603cdd.json",revision:"7051f153c18bfa1afef280b437458987"},{url:"/v4/assets/a.fa592bbe.json",revision:"449fc684c553b4197c1fd914f7a2a8f8"},{url:"/v4/assets/a.fb3a29b4.json",revision:"541806ba61d3c00102917734876b16b6"},{url:"/v4/assets/content_pages_searchIndexes.en.02724b1d.json",revision:"e91b317bde0f9d6f4fa8cbb7a3310c5c"},{url:"/v4/assets/content_pages_summaries.en.8415aea9.json",revision:"586dcad30d12daef252d0a801ff7932c"},{url:"/v4/app-icons/android-chrome-192x192.png",revision:"0b18304dea12cc8d59c9528a00d37ee8"},{url:"/v4/app-icons/android-chrome-256x256.png",revision:"8da8a7602d1cc4d21a70445eda7e8e62"},{url:"/v4/app-icons/apple-touch-icon.png",revision:"e2be3ed5414bed313d9219504bd7224f"},{url:"/v4/app-icons/favicon-16x16.png",revision:"c72946f88111cb426093e6bdb63fa70b"},{url:"/v4/app-icons/favicon-32x32.png",revision:"e53028dac3ae19a1ebd8c2ed0a0772a8"},{url:"/v4/app-icons/favicon.ico",revision:"bc4c3c662b5614ee2e63ac9bd79cafa4"},{url:"/v4/app-icons/mstile-150x150.png",revision:"ffd33ced9004c319a6743d79a61d23c3"},{url:"/v4/app-icons/safari-pinned-tab.svg",revision:"1171db203c6305482c696d3f702c83f6"},{url:"/v4/fonts/StardosStencil-Bold.woff2",revision:"1c20088eb1050b0b81483791c320d03f"},{url:"/v4/fonts/StardosStencil-Regular.woff2",revision:"54e90de15eb7c8d1d4ddb71ebc125937"},{url:"/v4/manifest.json",revision:"9a2195c0c368b7ae215a188a95ff7f26"},{url:"/v4/index.html",revision:"bdccb0acbfbdf93d08a3870ac38d826a"},{url:"/v4/bootstrap.54605279.js",revision:"2749490ae090b5aedf7845406203193c"},{url:"/v4/51b9cc103e05f66c.png",revision:"62d05a9e2e6273d588849a035ed9925e"}]),A(B),self.addEventListener("activate",e=>{const t=f();e.waitUntil((async(e,t="-precache-")=>{const s=(await self.caches.keys()).filter(s=>s.includes(t)&&s.includes(self.registration.scope)&&s!==e);return await Promise.all(s.map(e=>self.caches.delete(e))),s})(t).then(e=>{}))}),u(new class extends n{constructor(e,{allowlist:t=[/./],denylist:s=[]}={}){super(e=>this.T(e),e),this.D=t,this.S=s}T({url:e,request:t}){if(t&&"navigate"!==t.mode)return!1;const s=e.pathname+e.search;for(const e of this.S)if(e.test(s))return!1;return!!this.D.some(e=>e.test(s))}}((F="/v4/index.html",D().createHandlerBoundToURL(F)))),u(/\/v4\/images\//,new class{constructor(e={}){if(this.g=d(e.cacheName),this.P=e.plugins||[],e.plugins){const t=e.plugins.some(e=>!!e.cacheWillUpdate);this.P=t?e.plugins:[N,...e.plugins]}else this.P=[N];this.A=e.fetchOptions,this.C=e.matchOptions}async handle({event:e,request:s}){"string"==typeof s&&(s=new Request(s));const n=this.I({request:s,event:e});let a,i=await U({cacheName:this.g,request:s,event:e,matchOptions:this.C,plugins:this.P});if(i){if(e)try{e.waitUntil(n)}catch(a){}}else try{i=await n}catch(e){a=e}if(!i)throw new t("no-response",{url:s.url,error:a});return i}async I({request:e,event:t}){const s=await L({request:e,event:t,fetchOptions:this.A,plugins:this.P}),n=j({cacheName:this.g,request:e,response:s.clone(),event:t,plugins:this.P});if(t)try{t.waitUntil(n)}catch(e){}return s}}({cacheName:"images",plugins:[new class{constructor(e={}){var t;this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:s,cachedResponse:n})=>{if(!n)return null;const a=this.k(n),i=this.W(s);w(i.expireEntries());const r=i.updateTimestamp(t.url);if(e)try{e.waitUntil(r)}catch(e){}return a?n:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{const s=this.W(e);await s.updateTimestamp(t.url),await s.expireEntries()},this.B=e,this.L=e.maxAgeSeconds,this.F=new Map,e.purgeOnQuotaError&&(t=()=>this.deleteCacheAndMetadata(),p.add(t))}W(e){if(e===d())throw new t("expire-custom-caches-only");let s=this.F.get(e);return s||(s=new m(e,this.B),this.F.set(e,s)),s}k(e){if(!this.L)return!0;const t=this.H(e);if(null===t)return!0;return t>=Date.now()-1e3*this.L}H(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[e,t]of this.F)await self.caches.delete(e),await t.delete();this.F=new Map}}({maxEntries:100,purgeOnQuotaError:!0})]}),"GET"),u(/\/v4\/@webcomponents\//,new class{constructor(e={}){this.g=d(e.cacheName),this.P=e.plugins||[],this.A=e.fetchOptions,this.C=e.matchOptions}async handle({event:e,request:s}){"string"==typeof s&&(s=new Request(s));let n,a=await U({cacheName:this.g,request:s,event:e,matchOptions:this.C,plugins:this.P});if(!a)try{a=await this.I(s,e)}catch(e){n=e}if(!a)throw new t("no-response",{url:s.url,error:n});return a}async I(e,t){const s=await L({request:e,event:t,fetchOptions:this.A,plugins:this.P}),n=s.clone(),a=j({cacheName:this.g,request:e,response:n,event:t,plugins:this.P});if(t)try{t.waitUntil(a)}catch(e){}return s}}({cacheName:"polyfills",plugins:[]}),"GET");
//# sourceMappingURL=sw.js.map
