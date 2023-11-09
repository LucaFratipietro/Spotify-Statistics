//genres to print
//hiding the switch cases here to make the TopMusic code nicer

export function genreToPrint(genre){
  switch(genre){
  case 'rock':
    return 'Rock';
    break;
  case 'pop':
    return 'Pop';
    break;
  case 'edm':
    return 'Electronic Dance Music';
    break;
  case 'latin':
    return 'Latin';
    break;
  case 'rap':
    return 'Rap';
    break;
  case 'hiphop':
    return 'Hip Hop';
    break;
  case 'r&b':
    return 'R&B';
    break;
  default:
    return '';
  }
}