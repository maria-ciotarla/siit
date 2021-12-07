function joinArray(array){ //concatenate all elements from array and add + between them
    var i = 0; 
    var newString = '';
    for (i=0; i < array.length; i++){
    if (i == 0)
    newString = array[i];
    else
    newString = newString+'+'+array[i];
    }
    console.log(newString);
    // alternative 
    //console.log(array.toString());
    //console.log(array.join('+'));
    }