"use strict";

const inputEl = document.querySelector(".input-chat");
const btnEl = document.querySelector(".fa-paper-plane");
const cardBodyEl = document.querySelector(".card-body");
let userName;
let hasAskedAboutRain = false;
let hasAskedAboutBand = false;

// Zachęta
document.addEventListener("DOMContentLoaded", function() {
  const greetingMessage = "Cześć! Jak masz na imię?";

  setTimeout(() => {
    cardBodyEl.appendChild(messageEl(greetingMessage, "chat-bot"));
  }, 500);
});

// Zarzadzanie czatem
function manageChat() {
  const userMessage = inputEl.value.trim();

  if (!userMessage) return;

  inputEl.value = "";
  cardBodyEl.appendChild(messageEl(userMessage, "user"));
  scrollToBottom();

  // paramtery
  if (userMessage.startsWith("/")) {
    const response = handleUserQuery(userMessage);
    setTimeout(() => {
      cardBodyEl.appendChild(messageEl(response, "chat-bot"));
      scrollToBottom();
    }, 600);
    return;
  }

  if (!userName) {
    userName = userMessage;
    const greetingResponse = `Miło mi Cię poznać, ${userName}! Czy pada deszcz? (tak/nie)`;
    setTimeout(() => {
      cardBodyEl.appendChild(messageEl(greetingResponse, "chat-bot"));
      scrollToBottom();
    }, 600);
  } else if (!hasAskedAboutRain) {
    if (userMessage.toLowerCase() === "tak") {
      const rainResponse = "Fajnie, może więc postukasz trochę w JS.";
      setTimeout(() => {
        cardBodyEl.appendChild(messageEl(rainResponse, "chat-bot"));
        scrollToBottom();
      }, 600);
    } else if (userMessage.toLowerCase() === "nie") {
      const noRainResponse = "Otwórz okno i zacznij kodować w JS.";
      setTimeout(() => {
        cardBodyEl.appendChild(messageEl(noRainResponse, "chat-bot"));
        scrollToBottom();
      }, 600);
    } else {
      const invalidResponse = "Nie zrozumiałem. Czy pada deszcz? (tak/nie)";
      setTimeout(() => {
        cardBodyEl.appendChild(messageEl(invalidResponse, "chat-bot"));
        scrollToBottom();
      }, 600);
      return;
    }
    hasAskedAboutRain = true;
    setTimeout(() => {
      const bandQuestion = "Jaki zespół muzyczny lubisz?";
      cardBodyEl.appendChild(messageEl(bandQuestion, "chat-bot"));
      scrollToBottom();
    }, 1200);
  } else if (!hasAskedAboutBand) {
    const favoriteBand = userMessage;
    const bandResponse = `Ja też lubię ${favoriteBand}!`;
    setTimeout(() => {
      cardBodyEl.appendChild(messageEl(bandResponse, "chat-bot"));
      scrollToBottom();
    }, 600);
    hasAskedAboutBand = true;
  }
}

// Wyświetlanie wiadomosci
const messageEl = (message, className) => {
  const chatEl = document.createElement("div");
  chatEl.classList.add("chat", `${className}`);
  let chatContent =
    className === "chat-bot"
      ? `<span class="user-icon"><i class="fa fa-robot"></i></span>
        <p>${message}</p>`
      : ` <span class="user-icon"><i class="fa fa-user"></i></span>
        <p>${message}</p>`;
  chatEl.innerHTML = chatContent;
  return chatEl;
};

// funkcja obsługujaca paramtery
function handleUserQuery(query) {
  if (query.startsWith("/version")) {
    return "Wersja oprogramowania: v1.2.3";
  } else if (query.startsWith("/pogoda")) {
    return `Jest 22 stopnie`; //dałoby się to zrobić porządnie przez OpenWeather API ale za dużo kombinowania, do tego chcą kartę bankową
  } else {
    return "Nie znaleziono polecenia.";
  }
}

// Przewijanie do dołu
function scrollToBottom() {
  cardBodyEl.scrollTop = cardBodyEl.scrollHeight;
}

// Nasłuchiwanie kliknięcia przycisku wysyłania wiadomości
btnEl.addEventListener("click", manageChat);

// Nasłuchiwanie naciśnięcia klawisza Enter w polu wejściowym
inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    manageChat();
  }
});
