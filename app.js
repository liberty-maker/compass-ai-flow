const burger = document.querySelector('.burger');
const sidebar = document.querySelector('.sidebar');
const overlay = document.querySelector('.overlay');
if (burger) {
  burger.addEventListener('click', () => { sidebar.classList.add('open'); overlay.classList.add('show'); });
  if (overlay) overlay.addEventListener('click', () => { sidebar.classList.remove('open'); overlay.classList.remove('show'); });
}
// bokeh
const bk = document.createElement('div'); bk.className = 'bokeh'; document.body.appendChild(bk);
for (let i=0;i<3;i++){ const s=document.createElement('span'); s.style.left=(i*30+10)+"%"; s.style.top=(i*20+10)+"%"; bk.appendChild(s); }
