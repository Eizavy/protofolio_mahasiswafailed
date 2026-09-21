document.addEventListener("DOMContentLoaded", function () {
  loadProfileData();

  const form = document.getElementById("profileForm");
  const btnReset = document.getElementById("btnReset");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      saveProfileData();
    });
  }

  if (btnReset) {
    btnReset.addEventListener("click", resetForm);
  }
});

function loadProfileData() {
  const savedData = JSON.parse(localStorage.getItem("userProfileData"));

  if (savedData) {
    document.getElementById("inputNama").value = savedData.nama || "";
    document.getElementById("inputDeskripsi").value = savedData.deskripsi || "";
    document.getElementById("inputNegara").value = savedData.negara || "";
    document.getElementById("inputAlamat").value = savedData.alamat || "";
  }
}

function saveProfileData() {
  const profileData = {
    nama: document.getElementById("inputNama").value,
    deskripsi: document.getElementById("inputDeskripsi").value,
    negara: document.getElementById("inputNegara").value,
    alamat: document.getElementById("inputAlamat").value
  };

  localStorage.setItem("userProfileData", JSON.stringify(profileData));
  alert("Data profil berhasil disimpan!");
}

function resetForm() {
  if (confirm("Apakah Anda yakin ingin mereset formulir?")) {
    document.getElementById("profileForm").reset();
    localStorage.removeItem("userProfileData");
  }
}