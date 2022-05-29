function BMI(bodyweight,height){
    var result = 0;
    result = bodyweight/(height*height);
    console.log('BMI is ',result);
    if (result < 18.5){
    console.log('The person is in underweight range.');
    }
    else if(result >= 18.5 && result < 25){
    console.log('The person is in normal range.');
    }
    else if(result >= 25 && result < 30){
    console.log('The person is in overweight range.');
    }
    else{
    console.log('The person is in obese range.');
    }
    }