const carousel = () => {
    const configPartners = {
        type: 'carousel',
        startAt: 0,
        perView: 4,
        breakpoints: {
            900: {
                perView: 3,
            },
            680: {
                perView: 2,
            },
            460: {
                perView: 1,
            },
        }
    };
    new Glide('.glide--partners', configPartners).mount();
};

export {carousel};