let isEditingMode = false;

const defaultSkill = [
  { id: 1, name: "Desain Grafis", desc: "Membuat Vector dan mockup", level: 85 },
  { id: 2, name: "CSS", desc: "Mendesain tampilan website.", level: 75 },
  { id: 3, name: "JavaScript", desc: "Membuat website menjadi interaktif.", level: 70 },
  { id: 4, name: "Corel Draw", desc: "Menggambar ilustrasi dan karakter 2D", level: 87 }
];

document.addEventListener("DOMContentLoaded", function () {
  loadSkillData();
});

function getSkillData() {
  const savedSkill = localStorage.getItem("userSkillData");
  if (savedSkill) {
    return JSON.parse(savedSkill);
  } else {
    localStorage.setItem("userSkillData", JSON.stringify(defaultSkill));
    return defaultSkill;
  }
}

function getInitials(name) {
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

function loadSkillData() {
  const skillList = getSkillData();
  const container = document.getElementById("skillContainer");
  container.innerHTML = "";

  if (skillList.length === 0) {
    container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #64748b;">Belum ada skill yang ditambahkan.</p>`;
    return;
  }

  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  skillList.forEach(item => {
    const card = document.createElement("div");
    card.className = "skill-card";

    const isActionVisible = isEditingMode ? "flex" : "none";
    const offset = circumference - (item.level / 100) * circumference;
    const initials = getInitials(item.name);

    card.innerHTML = `
      <div class="circle-wrapper">
        <svg>
          <circle class="bg-circle" cx="50" cy="50" r="${radius}"></circle>
          <circle class="progress-circle" cx="50" cy="50" r="${radius}" 
                  style="stroke-dasharray: ${circumference}; stroke-dashoffset: ${offset};"></circle>
        </svg>
        <div class="circle-content">
          <span class="badge-initial">${initials}</span>
          <span class="percentage-text">${item.level}%</span>
        </div>
      </div>

      <div class="skill-details">
        <h3 class="skill-title">${item.name}</h3>
        <p class="skill-desc">${item.desc}</p>
        
        <div class="card-actions" style="display: ${isActionVisible};">
          <button class="btn-edit-item" onclick="openEditSkillModal(${item.id})">Edit</button>
          <button class="btn-delete-item" onclick="deleteSkill(${item.id})">Hapus</button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function toggleEditMode() {
  isEditingMode = !isEditingMode;
  const btnToggle = document.getElementById("btnToggleEdit");
  const btnAdd = document.getElementById("btnAddSkill");

  if (isEditingMode) {
    btnToggle.innerHTML = `<i class="fa-solid fa-check"></i> Selesai Mengelola`;
    btnToggle.classList.replace("btn-primary", "btn-success");
    btnAdd.style.display = "flex";
  } else {
    btnToggle.innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Kelola Skill`;
    btnToggle.classList.replace("btn-success", "btn-primary");
    btnAdd.style.display = "none";
  }

  loadSkillData();
}

function openAddSkillModal() {
  document.getElementById("modalTitle").innerText = "Tambah Skill Baru";
  document.getElementById("editSkillId").value = "";
  document.getElementById("inputSkillName").value = "";
  document.getElementById("inputSkillDesc").value = "";
  document.getElementById("inputSkillLevel").value = "";
  document.getElementById("skillModal").style.display = "flex";
}

function openEditSkillModal(id) {
  const skillList = getSkillData();
  const item = skillList.find(s => s.id === id);

  if (item) {
    document.getElementById("modalTitle").innerText = "Edit Skill";
    document.getElementById("editSkillId").value = item.id;
    document.getElementById("inputSkillName").value = item.name;
    document.getElementById("inputSkillDesc").value = item.desc;
    document.getElementById("inputSkillLevel").value = item.level;
    document.getElementById("skillModal").style.display = "flex";
  }
}

function closeSkillModal() {
  document.getElementById("skillModal").style.display = "none";
}

function saveSkill() {
  const id = document.getElementById("editSkillId").value;
  const name = document.getElementById("inputSkillName").value.trim();
  const desc = document.getElementById("inputSkillDesc").value.trim();
  const level = parseInt(document.getElementById("inputSkillLevel").value);

  if (!name || !desc || isNaN(level)) {
    alert("Mohon isi semua data dengan benar!");
    return;
  }

  let skillList = getSkillData();

  if (id) {
    skillList = skillList.map(item => {
      if (item.id == id) {
        return { ...item, name, desc, level };
      }
      return item;
    });
  } else {
    const newSkill = {
      id: Date.now(),
      name,
      desc,
      level
    };
    skillList.push(newSkill);
  }

  localStorage.setItem("userSkillData", JSON.stringify(skillList));
  closeSkillModal();
  loadSkillData();
}

function deleteSkill(id) {
  if (confirm("Apakah Anda yakin ingin menghapus skill ini?")) {
    let skillList = getSkillData();
    skillList = skillList.filter(item => item.id !== id);
    localStorage.setItem("userSkillData", JSON.stringify(skillList));
    loadSkillData();
  }
}