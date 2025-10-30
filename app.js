const money1 = document.getElementById('money1');
const toggleEye1 = document.getElementById('toggleEye1');
const eyeIcon1 = document.getElementById('eyeIcon1');

const money2 = document.getElementById('money2');
const toggleEye2 = document.getElementById('toggleEye2');
const eyeIcon2 = document.getElementById('eyeIcon2');

const money3 = document.getElementById('money3');
const toggleEye3 = document.getElementById('toggleEye3');
const eyeIcon3 = document.getElementById('eyeIcon3');

let TotalRevenus = 0;
let SoldeNet = 0;
let TotalDepenses = 0;

let visible1 = false;
let visible2 = false;
let visible3 = false;



toggleEye1.addEventListener('click', () => {
    visible1 = !visible1;
    money1.textContent = visible1 ? TotalRevenus : '****';


    money1.style.color = visible1 ? 'green' : 'black';


    eyeIcon1.classList.toggle('bi-eye');
    eyeIcon1.classList.toggle('bi-eye-slash');
});

toggleEye2.addEventListener('click', () => {
    visible2 = !visible2;
    money2.textContent = visible2 ? SoldeNet : '****';


    money2.style.color = visible2 ? 'green' : 'black';


    eyeIcon2.classList.toggle('bi-eye');
    eyeIcon2.classList.toggle('bi-eye-slash');
});

toggleEye3.addEventListener('click', () => {
    visible3 = !visible3;
    money3.textContent = visible3 ? TotalDepenses : '****';


    money3.style.color = visible3 ? 'green' : 'black';


    eyeIcon3.classList.toggle('bi-eye');
    eyeIcon3.classList.toggle('bi-eye-slash');
});

const nomVersement = document.getElementById('nomVersement');
const montant = document.getElementById('montant');
const typeSelect = document.getElementById('typemontant');
const addBtn = document.getElementById('addBtn');
const liste = document.getElementById('listeVersements');

addBtn.addEventListener('click', () => {
    const nom = nomVersement.value.trim();
    const prix = parseFloat(montant.value.trim());
    const date = new Date();
    const type = typeSelect.value;

    const dateStr = date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    if (nom === "" || prix === "" || type === "Type d'operation") {
        alert("Veuillez remplir tous les champs !");
        return;
    }


    const typeText = type === "1" ? "Revenus" : "Dépenses";
    const color = type === "1" ? "text-success" : "text-danger";

    if (typeText === 'Revenus') {
        TotalRevenus += prix ;
        SoldeNet += prix;
    } else if (typeText === 'Dépenses') {
        TotalDepenses += prix;
        SoldeNet -= prix;
    }
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
        <div class="card1 d-flex gap-5">
            <span><strong>${nom}</strong> | <strong class="${color}">+${prix} DH</strong></span>
            <p >${dateStr}</p>
            <p >${typeText}</p>
            
        </div>
        <div class="btn-group">
            <button class="btn btn-warning btn-sm">Modifier</button>
            <button class="btn btn-danger btn-sm">Supprimer</button>
        </div>
    `;

    const deleteBtn = li.querySelector('.btn-danger');
    deleteBtn.addEventListener('click', () => {
        if (confirm('Voulez-vous vraiment supprimer ce versement ?')) {
            if (typeText === 'Revenus') {
                TotalRevenus -= prix;
                SoldeNet -= prix;
            } else {
                TotalDepenses -= prix;
                SoldeNet += prix;
            }
            li.remove();

        }



    });
    const modifyBtn = li.querySelector('.btn-warning');
    modifyBtn.addEventListener('click', () => {
        const span = li.querySelector('span');
        const [oldNom, oldMontant] = span.textContent.split('—').map(s => s.trim());

        span.innerHTML = `
      <input type="text" class="form-control form-control-sm w-50 d-inline" value="${oldNom}">
      <input type="number" class="form-control form-control-sm w-25 d-inline ms-2" value="${oldMontant.replace('DH', '').trim()}">
      <button class="btn btn-success btn-sm ms-2">save</button>
    `;

        const saveBtn = span.querySelector('button');
        const newNomInput = span.querySelector('input[type="text"]');
        const newMontantInput = span.querySelector('input[type="number"]');


        saveBtn.addEventListener('click', () => {
            const newNom = newNomInput.value.trim();
            const newMontant = newMontantInput.value.trim();

            if (newNom === '' || newMontant === '') {
                alert('Champs vides interdits.');
                return;
            }

            span.innerHTML = `<strong>${newNom}</strong> — ${newMontant} DH`;
        });
    });

    liste.appendChild(li);

    nomVersement.value = '';
    montant.value = '';
});
