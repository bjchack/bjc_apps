// script.js

// ===== Phone input & Next button =====
const phoneInput = document.getElementById('phone');
const nextBtn = document.getElementById('nextBtn');

phoneInput.addEventListener('input', () => {
  nextBtn.style.display = (phoneInput.value.length === 11) ? 'block' : 'none';
});

function showProviders(){
  document.getElementById('providers').style.display = 'block';
}

// ===== Modal functions =====
function openModal(code, price, days, desc){
  document.getElementById('modalPromo').innerText = code;
  document.getElementById('modalDesc').innerText = desc || '';
  document.getElementById('modalPrice').innerText = `Price: P${price}`;
  document.getElementById('modalDuration').innerText = `Duration: ${days}`;
  document.getElementById('modalGateway').innerText = 'Gateway: 8724';
  document.getElementById('promoModal').style.display = 'flex';
}

function closeModal(){
  document.getElementById('promoModal').style.display = 'none';
}

// ===== Send SMS & save to localStorage history =====
function sendSMSModal(){
  const clientNumber = document.getElementById('phone').value;
  const promoCode = document.getElementById('modalPromo').innerText;
  const promoDesc = document.getElementById('modalDesc').innerText;
  const promoPrice = document.getElementById('modalPrice').innerText.replace('Price: P','') || '';
  const promoDuration = document.getElementById('modalDuration').innerText.replace('Duration: ','') || '';
  const gateway = '8724';
  const message = `${clientNumber} ${promoCode}`;

  // ✅ Save to load history
  let history = JSON.parse(localStorage.getItem('loadHistory') || '[]');
  history.push({
    number: clientNumber,
    code: promoCode,
    desc: promoDesc,
    price: promoPrice,
    duration: promoDuration,
    date: new Date().toLocaleString()
  });
  localStorage.setItem('loadHistory', JSON.stringify(history));

  // Send SMS
  window.location.href = `sms:${gateway}?body=${message}`;

  // Close modal
  closeModal();
}