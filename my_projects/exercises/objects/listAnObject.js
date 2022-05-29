function listObject (obj){ //store every keyfrom object in array(keys)
    var keys = []; 
    if (typeof(obj)==='object'){

    for (var key in obj){
        keys.push(key);
    }
    return keys;
}
return [];
}
var obj = {
name: 'maria',
age: 23,
gender: 'f'
}