export const calculateSB = (accel_x, accel_y, accel_z, age, barHeight) => {
    let result = {
        hasMetGoal: false, // determine whether the individual has met their goal
        target: [0,0], // of age group
        enmoProgressHeight: 0, // height of progress bar
        enmoValue: 0, // progress of the individual
    };
    
    // set the target value based on the individual's age
    if (age < 18) 
    {
        result.target = [0, 45];
    }
    else if (age >= 18 && age < 50)
    {
        result.target = [0, 45];
    }
    else if (age >= 50) 
    {
        result.target = [0, 30];
    }
    else
    {
        return result;
    }

    // averages for x, y, and z components
    const accelVectorMag = Math.sqrt((accel_x ** 2) + (accel_y ** 2) + (accel_z ** 2));
    
    result.enmoValue = accelVectorMag - 1000;
    // result.enmoValue = 75;
    
    // calculate the height of the progress bar
    if (result.enmoValue <= 0) {
        result.enmoValue = 0;
        result.enmoProgressHeight = barHeight * .01; // max height of the bar
    } 
    else if (result.enmoValue <= result.target[0]) {
        result.enmoProgressHeight = (result.enmoValue / result.target[0]) * barHeight;
    } 
    else if (result.enmoValue >= result.target[0] && result.enmoValue <= result.target[1]) 
    {
        result.enmoProgressHeight = ((result.enmoValue - result.target[0]) / (result.target[1] - result.target[0])) * barHeight;
        result.hasMetGoal = true;
    }
    else if (result.enmoValue > result.target[1]) {
        result.enmoProgressHeight = barHeight; // max height of the bar
        result.hasMetGoal = true;
    } 

    return result;
}

export const calculateLPA = (accel_x, accel_y, accel_z, age, barHeight) => {
    let result = {
        hasMetGoal: false, // determine whether the individual has met their goal
        target: [0, 0], // of age group
        enmoProgressHeight: 0, // height of progress bar
        enmoValue: 0, // progress of the individual
    };
    
    // set the target value based on the individual's age
    if (age < 20) 
    {
        result.target = [45, 200];
    }
    else if (age >= 18 && age < 50)
    {
        result.target = [45,  100]
    }
    else if (age >= 50) 
    {
        result.target = [30, 100]
    }
    else
    {
        return result;
    }

    // averages for x, y, and z components
    const accelVectorMag = Math.sqrt((accel_x ** 2) + (accel_y ** 2) + (accel_z ** 2));
    
    result.enmoValue = accelVectorMag - 1000;
    // result.enmoValue = 75;

    // calculate the height of the progress bar
    if (result.enmoValue <= 0) {
        result.enmoValue = 0;
        result.enmoProgressHeight = barHeight * .01; // max height of the bar
    } 
    else if (result.enmoValue <= result.target[0]) {
        result.enmoProgressHeight = (result.enmoValue / result.target[0]) * barHeight;
    } 
    else if (result.enmoValue >= result.target[0] && result.enmoValue <= result.target[1]) 
    {
        result.enmoProgressHeight = ((result.enmoValue - result.target[0]) / (result.target[1] - result.target[0])) * barHeight;
        result.hasMetGoal = true;
    }
    else if (result.enmoValue > result.target[1]) {
        result.enmoProgressHeight = barHeight; // max height of the bar
        result.hasMetGoal = true;
    } 

    return result;
}

export const calculateMVPA = (accel_x, accel_y, accel_z, age, barHeight) => {
    let result = {
        hasMetGoal: false, // determine whether the individual has met their goal
        target: [0, 0], // of age group
        enmoProgressHeight: 0, // height of progress bar
        enmoValue: 0, // progress of the individual
    };
    
    // set the target value based on the individual's age
    if (age < 18) 
    {
        result.target = [200, 205];
    }
    else if (age >= 18 && age < 50)
    {
        result.target = [200, 205]
    }
    else if (age >= 50) 
    {
        result.target = [100, 105]
    }
    else
    {
        return result;
    }

    // averages for x, y, and z components
    const accelVectorMag = Math.sqrt((accel_x ** 2) + (accel_y ** 2) + (accel_z ** 2));
    
    result.enmoValue = accelVectorMag - 1000;
    // result.enmoValue = 75;

    // calculate the height of the progress bar
    if (result.enmoValue <= 0) {
        result.enmoValue = 0;
        result.enmoProgressHeight = barHeight * .01; // max height of the bar
    } 
    else if (result.enmoValue <= result.target[0]) {
        result.enmoProgressHeight = (result.enmoValue / result.target[0]) * barHeight;
    } 
    else if (result.enmoValue >= result.target[0] && result.enmoValue <= result.target[1]) 
    {
        result.enmoProgressHeight = ((result.enmoValue - result.target[0]) / (result.target[1] - result.target[0])) * barHeight;
        result.hasMetGoal = true;
    }
    else if (result.enmoValue > result.target[1]) {
        result.enmoProgressHeight = barHeight; // max height of the bar
        result.hasMetGoal = true;
    } 

    return result;
}