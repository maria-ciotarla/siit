function ascendentArray(input){
    var i = 0, j = 0, aux;
    for ( i = 0;  i<input.length-1; i++){ // take every elememnt from input and compare with all elements from the right side
    for (j = i+1; j <input.length; j++){ 
    if(input[i]>input[j]){ // if the element is greater than one from the right side, switch them 
    aux = input[i];
    input [i]=input[j];
    input [j]=aux;
    }
    }
    }
    for (i=0; i<input.length;i++) // display the array sorted
    console.log(input[i]);
    }