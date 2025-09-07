//(async () => {
//const getNumber = async () => Math.random()
//const result = await getNumber()
//console.log(result);
//})();

// Funkce, která vrátí Promise
const checkNumber = (num) => {
    return new Promise((resolve, reject) => {
        if (num === 1) {
            resolve('tohle je jedna');
        } else {
            reject('tohle není 1');
        }
    });
};

// Použití:
checkNumber(1)
    .then((result) => {
        console.log(result); // success
        return checkNumber(2); // zavoláme znovu s jiným číslem
    })
    .then((result) => {
        console.log(result); // tohle se už nevypíše, protože 2 není 1
    })
    .catch((error) => {
        console.error("chyba: " + error);
    });

