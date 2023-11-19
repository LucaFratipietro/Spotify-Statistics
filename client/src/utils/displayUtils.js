//genres to print
//hiding the switch cases here to make the TopMusic code nicer

export function genreToPrint(genre){
  switch(genre){
  case 'rock':
    return 'Rock';
  case 'pop':
    return 'Pop';
  case 'edm':
    return 'Electronic Dance Music';
  case 'latin':
    return 'Latin';
  case 'rap':
    return 'Rap';
  case 'hiphop':
    return 'Hip Hop';
  case 'r&b':
    return 'R&B';
  default:
    return '';
  }
}

export function decadeToPrint(decade){
  if(decade === 'AllYears'){
    return 'of All Time';
  } else{
    return `From the ${decade}s`; 
  }
}