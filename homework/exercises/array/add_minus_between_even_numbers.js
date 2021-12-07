function addMinusToNumber (number){
    var string = number.toString (); //convert the number in string
    var result = string[0]; //extract first caracter and add it in result
    for (var i = 1; i<string.length;i++){ //take every character from string 
    var actual = parseInt(string[i],10); // convert string to number 
    var last = parseInt(string[i-1],10); //convert string to number
    if (actual%2 == 0 && last%2 == 0) //check if all numbers are even-par
    result = result + '-' + string [i];
    else result = result + string [i];
    }
    console.log (result);
    }