// get yield for 1 plant
const get_yield_for_plant = (crop, environmentalFactor) => {
    //check if environmental factors is not empty
    if(environmentalFactor !== undefined){
        const sunFactorPercentage = crop.factors.sun[environmentalFactor.sun] / 100 + 1;
        const windFactorPercentage = crop.factors.wind[environmentalFactor.wind] / 100 + 1;
        const windInFactor = "wind" in environmentalFactor;
        const sunInFactor = "sun" in environmentalFactor;

        // set stage for diferent environmetal possibilitys
        if((sunInFactor) && (windInFactor === false)){
            return crop.yield * sunFactorPercentage;
        } else if((sunInFactor === false) && (windInFactor)){
            return crop.yield * windFactorPercentage;
        } else if((sunInFactor === false) && (windInFactor === false)){
            return crop.yield;
        } else {
            return (crop.yield * sunFactorPercentage) * windFactorPercentage;
        }
    } else {
        return crop.yield;
    }
}
// get yield for entire crop
const get_yield_for_crop = (input, environmentalFactor) => {
    return input.num_crops * get_yield_for_plant(input.crop, environmentalFactor);
}
// get total yield for multiple crops
const get_total_yield = (allCrops, environmentalFactor) => {
    return allCrops.crops.reduce((total, crops) => {
        return total + get_yield_for_crop(crops, environmentalFactor);
    },0)
}
// return crop object for future reference
const get_crop = (crop) => {
    return crop;
}
// get all costs for an entire crop
const get_costs_for_crop = (input) => {
    const plantCost = get_crop(input.crop).costs;
    return input.num_crops * plantCost;
}
// get revenue for an entire crop
const get_revenue_for_crop = (input, environmentalFactor) => {
    const plantSalePrice = get_crop(input.crop).sale_price;
    const plantYield = get_yield_for_crop(input, environmentalFactor);
    return plantYield * plantSalePrice;
}
// get profit for an entire crop
const get_profit_for_crop = (input, environmentalFactor) => {
    const cropRevenue = get_revenue_for_crop(input, environmentalFactor);
    const cropCosts = get_costs_for_crop(input, environmentalFactor);
    return cropRevenue - cropCosts;
}
// get a total profit for multieple crops
const get_total_profit = (allCrops, environmentalFactor) => {
    return allCrops.crops.reduce((total, singleCrop) => {
        const profit = get_profit_for_crop(singleCrop, environmentalFactor);
        return total + profit;
    },0)
}

module.exports = {
    get_yield_for_plant,
    get_yield_for_crop,
    get_total_yield,
    get_costs_for_crop,
    get_revenue_for_crop,
    get_profit_for_crop,
    get_total_profit,
};