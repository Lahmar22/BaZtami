const money = document.getElementById('money');
const toggleEye = document.getElementById('toggleEye');
const eyeIcon = document.getElementById('eyeIcon');

const money2 = document.getElementById('money2');
const toggleEye2 = document.getElementById('toggleEye2');
const eyeIcon2 = document.getElementById('eyeIcon2');

let actualMoney =0;
const actualMoney2 = '73673123.45 MAD';
let visible = false;



toggleEye.addEventListener('click', () => {
    visible = !visible;
    money.textContent = visible ? actualMoney : '****';


    money.style.color = visible ? 'green' : 'black';


    eyeIcon.classList.toggle('bi-eye');
    eyeIcon.classList.toggle('bi-eye-slash');
});

toggleEye2.addEventListener('click', () => {
    visible = !visible;
    money2.textContent = visible ? actualMoney2 : '****';


    money2.style.color = visible ? 'green' : 'black';


    eyeIcon2.classList.toggle('bi-eye');
    eyeIcon2.classList.toggle('bi-eye-slash');
});

const nomVersement = document.getElementById('nomVersement');
const montant = document.getElementById('montant');
const addBtn = document.getElementById('addBtn');
const liste = document.getElementById('listeVersements');

addBtn.addEventListener('click', () => {
    const nom = nomVersement.value.trim();
    const prix = parseFloat(montant.value.trim()); 
    const date = new Date();
    const dateStr = date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    if (nom === '' || prix === '') {
        alert("Veuillez remplir les deux champs !");
        return;
    }
    actualMoney += prix;
    
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
        <div class="card1 d-flex gap-5">
            <span><strong>${nom}</strong> | <strong class="text-success">+${prix} DH</strong></span>
            <p >${dateStr}</p>
            
        </div>
        <div class="btn-group">
            <button class="btn btn-warning btn-sm">Modifier</button>
            <button class="btn btn-danger btn-sm">Supprimer</button>
        </div>
    `;

    const deleteBtn = li.querySelector('.btn-danger');
    deleteBtn.addEventListener('click', () => {
        if (confirm('Voulez-vous vraiment supprimer ce versement ?')) {
            li.remove();
        }
        
        actualMoney -= prix;
        
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
