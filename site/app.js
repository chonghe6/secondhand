const STORAGE_KEY = "move-out-sale-v1";
const RECOMMENDATION_VERSION = 3;
const DATE_RANGE_VERSION = 1;
const STATUS_VERSION = 1;
const SALE_START_DATE = "2026-06-19";
const SALE_END_DATE = "2026-07-20";
const IS_EDITABLE = location.protocol === "file:" || ["localhost", "127.0.0.1"].includes(location.hostname);
const ITEM_EDITABLE_FIELDS = ["image", "salePrice", "status", "start", "end", "note"];
const STATUSES = ["available", "reserved", "sold"];
const STATUS_LABELS = {
  available: "Available",
  reserved: "Reserved",
  sold: "Sold",
};
const LEGACY_DEFAULT_STATUSES = {
  portable_ac: ["available"],
};
const LEGACY_DEFAULT_SALE_PRICES = {
  dell_monitor_1: ["$130", "$150"],
  dell_monitor_2: ["$130"],
};

const baseInfo = {
  pageTitle: "Move-Out Sale",
  pickupAddress: "Pickup address:",
  pickupDate: "Pickup date:",
  phoneContact: "Whatsapp / iMessage / SMS:",
  wechatContact: "WeChat:",
};

const items = [
  {
    id: "midea_ac",
    title: "Midea 5,000 BTU EasyCool Window Air Conditioner",
    image: "./assets/midea_ac.jpg",
    amazonPrice: "$179.99",
    salePrice: "$72",
    amazonUrl: "https://www.amazon.com/dp/B085797ZFF",
    match: "Purchased item; original list price",
    status: "available",
    start: SALE_START_DATE,
    end: SALE_END_DATE,
    note: "",
  },
  {
    id: "dell_monitor_1",
    title: "Dell 27 Plus QHD Monitor - S2725DSM (Used, 1 of 2)",
    image: "./assets/dell_s2725dsm.png",
    amazonPrice: "$189.99",
    salePrice: "$126",
    amazonUrl: "https://www.dell.com/en-us/shop/dell-27-plus-qhd-monitor-s2725dsm/apd/210-btgm/computer-monitors",
    match: "Purchased item; used; quantity 2",
    status: "available",
    start: SALE_START_DATE,
    end: SALE_END_DATE,
    note: "original packaging is complete",
  },
  {
    id: "dell_monitor_2",
    title: "Dell 27 Plus QHD Monitor - S2725DSM (Used, 2 of 2)",
    image: "./assets/dell_s2725dsm.png",
    amazonPrice: "$189.99",
    salePrice: "$126",
    amazonUrl: "https://www.dell.com/en-us/shop/dell-27-plus-qhd-monitor-s2725dsm/apd/210-btgm/computer-monitors",
    match: "Purchased item; used; quantity 2",
    status: "available",
    start: SALE_START_DATE,
    end: SALE_END_DATE,
    note: "original packaging is complete",
  },
  {
    id: "microwave",
    title: "Countertop Microwave, Black/Stainless, Similar to Hamilton Beach",
    image: "./assets/microwave.jpg",
    amazonPrice: "$109.98",
    salePrice: "$40",
    amazonUrl: "https://www.amazon.com/dp/B07HG9Y3VL",
    match: "Similar Amazon item; exact Hamilton Beach listing did not show a normal current price",
    status: "available",
    start: SALE_START_DATE,
    end: SALE_END_DATE,
    note: "",
  },
  {
    id: "heater",
    title: "1500W PTC Electric Space Heater",
    image: "./assets/heater.jpg",
    amazonPrice: "N/A",
    salePrice: "$20",
    amazonUrl: "https://www.amazon.com/dp/B0CLP6XH55",
    match: "Purchased item; original/list price unavailable",
    status: "available",
    start: SALE_START_DATE,
    end: SALE_END_DATE,
    note: "",
  },
  {
    id: "humidifier",
    title: "HUMSURE 9L Ultrasonic Cool Mist Humidifier",
    image: "./assets/humsure_humidifier.jpg",
    amazonPrice: "$145.99",
    salePrice: "$35",
    amazonUrl:
      "https://www.walmart.com/ip/HUMSURE-Humidifier-Suitable-For-Large-Room-2-4gal-9L-Bedroom-Silent-Humidifier-3-Speed-Ultrasonic-Cool-Mist-Timer-Aromatherapy-Cotton-Remote-Control/2325467750",
    match: "Purchased item from Walmart; original price",
    status: "available",
    start: SALE_START_DATE,
    end: SALE_END_DATE,
    note: "",
  },
  {
    id: "cooler",
    title: "BREEZOME 6L Humidifier and Essential Oil Diffuser",
    image: "./assets/breezome_humidifier.jpg",
    amazonPrice: "$49.99",
    salePrice: "$15",
    amazonUrl: "https://www.amazon.com/dp/B0CRD8CRC2",
    match: "Purchased item; original list price",
    status: "available",
    start: SALE_START_DATE,
    end: SALE_END_DATE,
    note: "",
  },
  {
    id: "slicer",
    title: "OSTBA Electric Deli Meat Slicer, 200W",
    image: "./assets/slicer.jpg",
    amazonPrice: "$124.99",
    salePrice: "$40",
    amazonUrl: "https://www.amazon.com/dp/B07TSDQB33",
    match: "Purchased item",
    status: "available",
    start: SALE_START_DATE,
    end: SALE_END_DATE,
    note: "",
  },
  {
    id: "hot_pot",
    title: "GOVNPJ 3L Electric Shabu Shabu Hot Pot",
    image: "./assets/hot_pot.jpg",
    amazonPrice: "N/A",
    salePrice: "$15",
    amazonUrl: "https://www.amazon.com/dp/B09YH3NZMC",
    match: "Purchased item; original/list price unavailable",
    status: "available",
    start: SALE_START_DATE,
    end: SALE_END_DATE,
    note: "",
  },
  {
    id: "deep_fryer",
    title: "Hamilton Beach 2L Cool Touch Electric Deep Fryer",
    image: "./assets/deep_fryer.jpg",
    amazonPrice: "$69.99",
    salePrice: "$25",
    amazonUrl: "https://www.amazon.com/dp/B00ANEKTTA",
    match: "Exact or very close match",
    status: "available",
    start: SALE_START_DATE,
    end: SALE_END_DATE,
    note: "",
  },
  {
    id: "tagine",
    title: "Red Ceramic Moroccan Tagine Pot",
    image: "./assets/tagine.jpg",
    amazonPrice: "$76.95",
    salePrice: "$25",
    amazonUrl: "https://www.amazon.com/dp/B07V5P6PCN",
    match: "Similar Amazon item",
    status: "available",
    start: SALE_START_DATE,
    end: SALE_END_DATE,
    note: "",
  },
  {
    id: "instant_pot",
    title: "Instant Pot Duo Plus 9-in-1 Multicooker, 6 Quart",
    image: "./assets/instant_pot.jpg",
    amazonPrice: "$139.99",
    salePrice: "$45",
    amazonUrl: "https://www.amazon.com/dp/B01NBKTPTS",
    match: "Purchased item; original list price",
    status: "available",
    start: SALE_START_DATE,
    end: SALE_END_DATE,
    note: "",
  },
  {
    id: "nuwave",
    title: "Nuwave Brio 8-Qt Air Fryer with Smart Thermometer",
    image: "./assets/nuwave.jpg",
    amazonPrice: "$159.99",
    salePrice: "$55",
    amazonUrl: "https://www.amazon.com/dp/B089NKT312",
    match: "Purchased item; selected color unavailable, original price from other colors",
    status: "available",
    start: SALE_START_DATE,
    end: SALE_END_DATE,
    note: "",
  },
  {
    id: "portable_ac",
    title: "Upstreman UAK-06C Portable Air Conditioner",
    image: "./assets/portable_ac.jpg",
    amazonPrice: "$219.96",
    salePrice: "$108",
    amazonUrl: "https://www.amazon.com/dp/B0GST71ZLV",
    match: "Similar Amazon item; photo label shows 10,000 BTU / 6,000 SACC",
    status: "reserved",
    start: SALE_START_DATE,
    end: SALE_END_DATE,
    note: "",
  },
  {
    id: "chair",
    title: "Alienware / Vertagear Gaming Chair",
    image: "./assets/chair.jpg",
    amazonPrice: "$419.99",
    salePrice: "$120",
    amazonUrl: "https://www.amazon.com/dp/B0B8GG7Z8J",
    match: "Same brand, similar item; Alienware edition did not show a current Amazon price",
    status: "available",
    start: SALE_START_DATE,
    end: SALE_END_DATE,
    note: "",
  },
];

let state = loadState();
let activeFilter = "all";
document.body.classList.toggle("editable-mode", IS_EDITABLE);
document.body.classList.toggle("read-only-mode", !IS_EDITABLE);

function loadState() {
  const fallback = { info: { ...baseInfo }, items: cloneItems(items) };
  if (!IS_EDITABLE) {
    return fallback;
  }
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "");
    const migrateLegacySalePrices = saved.recommendationVersion !== RECOMMENDATION_VERSION;
    const migrateDateRange = saved.dateRangeVersion !== DATE_RANGE_VERSION;
    const migrateStatuses = saved.statusVersion !== STATUS_VERSION;
    return {
      info: { ...baseInfo, ...(saved.info || {}) },
      items: items.map((item) => ({
        ...item,
        ...pickItemEdits((saved.items || {})[item.id], item, migrateLegacySalePrices, migrateDateRange, migrateStatuses),
      })),
    };
  } catch {
    return fallback;
  }
}

function cloneItems(source) {
  return JSON.parse(JSON.stringify(source));
}

function pickItemEdits(
  savedItem = {},
  baseItem = {},
  migrateLegacySalePrices = false,
  migrateDateRange = false,
  migrateStatuses = false,
) {
  const edits = Object.fromEntries(
    ITEM_EDITABLE_FIELDS.filter((key) => Object.prototype.hasOwnProperty.call(savedItem, key)).map((key) => [
      key,
      savedItem[key],
    ]),
  );
  if (Object.prototype.hasOwnProperty.call(edits, "salePrice") && String(edits.salePrice).trim() === "") {
    delete edits.salePrice;
  }
  if (migrateLegacySalePrices && LEGACY_DEFAULT_SALE_PRICES[baseItem.id]?.includes(edits.salePrice)) {
    delete edits.salePrice;
  }
  if (migrateDateRange) {
    delete edits.start;
    delete edits.end;
  }
  if (!STATUSES.includes(edits.status)) {
    delete edits.status;
  }
  if (migrateStatuses && LEGACY_DEFAULT_STATUSES[baseItem.id]?.includes(edits.status)) {
    delete edits.status;
  }
  if (edits.image && !String(edits.image).startsWith("data:")) {
    delete edits.image;
  }
  return edits;
}

function persist() {
  if (!IS_EDITABLE) {
    updateSummary();
    return;
  }
  const saved = {
    recommendationVersion: RECOMMENDATION_VERSION,
    dateRangeVersion: DATE_RANGE_VERSION,
    statusVersion: STATUS_VERSION,
    info: { ...state.info },
    items: Object.fromEntries(state.items.map((item) => [item.id, pickItemEdits(item)])),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  updateSummary();
}

function renderInfo() {
  document.querySelectorAll("[data-key]").forEach((node) => {
    const key = node.dataset.key;
    node.textContent = state.info[key] || "";
    if (!IS_EDITABLE) return;
    node.setAttribute("contenteditable", "true");
    node.addEventListener("input", () => {
      state.info[key] = node.textContent.trim();
      persist();
    });
  });
}

function renderGallery() {
  const gallery = document.getElementById("gallery");
  const template = document.getElementById("itemTemplate");
  gallery.textContent = "";

  state.items
    .filter((item) => activeFilter === "all" || item.status === activeFilter)
    .forEach((item) => {
      const node = template.content.firstElementChild.cloneNode(true);
      node.dataset.id = item.id;
      node.dataset.status = item.status;

      const image = node.querySelector(".item-image");
      image.src = item.image;
      image.alt = item.title;
      node.querySelector(".image-replace").hidden = !IS_EDITABLE;

      node.querySelector(".item-title").textContent = item.title;
      node.querySelector(".match-line").textContent = `Match: ${item.match}`;

      const amazonLink = node.querySelector(".amazon-link");
      amazonLink.href = item.amazonUrl;
      amazonLink.textContent = item.amazonUrl.replace("https://www.", "").replace("https://", "");

      node.querySelector(".amazon-price").value = item.amazonPrice;

      const salePrice = node.querySelector(".sale-price");
      salePrice.value = item.salePrice;
      setFieldMode(salePrice);
      if (IS_EDITABLE) {
        salePrice.addEventListener("input", () => updateItem(item.id, { salePrice: salePrice.value }));
      }

      const start = node.querySelector(".date-start");
      start.value = item.start;
      setFieldMode(start);
      if (IS_EDITABLE) {
        start.addEventListener("input", () => updateItem(item.id, { start: start.value }));
      }

      const end = node.querySelector(".date-end");
      end.value = item.end;
      setFieldMode(end);
      if (IS_EDITABLE) {
        end.addEventListener("input", () => updateItem(item.id, { end: end.value }));
      }

      const note = node.querySelector(".note-input");
      note.value = item.note;
      setFieldMode(note);
      if (!IS_EDITABLE) {
        node.querySelector(".note-field span").textContent = "Note";
        node.querySelector(".note-field").hidden = !item.note.trim();
      } else {
        note.addEventListener("input", () => updateItem(item.id, { note: note.value }));
      }

      const statusButton = node.querySelector(".status-toggle");
      statusButton.textContent = STATUS_LABELS[item.status] || STATUS_LABELS.available;
      statusButton.disabled = !IS_EDITABLE;
      if (IS_EDITABLE) {
        statusButton.addEventListener("click", () => {
          const current = state.items.find((entry) => entry.id === item.id)?.status || "available";
          const next = STATUSES[(STATUSES.indexOf(current) + 1) % STATUSES.length] || STATUSES[0];
          updateItem(item.id, { status: next });
          renderGallery();
        });
      }

      const imageInput = node.querySelector(".image-input");
      if (IS_EDITABLE) {
        imageInput.addEventListener("change", () => {
          const file = imageInput.files?.[0];
          if (!file) return;
          const reader = new FileReader();
          reader.addEventListener("load", () => {
            updateItem(item.id, { image: String(reader.result || item.image) });
            renderGallery();
          });
          reader.readAsDataURL(file);
        });
      }

      gallery.appendChild(node);
    });
}

function setFieldMode(input) {
  input.readOnly = !IS_EDITABLE;
  input.tabIndex = IS_EDITABLE ? 0 : -1;
}

function updateItem(id, patch) {
  state.items = state.items.map((item) => (item.id === id ? { ...item, ...patch } : item));
  persist();
}

function updateSummary() {
  document.getElementById("totalCount").textContent = state.items.length;
  document.getElementById("availableCount").textContent = state.items.filter((item) => item.status === "available").length;
  document.getElementById("reservedCount").textContent = state.items.filter((item) => item.status === "reserved").length;
  document.getElementById("soldCount").textContent = state.items.filter((item) => item.status === "sold").length;
}

function setupFilters() {
  document.querySelectorAll(".filter").forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      document.querySelectorAll(".filter").forEach((item) => item.classList.toggle("active", item === button));
      renderGallery();
    });
  });
}

function setupImportExport() {
  const exportBtn = document.getElementById("exportBtn");
  const importFile = document.getElementById("importFile");
  const resetBtn = document.getElementById("resetBtn");
  if (!exportBtn || !importFile || !resetBtn) return;

  exportBtn.addEventListener("click", () => {
    const blob = new Blob([localStorage.getItem(STORAGE_KEY) || "{}"], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "move-out-sale-data.json";
    link.click();
    URL.revokeObjectURL(url);
  });

  importFile.addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      localStorage.setItem(STORAGE_KEY, String(reader.result || "{}"));
      state = loadState();
      renderInfo();
      renderGallery();
      updateSummary();
    });
    reader.readAsText(file);
  });

  resetBtn.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    state = loadState();
    renderInfo();
    renderGallery();
    updateSummary();
  });
}

function setupLocalSync() {
  if (!IS_EDITABLE) return;
  const titleRow = document.querySelector(".title-row");
  if (!titleRow) return;

  const actions = document.createElement("div");
  actions.className = "local-sync-actions";

  const copyButton = document.createElement("button");
  copyButton.className = "local-sync-button";
  copyButton.type = "button";
  copyButton.textContent = "Copy sync data";

  copyButton.addEventListener("click", async () => {
    const data = localStorage.getItem(STORAGE_KEY) || JSON.stringify({ items: {} });
    try {
      await navigator.clipboard.writeText(data);
      copyButton.textContent = "Copied";
    } catch {
      const box = document.createElement("textarea");
      box.value = data;
      box.className = "sync-data-box";
      actions.appendChild(box);
      box.select();
      copyButton.textContent = "Copy from box";
    }
  });

  actions.appendChild(copyButton);
  titleRow.appendChild(actions);
}

renderInfo();
setupFilters();
setupImportExport();
setupLocalSync();
renderGallery();
updateSummary();
