const STORAGE_MENU = "layali_bab_menu";
const STORAGE_SETTINGS = "layali_bab_settings";
const STORAGE_CART = "layali_bab_cart";

const defaultMenu = [
  { id: "s1", category: "السندويتشات", name: "سكلوب عربي", price: 165, image: "https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=500&q=80" },
  { id: "s2", category: "السندويتشات", name: "سكلوب سندويشة عادي", price: 110, image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=500&q=80" },
  { id: "s3", category: "السندويتشات", name: "سكلوب سندويشة دبل", price: 140, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=500&q=80" },
  { id: "s4", category: "السندويتشات", name: "سندويشة فاهيتا عادي", price: 110, image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=500&q=80" },
  { id: "s5", category: "السندويتشات", name: "سندويشة فاهيتا دبل", price: 140, image: "https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=500&q=80" },
  { id: "s6", category: "السندويتشات", name: "سندويشة كريسبي عادي", price: 110, image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=500&q=80" },
  { id: "s7", category: "السندويتشات", name: "سندويشة كريسبي دبل", price: 140, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=500&q=80" },
  { id: "s8", category: "السندويتشات", name: "سندويشة مكسيكنو عادي", price: 110, image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=500&q=80" },
  { id: "s9", category: "السندويتشات", name: "سندويشة مكسيكنو دبل", price: 140, image: "https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=500&q=80" },
  { id: "s10", category: "السندويتشات", name: "سندويشة زنجر عادي", price: 110, image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=500&q=80" },
  { id: "s11", category: "السندويتشات", name: "سندويشة زنجر دبل", price: 140, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=500&q=80" },
  { id: "s12", category: "السندويتشات", name: "سنتافيه جاج عادي", price: 110, image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=500&q=80" },
  { id: "s13", category: "السندويتشات", name: "سندويشة سبايسي عادي", price: 110, image: "https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=500&q=80" },
  { id: "s14", category: "السندويتشات", name: "سندويشة سبايسي دبل", price: 140, image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=500&q=80" },
  { id: "b1", category: "البرجر", name: "همبرغر جاج دبل", price: 140, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80" },
  { id: "b2", category: "البرجر", name: "همبرغر لحم دبل", price: 150, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80" },
  { id: "d1", category: "المشروبات", name: "بيبسي 1 لتر", price: 50, image: "https://images.unsplash.com/photo-1622483767028-3f66f2b7420e?auto=format&fit=crop&w=500&q=80" },
  { id: "d2", category: "المشروبات", name: "بيبسي 2.25", price: 70, image: "https://images.unsplash.com/photo-1622483767028-3f66f2b7420e?auto=format&fit=crop&w=500&q=80" },
  { id: "d3", category: "المشروبات", name: "سفينتي 2.25", price: 60, image: "https://images.unsplash.com/photo-1622483767028-3f66f2b7420e?auto=format&fit=crop&w=500&q=80" },
  { id: "d4", category: "المشروبات", name: "طاقة كبيرة", price: 30, image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=500&q=80" },
  { id: "d5", category: "المشروبات", name: "طاقة صغيرة", price: 25, image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=500&q=80" },
  { id: "d6", category: "المشروبات", name: "بوكينزة بوري", price: 20, image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=500&q=80" },
  { id: "d7", category: "المشروبات", name: "سيفنتي بوري", price: 20, image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=500&q=80" },
  { id: "d8", category: "المشروبات", name: "بسمتي بوري", price: 20, image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=500&q=80" },
  { id: "d9", category: "المشروبات", name: "ميرندا بوري", price: 20, image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=500&q=80" },
  { id: "d10", category: "المشروبات", name: "ميرندا عريض", price: 25, image: "https://images.unsplash.com/photo-1610873167013-2dd675d30ef4?auto=format&fit=crop&w=500&q=80" },
  { id: "d11", category: "المشروبات", name: "طازج رمان", price: 20, image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=500&q=80" },
  { id: "d12", category: "المشروبات", name: "علبة مايونيز صغيرة", price: 10, image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=500&q=80" },
  { id: "f1", category: "البطاطا", name: "صحن بطاطا فريت", price: 30, image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=500&q=80" },
  { id: "f2", category: "البطاطا", name: "صحن بطاطا وسط", price: 50, image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=500&q=80" },
  { id: "f3", category: "البطاطا", name: "صحن بطاطا كبير", price: 70, image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=500&q=80" },
  { id: "f4", category: "البطاطا", name: "سندويشة بطاطا عادي", price: 40, image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=500&q=80" },
  { id: "f5", category: "البطاطا", name: "سندويشة بطاطا دبل", price: 50, image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=500&q=80" },
  { id: "f6", category: "البطاطا", name: "سندويشة بطاطا صمون", price: 60, image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=500&q=80" },
  { id: "sh1", category: "الشاورما", name: "كيلو شاورما الدجاج", price: 650, image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=500&q=80" },
  { id: "sh2", category: "الشاورما", name: "نص كيلو شاورما الدجاج", price: 325, image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=500&q=80" },
  { id: "sh3", category: "الشاورما", name: "سندويشة شاورما الدجاج عادي", price: 70, image: "https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=500&q=80" },
  { id: "sh4", category: "الشاورما", name: "سندويشة شاورما الدجاج دبل", price: 90, image: "https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=500&q=80" },
  { id: "sh5", category: "الشاورما", name: "كيلو شاورما اللحم", price: 1000, image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80" },
  { id: "sh6", category: "الشاورما", name: "نص كيلو شاورما اللحم", price: 500, image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80" },
  { id: "sh7", category: "الشاورما", name: "سندويشة شاورما اللحم عادي", price: 100, image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80" },
  { id: "sh8", category: "الشاورما", name: "سندويشة شاورما اللحم دبل", price: 120, image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80" }
];

const defaultSettings = {
  phone: "966500000000",
  address: "مقابل الجامع الكبير عند تقاطع شارع عصفور",
  city: "مدينة الباب",
  mapQuery: "مدينة الباب مقابل الجامع الكبير عند تقاطع شارع عصفور",
  whatsappMessage: "السلام عليكم، أريد الطلب التالي من مطعم ليالي الباب:"
};

function getMenu() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_MENU)) || defaultMenu;
  } catch {
    return defaultMenu;
  }
}

function saveMenu(menu) {
  localStorage.setItem(STORAGE_MENU, JSON.stringify(menu));
}

function getSettings() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_SETTINGS)) || defaultSettings;
  } catch {
    return defaultSettings;
  }
}

function saveSettings(settings) {
  localStorage.setItem(STORAGE_SETTINGS, JSON.stringify(settings));
}

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_CART)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(STORAGE_CART, JSON.stringify(cart));
}

function formatPrice(value) {
  return `${Number(value).toLocaleString("en-US")} ر.س`;
}

function updateRestaurantInfo() {
  const settings = getSettings();

  const phone = settings.phone || defaultSettings.phone;
  const address = settings.address || defaultSettings.address;
  const mapQuery = encodeURIComponent(settings.mapQuery || address);

  document.getElementById("restaurantAddress").textContent = address;
  document.getElementById("restaurantLocationLabel").textContent = `${settings.city || "مدينة الباب"} - ${address}`;
  document.getElementById("restaurantPhoneLabel").textContent = `+${phone}`;
  document.getElementById("footerAddress").textContent = address;
  document.getElementById("footerPhone").textContent = `+${phone}`;
  document.getElementById("footerPhone").href = `https://wa.me/${phone}`;

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
  document.getElementById("mapLink").href = mapUrl;
  document.getElementById("mapFrame").src = `https://www.google.com/maps?q=${mapQuery}&output=embed`;

  const whatsappBase = `https://wa.me/${phone}?text=`;
  document.getElementById("whatsappButton").href = `${whatsappBase}${encodeURIComponent(settings.whatsappMessage || defaultSettings.whatsappMessage)}`;
}

function renderMenu() {
  const menu = getMenu();
  const container = document.getElementById("menuCategories");

  if (!container) return;

  const grouped = menu.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const categoryList = Object.entries(grouped);
  container.innerHTML = categoryList.length
    ? categoryList
        .map(
          ([category, items]) => `
            <div class="menu-category">
              <h4 class="category-title">${category}</h4>
              <div class="items-list">
                ${items
                  .map(
                    (item) => `
                      <div class="item-card">
                        <img src="${item.image || "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=500&q=80"}" alt="${item.name}" />
                        <div class="item-copy">
                          <h4>${item.name}</h4>
                          <p>${category}</p>
                          <div class="item-actions">
                            <span class="item-price">${formatPrice(item.price)}</span>
                            <button class="add-to-cart" data-id="${item.id}">أضف للسلة</button>
                          </div>
                        </div>
                      </div>
                    `
                  )
                  .join("")}
              </div>
            </div>
          `
        )
        .join("")
    : "<p>لا توجد عناصر في المنيو حتى الآن.</p>";

  document.getElementById("itemsCount").textContent = String(menu.length);

  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => addToCart(button.dataset.id));
  });
}

function addToCart(id) {
  const menu = getMenu();
  const cart = getCart();
  const item = menu.find((entry) => entry.id === id);

  if (!item) return;

  const existing = cart.find((entry) => entry.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: item.id, name: item.name, price: item.price, quantity: 1 });
  }

  saveCart(cart);
  renderCart();
}

function changeQuantity(id, delta) {
  const cart = getCart();
  const item = cart.find((entry) => entry.id === id);

  if (!item) return;

  item.quantity += delta;

  if (item.quantity <= 0) {
    const updated = cart.filter((entry) => entry.id !== id);
    saveCart(updated);
    renderCart();
    return;
  }

  saveCart(cart);
  renderCart();
}

function renderCart() {
  const cart = getCart();
  const list = document.getElementById("cartList");
  const count = document.getElementById("cartItemsCount");
  const total = document.getElementById("cartTotal");
  const summary = document.getElementById("cartSummary");

  if (!list || !count || !total || !summary) return;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  count.textContent = String(totalItems);
  total.textContent = `${formatPrice(totalPrice)}`;
  summary.textContent = totalItems > 0 ? `${totalItems} عنصر في السلة` : "السلة فارغة";

  if (!cart.length) {
    list.innerHTML = '<p class="empty-cart">لا توجد عناصر في السلة.</p>';
    return;
  }

  list.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
          <div>
            <strong>${item.name}</strong>
            <div>${formatPrice(item.price)} × ${item.quantity}</div>
          </div>
          <div class="cart-item-actions">
            <button class="qty-btn" data-action="minus" data-id="${item.id}">-</button>
            <span>${item.quantity}</span>
            <button class="qty-btn" data-action="plus" data-id="${item.id}">+</button>
          </div>
        </div>
      `
    )
    .join("");

  document.querySelectorAll(".qty-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.dataset.action;
      const id = btn.dataset.id;
      changeQuantity(id, action === "plus" ? 1 : -1);
    });
  });
}

function buildWhatsAppOrder() {
  const cart = getCart();
  const settings = getSettings();

  if (!cart.length) {
    return `${settings.whatsappMessage || defaultSettings.whatsappMessage}`;
  }

  const messageLines = cart.map((item) => `${item.name} - ${item.quantity} × ${item.price} = ${item.quantity * item.price} ر.س`);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return `${settings.whatsappMessage || defaultSettings.whatsappMessage}\n${messageLines.join("\n")}\n\nالمجموع: ${formatPrice(total)}`;
}

function handleCheckout() {
  const settings = getSettings();
  const phone = settings.phone || defaultSettings.phone;
  const message = encodeURIComponent(buildWhatsAppOrder());
  window.open(`https://wa.me/${phone}?text=${message}`, "_blank", "noopener,noreferrer");
}

function initHomePage() {
  updateRestaurantInfo();
  renderMenu();
  renderCart();

  document.getElementById("checkoutButton").addEventListener("click", handleCheckout);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHomePage);
} else {
  initHomePage();
}














































































































































































































































































































































