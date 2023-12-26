const wrapper = document.querySelector(".wrapper"),
  inputField = document.querySelector(".inp input"),
  textEl = document.querySelector(".text"),
  closeBtn = document.querySelector(".close"),
  content = document.querySelector(".content"),
  wordEl = document.querySelector(".word h3"),
  adjectifEl = document.querySelector(".word span"),
  meaningEl = document.querySelector(".meaning p"),
  exampleEl = document.querySelector(".example p"),
  synonimeEL = document.querySelector(".synonyme"),
  audioIcon = document.querySelector(".volume");

let timer;
let audio = new Audio();

const getData = (result, word) => {
  console.log(result);
  if (result.title) {
    textEl.style.color = "red";
    textEl.innerHTML = `Sorry, we couldn't find definitions for the word <span>"${word}"</span>, Please try a gain`;
    wrapper.classList.remove("active");
  } else {
    wrapper.classList.add("active");

    wordEl.innerText = result[0].word;
    adjectifEl.innerText = `${result[0].meanings[0].partOfSpeech} / ${result[0].word}`;
    meaningEl.innerText = `${result[0].meanings[0].definitions[0].definition}`;
    if (result[0].meanings[0].definitions[0].example) {
      exampleEl.innerText = result[0].meanings[0].definitions[0].example;
      exampleEl.parentElement.style.display = "block";
    } else {
      exampleEl.parentElement.style.display = "none";
    }

    // console.log(result[0].meanings[0].definitions[0].synonims);
    if (result[0].meanings[0].definitions[0].synonims == undefined) {
      synonimeEL.parentElement.style.display = "none";
    } else {
      synonimeEL.innerHTML = "";
      synonimeEL.parentElement.style.display = "block";
      for (let i = 0; i < 5; i++) {
        let tag = `<span>${result[0].meanings[3].synonyms[i]}</span>, `;
        synonimeEL.insertAdjacentHTML("beforeend", tag);
      }
    }

    audio.src =
      result[0].phonetics[
        Math.floor(Math.random() * result[0].phonetics.length)
      ].audio;
    console.log(audio);
  }
};

const fetchApi = (word) => {
  console.log(word);
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  fetch(url)
    .then((res) => res.json())
    .then((result) => getData(result, word));
};

inputField.addEventListener("keyup", (e) => {
  inputField.value
    ? (closeBtn.style.display = "block")
    : (closeBtn.style.display = "none");

  if (e.key == "Enter" && inputField.value) {
    textEl.style.color = "#000";
    textEl.innerText = `Searching a Translating off Word "${inputField.value}"`;
    timer = setTimeout(fetchApi(inputField.value), 1000);
  }
});

audioIcon.addEventListener("click", () => {
  audio.play();
});

closeBtn.addEventListener("click", () => {
  inputField.value = "";
  inputField.focus();
  wrapper.classList.remove("active");
  textEl.innerText = `type a word and press enter to get meaning example,
            pronunciations, and synonimos of that typed word.`;
  textEl.style.color = "#000";
});
