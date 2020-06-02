/*Nav Header*/
const navHeader = () => {
    let headerTop = document.querySelector('.header__top');
    let intro = document.getElementById('intro');

    let introHeight = intro.offsetHeight;
    let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    //Fixed TopHeader
    window.addEventListener('scroll', () => {
        introHeight = intro.offsetHeight;
        scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollPosition > introHeight) {
            headerTop.classList.add('fixed', 'animated', 'bounceInLeft');
        } else {
            headerTop.classList.remove('fixed', 'bounceInLeft');
        }

    });


};

export {navHeader};