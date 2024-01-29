export const calculateSB = (accel_x, accel_y, accel_z, age, barHeight) => {
    let result = {
        goal: false, // determine whether the individual has met their goal
        target: [0,0], // of age group
        enmoProgressHeight: 0, // height of progress bar
        enmoValue: 0, // progress of the individual
    };
    
    // set the target value based on the individual's age
    if (age < 18) 
    {
        result.target = [0, 45];
    }
    else if (age >= 18 || age < 50)
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
        result.goal = true;
    }
    else if (result.enmoValue > result.target[1]) {
        result.enmoProgressHeight = barHeight; // max height of the bar
        result.goal = true;
    } 

    return result;
}

export const calculateLPA = (accel_x, accel_y, accel_z, age, barHeight) => {
    let result = {
        goal: false, // determine whether the individual has met their goal
        target: [0, 0], // of age group
        enmoProgressHeight: 0, // height of progress bar
        enmoValue: 0, // progress of the individual
    };
    
    // set the target value based on the individual's age
    if (age < 20) 
    {
        result.target = [45, 200];
    }
    else if (age >= 20 || age < 50)
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
        result.goal = true;
    }
    else if (result.enmoValue > result.target[1]) {
        result.enmoProgressHeight = barHeight; // max height of the bar
        result.goal = true;
    } 

    return result;
}

export const calculateMVPA = (accel_x, accel_y, accel_z, age, barHeight) => {
    let result = {
        goal: false, // determine whether the individual has met their goal
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
        result.goal = true;
    }
    else if (result.enmoValue > result.target[1]) {
        result.enmoProgressHeight = barHeight; // max height of the bar
        result.goal = true;
    } 

    return result;
}
// export const calculateLVPA = (met, weight, duration) => {
//     let result = {
//         goal: false,
//         calories: 0,
//         target: 0,
//         position: 45,
//         percentage: 0,
//     };

//     const kg_weight = weight * 0.45359237;
//     const target_met = 2;
//     const target = target_met * kg_weight * (duration/60);
//     const real_value = met * kg_weight * (duration/60);
//     const position = 345 * (real_value/target);
//     const percentage = (real_value/target) * 100;

//     if (real_value >= target)
//         result.goal = true;

//     result.calories = real_value;
//     result.target = target;
//     result.percentage = percentage;
    
//     if (position > 45 && position < 345)
//         result.position = position;
//     if (position >= 345)
//         result.position = 345;

//     return result;
// }
// export const calculateMVPA = (met, weight, duration) => {
//     let result = {
//         goal: false,
//         calories: 0,
//         target: 0,
//         position: 45,
//         percentage: 0,
//     };
    
//     const kg_weight = weight * 0.45359237;
//     const mod_met_value = 3;

//     // target moderate activity
//     const mod_target = mod_met_value * kg_weight * (duration/60);

//     // target vigorous activity
//     const vig_met_value = 6;
//     const vig_target = vig_met_value * kg_weight * (duration/60);

//     const real_value = met * kg_weight * (duration/60);
//     const position = 345 * (real_value/mod_target);
//     const percentage = (real_value/mod_target) * 100;

//     if (position > 45 && position < 345)
//         result.position = position;
//     if (position >= 345)
//         result.position = 345;

//     if (real_value >= mod_target)
//         result.goal = true;
    
//     result.calories = real_value;
//     result.target = mod_target;
//     result.percentage = percentage;

//     return result;
// }