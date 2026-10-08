
/* ============================================================
   MILA — app.js
   Часть 1: Товары, рендер, фильтры, корзина, избранное,
            поиск, таймер, быстрый просмотр
   ============================================================ */

/* ============ КАТАЛОГ ТОВАРОВ (демо, 24 штуки) ============ */
/* Будут перезаписаны товарами из админки, если такие есть в localStorage */
const DEFAULT_PRODUCTS = [
  // ПЛАТЬЯ (6)
  { id: 1,  name: 'Платье «V-146»',        price: 7900, oldPrice: 9900, cat: 'dress',  badges: ['sale','hit'], desc: 'Вечернее платье в пол с открытыми плечами и вышитым поясом.', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=700' },
  { id: 2,  name: 'Платье «Роза»',         price: 8900, oldPrice: null, cat: 'dress',  badges: ['new'],        desc: 'Платье макси с пышными рукавами-фонариками. Идеально для торжества.',   img: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=700' },
  { id: 3,  name: 'Платье «Авангард»',     price: 9500, oldPrice: null, cat: 'dress',  badges: ['new'],        desc: 'Кутюрное мини-платье с объёмными рукавами и рюшами.',                    img: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=700' },
  { id: 4,  name: 'Платье «Ева»',          price: 7200, oldPrice: 8200, cat: 'dress',  badges: ['sale'],       desc: 'Платье миди в бельевом стиле. Лёгкое и романтичное.',                    img: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=700' },
  { id: 5,  name: 'Платье «Летнее»',       price: 5400, oldPrice: null, cat: 'dress',  badges: ['hit'],        desc: 'Летнее платье в цветочный принт из натурального хлопка.',                img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=700' },
  { id: 6,  name: 'Платье «Коктейль»',     price: 8300, oldPrice: null, cat: 'dress',  badges: [],             desc: 'Коктейльное платье с открытой спиной. Для особых вечеров.',              img: 'https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?w=700' },

  // ВЕРХ (6)
  { id: 7,  name: 'Рубашка «Клетка»',      price: 3200, oldPrice: null, cat: 'top',    badges: ['hit'],        desc: 'Уютная рубашка в бежево-коричневую клетку. Oversize крой.',              img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=700' },
  { id: 8,  name: 'Рубашка «Белая»',       price: 2900, oldPrice: 3500, cat: 'top',    badges: ['sale'],       desc: 'Классическая белая рубашка свободного кроя. Из плотного хлопка.',        img: 'https://images.unsplash.com/photo-1564257577561-4b8c5d4f8f40?w=700' },
  { id: 9,  name: 'Блуза «Принт»',         price: 3100, oldPrice: null, cat: 'top',    badges: [],             desc: 'Блуза с принтом в крапинку. V-образный вырез, длинный рукав.',           img: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=700' },
  { id: 10, name: 'Топ «Кроп»',            price: 1900, oldPrice: null, cat: 'top',    badges: ['new'],        desc: 'Белый кроп-топ с коротким рукавом. Отлично сочетается с юбками.',       img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=700' },
  { id: 11, name: 'Кардиган «Нора»',       price: 5600, oldPrice: 6900, cat: 'top',    badges: ['sale'],       desc: 'Мягкий кардиган из шерсти мериноса. Согреет в прохладный вечер.',        img: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=700' },
  { id: 12, name: 'Свитер «Объём»',        price: 4800, oldPrice: null, cat: 'top',    badges: [],             desc: 'Объёмный свитер крупной вязки. Для уютных осенних образов.',            img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=700' },

  // НИЗ (6)
  { id: 13, name: 'Юбка «Плиссе»',         price: 3800, oldPrice: 4500, cat: 'bottom', badges: ['sale','hit'], desc: 'Плиссированная юбка миди с перламутровым блеском.',                      img: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d44?w=700' },
  { id: 14, name: 'Юбка «Гингем»',         price: 3400, oldPrice: null, cat: 'bottom', badges: ['new'],        desc: 'Юбка в красно-белую клетку с воланами и разрезом.',                      img: 'https://images.unsplash.com/photo-1582142839970-2b9e04b60f65?w=700' },
  { id: 15, name: 'Брюки «Классик»',       price: 4200, oldPrice: null, cat: 'bottom', badges: [],             desc: 'Классические прямые брюки. Подходят и в офис, и на прогулку.',           img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=700' },
  { id: 16, name: 'Джинсы «Мом»',          price: 5100, oldPrice: 6200, cat: 'bottom', badges: ['sale'],       desc: 'Джинсы с высокой посадкой и свободным кроем.',                            img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=700' },
  { id: 17, name: 'Юбка «Кожа»',           price: 6200, oldPrice: null, cat: 'bottom', badges: ['new'],        desc: 'Кожаная юбка-миди. Смелый акцент в любом образе.',                        img: 'https://images.unsplash.com/photo-1582142839970-2b9e04b60f65?w=700' },
  { id: 18, name: 'Шорты «Лето»',          price: 2600, oldPrice: null, cat: 'bottom', badges: [],             desc: 'Летние шорты из льна. Комфорт в жаркую погоду.',                          img: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=700' },

  // АКСЕССУАРЫ (6)
  { id: 19, name: 'Сумка «Классик»',       price: 4500, oldPrice: 5500, cat: 'acc',    badges: ['sale'],       desc: 'Классическая сумка-тоут в бежевом цвете.',                                img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=700' },
  { id: 20, name: 'Сумка «Ноар»',          price: 5200, oldPrice: null, cat: 'acc',    badges: ['hit'],        desc: 'Чёрная сумка с металлической пластиной.',                                  img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=700' },
  { id: 21, name: 'Очки «Санни»',          price: 2600, oldPrice: null, cat: 'acc',    badges: ['new'],        desc: 'Солнцезащитные очки в классической оправе.',                              img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=700' },
  { id: 22, name: 'Шарф «Айрис»',          price: 1800, oldPrice: 2400, cat: 'acc',    badges: ['sale'],       desc: 'Мягкий шарф из шерсти. Согреет в холода.',                                img: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=700' },
  { id: 23, name: 'Ремень «Клара»',        price: 2100, oldPrice: null, cat: 'acc',    badges: [],             desc: 'Кожаный ремень с металлической пряжкой.',                                  img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700' },
  { id: 24, name: 'Шапка «Зима»',          price: 1500, oldPrice: null, cat: 'acc',    badges: ['new'],        desc: 'Тёплая вязаная шапка. Классический фасон.',                                img: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=700' }
];

/* ============ СОСТОЯНИЕ ПРИЛОЖЕНИЯ ============ */
let PRODUCTS = [];
let cart = [];
let favorites = [];
let currentUser = null;
let currentFilter = 'all';
let currentSort = 'default';
let searchQuery = '';

/* ============ КОНСТАНТЫ ============ */
const CAT_NAMES = {
  all: 'Все товары',
  dress: 'Платья',
  top: 'Верх',
  bottom: 'Низ',
  acc: 'Аксессуары'
};
const CAT_SHORT = {
  all: 'Всё',
  dress: 'Платья',
  top: 'Верх',
  bottom: 'Низ',
  acc: 'Аксессуары'
};
const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

/* ============ УТИЛИТЫ ============ */
function fmt(n) {
  if (typeof n !== 'number') return '0 ₽';
  return n.toLocaleString('ru-RU') + ' ₽';
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function uid() {
  return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

/* ============ ХРАНИЛИЩЕ (localStorage) ============ */
const Store = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  },
  remove(key) {
    try { localStorage.removeItem(key); } catch (e) {}
  }
};

/* ============ ИНИЦИАЛИЗАЦИЯ ТОВАРОВ ============ */
function loadProducts() {
  const stored = Store.get('mila_products', null);
  if (stored && Array.isArray(stored) && stored.length) {
    PRODUCTS = stored;
  } else {
    PRODUCTS = JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
    Store.set('mila_products', PRODUCTS);
  }
}

function saveProducts() {
  Store.set('mila_products', PRODUCTS);
}

/* ============ ЗАГРУЗКА СОСТОЯНИЯ ============ */
function loadState() {
  cart = Store.get('mila_cart', []);
  favorites = Store.get('mila_favs', []);
  currentUser = Store.get('mila_user', null);
}

function saveCart() { Store.set('mila_cart', cart); }
function saveFavs() { Store.set('mila_favs', favorites); }
function saveUser() { Store.set('mila_user', currentUser); }

/* ============ DOM ССЫЛКИ ============ */
const DOM = {};

function cacheDom() {
  DOM.products       = document.getElementById('products');
  DOM.countProducts  = document.getElementById('countProducts');
  DOM.catalogTitle   = document.getElementById('catalogTitle');
  DOM.emptyState     = document.getElementById('emptyState');
  DOM.filters        = document.getElementById('filters');
  DOM.sortSelect     = document.getElementById('sortSelect');
  DOM.cartPanel      = document.getElementById('cartPanel');
  DOM.cartBody       = document.getElementById('cartBody');
  DOM.cartFooter     = document.getElementById('cartFooter');
  DOM.cartQty        = document.getElementById('cartQty');
  DOM.cartDiscount   = document.getElementById('cartDiscount');
  DOM.cartTotal      = document.getElementById('cartTotal');
  DOM.cartBadge      = document.getElementById('cartBadge');
  DOM.favBadge       = document.getElementById('favBadge');
  DOM.userBadge      = document.getElementById('userBadge');
  DOM.overlay        = document.getElementById('overlay');
  DOM.toast          = document.getElementById('toast');
  DOM.searchBar      = document.getElementById('searchBar');
  DOM.searchInput    = document.getElementById('searchInput');
  DOM.searchSuggest  = document.getElementById('searchSuggest');
  DOM.authModal      = document.getElementById('authModal');
  DOM.checkoutModal  = document.getElementById('checkoutModal');
  DOM.successModal   = document.getElementById('successModal');
  DOM.productModal   = document.getElementById('productModal');
  DOM.productView    = document.getElementById('productView');
  DOM.header         = document.getElementById('header');
  DOM.backTop        = document.getElementById('backTop');
  DOM.nav            = document.getElementById('mainNav');
}

/* ============ TOAST ============ */
let toastTimer = null;
function showToast(message, type = 'success') {
  if (!DOM.toast) return;
  DOM.toast.querySelector('.toast__text').textContent = message;
  DOM.toast.className = 'toast';
  if (type !== 'success') DOM.toast.classList.add('toast--' + type);
  DOM.toast.querySelector('.toast__icon').textContent =
    type === 'error' ? '✕' : type === 'info' ? 'ℹ' : '✓';
  setTimeout(() => DOM.toast.classList.add('active'), 10);
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => DOM.toast.classList.remove('active'), 2500);
}

/* ============ ФИЛЬТРАЦИЯ И СОРТИРОВКА ============ */
function getFilteredProducts() {
  let list = PRODUCTS.slice();

  // фильтр по категории
  if (currentFilter !== 'all') {
    list = list.filter(p => p.cat === currentFilter);
  }

  // поиск
  if (searchQuery.trim()) {
    const q = searchQuery.trim().toLowerCase();
    list = list.filter(p => p.name.toLowerCase().includes(q));
  }

  // сортировка
  switch (currentSort) {
    case 'price-asc':
      list.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      list.sort((a, b) => b.price - a.price);
      break;
    case 'name':
      list.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
      break;
  }

  return list;
}

/* ============ РЕНДЕР ТОВАРОВ ============ */
function renderProducts() {
  if (!DOM.products) return;

  const list = getFilteredProducts();

  DOM.countProducts.textContent = list.length;
  DOM.catalogTitle.textContent = CAT_NAMES[currentFilter] || 'Все товары';

  if (!list.length) {
    DOM.products.innerHTML = '';
    DOM.emptyState.classList.remove('hidden');
    return;
  }

  DOM.emptyState.classList.add('hidden');

  let html = '';
  for (let i = 0; i < list.length; i++) {
    html += buildProductCard(list[i]);
  }
  DOM.products.innerHTML = html;

  // вешаем обработчики
  DOM.products.querySelectorAll('[data-add]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      addToCart(parseInt(btn.dataset.add), btn);
    });
  });

  DOM.products.querySelectorAll('[data-fav]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      toggleFav(parseInt(btn.dataset.fav));
    });
  });

  DOM.products.querySelectorAll('[data-view]').forEach(el => {
    el.addEventListener('click', () => {
      openProductView(parseInt(el.dataset.view));
    });
  });

  // выбор размера
  DOM.products.querySelectorAll('.product__size').forEach(el => {
    el.addEventListener('click', e => {
      e.stopPropagation();
      const card = el.closest('.product__sizes');
      card.querySelectorAll('.product__size').forEach(s => s.classList.remove('active'));
      el.classList.add('active');
    });
  });
}

function buildProductCard(p) {
  const isFav = favorites.includes(p.id);
  const catName = CAT_NAMES[p.cat] || '';

  let badgesHtml = '';
  if (p.badges && p.badges.length) {
    for (const b of p.badges) {
      const label = b === 'new' ? 'New' : b === 'sale' ? 'Sale' : b === 'hit' ? 'Хит' : b;
      badgesHtml += `<span class="badge badge--${b}">${label}</span>`;
    }
  }

  const priceOldHtml = p.oldPrice && p.oldPrice > p.price
    ? `<span class="product__price-old">${fmt(p.oldPrice)}</span>`
    : '';

  let sizesHtml = '';
  for (const s of SIZES) {
    sizesHtml += `<span class="product__size" data-size="${s}">${s}</span>`;
  }

  return `
    <div class="product">
      <div class="product__image" data-view="${p.id}">
        <div class="product__badges">${badgesHtml}</div>
        <button class="fav-btn ${isFav ? 'active' : ''}" data-fav="${p.id}">${isFav ? '♥' : '♡'}</button>
        <img src="${p.img}" alt="${escapeHtml(p.name)}" loading="lazy">
        <div class="product__quick">Быстрый просмотр</div>
      </div>
      <div class="product__body">
        <div class="product__cat">${catName}</div>
        <h3 class="product__name" data-view="${p.id}">${escapeHtml(p.name)}</h3>
        <div class="product__rating">★★★★★ <span>(${Math.floor(Math.random()*80)+20})</span></div>
        <div class="product__sizes">${sizesHtml}</div>
        <div class="product__price">
          <span class="product__price-current">${fmt(p.price)}</span>
          ${priceOldHtml}
        </div>
        <button class="product__add" data-add="${p.id}">В корзину</button>
      </div>
    </div>
  `;
}

/* ============ БЫСТРЫЙ ПРОСМОТР ТОВАРА ============ */
function openProductView(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p || !DOM.productView) return;

  const isFav = favorites.includes(p.id);
  const priceOldHtml = p.oldPrice && p.oldPrice > p.price
    ? `<span class="product-view__price-old">${fmt(p.oldPrice)}</span>`
    : '';

  let sizesHtml = '';
  for (const s of SIZES) {
    sizesHtml += `<div class="product-view__size" data-size="${s}">${s}</div>`;
  }

  DOM.productView.innerHTML = `
    <div class="product-view__image">
      <img src="${p.img}" alt="${escapeHtml(p.name)}">
    </div>
    <div class="product-view__content">
      <div class="product-view__cat">${CAT_NAMES[p.cat] || ''}</div>
      <h2 class="product-view__title">${escapeHtml(p.name)}</h2>
      <div class="product-view__rating">★★★★★ <span>(${Math.floor(Math.random()*80)+20} отзывов)</span></div>
      <p class="product-view__desc">${escapeHtml(p.desc || 'Качественная вещь из нашей коллекции. Отличная посадка, приятные ткани.')}</p>
      <div class="product-view__price">
        <span class="product-view__price-current">${fmt(p.price)}</span>
        ${priceOldHtml}
      </div>
      <div>
        <div style="font-size:12px; letter-spacing:1px; text-transform:uppercase; color:var(--muted); margin-bottom:8px;">Размер:</div>
        <div class="product-view__sizes">${sizesHtml}</div>
      </div>
      <div class="product-view__actions">
        <button class="btn btn--primary" id="pvAdd">В корзину</button>
        <button class="btn btn--ghost" id="pvFav">${isFav ? '♥ В избранном' : '♡ В избранное'}</button>
      </div>
    </div>
  `;

  // размеры
  DOM.productView.querySelectorAll('.product-view__size').forEach(el => {
    el.addEventListener('click', () => {
      DOM.productView.querySelectorAll('.product-view__size').forEach(s => s.classList.remove('active'));
      el.classList.add('active');
    });
  });

  // кнопки
  document.getElementById('pvAdd').addEventListener('click', () => {
    addToCart(p.id);
    closeProductView();
    openCart();
  });

  document.getElementById('pvFav').addEventListener('click', (e) => {
    toggleFav(p.id);
    const nowFav = favorites.includes(p.id);
    e.target.textContent = nowFav ? '♥ В избранном' : '♡ В избранное';
  });

  DOM.productModal.classList.add('active');
  document.body.classList.add('no-scroll');
}

function closeProductView() {
  DOM.productModal.classList.remove('active');
  document.body.classList.remove('no-scroll');
}

/* ============ КОРЗИНА ============ */
function addToCart(id, btn) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id, qty: 1 });
  }
  saveCart();
  updateCartUI();

  if (btn) {
    const original = btn.textContent;
    btn.textContent = '✓ Добавлено';
    btn.classList.add('added');
    setTimeout(() => {
      btn.textContent = original;
      btn.classList.remove('added');
    }, 1200);
  }

  showToast('Товар добавлен в корзину');
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }
  saveCart();
  updateCartUI();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  updateCartUI();
  showToast('Товар удалён', 'info');
}

function getCartTotals() {
  let qty = 0;
  let sum = 0;
  let discount = 0;

  for (const item of cart) {
    const p = PRODUCTS.find(x => x.id === item.id);
    if (!p) continue;
    qty += item.qty;
    sum += p.price * item.qty;

    if (p.oldPrice && p.oldPrice > p.price) {
      discount += (p.oldPrice - p.price) * item.qty;
    }
  }

  return { qty, sum, discount };
}

function updateCartUI() {
  const { qty, sum, discount } = getCartTotals();

  // бейдж
  if (qty > 0) {
    DOM.cartBadge.textContent = qty;
    DOM.cartBadge.classList.remove('hidden');
  } else {
    DOM.cartBadge.classList.add('hidden');
  }

  // пустая корзина
  if (!cart.length) {
    DOM.cartBody.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty__icon">🛍️</div>
        <h3>Корзина пуста</h3>
        <p>Самое время выбрать что-то красивое</p>
        <button class="btn btn--primary" onclick="closeCart();document.getElementById('catalog').scrollIntoView({behavior:'smooth'})">К покупкам</button>
      </div>
    `;
    DOM.cartFooter.style.display = 'none';
    return;
  }

  // список товаров
  let html = '';
  for (const item of cart) {
    const p = PRODUCTS.find(x => x.id === item.id);
    if (!p) continue;
    html += `
      <div class="cart-item">
        <img src="${p.img}" alt="${escapeHtml(p.name)}">
        <div class="cart-item__info">
          <h4>${escapeHtml(p.name)}</h4>
          <div class="cart-item__price">${fmt(p.price)}</div>
          <div class="cart-item__controls">
            <button data-minus="${p.id}">−</button>
            <span>${item.qty}</span>
            <button data-plus="${p.id}">+</button>
          </div>
        </div>
        <button class="cart-item__remove" data-remove="${p.id}">×</button>
      </div>
    `;
  }
  DOM.cartBody.innerHTML = html;

  // обработчики
  DOM.cartBody.querySelectorAll('[data-minus]').forEach(b =>
    b.addEventListener('click', () => changeQty(parseInt(b.dataset.minus), -1))
  );
  DOM.cartBody.querySelectorAll('[data-plus]').forEach(b =>
    b.addEventListener('click', () => changeQty(parseInt(b.dataset.plus), +1))
  );
  DOM.cartBody.querySelectorAll('[data-remove]').forEach(b =>
    b.addEventListener('click', () => removeFromCart(parseInt(b.dataset.remove)))
  );

  // итоги
  DOM.cartQty.textContent = qty;
  DOM.cartDiscount.textContent = discount > 0 ? '−' + fmt(discount) : '0 ₽';
  DOM.cartTotal.textContent = fmt(sum);
  DOM.cartFooter.style.display = 'block';
}

function openCart() {
  DOM.cartPanel.classList.add('active');
  DOM.overlay.classList.add('active');
  document.body.classList.add('no-scroll');
}

function closeCart() {
  DOM.cartPanel.classList.remove('active');
  DOM.overlay.classList.remove('active');
  document.body.classList.remove('no-scroll');
}

/* ============ ИЗБРАННОЕ ============ */
function toggleFav(id) {
  const idx = favorites.indexOf(id);
  if (idx >= 0) {
    favorites.splice(idx, 1);
    showToast('Удалено из избранного', 'info');
  } else {
    favorites.push(id);
    showToast('Добавлено в избранное ♥');
  }
  saveFavs();
  updateFavBadge();
  renderProducts();
}

function updateFavBadge() {
  if (favorites.length) {
    DOM.favBadge.textContent = favorites.length;
    DOM.favBadge.classList.remove('hidden');
  } else {
    DOM.favBadge.classList.add('hidden');
  }
}

function showFavorites() {
  if (!favorites.length) {
    showToast('В избранном пока пусто', 'info');
    return;
  }
  currentFilter = 'all';
  searchQuery = '';
  document.querySelectorAll('.filter-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.cat === 'all')
  );

  const list = PRODUCTS.filter(p => favorites.includes(p.id));
  DOM.catalogTitle.textContent = 'Избранное ♥';
  DOM.countProducts.textContent = list.length;
  DOM.products.innerHTML = list.map(buildProductCard).join('');

  // заново вешаем обработчики
  DOM.products.querySelectorAll('[data-add]').forEach(btn =>
    btn.addEventListener('click', e => { e.stopPropagation(); addToCart(parseInt(btn.dataset.add), btn); })
  );
  DOM.products.querySelectorAll('[data-fav]').forEach(btn =>
    btn.addEventListener('click', e => { e.stopPropagation(); toggleFav(parseInt(btn.dataset.fav)); })
  );
  DOM.products.querySelectorAll('[data-view]').forEach(el =>
    el.addEventListener('click', () => openProductView(parseInt(el.dataset.view)))
  );

  document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
}

/* ============ ФИЛЬТРЫ И СОРТИРОВКА ============ */
function setFilter(cat) {
  currentFilter = cat;
  document.querySelectorAll('.filter-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.cat === cat)
  );
  renderProducts();
}

function resetFilters() {
  currentFilter = 'all';
  currentSort = 'default';
  searchQuery = '';
  if (DOM.searchInput) DOM.searchInput.value = '';
  if (DOM.sortSelect) DOM.sortSelect.value = 'default';
  document.querySelectorAll('.filter-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.cat === 'all')
  );
  renderProducts();
  showToast('Фильтры сброшены', 'info');
}

/* ============ ПОИСК ============ */
function toggleSearch() {
  DOM.searchBar.classList.toggle('active');
  if (DOM.searchBar.classList.contains('active')) {
    DOM.searchInput.focus();
  }
}

function handleSearchInput(e) {
  const q = e.target.value.trim();
  searchQuery = q;
  renderProducts();

  // подсказки
  if (!q) {
    DOM.searchSuggest.innerHTML = '';
    return;
  }

  const matches = PRODUCTS
    .filter(p => p.name.toLowerCase().includes(q.toLowerCase()))
    .slice(0, 6);

  if (!matches.length) {
    DOM.searchSuggest.innerHTML = '<div class="search-suggest__empty">Ничего не найдено</div>';
    return;
  }

  DOM.searchSuggest.innerHTML = matches.map(p => `
    <div class="search-suggest__item" data-view="${p.id}">
      <img src="${p.img}" alt="${escapeHtml(p.name)}">
      <div>
        <div>${escapeHtml(p.name)}</div>
        <div style="font-size:12px;color:var(--muted);margin-top:4px;">${fmt(p.price)}</div>
      </div>
    </div>
  `).join('');

  DOM.searchSuggest.querySelectorAll('[data-view]').forEach(el =>
    el.addEventListener('click', () => {
      openProductView(parseInt(el.dataset.view));
      DOM.searchSuggest.innerHTML = '';
      DOM.searchInput.value = '';
      searchQuery = '';
      DOM.searchBar.classList.remove('active');
    })
  );
}

/* ============ ТАЙМЕР АКЦИИ ============ */
let promoEndDate = null;

function initPromoTimer() {
  // акция до конца текущего месяца
  const now = new Date();
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0);
  promoEndDate = end;

  updatePromoTimer();
  setInterval(updatePromoTimer, 1000);
}

function updatePromoTimer() {
  const days = document.getElementById('days');
  if (!days) return;

  const now = new Date();
  let diff = Math.max(0, promoEndDate - now);

  const d = Math.floor(diff / (1000 * 60 * 60 * 24)); diff -= d * 1000 * 60 * 60 * 24;
  const h = Math.floor(diff / (1000 * 60 * 60)); diff -= h * 1000 * 60 * 60;
  const m = Math.floor(diff / (1000 * 60)); diff -= m * 1000 * 60;
  const s = Math.floor(diff / 1000);

  const pad = n => String(n).padStart(2, '0');
  document.getElementById('days').textContent = pad(d);
  document.getElementById('hours').textContent = pad(h);
  document.getElementById('minutes').textContent = pad(m);
  document.getElementById('seconds').textContent = pad(s);
}

/* ============ ОБРАБОТЧИКИ ============ */
function bindEvents() {
  // фильтры 
    document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => setFilter(btn.dataset.cat));
  });

  // категории-плитки
  document.querySelectorAll('.category').forEach(cat => {
    cat.addEventListener('click', e => {
      e.preventDefault();
      setFilter(cat.dataset.cat);
      document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ссылки навигации с data-cat
  document.querySelectorAll('.nav__link[data-cat]').forEach(a => {
    a.addEventListener('click', e => {
      const cat = a.dataset.cat;
      if (cat) {
        setFilter(cat);
      }
      if (DOM.nav) DOM.nav.classList.remove('open');
    });
  });

  // ссылки в футере с data-cat
  document.querySelectorAll('.footer__col a[data-cat]').forEach(a => {
    a.addEventListener('click', () => setFilter(a.dataset.cat));
  });

  // сортировка
  if (DOM.sortSelect) {
    DOM.sortSelect.addEventListener('change', e => {
      currentSort = e.target.value;
      renderProducts();
    });
  }

  // корзина
  document.getElementById('cartBtn').addEventListener('click', openCart);
  document.getElementById('closeCart').addEventListener('click', closeCart);
  DOM.overlay.addEventListener('click', closeCart);

  // избранное
  document.getElementById('favBtn').addEventListener('click', showFavorites);

  // поиск
  document.getElementById('searchBtn').addEventListener('click', toggleSearch);
  document.getElementById('searchClose').addEventListener('click', () => {
    DOM.searchBar.classList.remove('active');
    DOM.searchSuggest.innerHTML = '';
    searchQuery = '';
    DOM.searchInput.value = '';
    renderProducts();
  });
  DOM.searchInput.addEventListener('input', handleSearchInput);

  // модалка товара
  document.getElementById('closeProduct').addEventListener('click', closeProductView);
  DOM.productModal.addEventListener('click', e => {
    if (e.target === DOM.productModal) closeProductView();
  });

  // бургер
  document.getElementById('burgerBtn').addEventListener('click', () => {
    DOM.nav.classList.toggle('open');
  });

  // скролл
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (DOM.header) DOM.header.classList.toggle('scrolled', y > 20);
    if (DOM.backTop) DOM.backTop.classList.toggle('show', y > 600);
  });

  // вверх
  if (DOM.backTop) {
    DOM.backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // подписка
  const subForm = document.getElementById('subscribeForm');
  if (subForm) {
    subForm.addEventListener('submit', e => {
      e.preventDefault();
      showToast('Спасибо за подписку! Промокод отправим на email');
      subForm.reset();
    });
  }

  // Esc — закрыть всё
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeCart();
      closeProductView();
      if (DOM.authModal) DOM.authModal.classList.remove('active');
      if (DOM.checkoutModal) DOM.checkoutModal.classList.remove('active');
      if (DOM.successModal) DOM.successModal.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  });
}

/* ============ СТАРТ ============ */
function initShop() {
  cacheDom();
  loadProducts();
  loadState();
  renderProducts();
  updateCartUI();
  updateFavBadge();
  bindEvents();
  initPromoTimer();
  if (typeof updateUserUI === 'function') updateUserUI();
}

// экспорт для админки
window.MILA = {
  get products() { return PRODUCTS; },
  set products(v) { PRODUCTS = v; },
  saveProducts,
  loadProducts,
  Store,
  fmt,
  escapeHtml,
  uid,
  showToast,
  DEFAULT_PRODUCTS
};

// ========== ЗАПУСК ==========

// На витрине (index.html)
if (document.getElementById('products')) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (typeof initShop === 'function') initShop();
    });
  } else {
    if (typeof initShop === 'function') initShop();
  }
}
   /* ============================================================
   MILA — app.js
   Часть 2: Авторизация, личный кабинет, оформление заказа,
            админ-панель (логин, CRUD товаров, статистика)
   ============================================================ */

/* ============================================================
   АВТОРИЗАЦИЯ
   ============================================================ */

const ADMIN_LOGIN = 'admin';
const ADMIN_PASSWORD = 'admin123';

function initAuth() {
  const authModal = document.getElementById('authModal');
  const userBtn = document.getElementById('userBtn');
  const closeAuth = document.getElementById('closeAuth');
  const googleLogin = document.getElementById('googleLogin');
  const loginForm = document.getElementById('loginForm');
  const switchToRegister = document.getElementById('switchToRegister');

  if (!authModal || !userBtn) return;

  if (currentUser) updateUserUI();

  userBtn.addEventListener('click', () => {
    if (currentUser) {
      showUserMenu();
    } else {
      authModal.classList.add('active');
      document.body.classList.add('no-scroll');
    }
  });

  if (closeAuth) {
    closeAuth.addEventListener('click', () => {
      authModal.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  }
  authModal.addEventListener('click', e => {
    if (e.target === authModal) {
      authModal.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  });

  // Google-кнопка — работает только с Firebase (сейчас заглушка)
  if (googleLogin) {
    googleLogin.addEventListener('click', () => {
      showToast('Вход через Google требует Live Server. Используйте email.', 'info');
    });
  }

  // ВХОД EMAIL + ПАРОЛЬ (работает без сервера)
  if (loginForm) {
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value.trim();

      if (!email || !password) {
        showToast('Заполните все поля', 'error');
        return;
      }

      const savedUsers = Store.get('mila_users', []);
      const existing = savedUsers.find(u => u.email === email);

      if (existing) {
        if (existing.password !== password) {
          showToast('Неверный пароль', 'error');
          return;
        }
        currentUser = existing;
      } else {
        currentUser = {
          name: email.split('@')[0],
          email,
          password,
          provider: 'email',
          joinedAt: new Date().toISOString()
        };
        savedUsers.push(currentUser);
        Store.set('mila_users', savedUsers);
      }

      saveUser();
      updateUserUI();
      authModal.classList.remove('active');
      document.body.classList.remove('no-scroll');
      loginForm.reset();
      showToast(`Добро пожаловать, ${currentUser.name}!`);
    });
  }

  if (switchToRegister) {
    switchToRegister.addEventListener('click', e => {
      e.preventDefault();
      showToast('Просто введите email и пароль — аккаунт создастся автоматически', 'info');
    });
  }
}

/* Обновление UI пользователя */
function updateUserUI() {
  const userBadge = document.getElementById('userBadge');
  if (!userBadge) return;

  if (currentUser) {
    userBadge.classList.remove('hidden');
  } else {
    userBadge.classList.add('hidden');
  }
}

/* Меню пользователя */
function showUserMenu() {
  // удаляем старое меню если есть
  const old = document.querySelector('.user-menu');
  if (old) old.remove();

  const menu = document.createElement('div');
  menu.className = 'user-menu';
  menu.innerHTML = `
    <div style="padding:12px 16px; border-bottom:1px solid var(--line); margin-bottom:6px;">
      <div style="font-weight:600; font-size:14px;">${escapeHtml(currentUser.name)}</div>
      <div style="font-size:12px; color:var(--muted); margin-top:2px;">${escapeHtml(currentUser.email)}</div>
    </div>
    <button class="user-menu__item" id="umOrders">📦 Мои заказы</button>
    <button class="user-menu__item" id="umFavs">♥ Избранное</button>
    <button class="user-menu__item" id="umCart">🛒 Корзина</button>
    <div class="user-menu__divider"></div>
    <button class="user-menu__item" id="umAdmin">🔐 Админ-панель</button>
    <div class="user-menu__divider"></div>
    <button class="user-menu__item" id="umLogout" style="color:var(--pink);">↪ Выйти</button>
  `;

  const userBtn = document.getElementById('userBtn');
  userBtn.parentElement.style.position = 'relative';
  userBtn.parentElement.appendChild(menu);

  // обработчики
  menu.querySelector('#umOrders').addEventListener('click', () => {
    menu.remove();
    showOrders();
  });
  menu.querySelector('#umFavs').addEventListener('click', () => {
    menu.remove();
    showFavorites();
  });
  menu.querySelector('#umCart').addEventListener('click', () => {
    menu.remove();
    openCart();
  });
  menu.querySelector('#umAdmin').addEventListener('click', () => {
    menu.remove();
    window.location.href = 'admin.html';
  });
  menu.querySelector('#umLogout').addEventListener('click', () => {
  menu.remove();
  if (currentUser && currentUser.provider === 'google') {
    signOut(auth).then(() => {
      currentUser = null;
      Store.remove('mila_user');
      updateUserUI();
      showToast('Вы вышли из аккаунта', 'info');
    }).catch((err) => {
      console.error(err);
    });
  } else {
    currentUser = null;
    Store.remove('mila_user');
    updateUserUI();
    showToast('Вы вышли из аккаунта', 'info');
  }
});
  // клик мимо — закрыть
  setTimeout(() => {
    const closeMenu = e => {
      if (!menu.contains(e.target) && e.target !== userBtn) {
        menu.remove();
        document.removeEventListener('click', closeMenu);
      }
    };
    document.addEventListener('click', closeMenu);
  }, 10);
}

/* Мои заказы */
function showOrders() {
  const orders = Store.get('mila_orders', []);
  const myOrders = orders.filter(o => o.userEmail === currentUser.email);

  if (!myOrders.length) {
    showToast('У вас пока нет заказов', 'info');
    return;
  }

  // создаём модалку
  const modal = document.createElement('div');
  modal.className = 'modal active';
  modal.innerHTML = `
    <div class="modal__box">
      <button class="modal__close" id="closeOrders">×</button>
      <h3>Мои заказы</h3>
      <p class="modal__sub">Всего заказов: ${myOrders.length}</p>
      <div style="max-height:60vh; overflow-y:auto;">
        ${myOrders.reverse().map(o => `
          <div style="padding:16px; border:1px solid var(--line); border-radius:8px; margin-bottom:12px;">
            <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
              <strong>Заказ ${o.number}</strong>
              <span style="color:var(--muted); font-size:13px;">${o.date}</span>
            </div>
            <div style="font-size:14px; color:var(--muted); margin-bottom:8px;">
              ${o.items.length} товаров · ${fmt(o.total)}
            </div>
            <div style="font-size:13px;">Статус: <span style="color:var(--green);">✓ ${o.status || 'Оформлен'}</span></div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  document.body.classList.add('no-scroll');

  modal.querySelector('#closeOrders').addEventListener('click', () => {
    modal.remove();
    document.body.classList.remove('no-scroll');
  });
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.remove();
      document.body.classList.remove('no-scroll');
    }
  });
}

/* ============================================================
   ОФОРМЛЕНИЕ ЗАКАЗА
   ============================================================ */

function initCheckout() {
  const checkoutBtn = document.getElementById('checkoutBtn');
  const checkoutModal = document.getElementById('checkoutModal');
  const successModal = document.getElementById('successModal');
  const checkoutForm = document.getElementById('checkoutForm');

  if (!checkoutBtn || !checkoutModal) return;

  // открыть модалку оформления
  checkoutBtn.addEventListener('click', () => {
    if (!cart.length) {
      showToast('Корзина пуста', 'error');
      return;
    }

    // подставить данные пользователя
    if (currentUser) {
      checkoutForm.name.value = currentUser.name || '';
      checkoutForm.email.value = currentUser.email || '';
    }

    // показать итоги
    const { qty, sum, discount } = getCartTotals();
    document.getElementById('checkoutSummary').innerHTML = `
      <div class="checkout-summary__row">
        <span>Товаров:</span>
        <strong>${qty} шт.</strong>
      </div>
      ${discount > 0 ? `
        <div class="checkout-summary__row">
          <span>Скидка:</span>
          <strong style="color:var(--pink);">−${fmt(discount)}</strong>
        </div>
      ` : ''}
      <div class="checkout-summary__row checkout-summary__row--total">
        <span>Итого:</span>
        <strong>${fmt(sum)}</strong>
      </div>
    `;

    closeCart();
    checkoutModal.classList.add('active');
    document.body.classList.add('no-scroll');
  });

  // закрытие
  document.getElementById('closeCheckout').addEventListener('click', closeCheckout);
  document.getElementById('cancelCheckout').addEventListener('click', closeCheckout);
  checkoutModal.addEventListener('click', e => {
    if (e.target === checkoutModal) closeCheckout();
  });

  function closeCheckout() {
    checkoutModal.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }

  // отправка формы
  checkoutForm.addEventListener('submit', e => {
    e.preventDefault();

    const { sum } = getCartTotals();
    const orderNumber = 'M-' + Date.now().toString().slice(-6);

    // сохраняем заказ
    const orders = Store.get('mila_orders', []);
    const order = {
      number: orderNumber,
      date: new Date().toLocaleDateString('ru-RU'),
      userEmail: currentUser ? currentUser.email : checkoutForm.email.value,
      customer: {
        name: checkoutForm.name.value,
        phone: checkoutForm.phone.value,
        email: checkoutForm.email.value,
        address: checkoutForm.address.value,
        delivery: checkoutForm.delivery.value,
        payment: checkoutForm.payment.value,
        comment: checkoutForm.comment.value
      },
      items: cart.map(i => {
        const p = PRODUCTS.find(x => x.id === i.id);
        return { name: p.name, price: p.price, qty: i.qty };
      }),
      total: sum,
      status: 'Оформлен'
    };
    orders.push(order);
    Store.set('mila_orders', orders);

    // показываем успех
    document.getElementById('orderNumber').textContent = orderNumber;
    document.getElementById('orderTotal').textContent = fmt(sum);
    document.getElementById('successText').textContent =
      `${checkoutForm.name.value}, спасибо за заказ! Мы свяжемся с вами в течение 15 минут.`;

    closeCheckout();
    successModal.classList.add('active');
    document.body.classList.add('no-scroll');

    // очищаем корзину
    cart = [];
    saveCart();
    updateCartUI();
    checkoutForm.reset();
  });

  // закрытие успеха
  document.getElementById('successClose').addEventListener('click', () => {
    successModal.classList.remove('active');
    document.body.classList.remove('no-scroll');
  });
  successModal.addEventListener('click', e => {
    if (e.target === successModal) {
      successModal.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  });
}

/* ============================================================
   АДМИН-ПАНЕЛЬ (для admin.html)
   ============================================================ */

function initAdmin() {
  const loginScreen = document.getElementById('loginScreen');
  const adminPanel = document.getElementById('adminPanel');
  const loginForm = document.getElementById('adminLoginForm');
  const logoutBtn = document.getElementById('logoutBtn');
  const addProductBtn = document.getElementById('addProductBtn');
  const resetBtn = document.getElementById('resetBtn');
  const productEditModal = document.getElementById('productEditModal');
  const productForm = document.getElementById('productForm');
  const cancelEdit = document.getElementById('cancelEdit');

  if (!loginScreen || !adminPanel) return;

  // проверяем сохранённый вход
  const isLogged = Store.get('mila_admin_logged', false);
  if (isLogged) {
    showPanel();
  }

  // вход
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const login = document.getElementById('adminLogin').value.trim();
    const password = document.getElementById('adminPassword').value.trim();

    if (login === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
      Store.set('mila_admin_logged', true);
      showPanel();
      showToastAdmin('Добро пожаловать в админ-панель!');
    } else {
      showToastAdmin('Неверный логин или пароль', 'error');
    }
  });

  // выход
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      Store.remove('mila_admin_logged');
      loginScreen.style.display = 'flex';
      adminPanel.classList.remove('active');
      loginForm.reset();
    });
  }
  // ==================== ВКЛАДКИ (ТОВАРЫ / ЗАКАЗЫ) ====================
  const tabButtons = document.querySelectorAll('.admin-tab');
  const tabProducts = document.getElementById('tabProducts');
  const tabOrders = document.getElementById('tabOrders');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;

      tabButtons.forEach(b => b.classList.toggle('active', b === btn));

      if (tab === 'products') {
        tabProducts.classList.add('active');
        tabOrders.classList.remove('active');
      } else if (tab === 'orders') {
        tabOrders.classList.add('active');
        tabProducts.classList.remove('active');
        renderOrders();
      }
    });
  });

  // ==================== ФИЛЬТР ПО СТАТУСУ ====================
  const orderFilter = document.getElementById('orderStatusFilter');
  if (orderFilter) {
    orderFilter.addEventListener('change', renderOrders);
  }

  // ==================== ОЧИСТКА ВСЕХ ЗАКАЗОВ ====================
  const clearOrdersBtn = document.getElementById('clearOrdersBtn');
  if (clearOrdersBtn) {
    clearOrdersBtn.addEventListener('click', () => {
      if (!confirm('Удалить ВСЕ заказы? Это действие нельзя отменить.')) return;
      Store.set('mila_orders', []);
      renderOrders();
      updateOrdersBadge();
      showToastAdmin('Все заказы удалены');
    });
  }

  // ==================== РЕНДЕР ЗАКАЗОВ ====================
  function renderOrders() {
    const ordersList = document.getElementById('ordersList');
    const ordersEmpty = document.getElementById('ordersEmpty');
    const filter = document.getElementById('orderStatusFilter');

    if (!ordersList) return;

    let orders = Store.get('mila_orders', []);

    // фильтр по статусу
    const status = filter ? filter.value : 'all';
    if (status !== 'all') {
      orders = orders.filter(o => (o.status || 'new') === status);
    }

    // новые сверху
    orders = orders.slice().reverse();

    if (!orders.length) {
      ordersList.innerHTML = '';
      ordersEmpty.classList.remove('hidden');
      return;
    }
    ordersEmpty.classList.add('hidden');

    const STATUS_LABELS = {
      new: { label: '🆕 Новый', color: '#D4A373' },
      accepted: { label: '✅ Принят', color: '#7a9a6b' },
      done: { label: '📦 Выполнен', color: '#4a7a9a' },
      rejected: { label: '❌ Отклонён', color: '#c94a4a' }
    };

    ordersList.innerHTML = orders.map(order => {
      const st = order.status || 'new';
      const statusInfo = STATUS_LABELS[st] || STATUS_LABELS.new;

      const itemsHtml = (order.items || []).map(i =>
        `<li>${i.name} × ${i.qty} — ${fmt(i.price * i.qty)}</li>`
      ).join('');

      const date = order.date || new Date().toLocaleString('ru-RU');

      return `
        <div class="order-card" data-status="${st}">
          <div class="order-card__head">
            <div>
              <div class="order-card__number">Заказ ${order.number}</div>
              <div class="order-card__date">${date}</div>
            </div>
            <div class="order-card__status" style="background:${statusInfo.color}">
              ${statusInfo.label}
            </div>
          </div>

          <div class="order-card__customer">
            <div><strong>Клиент:</strong> ${order.customer?.name || '—'}</div>
            <div><strong>Телефон:</strong> ${order.customer?.phone || '—'}</div>
            <div><strong>Email:</strong> ${order.customer?.email || '—'}</div>
            <div><strong>Адрес:</strong> ${order.customer?.address || '—'}</div>
            <div><strong>Доставка:</strong> ${order.customer?.delivery || '—'}</div>
            <div><strong>Оплата:</strong> ${order.customer?.payment || '—'}</div>
            ${order.customer?.comment ? `<div><strong>Комментарий:</strong> ${order.customer.comment}</div>` : ''}
          </div>

          <div class="order-card__items">
            <strong>Товары:</strong>
            <ul>${itemsHtml}</ul>
          </div>

          <div class="order-card__total">
            <strong>Итого: ${fmt(order.total)}</strong>
          </div>

          <div class="order-card__actions">
  <button class="admin-btn admin-btn--primary admin-btn--sm" data-action="accept" data-id="${order.number}">✓ Принять</button>
  <button class="admin-btn admin-btn--danger admin-btn--sm" data-action="reject" data-id="${order.number}">✕ Отклонить</button>
  <button class="admin-btn admin-btn--ghost admin-btn--sm" data-action="delete" data-id="${order.number}">🗑 Удалить</button>
</div>
        </div>
      `;
    }).join('');

    // обработчики кнопок
    ordersList.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        const id = btn.dataset.id;
        changeOrderStatus(id, action);
      });
    });
  }

  // ==================== СМЕНА СТАТУСА ЗАКАЗА ====================
  function changeOrderStatus(orderNumber, action) {
    let orders = Store.get('mila_orders', []);
    const idx = orders.findIndex(o => o.number === orderNumber);
    if (idx === -1) return;

    if (action === 'delete') {
      if (!confirm(`Удалить заказ ${orderNumber}?`)) return;
      orders.splice(idx, 1);
      showToastAdmin('Заказ удалён');
    } else if (action === 'accept') {
      orders[idx].status = 'accepted';
      showToastAdmin('Заказ принят');
    } else if (action === 'reject') {
      orders[idx].status = 'rejected';
      showToastAdmin('Заказ отклонён');
    } else if (action === 'done') {
      orders[idx].status = 'done';
      showToastAdmin('Заказ выполнен');
    }

    Store.set('mila_orders', orders);
    renderOrders();
    updateOrdersBadge();
  }

  // ==================== БЕЙДЖ НОВЫХ ЗАКАЗОВ ====================
  function updateOrdersBadge() {
    const badge = document.getElementById('ordersBadge');
    if (!badge) return;

    const orders = Store.get('mila_orders', []);
    const newCount = orders.filter(o => (o.status || 'new') === 'new').length;

    if (newCount > 0) {
      badge.textContent = newCount;
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  }

  // обновляем бейдж при входе в панель
  updateOrdersBadge();
  renderOrders();
  // добавление товара
  if (addProductBtn) {
    addProductBtn.addEventListener('click', () => openProductModal());
  }

  // сброс к демо
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (!confirm('Сбросить все товары к демо-набору? Ваши изменения будут потеряны.')) return;
      PRODUCTS = JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
      saveProducts();
      renderAdminTable();
      updateAdminStats();
      showToastAdmin('Товары сброшены к демо');
    });
  }

  // отмена редактирования
  if (cancelEdit) {
    cancelEdit.addEventListener('click', closeProductModal);
  }

  // закрытие модалки кликом мимо
  if (productEditModal) {
    productEditModal.addEventListener('click', e => {
      if (e.target === productEditModal) closeProductModal();
    });
  }

  // сохранение товара
  if (productForm) {
    productForm.addEventListener('submit', e => {
      e.preventDefault();

      const id = document.getElementById('editId').value;
      const name = document.getElementById('editName').value.trim();
      const img = document.getElementById('editImg').value.trim();
      const price = parseInt(document.getElementById('editPrice').value);
      const oldPrice = document.getElementById('editOldPrice').value
        ? parseInt(document.getElementById('editOldPrice').value)
        : null;
      const cat = document.getElementById('editCat').value;
      const desc = document.getElementById('editDesc').value.trim();
      const badgesRaw = document.getElementById('editBadges').value.trim();
      const badges = badgesRaw
        ? badgesRaw.split(',').map(b => b.trim()).filter(Boolean)
        : [];

      if (!name || !img || !price || !cat) {
        showToastAdmin('Заполните обязательные поля', 'error');
        return;
      }

      if (id) {
        // редактирование
        const idx = PRODUCTS.findIndex(p => p.id === parseInt(id));
        if (idx >= 0) {
          PRODUCTS[idx] = { ...PRODUCTS[idx], name, img, price, oldPrice, cat, desc, badges };
        }
        showToastAdmin('Товар обновлён');
      } else {
        // добавление
        const newId = PRODUCTS.length ? Math.max(...PRODUCTS.map(p => p.id)) + 1 : 1;
        PRODUCTS.push({ id: newId, name, img, price, oldPrice, cat, desc, badges });
        showToastAdmin('Товар добавлен');
      }

      saveProducts();
      renderAdminTable();
      updateAdminStats();
      closeProductModal();
    });
  }

  /* ---------- вспомогательные функции админки ---------- */

  function showPanel() {
    loginScreen.style.display = 'none';
    adminPanel.classList.add('active');
    loadProducts();
    renderAdminTable();
    updateAdminStats();
  }

  function openProductModal(product = null) {
    document.getElementById('modalTitle').textContent = product ? 'Редактировать товар' : 'Новый товар';
    document.getElementById('editId').value = product ? product.id : '';
    document.getElementById('editName').value = product ? product.name : '';
    document.getElementById('editImg').value = product ? product.img : '';
    document.getElementById('editPrice').value = product ? product.price : '';
    document.getElementById('editOldPrice').value = product && product.oldPrice ? product.oldPrice : '';
    document.getElementById('editCat').value = product ? product.cat : 'dress';
    document.getElementById('editDesc').value = product ? (product.desc || '') : '';
    document.getElementById('editBadges').value = product && product.badges ? product.badges.join(', ') : '';
    productEditModal.classList.add('active');
  }

  function closeProductModal() {
    productEditModal.classList.remove('active');
    productForm.reset();
    document.getElementById('editId').value = '';
  }

  /* ---------- рендер таблицы ---------- */
  function renderAdminTable() {
    const tbody = document.getElementById('tableBody');
    const empty = document.getElementById('adminEmpty');
    const wrap = document.getElementById('tableWrap');

    if (!tbody) return;

    if (!PRODUCTS.length) {
      wrap.style.display = 'none';
      empty.classList.remove('hidden');
      return;
    }
    wrap.style.display = 'block';
    empty.classList.add('hidden');

    tbody.innerHTML = PRODUCTS.map(p => `
      <div class="admin__row">
        <img src="${p.img}" alt="${escapeHtml(p.name)}" onerror="this.src='https://via.placeholder.com/60x75?text=?'">
        <div>
          <div class="admin__row-name">${escapeHtml(p.name)}</div>
          <div class="admin__row-cat">${CAT_NAMES[p.cat] || p.cat}</div>
        </div>
        <div class="admin__row-cat">${CAT_NAMES[p.cat] || p.cat}</div>
        <div class="admin__row-price">${fmt(p.price)}</div>
        <div class="admin__row-price" style="color:var(--muted); text-decoration:line-through;">${p.oldPrice ? fmt(p.oldPrice) : '—'}</div>
        <div style="color:var(--muted); font-size:12px;">#${p.id}</div>
        <div class="admin__row-actions">
          <button class="admin-btn admin-btn--ghost admin-btn--sm" data-edit="${p.id}">✎</button>
          <button class="admin-btn admin-btn--danger admin-btn--sm" data-delete="${p.id}">×</button>
        </div>
      </div>
    `).join('');

    // обработчики
    tbody.querySelectorAll('[data-edit]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.edit);
        const product = PRODUCTS.find(p => p.id === id);
        if (product) openProductModal(product);
      });
    });

    tbody.querySelectorAll('[data-delete]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.delete);
        const product = PRODUCTS.find(p => p.id === id);
        if (!product) return;
        if (!confirm(`Удалить товар «${product.name}»?`)) return;
        PRODUCTS = PRODUCTS.filter(p => p.id !== id);
        saveProducts();
        renderAdminTable();
        updateAdminStats();
        showToastAdmin('Товар удалён');
      });
    });
  }

  /* ---------- статистика ---------- */
  function updateAdminStats() {
    const statTotal = document.getElementById('statTotal');
    const statDress = document.getElementById('statDress');
    const statTop = document.getElementById('statTop');
    const statOther = document.getElementById('statOther');

    if (!statTotal) return;

    statTotal.textContent = PRODUCTS.length;
    statDress.textContent = PRODUCTS.filter(p => p.cat === 'dress').length;
    statTop.textContent = PRODUCTS.filter(p => p.cat === 'top').length;
    statOther.textContent = PRODUCTS.filter(p => p.cat === 'bottom' || p.cat === 'acc').length;
  }

  /* ---------- toast в админке ---------- */
  function showToastAdmin(msg, type = 'success') {
    const existing = document.querySelector('.admin-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'admin-toast';
    toast.style.cssText = `
      position: fixed; bottom: 30px; left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: ${type === 'error' ? '#C94A4A' : '#2A211D'};
      color: #F7F3EE; padding: 14px 28px; border-radius: 6px;
      z-index: 1000; font-size: 14px;
      transition: transform .3s;
      box-shadow: 0 15px 40px rgba(0,0,0,.3);
    `;
    toast.textContent = msg;
    document.body.appendChild(toast);

    setTimeout(() => toast.style.transform = 'translateX(-50%) translateY(0)', 10);
    setTimeout(() => {
      toast.style.transform = 'translateX(-50%) translateY(100px)';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }
}

/* ============================================================
   ЗАПУСК
   ============================================================ */

// На витрине (только index.html)
if (document.getElementById('products')) {
  if (typeof initAuth === 'function') initAuth();
  if (typeof initCheckout === 'function') initCheckout();
}

// В админке (только admin.html)
if (document.getElementById('adminPanel')) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (typeof initAdmin === 'function') initAdmin();
    });
  } else {
    if (typeof initAdmin === 'function') initAdmin();
  }
}