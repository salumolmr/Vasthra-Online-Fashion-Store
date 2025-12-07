// script.js

// Load from localStorage
let cart = JSON.parse(localStorage.getItem("vasthra_cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("vasthra_wishlist")) || [];

// ---------- COUNTERS ----------
function updateCounts() {
  const c = document.getElementById("cartCount");
  const w = document.getElementById("wishlistCount");

  if (c) c.textContent = cart.reduce((a, i) => a + i.qty, 0);
  if (w) w.textContent = wishlist.length;
}

// ---------- CART ----------
function addToCart(id, name, price) {
  const ex = cart.find(i => i.id === id);
  if (ex) ex.qty++;
  else cart.push({ id, name, price, qty: 1 });

  localStorage.setItem("vasthra_cart", JSON.stringify(cart));
  updateCounts();
  loadCartSidebar();
  alert("Added to cart");
}

function loadCartSidebar() {
  const el = document.getElementById("cartSidebar");
  if (!el) return;

  const html = cart.map((it, i) => `
    <div style="display:flex;justify-content:space-between;align-items:center;margin:10px 0;">
      <div>
        <strong>${it.name}</strong> × ${it.qty}<br>
        <small>₹${it.price * it.qty}</small>
      </div>
      <button onclick="removeFromCart(${i})"
        style="background:#e74c3c;color:#fff;border:none;padding:5px 10px;border-radius:5px;">×</button>
    </div>`).join("");

  el.innerHTML =
    html +
    (cart.length
      ? `<button class="btn" style="width:100%;margin-top:20px;" onclick="location.href='checkout.html'">Checkout</button>`
      : "<p>Cart empty</p>");
}

function removeFromCart(i) {
  cart.splice(i, 1);
  localStorage.setItem("vasthra_cart", JSON.stringify(cart));
  updateCounts();
  loadCartSidebar();
}

function toggleCart() {
  const sidebar = document.querySelector(".cart-sidebar");
  const overlay = document.getElementById("cartOverlay");
  if (!sidebar) return;

  sidebar.classList.toggle("open");

  if (overlay) {
    overlay.style.display = sidebar.classList.contains("open") ? "block" : "none";
  }
}

// ---------- WISHLIST ----------
function toggleWishlist(id, name, price, image) {
  const idx = wishlist.findIndex(i => i.id === id);

  if (idx > -1) {
    wishlist.splice(idx, 1);
    alert("Removed from wishlist");
  } else {
    wishlist.push({ id, name, price, image });
    alert("Added to wishlist");
  }

  localStorage.setItem("vasthra_wishlist", JSON.stringify(wishlist));
  updateCounts();
  renderWishlistPage(); // if we are on wishlist page, refresh it
}

// Render wishlist items on wishlist.html (if element exists)
function renderWishlistPage() {
  const listEl = document.getElementById("wishlistList");
  if (!listEl) return; // not on wishlist page

  if (wishlist.length === 0) {
    listEl.innerHTML = "<p>Your wishlist is empty. <a href='shop.html'>Browse products</a></p>";
    return;
  }

  const html = wishlist.map((p, i) => `
    <div class="card" style="display:flex;gap:20px;align-items:center;">
      <img src="${p.image || ''}" style="width:120px;height:120px;object-fit:cover;">
      <div style="flex:1;">
        <h3>${p.name}</h3>
        <p style="color:#8B4513;font-weight:bold;">₹${p.price}</p>
        <button class="btn" style="margin-top:10px;"
          onclick="addToCart('${p.id}','${p.name}',${p.price})">
          Add to Cart
        </button>
        <button class="btn" style="margin-top:10px;background:#ccc;color:#333;"
          onclick="removeFromWishlist(${i})">
          Remove
        </button>
      </div>
    </div>
  `).join("");

  listEl.innerHTML = html;
}

function removeFromWishlist(index) {
  wishlist.splice(index, 1);
  localStorage.setItem("vasthra_wishlist", JSON.stringify(wishlist));
  updateCounts();
  renderWishlistPage();
}

// ---------- INIT ----------
updateCounts();
loadCartSidebar();
renderWishlistPage();   // will only do something on wishlist.html
