let cart = [];

function addToCart(name, price) {
    const item = { name, price };
    cart.push(item);
    updateUI();
    
    // حركة بسيطة للتأكيد
    const btn = event.target;
    btn.innerText = "تمت الإضافة ✅";
    setTimeout(() => btn.innerText = "إضافة للسلة", 1000);
}

function updateUI() {
    document.getElementById('cart-count').innerText = cart.length;
    renderCart();
}

function renderCart() {
    const list = document.getElementById('cart-items-list');
    const totalDisplay = document.getElementById('total-price');
    list.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        list.innerHTML += `
            <div style="display:flex; justify-content:space-between; margin-bottom:10px; border-bottom:1px solid #eee; padding-bottom:5px;">
                <span>${item.name}</span>
                <span>${item.price} SAR</span>
                <span onclick="removeItem(${index})" style="color:red; cursor:pointer;">❌</span>
            </div>
        `;
    });
    totalDisplay.innerText = total;
}

function removeItem(index) {
    cart.splice(index, 1);
    updateUI();
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = (modal.style.display === 'block') ? 'none' : 'block';
}

function sendToWhatsApp() {
    if (cart.length === 0) {
        alert("سلتك فارغة!");
        return;
    }

    let message = "مرحباً Scentara، أريد طلب العطور التالية:%0a%0a";
    let total = 0;
    cart.forEach(item => {
        message += `• ${item.name} - ${item.price} SAR%0a`;
        total += item.price;
    });
    message += `%0a💰 الإجمالي النهائي: ${total} SAR%0aشكراً لكم!`;

    const myNumber = "201234567890"; // حط رقم موبايلك هنا
    window.open(`https://wa.me/${myNumber}?text=${message}`, '_blank');
}
