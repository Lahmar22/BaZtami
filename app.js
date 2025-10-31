
const money1 = document.getElementById("money1");
const money2 = document.getElementById("money2");
const money3 = document.getElementById("money3");

const toggleEye1 = document.getElementById("toggleEye1");
const toggleEye2 = document.getElementById("toggleEye2");
const toggleEye3 = document.getElementById("toggleEye3");

const eyeIcon1 = document.getElementById("eyeIcon1");
const eyeIcon2 = document.getElementById("eyeIcon2");
const eyeIcon3 = document.getElementById("eyeIcon3");

const addBtn = document.getElementById("addBtn");
const nomVersement = document.getElementById("nomVersement");
const montant = document.getElementById("montant");
const typeSelect = document.getElementById("typemontant");

const editName = document.getElementById("editName");
const editAmount = document.getElementById("editAmount");
const editType = document.getElementById("editType");

let versements = JSON.parse(localStorage.getItem("versements") || "[]");

let visible = {
    revenus: false,
    solde: false,
    depenses: false
};

let totals = {
    revenus: 0,
    solde: 0,
    depenses: 0
};


function saveToLocalStorage() {
    localStorage.setItem("versements", JSON.stringify(versements));

    nomVersement.value = "";
    montant.value = "";
    typeSelect.value = "";
}


function toggleVisibility(stateKey, element, value, icon) {
    visible[stateKey] = !visible[stateKey];
    element.textContent = visible[stateKey] ? `${value}` : "****";
    icon.classList.toggle("bi-eye");
    icon.classList.toggle("bi-eye-slash");
}


function updateTotals() {
    let totalRevenus = 0, totalDepenses = 0;

    versements.forEach(v => {
        if (v.type === "Revenus") totalRevenus += v.montant;
        else totalDepenses += v.montant;
    });

    const solde = totalRevenus - totalDepenses;

 
    totals.revenus = totalRevenus;
    totals.solde = solde;
    totals.depenses = totalDepenses;

    money1.textContent = visible.revenus ? `+${totalRevenus} MAD` : "****";
    money2.textContent = visible.solde ? `${solde} MAD` : "****";
    money3.textContent = visible.depenses ? `-${totalDepenses} MAD` : "****";

    document.getElementById("totalRevenus").textContent = `+${totalRevenus} MAD`;
    document.getElementById("totalDepenses").textContent = `-${totalDepenses} MAD`;

    const soldeEl = document.getElementById("soldeNet");
    soldeEl.textContent = `${solde >= 0 ? "+" : ""}${solde} MAD`;
    soldeEl.className = solde >= 0 ? "text-success fw-bold" : "text-danger fw-bold";
}


function renderVersements() {
    const list = document.getElementById("listeVersements");
    list.innerHTML = "";

    versements.forEach((v, index) => {
        const li = document.createElement("li");
        const color = v.type === "Revenus" ? "text-success" : "text-danger";
        const sign = v.type === "Revenus" ? "+" : "-";

        li.className = "list-group d-grid justify-content-center align-items-center p-3 mb-3 rounded-4 shadow bg-white border-0";
        li.innerHTML = `
      <span class="col gap-5 fs-5">
        <strong>${v.nom}</strong> —
        <span class="${color} fw-bold">${sign}${v.montant} MAD</span>
        <span> ${v.formattedDate} </span>
      </span>
      <div class="col btn-group p-4 gap-3">
        <button class="btn btn-warning btn-sm" onclick="editVersement(${index})">Modifier</button>
        <button class="btn btn-danger btn-sm" onclick="deleteVersement(${index})">Supprimer</button>
      </div>
    `;
        list.appendChild(li);
    });

    updateTotals();
}


addBtn.addEventListener("click", () => {
    const nom = nomVersement.value.trim();
    const montantValue = parseFloat(montant.value);
    const type = typeSelect.value;
    const date = new Date();
    const formattedDate = date.toISOString().split("T")[0]; 

    if (!nom || !montantValue || type === "Type d'operation") {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    versements.push({
        nom,
        montant: montantValue,
        type,
        formattedDate
    });

    saveToLocalStorage();
    renderVersements();

    nomVersement.value = "";
    montant.value = "";
    typeSelect.value = "";
});


function deleteVersement(index) {
    if (!confirm("Voulez-vous vraiment supprimer ce versement ?")) return;
    versements.splice(index, 1);
    saveToLocalStorage();
    renderVersements();
}


function editVersement(index) {
    document.getElementById("editId").value = index;
    editName.value = versements[index].nom;
    editAmount.value = versements[index].montant;
    editType.value = versements[index].type;

    new bootstrap.Modal(document.getElementById("editModal")).show();
}

document.getElementById("saveEditBtn").addEventListener("click", () => {
    const index = document.getElementById("editId").value;

    versements[index].nom = editName.value;
    versements[index].montant = parseFloat(editAmount.value);
    versements[index].type = editType.value;

    saveToLocalStorage();
    renderVersements();

    bootstrap.Modal.getInstance(document.getElementById("editModal")).hide();
});


toggleEye1.onclick = () =>
    toggleVisibility("revenus", money1, `+${totals.revenus} MAD`, eyeIcon1);

toggleEye2.onclick = () =>
    toggleVisibility("solde", money2, `${totals.solde} MAD`, eyeIcon2);

toggleEye3.onclick = () =>
    toggleVisibility("depenses", money3, `-${totals.depenses} MAD`, eyeIcon3);


document.addEventListener("DOMContentLoaded", renderVersements);
