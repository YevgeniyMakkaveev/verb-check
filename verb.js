const conjugate = (pronoun, originalVerb) => {
  const testPronoun =
    pronoun.toLowerCase() === "она" ? "он" : pronoun.toLowerCase();
  //Так можно не делать в каждом случае повтор единственного числа 3 лице
  const verbLower = originalVerb.toLowerCase();
  const verbEnd = verbLower.slice(-3, verbLower.length);
  const pronounTest = ["я", "мы", "ты", "вы", "он", "они"];
  let wrongInput = pronounTest.includes(testPronoun) ? false : true;
  if (wrongInput) return "Ошибка, неверное местоимение";
  const exep1 = [
    "смотреть",
    "видеть",
    "ненавидеть",
    "терпеть",
    "обидеть",
    "вертеть",
    "зависеть",
    "дышать",
    "слышать",
    "держать",
    "гнать",
  ];

  //Тут и далее на случай приставок перед словом проверям исключения не инклудом, а регулярным выражением
  const exep1Reg = new RegExp(exep1.join("|") + "$");

  //Проверка на разноспрягаемые глаголы
  let needSecond = false;
  const run = /бежать$/;
  const want = /хотеть$/;

  const plural = ["мы", "вы", "они"];
  if (
    (run.test(verbLower) && testPronoun !== "они" && testPronoun !== "я") ||
    (want.test(verbLower) && plural.includes(testPronoun)) ||
    exep1Reg.test(verbLower)
  ) {
    needSecond = true;
  }

  const exep2 = ["брить", "стелить"];
  const exep2Reg = new RegExp(exep2.join("|") + "$");
  const hardСonsonant = ["ж", "ш", "ч", "щ", "ц"];
  let verb;

  //Проверка на изменение букв в зависимости от склонения. Не смог найти нужных правил которые удобно забить в алгоритм, поэтому тут работаю по исключениям которые нашел
  const see = /видеть$/;
  if (run.test(verbLower) && (testPronoun === "я" || testPronoun === "они")) {
    verb = originalVerb.slice(0, -4) + "г";
  } else if (
    want.test(verbLower) &&
    (testPronoun === "я" || testPronoun === "ты")
  ) {
    verb = originalVerb.slice(0, -4) + "ч";
  } else if (see.test(verbLower) && testPronoun === "я") {
    verb = originalVerb.slice(0, -4) + "ж";
  } else {
    verb = originalVerb.slice(0, -3);
  }

  //Функция для выбора окончания для глаголов с особой системой окончаний
  const giveCheck = /дать$/;
  const eatCheck = /есть$/;
  const give = new Map([
    ["я", "ам"],
    ["ты", "ашь"],
    ["он", "аст"],
    ["мы", "адим"],
    ["вы", "адите"],
    ["они", "адут"],
  ]);

  const eat = new Map([
    ["я", "м"],
    ["ты", "шь"],
    ["он", "ст"],
    ["мы", "дим"],
    ["вы", "дите"],
    ["они", "дят"],
  ]);

  //И некоторые стандартные окончания, которые не меняются
  const firstConjugate = new Map([
    ["ты", "ешь"],
    ["мы", "eм"],
    ["он", "ет"],
    ["вы", "ете"],
  ]);
  const secondConjugate = new Map([
    ["ты", "ишь"],
    ["мы", "им"],
    ["он", "ит"],
    ["вы", "ите"],
  ]);

  if (giveCheck.test(verbLower)) {
    verb += give.get(testPronoun);
  } else if (eatCheck.test(verbLower)) {
    verb += eat.get(testPronoun);
  }
  //Проверка не попавших в особые случаи слов на второе спряжение
  else if (
    (verbEnd === "ить" && exep2Reg.test(verbLower) === false) ||
    needSecond
  ) {
    switch (testPronoun) {
      case "я":
        if (hardСonsonant.includes(verb[verb.length - 1])) {
          verb += "у";
        } else verb += "ю";
        break;
      case "они":
        if (hardСonsonant.includes(verb[verb.length - 1])) {
          verb = verb + "aт";
        } else verb = verb + "ят";
        break;
      default:
        verb += secondConjugate.get(testPronoun);
    }
  } else {
    switch (testPronoun) {
      case "я":
        if (
          hardСonsonant.includes(verb[verb.length - 1]) ||
          verbEnd[0] !== "е"
        ) {
          verb += "у";
        } else verb += "ю";
        break;
      case "они":
        if (
          hardСonsonant.includes(verb[verb.length - 1]) ||
          verbEnd[0] !== "е"
        ) {
          verb += "ут";
        } else verb += "ют";
        break;
      default:
        verb += firstConjugate.get(testPronoun);
    }
  }
  return `${pronoun} ${verb}`;
};
