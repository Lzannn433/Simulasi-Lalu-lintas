const KS='tl_cfg',KT='tl_state',DIRS=['N','E','S','W'],DIRN={N:'Utara',E:'Timur',S:'Selatan',W:'Barat'};
const DEF={green:10,yellow:3,red:2,speed:5,count:14,running:false,mode:'auto',manual:'N',token:0};
const $=i=>document.getElementById(i);
const getCfg=()=>{try{const c={...DEF,...JSON.parse(localStorage.getItem(KS))};if(!DIRS.includes(c.manual))c.manual='N';return c}catch(e){return{...DEF}}};
const setCfg=p=>{const c={...getCfg(),...p};localStorage.setItem(KS,JSON.stringify(c));return c};
const getState=()=>{try{return JSON.parse(localStorage.getItem(KT))}catch(e){return null}};
/* 12 fase: tiap arah (Utara→Timur→Selatan→Barat) = hijau, kuning, merah semua */
const DUR=(c,p)=>[c.green,c.yellow,c.red][p%3];
const LIGHT=p=>{const o={N:'r',E:'r',S:'r',W:'r'};if(p%3<2)o[DIRS[p/3|0]]='gy'[p%3];return o};
const PHN=p=>'Arah '+DIRN[DIRS[p/3|0]]+' — '+['HIJAU','KUNING','MERAH SEMUA'][p%3];
const held=(p,c)=>c.mode=='manual'&&p%3==0&&DIRS[p/3|0]==c.manual;
const COL={r:'#ff453a',y:'#ffd60a',g:'#30d158'},LBL={r:'MERAH',y:'KUNING',g:'HIJAU'};
const fmt=s=>{s=Math.floor(s);return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')};
function cd(st,c,d){const p=st.phase,l=LIGHT(p)[d];if(held(p,c))return null;if(l!='r')return st.rem;
 const tp=DIRS.indexOf(d)*3;let t=st.rem,q=(p+1)%12;while(q!=tp){t+=DUR(c,q);q=(q+1)%12}return t}
function nav(cur){const l=[['index.html','Beranda','🏠'],['HMI.html','HMI','🚦'],['Dashboard.html','Dashboard','📊'],['Control.html','Kontrol','⚙️']];
 document.body.insertAdjacentHTML('afterbegin','<header><b>🚦 Simulasi Simpang Empat</b><nav>'+l.map(x=>`<a href="${x[0]}" class="${x[1]==cur?'on':''}">${x[2]} ${x[1]}</a>`).join('')+'</nav></header>')}