export const currencyFormatter = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
};

export const amountFormatter = (quantity, amount) => {

    return (Number(quantity) * Number(amount)).toFixed(2);
};