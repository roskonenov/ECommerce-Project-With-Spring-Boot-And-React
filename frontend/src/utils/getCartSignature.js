const getCartSignature = (cart) => {
    return cart.map(i => `${i.id}-${i.cartQuantity}`).sort().join(",");
};

export default getCartSignature;