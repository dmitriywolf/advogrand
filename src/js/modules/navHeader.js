const navHeader = () => {
  let headerTop = document.querySelector('.header__top');
  let intro = document.getElementById('intro');
  let burger = document.querySelector('.burger');
  let nav = document.querySelector('.nav__list ');
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
  burger.addEventListener('click', function () {
    if (!this.classList.contains('burger--close')) {
      this.classList.add('burger--close');
      nav.classList.add('show', 'bounceInLeft');
    } else {
      this.classList.remove('burger--close');
      nav.classList.remove('show', 'bounceInLeft');
    }
  });

  nav.addEventListener('click', function (event) {
    let element = event.target;
    if (element.classList.contains('nav__link') && nav.classList.contains('show')) {
      nav.classList.remove('show');
      burger.classList.remove('burger--close');
    }
  });

};

export default navHeader;