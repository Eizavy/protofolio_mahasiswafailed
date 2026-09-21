// Isi dari file kontak.js

document.addEventListener('DOMContentLoaded', function () {
  const contactItems = document.querySelectorAll('.kontak-item');
  
  contactItems.forEach(item => {
    const textContent = item.innerText.toLowerCase();
    const valSpan = item.querySelector('.val');
    
    if (valSpan) {
      if (textContent.includes('email') && localStorage.getItem('userEmail')) {
        valSpan.innerText = localStorage.getItem('userEmail');
      } else if ((textContent.includes('hp') || textContent.includes('telepon')) && localStorage.getItem('userPhone')) {
        valSpan.innerText = localStorage.getItem('userPhone');
      } else if (textContent.includes('instagram') && localStorage.getItem('userInstagram')) {
        valSpan.innerText = localStorage.getItem('userInstagram');
      } else if (textContent.includes('github') && localStorage.getItem('userGithub')) {
        valSpan.innerText = localStorage.getItem('userGithub');
      }
    }
  });
});

function editItem(element) {
  if (element.querySelector('.input-wrapper')) return;

  const valSpan = element.querySelector('.val');
  const editHint = element.querySelector('.edit-hint');
  const currentValue = valSpan.innerText;
  
  const textContent = element.innerText.toLowerCase();
  const isEmail = textContent.includes('email');
  const isPhone = textContent.includes('hp') || textContent.includes('telepon');
  const isInstagram = textContent.includes('instagram');
  const isGithub = textContent.includes('github');

  valSpan.style.display = 'none';
  if (editHint) editHint.style.display = 'none';

  const wrapper = document.createElement('div');
  wrapper.className = 'input-wrapper';

  const input = document.createElement('input');
  input.type = 'text';
  input.value = currentValue;
  input.className = 'edit-input';

  const btnSave = document.createElement('button');
  btnSave.innerText = 'Save';
  btnSave.className = 'btn-save';

  const errorMsg = document.createElement('span');
  errorMsg.className = 'error-msg';

  wrapper.appendChild(input);
  wrapper.appendChild(btnSave);
  wrapper.appendChild(errorMsg);

  valSpan.parentNode.insertBefore(wrapper, valSpan.nextSibling);
  input.focus();

  wrapper.addEventListener('click', function(e) {
    e.stopPropagation();
  });

  function validateInput(val) {
    if (isEmail) {
      const allowedDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com'];
      if (!val.includes('@')) return { valid: false, msg: 'Wajib ada @' };
      const parts = val.split('@');
      const domain = parts[1] ? parts[1].toLowerCase().trim() : '';
      if (parts.length < 2 || domain === '') return { valid: false, msg: 'Domain setelah @ tidak boleh kosong' };
      if (!allowedDomains.includes(domain)) return { valid: false, msg: 'Gunakan domain resmi (gmail.com, dll)' };
    }
    
    if (isPhone) {
      const phoneRegex = /^[0-9+]+$/;
      if (!phoneRegex.test(val)) return { valid: false, msg: 'Nomor HP hanya boleh berupa angka' };
      if (val.length < 10) return { valid: false, msg: 'Nomor HP minimal 10 digit' };
    }

    return { valid: true, msg: '' };
  }

  input.addEventListener('input', function() {
    const check = validateInput(input.value.trim());
    if (!check.valid) {
      errorMsg.innerText = check.msg;
      input.style.borderColor = '#dc3545';
    } else {
      errorMsg.innerText = '';
      input.style.borderColor = '#007bff';
    }
  });

  function executeSave() {
    const newValue = input.value.trim();
    const check = validateInput(newValue);

    if (!check.valid) {
      errorMsg.innerText = check.msg;
      input.style.borderColor = '#dc3545';
      input.focus();
      return;
    }

    if (newValue !== "") {
      valSpan.innerText = newValue;
      
      if (isEmail) {
        localStorage.setItem('userEmail', newValue);
      } else if (isPhone) {
        const cleanPhone = newValue.replace(/[^0-9]/g, '');
        localStorage.setItem('userPhone', cleanPhone);
      } else if (isInstagram) {
        localStorage.setItem('userInstagram', newValue);
      } else if (isGithub) {
        localStorage.setItem('userGithub', newValue);
      }
    }

    wrapper.remove();
    valSpan.style.display = 'inline';
    if (editHint) editHint.style.display = 'inline';
  }

  btnSave.addEventListener('click', executeSave);
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') executeSave();
  });
}