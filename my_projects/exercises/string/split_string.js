function splitString(input){
    var i = 0, j = 0, v=[];
    for (i = 0; i<input.length;i++){
    
    if (input[i] != ' '){
    v[j] = v[j] + input[i];
    }
    
    else{
    j=j+1;
    }
    
    }
    for (j = 0;j<v.length;j++){
    console.log(v[j]);
    }
    
    }

    /* string_to_array = function (str) {
     return str.trim().split(" ");
}; */