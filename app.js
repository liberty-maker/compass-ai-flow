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
// ===== Print to PDF handler =====
document.addEventListener('click', (e)=>{
  const btn = e.target.closest('.print-btn');
  if(btn){ window.print(); }
});
// Авто-дата для элементов с [data-today]
document.querySelectorAll('[data-today]').forEach(el=>{
  el.textContent = new Date().toISOString().slice(0,10);
});

// ===== Cart (localStorage) =====
(function(){
  const STORAGE_KEY = 'caf_cart_v1';

  const readCart  = ()=> JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const writeCart = (items)=> localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  const sum = (items)=> items.reduce((s,i)=> s + (i.price*i.qty), 0);

  function addToCart(item){
    const items = readCart();
    const idx = items.findIndex(i=> i.id===item.id);
    if(idx>-1){ items[idx].qty += item.qty; } else { items.push(item); }
    writeCart(items);
    renderCartBadge();
    renderCartList();
  }

  function removeFromCart(id){
    writeCart(readCart().filter(i=> i.id!==id));
    renderCartList(); renderCartBadge();
  }
  function clearCart(){ writeCart([]); renderCartList(); renderCartBadge(); }

  // UI elements (if present on page)
  const badge = document.getElementById('cart-badge');
  const drawer = document.getElementById('cart-drawer');
  const list = document.getElementById('cart-list');
  const total = document.getElementById('cart-total');

  function renderCartBadge(){
    if(!badge) return;
    const count = readCart().reduce((s,i)=>s+i.qty,0);
    badge.textContent = count;
  }

  function renderCartList(){
    if(!list || !total) return;
    const items = readCart();
    if(items.length===0){ list.innerHTML = '<div class="muted">Корзина пуста</div>'; total.textContent='$0'; return; }
    list.innerHTML = items.map(i=>`
      <div class="item">
        <div>
          <div class="name">${i.title}</div>
          <div class="muted">Количество: ${i.qty}</div>
        </div>
        <div>
          <div><strong>$${(i.price*i.qty).toFixed(2)}</strong></div>
          <button class="icon-btn" data-remove="${i.id}">Удалить</button>
        </div>
      </div>
    `).join('');
    total.textContent = '$' + sum(items).toFixed(2);
  }

  // open/close drawer
  document.getElementById('open-cart')?.addEventListener('click', ()=>{
    drawer?.classList.add('open');
  });
  document.getElementById('close-cart')?.addEventListener('click', ()=>{
    drawer?.classList.remove('open');
  });
  drawer?.querySelector('.back')?.addEventListener('click', ()=>{
    drawer?.classList.remove('open');
  });
  document.getElementById('cart-clear')?.addEventListener('click', clearCart);

  // add-to-cart buttons
  document.addEventListener('click', (e)=>{
    const btn = e.target.closest('.add-to-cart');
    if(btn){
      addToCart({
        id: btn.dataset.id,
        title: btn.dataset.title,
        price: Number(btn.dataset.price||0),
        qty: 1
      });
    }
    const del = e.target.closest('[data-remove]');
    if(del){ removeFromCart(del.getAttribute('data-remove')); }
  });

  // initial
  renderCartBadge();
  renderCartList();
})();
