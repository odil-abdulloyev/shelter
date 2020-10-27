const quotes = [
  {
    "text": "Genius is one percent inspiration and ninety-nine percent perspiration.",
    "author": "Thomas Edison"
  },
  {
    "text": "You can observe a lot just by watching.",
    "author": "Yogi Berra"
  },
  {
    "text": "A house divided against itself cannot stand.",
    "author": "Abraham Lincoln"
  },
  {
    "text": "Difficulties increase the nearer we get to the goal.",
    "author": "Johann Wolfgang von Goethe"
  },
  {
    "text": "Fate is in your hands and no one elses",
    "author": "Byron Pulsifer"
  },
  {
    "text": "Be the chief but never the lord.",
    "author": "Lao Tzu"
  },
  {
    "text": "Nothing happens unless first we dream.",
    "author": "Carl Sandburg"
  },
  {
    "text": "Well begun is half done.",
    "author": "Aristotle"
  },
  {
    "text": "Life is a learning experience, only if you learn.",
    "author": "Yogi Berra"
  },
  {
    "text": "Self-complacency is fatal to progress.",
    "author": "Margaret Sangster"
  },
  {
    "text": "Peace comes from within. Do not seek it without.",
    "author": "Buddha"
  },
  {
    "text": "What you give is what you get.",
    "author": "Byron Pulsifer"
  },
  {
    "text": "We can only learn to love by loving.",
    "author": "Iris Murdoch"
  },
  {
    "text": "Life is change. Growth is optional. Choose wisely.",
    "author": "Karen Clark"
  },
  {
    "text": "You'll see it when you believe it.",
    "author": "Wayne Dyer"
  },
  {
    "text": "To lead people walk behind them.",
    "author": "Lao Tzu"
  },
  {
    "text": "Having nothing, nothing can he lose.",
    "author": "William Shakespeare"
  },
  {
    "text": "Trouble is only opportunity in work clothes.",
    "author": "Henry J. Kaiser"
  },
  {
    "text": "A rolling stone gathers no moss.",
    "author": "Publilius Syrus"
  },
  {
    "text": "Ideas are the beginning points of all fortunes.",
    "author": "Napoleon Hill"
  }
];

// DOM Elements
const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  button = document.querySelector('.change-bg'),
  changeQuoteButton = document.querySelector('.change-quote'),
  weatherIcon = document.querySelector('.weather-icon'),
  temperature = document.querySelector('.temperature'),
  weatherDescription = document.querySelector('.weather-description'),
  windSpeed = document.querySelector('.wind-speed'),
  humidity = document.querySelector('.humidity'),
  city = document.querySelector('.city');

// Images names generator
function generate(path, count = 20) {
  let arr = [];
  for (let i = 1; i <= count; ++i) {
    arr.push(`${path}/${i < 10 ? '0' : ''}${i}.jpg`);
  }
  return arr;
}

// Images arrays
const morningImages = generate('assets/images/morning');
const afternoonImages = generate('assets/images/day');
const eveningImages = generate('assets/images/evening');
const nightImages = generate('assets/images/night');
const allImages = [...morningImages, ...afternoonImages, ...eveningImages, ...nightImages];


// Show Time
function showTime() {
  let today = new Date(),
    month = today.getMonth(),
    date = today.getDate(),
    day = today.getDay(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // 24hr Format
  hour = hour % 24 || 24;

  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} <div class="date">${days[day]}, ${months[month]} ${date}</div>`;

  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  // Night
  if (hour < 6) {
    greeting.textContent = 'Good night, ';
    document.body.style.backgroundImage = `url('${getElement(nightImages)}')`;
    document.body.style.color = 'white';
  } else if (hour < 12) {
    // Morning
    document.body.style.backgroundImage = `url('${getElement(morningImages)}')`;
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18) {
    // Afternoon
    document.body.style.backgroundImage = `url('${getElement(afternoonImages)}')`;
    greeting.textContent = 'Good Afternoon, ';
  } else if (hour < 24) {
    // Evening
    document.body.style.backgroundImage = `url('${getElement(eveningImages)}')`;
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  }
}
async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=9168cafbd443ba406f3f35498b338150&units=metric`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `Temperature: ${data.main.temp.toFixed(0)}°C`;
    weatherDescription.textContent = `Description: ${data.weather[0].description}`;
    windSpeed.textContent = `Wind speed: ${data.wind.speed}m/s`;
    humidity.textContent = `Air humidity: ${data.main.humidity}%`;
  } catch (ex) {
    city.value = 'Something went wrong :(';
    temperature.textContent = `Temperature: unknown`;
    weatherDescription.textContent = `Description: unknown`;
    windSpeed.textContent = `Wind speed: unknown`;
    humidity.textContent = `Air humidity: unknown`;
  }


}

// Set City
function setCity(event) {
  if (event.code === 'Enter') {
    getWeather();
    city.blur();
  }
}

// Set Name
function setName(event) {
  if (event.code === 'Enter') {
    if (event.target.value !== '') {
      localStorage.setItem('name', event.target.value);
    }
    name.blur();
  }
}

// Set Focus
function setFocus(event) {
  if (event.code === 'Enter') {
    if (event.target.value !== '') {
      localStorage.setItem('focus', event.target.value);
    }
    name.blur();
  }
}

// Get random element of an array
function getElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Update background
function update() {
  let now = new Date();
  if (now.getMinutes() === 0 && now.getSeconds() === 1) {
    if (now.getHours() < 6) {
      document.body.style.backgroundImage = `url('${getElement(nightImages)}')`;
      greeting.textContent = 'Good night, ';
      document.body.style.color = 'white';
    } else if (now.getHours() < 12) {
      document.body.style.backgroundImage = `url('${getElement(morningImages)}')`;
      greeting.textContent = 'Good Morning, ';
    } else if (now.getHours() < 18) {
      document.body.style.backgroundImage = `url('${getElement(afternoonImages)}')`;
      greeting.textContent = 'Good Afternoon, ';
    } else if (now.getHours() < 24) {
      document.body.style.backgroundImage = `url('${getElement(eveningImages)}')`;
      greeting.textContent = 'Good Evening, ';
      document.body.style.color = 'white';
    }
  }
}
setInterval(update, 1000);

function updateQuote() {
  const quote = document.querySelector('blockquote');
  const caption = document.querySelector('figcaption');
  const data = quotes[Math.floor(Math.random() * quotes.length)];

  quote.textContent = `"${data.text}"`;
  caption.textContent = data.author;
}

// Events
document.addEventListener('DOMContentLoaded', getWeather);
changeQuoteButton.addEventListener('click', updateQuote);
name.addEventListener('keypress', setName);
focus.addEventListener('keypress', setFocus);
city.addEventListener('keypress', setCity);

document.querySelectorAll('input[type="text"]').forEach(input => input.addEventListener('click', function () {
  localStorage.setItem(`${this.className}`, `${this.value}`);
  this.value = '';
}));

document.querySelectorAll('input[type="text"]').forEach(input => input.addEventListener('blur', function () {
  if (this.value === '') {
    this.value = localStorage.getItem(`${this.className}`);
  }
}));


function getStartPosition() {
  hour = new Date().getHours();
  if (hour < 6) {
    return 60;
  } else if (hour < 12) {
    return 0;
  } else if (hour < 18) {
    return 20;
  } else if (hour < 24) {
    return 40;
  }
}

let position = getStartPosition();
button.addEventListener('click', function () {
  document.body.style.backgroundImage = `url(${allImages[position % allImages.length]})`;
  if (position % allImages.length >= 40) {
    document.body.style.color = 'white';
  } else {
    document.body.style.color = 'black';
  }
  ++position;
});

// Run
if (localStorage.getItem('name') !== '') {
  name.value = localStorage.getItem('name');
}
if (localStorage.getItem('focus') !== '') {
  focus.value = localStorage.getItem('focus');
}

showTime();
setBgGreet();
updateQuote();


