function convertNamedToPositionalQuery(sql, params) {
    const uniqueParams = [...new Set(sql.match(/\$\w+/g) || [])];

    // Substitute each named parameter with its corresponding positional parameter
    uniqueParams.forEach((param, index) => {
        sql = sql.replace(new RegExp(`\\${param}`, 'g'), `$${index + 1}`);
    });

    // Prepare the list of values corresponding to the order of the positional parameters
    const values = uniqueParams.map(param => params[param.slice(1)]).filter(value => value !== undefined);

    return [sql, values];
}
