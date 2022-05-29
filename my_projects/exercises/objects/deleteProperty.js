function deleteProperty (obj){

    if (typeof(obj)==='object'){
    console.log(obj);
    delete obj.rollno;
    console.log(obj);
}
}
var student = {
name : "David Rayy",
sclass : "VI",
rollno : 12 };