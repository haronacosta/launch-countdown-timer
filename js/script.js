// Variables
const form = document.querySelector('#launch-form');

const date = document.querySelector('#date');

const time = document.querySelector('#time');

const countdown = document.querySelector('.countdown');

let left_time = {};

// event listeners
document.addEventListener('DOMContentLoaded', () => {
  form.addEventListener('submit', launchCountdown);

  const target = JSON.parse(localStorage.getItem('countdown')) || [];

  if (target.length === 0) {
    document.querySelector('.form__container').classList.remove('d-none');
  } else {
    const [date, time] = target;
    startCountdown(date, time);
  }
});

// functions
function launchCountdown(e) {
  e.preventDefault();

  if (date.value !== '' && time.value !== '') {
    startCountdown(date.value, time.value);
  } else {
    alert('Insert valid date');
  }
}

function getLeftTime(seconds_recived) {
  const seconds_temp = Number(seconds_recived);

  const days = Math.floor(seconds_temp / (3600 * 24));

  const hours = Math.floor((seconds_temp % (3600 * 24)) / 3600);

  const minutes = Math.floor((seconds_temp % 3600) / 60);

  const seconds = Math.floor(seconds_temp % 60);

  return { days, hours, minutes, seconds };
}

function startCountdown(date, time) {
  const target_miliseconds = new Date(`${date} ${time}`).getTime();

  document.querySelector('.header__title').textContent = 'RUNNING';

  setInterval(() => {
    const now_miliseconds = Date.now();

    const rest_miliseconds = target_miliseconds - now_miliseconds;

    const rest_second = parseInt(rest_miliseconds / 1000, 10);

    left_time = getLeftTime(rest_second);

    showCountdown();
  }, 1000);
}

function showCountdown() {
  document.querySelector('.form__container').classList.add('d-none');

  for (const [key, value] of Object.entries(left_time)) {
    const target = document.querySelector('#' + key);

    if (!target) {
      const container = document.createElement('div');

      container.id = key;

      container.classList.add('countdown__container');

      const line = document.createElement('div');

      line.classList.add('countdown__container--line');

      container.appendChild(line);

      const number = document.createElement('div');

      number.classList.add('countdown__container--number');

      number.textContent = value < 10 ? `0${value}` : value;

      container.appendChild(number);

      countdown.appendChild(container);
    } else {
      const number = document.querySelector(
        `#${key} .countdown__container--number`
      );

      number.textContent = value < 10 ? `0${value}` : value;
    }
  }

  localStorage.setItem('countdown', JSON.stringify([date.value, time.value]));
}
