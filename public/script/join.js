const Join = (arr) => {
    if (typeof arr != 'undefined' && arr.length > 0) {
        var stringData = ""
        arr.forEach((val, ind) => {
            if (ind < arr.length - 1)
                stringData += val + "|";
            else
                stringData += val;
        })
        return stringData;
    }
    return []; 
}

