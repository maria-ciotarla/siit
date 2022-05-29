function sizeObj(obj) {
    var nr = 0;
    if (typeof(obj)==='object'){
    for (var i in obj){  //search every key in object 
    if (obj.hasOwnProperty(i))
    nr++;
    }
    return nr;
}
}
var student = {
name : "David Rayy",
sclass : "VI",
rollno : 12 };
