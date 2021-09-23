const conjugate = (pronoun, originalVerb) => {
  const testPronoun =
    pronoun.toLowerCase() === "она" ? "он" : pronoun.toLowerCase();
  //Не делать в каждом случае повтор единственного числа 3 лице
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
  const exep1Reg = new RegExp(exep1.join("|") + "$");
  //Тут и далее на случай приставок перед словом проверям исключения не инклудом, а регулярным выражением
  let needSecond = false;
  const run = /бежать$/;
  const want = /хотеть$/;
  //Проверка на разноспрягаемые глаголы
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
  if (run.test(verbLower) && (testPronoun === "я" || testPronoun === "они")) {
    verb = originalVerb.slice(0, -4) + "г";
  } else {
    verb = originalVerb.slice(0, -3);
  }
  const giveCheck = /дать$/;
  const eatCheck = /есть$/;
  //окончания для глаголов с особой системой окончаний и их производных
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

  if (giveCheck.test(verbLower)) {
    verb += give.get(testPronoun);
  } else if (eatCheck.test(verbLower)) {
    verb += eat.get(testPronoun);
  }
  //Проверка на второе спряжение, она проще чем на первое.
  else if (
    (verbEnd === "ить" && exep2Reg.test(verbLower) === false) ||
    needSecond
  ) {
    switch (testPronoun) {
      case "я":
        if (hardСonsonant.includes(verb[verb.length - 1])) {
          verb = verb + "у";
        } else verb = verb + "ю";
        break;
      case "он":
        verb = verb + "ит";
        break;
      case "они":
        if (hardСonsonant.includes(verb[verb.length - 1])) {
          verb = verb + "aт";
        } else verb = verb + "ят";
        break;
      case "ты":
        verb = verb + "ишь";
        break;
      case "вы":
        verb = verb + "ите";
        break;
      default:
    }
  } else {
    switch (testPronoun) {
      case "я":
        if (
          hardСonsonant.includes(verb[verb.length - 1]) ||
          verbEnd[0] !== "е"
        ) {
          verb = verb + "у";
        } else verb = verb + "ю";
        break;
      case "он":
        verb = verb + "ет";
        break;
      case "они":
        if (
          hardСonsonant.includes(verb[verb.length - 1]) ||
          verbEnd[0] !== "е"
        ) {
          verb = verb + "ут";
        } else verb = verb + "ют";
        break;
      case "ты":
        verb = verb + "ешь";
        break;
      case "вы":
        verb = verb + "ете";
        break;
      default:
    }
  }
  //

  return `${pronoun} ${verb}`;
};
