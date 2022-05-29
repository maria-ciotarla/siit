var x = Math.floor(Math.random() * 2); //generate values for comp and user
var y = Math.floor(Math.random() * 2); //math.random generate numbers between 0 and 1
// math.floor return the whole part of the number
function play(comp, user) {
    var i = 0;
    var result = '';
    var match = ['rock-rock', 'rock-paper', 'rock-scissors', 'paper-paper', 'paper-scissors', 'scissors-scissors'];
    var wins = ['draw', 'paper', 'rock', 'draw', 'scissors', 'draw'];

    switch (comp) {   //switch variable from number to string 
        case 0: comp = 'rock';
            console.log('Computer has ' + comp);
            break;
        case 1: comp = 'paper';
            console.log('Computer has ' + comp);
            break;
        default: comp = 'scissors';
            console.log('Computer has ' + comp);
            break;
    }

    switch (user) {
        case 0: user = 'rock';
            console.log('User has ' + user);
            break;
        case 1: user = 'paper';
            console.log('User has ' + user);
            break;
        default: user = 'scissors';
            console.log('User has ' + user);
            break;
    }

    for (i = 0; i < match.length; i++) {
        if ((match[i] === comp + '-' + user) || (match[i] == user + '-' + comp)) {// concatenate comp+user and reverse and check in array(match)
            result = wins[i];
        }
    }
    if (comp === result) {
        console.log('Computer wins!');
    }
    else if (user === result) {
        console.log('User wins!');
    }
    else {
        console.log('Draw');
    }
}
