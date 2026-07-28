function generatePrimes(count) {
    const primes = [];

    for (let candidate = 2; primes.length < count; candidate++) {
        let prime = true;
        for (let factor = 2; factor * factor <= candidate; factor++) {
            if (candidate % factor === 0) {
                prime = false;
                break;
            }
        }
        if (prime) {
            primes.push(candidate);
        }
    }

    return primes;
}

function findOrder(n) {
    if (n <= 0) {
        return [];
    }

    const people = Array.from({ length: n }, (_, index) => index + 1);
    const order = [];
    let index = 0;

    for (const step of generatePrimes(n - 1)) {
        index = (index + step - 1) % people.length;
        order.push(people.splice(index, 1)[0]);
    }

    return order.concat(people);
}
