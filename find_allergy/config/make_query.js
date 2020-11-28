

function set_query(sql_table, value) {
    var query;

    if(sql_table === 'food') {
        query = `SELECT * FROM ${sql_table} 
        WHERE LOWER(${sql_table}_name) LIKE (LOWER('${value}%'))
        OR LOWER(${sql_table}_name) LIKE(LOWER('_${value}'))`;
    }else if(sql_table === 'allergy') {
        query = `SELECT * 
        FROM food 
        WHERE (shrimp = 1
                AND '새우' IN (SELECT allergy_name
                                FROM allergy
                                WHERE LOWER(allergy_name) LIKE (LOWER('%${value}%'))))
        OR (oyster = 1
                AND '굴' IN (SELECT allergy_name
                                FROM allergy
                                WHERE LOWER(allergy_name) LIKE (LOWER('%${value}%'))))
        OR (crab = 1
                AND '게' IN (SELECT allergy_name
                                FROM allergy
                                WHERE LOWER(allergy_name) LIKE (LOWER('%${value}%'))))
        OR (mussel = 1
                AND '홍합' IN (SELECT allergy_name
                                FROM allergy
                                WHERE LOWER(allergy_name) LIKE (LOWER('%${value}%'))))
        OR (squid = 1
                AND '오징어' IN (SELECT allergy_name
                                FROM allergy
                                WHERE LOWER(allergy_name) LIKE (LOWER('%${value}%'))))
        OR (abalone = 1
                AND '전복' IN (SELECT allergy_name
                                FROM allergy
                                WHERE LOWER(allergy_name) LIKE (LOWER('%${value}%'))))
        OR (Mackerel = 1
                AND '고등어' IN (SELECT allergy_name
                                FROM allergy
                                WHERE LOWER(allergy_name) LIKE (LOWER('%${value}%'))))
        OR (shellfish = 1
                AND '조개류' IN (SELECT allergy_name
                                FROM allergy
                                WHERE LOWER(allergy_name) LIKE (LOWER('%${value}%'))))
        OR (buckwheat = 1
                AND '메밀' IN (SELECT allergy_name
                                FROM allergy
                                WHERE LOWER(allergy_name) LIKE (LOWER('%${value}%'))))
        OR (wheat = 1
                AND '밀' IN (SELECT allergy_name
                                FROM allergy
                                WHERE LOWER(allergy_name) LIKE (LOWER('%${value}%'))))
        OR (soybean = 1
                AND '대두' IN (SELECT allergy_name
                                FROM allergy
                                WHERE LOWER(allergy_name) LIKE (LOWER('%${value}%'))))
        OR (walnut = 1
                AND '호두' IN (SELECT allergy_name
                                FROM allergy
                                WHERE LOWER(allergy_name) LIKE (LOWER('%${value}%'))))
        OR (peanut = 1
                AND '땅콩' IN (SELECT allergy_name
                                FROM allergy
                                WHERE LOWER(allergy_name) LIKE (LOWER('%${value}%'))))
        OR (pinenuts = 1
                AND '잣' IN (SELECT allergy_name
                                FROM allergy
                                WHERE LOWER(allergy_name) LIKE (LOWER('%${value}%'))))
        OR (poultry = 1
                AND '알류' IN (SELECT allergy_name
                                FROM allergy
                                WHERE LOWER(allergy_name) LIKE (LOWER('%${value}%'))))
        OR (milk = 1
                AND '우유' IN (SELECT allergy_name
                                FROM allergy
                                WHERE LOWER(allergy_name) LIKE (LOWER('%${value}%'))))
        OR (beef = 1
                AND '쇠고기' IN (SELECT allergy_name
                                FROM allergy
                                WHERE LOWER(allergy_name) LIKE (LOWER('%${value}%'))))
        OR (fork = 1
                AND '돼지고기' IN (SELECT allergy_name
                                FROM allergy
                                WHERE LOWER(allergy_name) LIKE (LOWER('%${value}%'))))
        OR (chicken = 1
                AND '닭고기' IN (SELECT allergy_name
                                FROM allergy
                                WHERE LOWER(allergy_name) LIKE (LOWER('%${value}%'))))
        OR (peach = 1
                AND '복숭아' IN (SELECT allergy_name
                                FROM allergy
                                WHERE LOWER(allergy_name) LIKE (LOWER('%${value}%'))))
        OR (tomato = 1
                AND '토마토' IN (SELECT allergy_name
                                FROM allergy
                                WHERE LOWER(allergy_name) LIKE (LOWER('%${value}%'))))
        OR (sulfurous_acid = 1
                AND '아황산류' IN (SELECT allergy_name
                                FROM allergy
                                WHERE LOWER(allergy_name) LIKE (LOWER('%${value}%'))))`
    }

    return query;
}

module.exports.get_query = set_query;