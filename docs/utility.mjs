export function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}
export function print(x) {
  console.log(x);
}

export function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

export function languageToColorOld(language, opacity = 0.2) {
  switch (i) {
    case "german":
      return `rgba(125, 63, 0, ${opacity})`;
    case "english":
      return `rgba(66, 34, 227, ${opacity})`;
    case "french":
      return `rgba(214, 0, 0, ${opacity})`;
    case "spanish":
      return `rgba(250, 198, 65, ${opacity})`;
    case "portuguese":
      return `rgba(7, 112, 44, ${opacity})`;
    case "dutch":
      return `rgba(176, 9, 120, ${opacity})`;
    case "vietnamese":
      return `rgba(247, 83, 54, ${opacity})`;
    case "danish":
      return `rgba(72, 224, 171, ${opacity})`;
    case "finnish":
      return `rgba(12, 12, 82, ${opacity})`;
    case "greek":
      return `rgba(24, 140, 161, ${opacity})`;
    case "italian":
      return `rgba(110, 222, 93, ${opacity})`;
    case "polish":
      return `rgba(224, 72, 72, ${opacity})`;
    case "romanian":
      return `rgba(183, 224, 72, ${opacity})`;
    case "swedish":
      return `rgba(72, 224, 171, ${opacity})`;
    // case "?????":
    //   return `rgba(______, ${opacity})`;
    default:
      return `rgba(145, 145, 145, ${opacity})`;
  }
}

export function languageToColor(language, opacity = 0.2) {
  switch (language.toLowerCase()) {
    case "german":
      return `hsla(20, 30%, 52%, ${opacity})`;
    case "english":
      return `hsla(23, 100%, 64%, ${opacity})`;
    case "french":
      return `hsla(0, 90%, 52%, ${opacity})`;
    case "spanish":
      return `hsla(43, 94%, 52%, ${opacity})`;
    case "portuguese":
      return `hsla(100, 90%, 52%, ${opacity})`;
    case "dutch":
      return `hsla(80, 90%, 52%, ${opacity})`;
    case "vietnamese":
      return `hsla(330, 90%, 52%, ${opacity})`;
    case "danish":
      return `hsla(140, 90%, 52%, ${opacity})`;
    case "finnish":
      return `hsla(290, 90%, 52%, ${opacity})`;
    case "greek":
      return `hsla(180, 90%, 52%, ${opacity})`;
    case "italian":
      return `hsla(200, 90%, 52%, ${opacity})`;
    case "polish":
      return `hsla(220, 90%, 52%, ${opacity})`;
    case "romanian":
      return `hsla(240, 90%, 52%, ${opacity})`;
    case "swedish":
      return `hsla(260, 70%, 0%, ${opacity})`;
    // case "?????":
    //   return `rgba(______, ${opacity})`;
    default:
      return `hsla(217, 0%, 74%, ${opacity})`;
  }
}

export function firstLetterUppercase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
