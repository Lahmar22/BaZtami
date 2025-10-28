
const money = document.getElementById('money');
const toggleEye = document.getElementById('toggleEye');
const eyeIcon = document.getElementById('eyeIcon');
const actualMoney = '636123.45 MAD';
let visible1 = false; 

toggleEye.addEventListener('click', () => {
    visible1 = !visible1;
    money.textContent = visible1 ? actualMoney : '****';
    money.style.color = visible1 ? 'green' : 'black';

    eyeIcon.classList.toggle('bi-eye');
    eyeIcon.classList.toggle('bi-eye-slash');
});

const money2 = document.getElementById('money2');
const toggleEye2 = document.getElementById('toggleEye2');
const eyeIcon2 = document.getElementById('eyeIcon2');
const actualMoney2 = '98736123.45 MAD';
let visible2 = false; 

toggleEye2.addEventListener('click', () => {
    visible2 = !visible2;
    money2.textContent = visible2 ? actualMoney2 : '****';
    money2.style.color = visible2 ? 'green' : 'black';

    eyeIcon2.classList.toggle('bi-eye');
    eyeIcon2.classList.toggle('bi-eye-slash');
});


document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('#filter-buttons button');
    const allContents = document.querySelectorAll('.activity-content');
    const crediteurContent = document.getElementById('content-crediteur');
    const debiteurContent = document.getElementById('content-debiteur');

    function toggleContent(showCrediteur, showDebiteur) {
        allContents.forEach(content => content.style.display = 'none');
        if (showCrediteur) {
            if (crediteurContent) crediteurContent.style.display = 'block';
        }
        if (showDebiteur) {
            if (debiteurContent) debiteurContent.style.display = 'block';
        }
    }

    
    const showAllButtonId = 'tout'; 

    toggleContent(true, true);
    
    
    const initialActiveButton = document.getElementById(showAllButtonId);
    if (initialActiveButton) {
        initialActiveButton.classList.remove('btn-outline-primary');
        initialActiveButton.classList.add('btn-primary');
    }

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const clickedId = this.id;

            
            buttons.forEach(btn => {
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-outline-primary');
            });
            
           
            if (clickedId !== showAllButtonId) {
                this.classList.remove('btn-outline-primary');
                this.classList.add('btn-primary');
            } else {
                
                this.classList.remove('btn-outline-primary');
                this.classList.add('btn-primary');

                
            }


            
            switch (clickedId) {
                case showAllButtonId:
                    toggleContent(true, true);
                    break;
                case 'crediteur':
                    toggleContent(true, false);
                    break;
                case 'debiteur':
                    toggleContent(false, true);
                    break;
            }
        });
    });
});