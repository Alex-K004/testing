import '../styles/style.css';
import './validator.js';
import './dom.js';
import './cards.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('Credit Card Validator виджет загружен');

  const currentYear = new Date().getFullYear();
  const yearElement = document.querySelector('footer p');
  if (yearElement) {
    yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
  }
});
