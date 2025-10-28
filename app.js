const money = document.getElementById('money');
const toggleEye = document.getElementById('toggleEye');
const eyeIcon = document.getElementById('eyeIcon');

const money2 = document.getElementById('money2');
const toggleEye2 = document.getElementById('toggleEye2');
const eyeIcon2 = document.getElementById('eyeIcon2');

const actualMoney = '636123.45 MAD';
const actualMoney2 = '98736123.45 MAD';
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
