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

export function languageToColor(language, opacity = 0.2) {
  switch (language) {
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
    case "_______":
      return `rgba(______, ${opacity})`;
    case "_______":
      return `rgba(______, ${opacity})`;
    case "_______":
      return `rgba(______, ${opacity})`;
    case "_______":
      return `rgba(______, ${opacity})`;
    case "_______":
      return `rgba(______, ${opacity})`;
    case "_______":
      return `rgba(______, ${opacity})`;
    case "_______":
      return `rgba(______, ${opacity})`;
    case "_______":
      return `rgba(______, ${opacity})`;
    case "_______":
      return `rgba(______, ${opacity})`;
    default:
      return `rgba(255, 99, 132, ${opacity})`;
  }
}
