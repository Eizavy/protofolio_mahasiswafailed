let isEditing = false;
let extraCardCount = 0;

document.addEventListener('DOMContentLoaded', function () {
  loadSavedEducationData();
});

function toggleEditMode() {
  const btn = document.getElementById('btnEditGlobal');
  const btnAddExtra = document.getElementById('btnAddExtra');
  
  if (!isEditing) {
    // AKTIFKAN MODE EDIT
    isEditing = true;
    btn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Simpan Semua Perubahan';
    btn.classList.add('btn-success');
    btnAddExtra.style.display = 'flex';

    // Form Kartu Utama (SD, SMP, SMA & PT)
    setupForm('Sd', 'badgeSd', 'namaSd', 'deskSd');
    setupForm('Smp', 'badgeSmp', 'namaSmp', 'deskSmp');
    setupForm('Sma', 'badgeSma', 'namaSma', 'deskSma');
    setupForm('Pt', 'badgePt', 'namaPt', 'deskPt');

    // Form Kartu Tambahan
    const dynamicCards = document.querySelectorAll('.extra-card');
    dynamicCards.forEach(card => {
      card.querySelector('.edit-form').style.display = 'flex';
      const btnDelete = card.querySelector('.btn-delete-card');
      if (btnDelete) btnDelete.style.display = 'inline-block';
    });

  } else {
    // SIMPAN PERUBAHAN
    isEditing = false;
    btn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Perbarui Data Pendidikan';
    btn.classList.remove('btn-success');
    btnAddExtra.style.display = 'none';

    // Simpan Kartu Utama
    saveDataAndToggle('Sd', 'badgeSd', 'namaSd', 'deskSd');
    saveDataAndToggle('Smp', 'badgeSmp', 'namaSmp', 'deskSmp');
    saveDataAndToggle('Sma', 'badgeSma', 'namaSma', 'deskSma');
    saveDataAndToggle('Pt', 'badgePt', 'namaPt', 'deskPt');

    // Simpan Kartu Tambahan
    const dynamicCards = document.querySelectorAll('.extra-card');
    let extraData = [];

    dynamicCards.forEach(card => {
      const inputTahun = card.querySelector('.input-tahun').value.trim();
      const inputTingkat = card.querySelector('.input-tingkat').value.trim();
      const inputNama = card.querySelector('.input-nama').value.trim();
      const inputDesk = card.querySelector('.input-desk').value.trim();

      const badge = card.querySelector('.badge');
      const title = card.querySelector('.card-title');
      const schoolName = card.querySelector('.school-name');
      const desc = card.querySelector('.description');

      if (inputTahun) badge.innerText = inputTahun;
      if (inputTingkat) title.innerText = inputTingkat;
      if (inputNama) schoolName.innerText = inputNama;
      if (inputDesk) desc.innerText = inputDesk;

      card.querySelector('.edit-form').style.display = 'none';
      const btnDelete = card.querySelector('.btn-delete-card');
      if (btnDelete) btnDelete.style.display = 'none';

      extraData.push({
        badge: badge.innerText,
        title: title.innerText,
        nama: schoolName.innerText,
        desk: desc.innerText
      });
    });

    // Simpan seluruh data ke localStorage
    const eduData = {
      sd: {
        badge: document.getElementById('badgeSd').innerText,
        nama: document.getElementById('namaSd').innerText,
        desk: document.getElementById('deskSd').innerText
      },
      smp: {
        badge: document.getElementById('badgeSmp').innerText,
        nama: document.getElementById('namaSmp').innerText,
        desk: document.getElementById('deskSmp').innerText
      },
      sma: {
        badge: document.getElementById('badgeSma').innerText,
        nama: document.getElementById('namaSma').innerText,
        desk: document.getElementById('deskSma').innerText
      },
      pt: {
        badge: document.getElementById('badgePt').innerText,
        nama: document.getElementById('namaPt').innerText,
        desk: document.getElementById('deskPt').innerText
      },
      extras: extraData
    };

    localStorage.setItem('userEducationData', JSON.stringify(eduData));
  }
}

function setupForm(key, badgeId, namaId, deskId) {
  document.getElementById(`form${key}`).style.display = 'flex';
  document.getElementById(`inputTahun${key}`).value = document.getElementById(badgeId).innerText;
  document.getElementById(`inputNama${key}`).value = document.getElementById(namaId).innerText;
  document.getElementById(`inputDesk${key}`).value = document.getElementById(deskId).innerText;
}

function saveDataAndToggle(key, badgeId, namaId, deskId) {
  const inputTahun = document.getElementById(`inputTahun${key}`).value.trim();
  const inputNama = document.getElementById(`inputNama${key}`).value.trim();
  const inputDesk = document.getElementById(`inputDesk${key}`).value.trim();

  if (inputTahun) document.getElementById(badgeId).innerText = inputTahun;
  if (inputNama) document.getElementById(namaId).innerText = inputNama;
  if (inputDesk) document.getElementById(deskId).innerText = inputDesk;

  document.getElementById(`form${key}`).style.display = 'none';
}

function addDynamicEducationCard(data = null) {
  extraCardCount++;
  const container = document.getElementById('eduContainer');

  const card = document.createElement('div');
  card.className = 'edu-card extra-card';

  const isFormVisible = isEditing ? 'flex' : 'none';
  const isDeleteVisible = isEditing ? 'inline-block' : 'none';

  card.innerHTML = `
    <div class="icon-box">
      <i class="fa-solid fa-graduation-cap"></i>
    </div>
    <div class="card-body">
      <span class="badge">${data ? data.badge : 'Tahun'}</span>
      <h3 class="card-title">${data ? data.title : 'Pendidikan Lainnya'}</h3>
      <h4 class="school-name">${data ? data.nama : 'Nama Institusi'}</h4>
      <p class="description">${data ? data.desk : 'Deskripsi singkat mengenai pendidikan atau pelatihan.'}</p>

      <div class="edit-form" style="display: ${isFormVisible};">
        <input type="text" class="input-tahun" value="${data ? data.badge : ''}" placeholder="Tahun (Contoh: 2024)">
        <input type="text" class="input-tingkat" value="${data ? data.title : ''}" placeholder="Tingkat (Contoh: Kursus / Sertifikasi)">
        <input type="text" class="input-nama" value="${data ? data.nama : ''}" placeholder="Nama Institusi">
        <textarea class="input-desk" rows="2" placeholder="Deskripsi Singkat">${data ? data.desk : ''}</textarea>
        <button class="btn-delete-card" style="display: ${isDeleteVisible};" onclick="deleteCard(this)">
          <i class="fa-solid fa-trash"></i> Hapus
        </button>
      </div>
    </div>
  `;

  container.appendChild(card);
}

function deleteCard(button) {
  const card = button.closest('.edu-card');
  card.remove();
}

function loadSavedEducationData() {
  const savedData = JSON.parse(localStorage.getItem('userEducationData'));

  if (savedData) {
    if (savedData.sd) {
      document.getElementById('badgeSd').innerText = savedData.sd.badge;
      document.getElementById('namaSd').innerText = savedData.sd.nama;
      document.getElementById('deskSd').innerText = savedData.sd.desk;
    }
    if (savedData.smp) {
      document.getElementById('badgeSmp').innerText = savedData.smp.badge;
      document.getElementById('namaSmp').innerText = savedData.smp.nama;
      document.getElementById('deskSmp').innerText = savedData.smp.desk;
    }
    if (savedData.sma) {
      document.getElementById('badgeSma').innerText = savedData.sma.badge;
      document.getElementById('namaSma').innerText = savedData.sma.nama;
      document.getElementById('deskSma').innerText = savedData.sma.desk;
    }
    if (savedData.pt) {
      document.getElementById('badgePt').innerText = savedData.pt.badge;
      document.getElementById('namaPt').innerText = savedData.pt.nama;
      document.getElementById('deskPt').innerText = savedData.pt.desk;
    }
    if (savedData.extras && savedData.extras.length > 0) {
      savedData.extras.forEach(item => {
        addDynamicEducationCard(item);
      });
    }
  }
}