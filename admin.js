const STORAGE_MENU = "layali_bab_menu";
const STORAGE_SETTINGS = "layali_bab_settings";

const defaultMenu = [
  { id: "s1", category: "السندويتشات", name: "سكلوب عربي", price: 165, image: "https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=500&q=80" },
  { id: "s2", category: "السندويتشات", name: "سكلوب سندويشة عادي", price: 110, image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=500&q=80" },
  { id: "b1", category: "البرجر", name: "همبرغر جاج دبل", price: 140, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80" },
  { id: "d1", category: "المشروبات", name: "بيبسي 1 لتر", price: 50, image: "https://images.unsplash.com/photo-1622483767028-3f66f2b7420e?auto=format&fit=crop&w=500&q=80" },
  { id: "f1", category: "البطاطا", name: "صحن بطاطا فريت", price: 30, image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=500&q=80" },
  { id: "sh1", category: "الشاورما", name: "كيلو شاورما الدجاج", price: 650, image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=500&q=80" }
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

function renderSettings() {
  const settings = getSettings();
  document.getElementById("phoneInput").value = settings.phone || "";
  document.getElementById("cityInput").value = settings.city || "";
  document.getElementById("addressInput").value = settings.address || "";
  document.getElementById("mapInput").value = settings.mapQuery || "";
}

function renderMenuEditor() {
  const menu = getMenu();
  const container = document.getElementById("menuEditor");

  container.innerHTML = menu
    .map(
      (item, index) => `
        <div class="menu-row">
          <input type="text" value="${item.name}" data-field="name" data-index="${index}" aria-label="اسم الصنف" />
          <input type="text" value="${item.category}" data-field="category" data-index="${index}" aria-label="الفئة" />
          <input type="number" value="${item.price}" data-field="price" data-index="${index}" aria-label="السعر" />
          <input type="url" value="${item.image}" data-field="image" data-index="${index}" aria-label="رابط الصورة" />
          <button class="delete-btn" data-index="${index}" title="حذف الصنف">حذف</button>
        </div>
      `
    )
    .join("");

  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const menu = getMenu();
      menu.splice(Number(button.dataset.index), 1);
      saveMenu(menu);
      renderMenuEditor();
    });
  });
}

function addItem() {
  const menu = getMenu();
  menu.push({
    id: `custom-${Date.now()}`,
    category: "أخرى",
    name: "صنف جديد",
    price: 0,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=500&q=80"
  });
  saveMenu(menu);
  renderMenuEditor();
}

function saveMenuFromEditor() {
  const rows = document.querySelectorAll(".menu-row");
  const menu = [];

  rows.forEach((row) => {
    const name = row.querySelector('[data-field="name"]').value.trim();
    const category = row.querySelector('[data-field="category"]').value.trim();
    const price = Number(row.querySelector('[data-field="price"]').value) || 0;
    const image = row.querySelector('[data-field="image"]').value.trim();

    if (!name) return;

    menu.push({
      id: `item-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      category: category || "أخرى",
      name,
      price,
      image: image || "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=500&q=80"
    });
  });

  saveMenu(menu);
  window.location.href = "index.html";
}

function saveSettingsFromForm() {
  const settings = {
    phone: document.getElementById("phoneInput").value.trim(),
    city: document.getElementById("cityInput").value.trim(),
    address: document.getElementById("addressInput").value.trim(),
    mapQuery: document.getElementById("mapInput").value.trim(),
    whatsappMessage: defaultSettings.whatsappMessage
  };

  saveSettings(settings);
  alert("تم حفظ إعدادات المطعم بنجاح");
}

function resetMenu() {
  if (!confirm("هل تريد إعادة المنيو إلى القيم الافتراضية؟")) return;
  saveMenu(defaultMenu);
  renderMenuEditor();
}

function initAdmin() {
  renderSettings();
  renderMenuEditor();

  document.getElementById("saveSettingsBtn").addEventListener("click", saveSettingsFromForm);
  document.getElementById("addItemBtn").addEventListener("click", addItem);
  document.getElementById("saveMenuBtn").addEventListener("click", saveMenuFromEditor);
  document.getElementById("resetMenuBtn").addEventListener("click", resetMenu);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAdmin);
} else {
  initAdmin();
}










































































































