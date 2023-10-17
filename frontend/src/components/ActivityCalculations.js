export const calculateLVPA = (met, weight, duration) => {
    let result = {
        goal: false,
        calories: 0,
        target: 0,
        position: 45,
        percentage: 0,
    };

    const kg_weight = weight * 0.45359237;
    const target_met = 2;
    const target = target_met * kg_weight * (duration/60);
    const real_value = met * kg_weight * (duration/60);
    const position = 345 * (real_value/target);
    const percentage = (real_value/target) * 100;

    if (real_value >= target)
        result.goal = true;

    result.calories = real_value;
    result.target = target;
    result.percentage = percentage;
    
    if (position > 45 && position < 345)
        result.position = position;
    if (position >= 345)
        result.position = 345;

    return result;
}
export const calculateMVPA = (met, weight, duration) => {
    let result = {
        goal: false,
        calories: 0,
        target: 0,
        position: 45,
        percentage: 0,
    };
    
    const kg_weight = weight * 0.45359237;
    const mod_met_value = 3;

    // target moderate activity
    const mod_target = mod_met_value * kg_weight * (duration/60);

    // target vigorous activity
    const vig_met_value = 6;
    const vig_target = vig_met_value * kg_weight * (duration/60);

    const real_value = met * kg_weight * (duration/60);
    const position = 345 * (real_value/mod_target);
    const percentage = (real_value/mod_target) * 100;

    if (position > 45 && position < 345)
        result.position = position;
    if (position >= 345)
        result.position = 345;

    if (real_value >= mod_target)
        result.goal = true;
    
    result.calories = real_value;
    result.target = mod_target;
    result.percentage = percentage;

    return result;
}