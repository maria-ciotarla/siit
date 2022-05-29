function  arrayClone(input){
var clone = []; //define a new array
for (var i = 0; i < input.length; i++){ //take every element from input and add it in clone
clone[i] = input[i];
}
for (var i = 0; i < clone.length; i++) //print every element from clone array 
console.log (clone[i]);
// return input.slice(0);  // alternative solution
}
