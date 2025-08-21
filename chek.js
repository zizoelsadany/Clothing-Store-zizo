const paymentOptions = document.querySelectorAll('input[name="payment"]');
const paymentDetails = document.getElementById("payment-details");
const checkoutBtn = document.querySelector(".checkout-btn");
const messageBox = document.createElement("div"); // صندوق الرسائل
messageBox.className = "message-box";
document.body.appendChild(messageBox);

// ✅ اختيار وسيلة الدفع
paymentOptions.forEach(option => {
  option.addEventListener("change", () => {
    let selected = option.value;
    paymentDetails.innerHTML = "";

    if (selected === "vodafone") {
      paymentDetails.innerHTML = `
        <div class="form-group">
          <label>Vodafone Cash Number</label>
          <input id="vodafone-number" type="tel" placeholder="+20 10 000 0000">
        </div>
      `;
    } else if (selected === "card") {
      paymentDetails.innerHTML = `
        <div class="form-group">
          <label>Card Number</label>
          <input id="card-number" type="text" placeholder="1234 5678 9012 3456">
        </div>
        <div class="form-group">
          <label>Expiry Date</label>
          <input id="expiry-date" type="text" placeholder="MM/YY">
        </div>
        <div class="form-group">
          <label>CVV</label>
          <input id="cvv" type="password" placeholder="123">
        </div>
      `;
    } else if (selected === "cod") {
      paymentDetails.innerHTML = `
        <p style="color:green; font-weight:600; margin-top:10px;">
          ✅ You will pay in cash upon delivery.
        </p>
      `;
    }
  });
});

// ✅ دالة لعرض الرسائل داخل الصفحة
function showMessage(text, type = "success") {
  messageBox.textContent = text;
  messageBox.className = `message-box ${type}`;
  messageBox.style.display = "block";
  setTimeout(() => {
    messageBox.style.display = "none";
  }, 4000);
}

// ✅ Validation
checkoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const selected = document.querySelector('input[name="payment"]:checked');

  if (!selected) {
    showMessage("⚠️ Please select a payment method.", "error");
    return;
  }

  if (selected.value === "vodafone") {
    const number = document.getElementById("vodafone-number").value;
    const regex = /^(010|011|012|015)[0-9]{8}$/;
    if (!regex.test(number)) {
      showMessage("❌ Invalid Vodafone Cash number.", "error");
      return;
    }
  }

  if (selected.value === "card") {
    const cardNum = document.getElementById("card-number").value.replace(/\s+/g, '');
    const expiry = document.getElementById("expiry-date").value;
    const cvv = document.getElementById("cvv").value;

    if (!/^[0-9]{16}$/.test(cardNum)) {
      showMessage("❌ Card number must be 16 digits.", "error");
      return;
    }
    if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(expiry)) {
      showMessage("❌ Expiry must be MM/YY.", "error");
      return;
    }
    if (!/^[0-9]{3}$/.test(cvv)) {
      showMessage("❌ CVV must be 3 digits.", "error");
      return;
    }
  }

  if (selected.value === "cod") {
    showMessage("✅ Order confirmed! Pay on delivery.", "success");
    return;
  }

  showMessage("🎉 Payment Successful! Thank you for shopping with us.", "success");
});

// ✅ تحميل السلة من LocalStorage
window.addEventListener("DOMContentLoaded", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartContainer = document.getElementById("cart-items");
  const totalElement = document.getElementById("cart-total");

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>🛒 Your cart is empty.</p>";
    totalElement.textContent = "0 EGP";
    return;
  }

  let total = 0;
  let html = "";
  cart.forEach(item => {
    let itemTotal = item.price * item.qty;
    total += itemTotal;
    html += `
      <div class="summary-item">
        <img src="${item.img}" alt="${item.name}" style="width:50px;height:50px;border-radius:6px;margin-right:10px;">
        <span>${item.name} (x${item.qty})</span>
        <span>${itemTotal.toFixed(2)} EGP</span>
      </div>`;
  });

  cartContainer.innerHTML = html;
  totalElement.textContent = total.toFixed(2) + " EGP";
});
