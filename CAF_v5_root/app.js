
const burger = document.querySelector('.burger');
const sidebar = document.querySelector('.sidebar');
const overlay = document.querySelector('.overlay');
if(burger){
  burger.addEventListener('click', ()=>{ sidebar.classList.add('open'); overlay.classList.add('show'); });
  if(overlay){ overlay.addEventListener('click', ()=>{ sidebar.classList.remove('open'); overlay.classList.remove('show'); }); }
}
const bk = document.querySelector('.bokeh');
if(bk){
  for(let i=0;i<3;i++){ const s=document.createElement('span'); s.style.left=(i*30+10)+"%"; s.style.top=(i*20+10)+"%"; bk.appendChild(s); }
}
