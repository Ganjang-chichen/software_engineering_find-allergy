
function erasestr(str){
    var temp_str = '';
    temp_str = str.replace(/ /g, '');
    temp_str = temp_str.replace(/\\/g, '');
    temp_str = temp_str.replace(/\//g, '');
    temp_str = temp_str.replace(/!/g, '');
    temp_str = temp_str.replace(/@/g, '');
    temp_str = temp_str.replace(/#/g, '');
    temp_str = temp_str.replace(/\$/g, '');
    temp_str = temp_str.replace(/%/g, '');
    temp_str = temp_str.replace(/\^/g, '');
    temp_str = temp_str.replace(/\&/g, '');
    temp_str = temp_str.replace(/\*/g, '');
    temp_str = temp_str.replace(/\(/g, '');
    temp_str = temp_str.replace(/\)/g, '');
    temp_str = temp_str.replace(/=/g, '');
    temp_str = temp_str.replace(/\+/g, '');
    temp_str = temp_str.replace(/\`/g, '');
    temp_str = temp_str.replace(/\'/g, '');
    temp_str = temp_str.replace(/\"/g, '');
    temp_str = temp_str.replace(/;/g, '');
    temp_str = temp_str.replace(/:/g, '');
    temp_str = temp_str.replace(/\,/g, '');
    temp_str = temp_str.replace(/\./g, '');
    temp_str = temp_str.replace(/\?/g, '');
    temp_str = temp_str.replace(/\</g, '');
    temp_str = temp_str.replace(/\>/g, '');

    return temp_str;
}

function set_query() {
    var sql = 'INSERT INTO temp_food (food_name, food_info, shrimp, oyster, crab, mussel, squid, abalone, Mackerel, shellfish, buckwheat, wheat, soybean, walnut, peanut, pinenuts, poultry, milk, beef, fork, chicken, peach, tomato, sulfurous_acid) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

    return sql;
}

function set_params(obj) {
    
    var food_name = erasestr(obj.food_name);
    var food_info = obj.food_info;
    var checkbox_shrimp;
    if(obj.checkbox_shrimp === 'on') checkbox_shrimp = 1;
    else checkbox_shrimp = 0;

    var checkbox_oyster;
    if(obj.checkbox_oyster === 'on') checkbox_oyster = 1;
    else checkbox_oyster = 0;

    var checkbox_crab;
    if(obj.checkbox_crab === 'on') checkbox_crab = 1;
    else checkbox_crab = 0;

    var checkbox_mussel;
    if(obj.checkbox_mussel === 'on') checkbox_mussel = 1;
    else checkbox_mussel = 0;

    var checkbox_squid;
    if(obj.checkbox_squid === 'on') checkbox_squid = 1;
    else checkbox_squid = 0;

    var checkbox_abalone;
    if(obj.checkbox_abalone === 'on') checkbox_abalone = 1;
    else checkbox_abalone = 0;

    var checkbox_Mackerel;
    if(obj.checkbox_Mackerel === 'on') checkbox_Mackerel = 1;
    else checkbox_Mackerel = 0;

    var checkbox_shellfish;
    if(obj.checkbox_shellfish === 'on') checkbox_shellfish = 1;
    else checkbox_shellfish = 0;

    var checkbox_buckwheat;
    if(obj.checkbox_buckwheat === 'on') checkbox_buckwheat = 1;
    else checkbox_buckwheat = 0;

    var checkbox_wheat;
    if(obj.checkbox_wheat === 'on') checkbox_wheat = 1;
    else checkbox_wheat = 0;

    var checkbox_soybean;
    if(obj.checkbox_soybean === 'on') checkbox_soybean = 1;
    else checkbox_soybean = 0;

    var checkbox_walnut;
    if(obj.checkbox_walnut === 'on') checkbox_walnut = 1;
    else checkbox_walnut = 0;

    var checkbox_peanut;
    if(obj.checkbox_peanut === 'on') checkbox_peanut = 1;
    else checkbox_peanut = 0;

    var checkbox_pinenuts;
    if(obj.checkbox_pinenuts === 'on') checkbox_pinenuts = 1;
    else checkbox_pinenuts = 0;

    var checkbox_poultry;
    if(obj.checkbox_poultry === 'on') checkbox_poultry = 1;
    else checkbox_poultry = 0;

    var checkbox_milk;
    if(obj.checkbox_milk === 'on') checkbox_milk = 1;
    else checkbox_milk = 0;

    var checkbox_beef;
    if(obj.checkbox_beef === 'on') checkbox_beef = 1;
    else checkbox_beef = 0;

    var checkbox_fork;
    if(obj.checkbox_fork === 'on') checkbox_fork = 1;
    else checkbox_fork = 0;

    var checkbox_chicken;
    if(obj.checkbox_chicken === 'on') checkbox_chicken = 1;
    else checkbox_chicken = 0;

    var checkbox_peach;
    if(obj.checkbox_peach === 'on') checkbox_peach = 1;
    else checkbox_peach = 0;

    var checkbox_tomato;
    if(obj.checkbox_tomato === 'on') checkbox_tomato = 1;
    else checkbox_tomato = 0;

    var checkbox_sulfuros_acid;
    if(obj.checkbox_sulfuros_acid === 'on') checkbox_sulfuros_acid = 1;
    else checkbox_sulfuros_acid = 0;
    

    var params = [ food_name, food_info,
        checkbox_shrimp, checkbox_oyster,
        checkbox_crab, checkbox_mussel,
        checkbox_squid, checkbox_abalone,
        checkbox_Mackerel, checkbox_shellfish,
        checkbox_buckwheat, checkbox_wheat,
        checkbox_soybean, checkbox_walnut,
        checkbox_peanut, checkbox_pinenuts,
        checkbox_poultry, checkbox_milk,
        checkbox_beef, checkbox_fork,
        checkbox_chicken, checkbox_peach,
        checkbox_tomato, checkbox_sulfuros_acid];

    return params;
}


function modify_table(obj, id) {
    
    var food_name = obj.food_name;
    var food_info = obj.food_info;
    var shrimp = obj.shrimp;
    var oyster = obj.oyster;
    var crab = obj.crab;
    var mussel = obj.mussel;
    var squid = obj.squid;
    var abalone = obj.abalone;
    var Mackerel = obj.Mackerel;
    var shellfish = obj.shellfish;
    var buckwheat = obj.buckwheat;
    var wheat = obj.wheat;
    var soybean = obj.soybean;
    var walnut = obj.walnut;
    var peanut = obj.peanut;
    var pinenuts = obj.pinenuts;
    var poultry = obj.poultry;
    var milk = obj.milk;
    var beef = obj.beef;
    var fork = obj.fork;
    var chicken = obj.chicken;
    var peach = obj.peach;
    var tomato = obj.tomato;
    var sulfurous_acid = obj.sulfurous_acid;

    var sql = `UPDATE food 
                SET food_info = ?,
                    shrimp = ?,
                    oyster = ?,
                    crab = ?,
                    mussel = ?,
                    squid = ?,
                    abalone = ?,
                    Mackerel = ?,
                    shellfish = ?,
                    buckwheat = ?,
                    wheat = ?,
                    soybean = ?,
                    walnut = ?,
                    peanut = ?,
                    pinenuts = ?,
                    poultry = ?,
                    milk = ?,
                    beef = ?,
                    fork = ?,
                    chicken = ?,
                    peach = ?,
                    tomato = ?,
                    sulfurous_acid = ? 
                WHERE id = ?`;

    var params = [food_info, shrimp, oyster, crab, mussel,
                    squid, abalone, Mackerel, shellfish, buckwheat,
                    wheat, soybean, walnut, peanut, pinenuts,
                    poultry, milk, beef, fork, chicken, 
                    peach, tomato, sulfurous_acid, id];

    return {sql : sql,
            params : params};
}

function insert_table() {
    var sql = 'INSERT INTO food (food_name, food_info, shrimp, oyster, crab, mussel, squid, abalone, Mackerel, shellfish, buckwheat, wheat, soybean, walnut, peanut, pinenuts, poultry, milk, beef, fork, chicken, peach, tomato, sulfurous_acid) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

    return sql;
}

function insert_params(obj) {
    
    var food_name = obj.food_name;
    var food_info = obj.food_info;
    var shrimp = obj.shrimp;
    var oyster = obj.oyster;
    var crab = obj.crab;
    var mussel = obj.mussel;
    var squid = obj.squid;
    var abalone = obj.abalone;
    var Mackerel = obj.Mackerel;
    var shellfish = obj.shellfish;
    var buckwheat = obj.buckwheat;
    var wheat = obj.wheat;
    var soybean = obj.soybean;
    var walnut = obj.walnut;
    var peanut = obj.peanut;
    var pinenuts = obj.pinenuts;
    var poultry = obj.poultry;
    var milk = obj.milk;
    var beef = obj.beef;
    var fork = obj.fork;
    var chicken = obj.chicken;
    var peach = obj.peach;
    var tomato = obj.tomato;
    var sulfurous_acid = obj.sulfurous_acid;

    var params = [food_name, food_info, shrimp, oyster, crab, mussel,
        squid, abalone, Mackerel, shellfish, buckwheat,
        wheat, soybean, walnut, peanut, pinenuts,
        poultry, milk, beef, fork, chicken, 
        peach, tomato, sulfurous_acid];

    return params;
}

module.exports.get_query = set_query;
module.exports.get_params = set_params;
module.exports.modify_query = modify_table;
module.exports.insert_query = insert_table;
module.exports.insert_params = insert_params;
