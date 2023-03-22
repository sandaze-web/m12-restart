const html = document.documentElement
const body = document.body
const pageWrapper = document.querySelector('.main')
const header = document.querySelector('.header')
const firstScreen = document.querySelector('[data-observ]')
const burgerButton = document.querySelector('.icon-menu')
const menu = document.querySelector('.menu')
const lockPaddingElements = document.querySelectorAll('[data-lp]')


/*
* Универсальная функция для блокировки скрола при открытии модальных окон
* При открытии модального окна вызываем: toggleBodyLock(true)
* При закрытии окна вызываем: toggleBodyLock(false)

* lockPaddingElements - это коллекция элементов с фиксированной позицией
* В html таким элементам нужно дать атрибут [data-lp] 
*/
const toggleBodyLock = (isLock) => {
  FLS(`Попап ${isLock ? 'открыт' : 'закрыт'}`)
  const lockPaddingValue = window.innerWidth - pageWrapper.offsetWidth

  setTimeout(() => {
    if (lockPaddingElements) {
      lockPaddingElements.forEach((element) => {
        element.style.paddingRight = isLock ? `${lockPaddingValue}px` : '0px'
      })
    }
  
    body.style.paddingRight = isLock ? `${lockPaddingValue}px` : '0px'
    body.classList.toggle('lock', isLock)
  }, isLock ? 0 : 500)
}

// logger (Full Logging System) =================================================================================================================
function FLS(message) {
  setTimeout(() => (window.FLS ? console.log(message) : null), 0)
}

// Проверка браузера на поддержку .webp изображений =================================================================================================================
function isWebp() {
  // Проверка поддержки webp
  const testWebp = (callback) => {
    const webP = new Image()

    webP.onload = webP.onerror = () => callback(webP.height === 2)
    webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
  }
  // Добавление класса _webp или _no-webp для HTML
  testWebp((support) => {
    const className = support ? 'webp' : 'no-webp'
    html.classList.add(className)

    FLS(support ? 'webp поддерживается' : 'webp не поддерживается')
  })
}

/* Проверка мобильного браузера */
const isMobile = {
  Android: () => navigator.userAgent.match(/Android/i),
  BlackBerry: () => navigator.userAgent.match(/BlackBerry/i),
  iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
  Opera: () => navigator.userAgent.match(/Opera Mini/i),
  Windows: () => navigator.userAgent.match(/IEMobile/i),
  any: () =>
    isMobile.Android() ||
    isMobile.BlackBerry() ||
    isMobile.iOS() ||
    isMobile.Opera() ||
    isMobile.Windows(),
}
/* Добавление класса touch для HTML если браузер мобильный */
function addTouchClass() {
  // Добавление класса _touch для HTML если браузер мобильный
  if (isMobile.any()) {
    html.classList.add('touch')
  }
}

// Добавление loaded для HTML после полной загрузки страницы
function addLoadedClass() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      html.classList.add('loaded')
    }, 0)
  })
}

// Получение хеша в адресе сайта
const getHash = () => {
  if (location.hash) {
    return location.hash.replace('#', '')
  }
}

// Указание хеша в адресе сайта
function setHash(hash) {
  hash = hash ? `#${hash}` : window.location.href.split('#')[0]
  history.pushState('', '', hash)
}

// Функция для фиксированной шапки при скролле =================================================================================================================
function headerFixed() {
  const headerStickyObserver = new IntersectionObserver(([entry]) => {
    header.classList.toggle('sticky', !entry.isIntersecting)
  })

  if (firstScreen) {
    headerStickyObserver.observe(firstScreen)
  }
}

// Универсальная функция для открытия и закрытия попапо =================================================================================================================
const togglePopupWindows = () => {
  document.addEventListener('click', ({ target }) => {
    if (target.closest('[data-type]')) {
      const popup = document.querySelector(
        `[data-popup="${target.dataset.type}"]`
      )

      if (document.querySelector('._is-open')) {
        document.querySelectorAll('._is-open').forEach((modal) => {
          modal.classList.remove('_is-open')
        })
      }

      popup.classList.add('_is-open')
      toggleBodyLock(true)
    }

    if (
      target.classList.contains('_overlay-bg') ||
      target.closest('.button-close')
    ) {
      const popup = target.closest('._overlay-bg')

      popup.classList.remove('_is-open')
      toggleBodyLock(false)

      if(document.querySelector('.header-burger').classList.contains('active')) {
        document.querySelector('.header-burger').classList.remove('active')
      }
    }
  })
}

// Модуль работы с меню (бургер) =======================================================================================================================================================================================================================
const menuInit = () => {
  if (burgerButton) {
    document.addEventListener('click', ({ target }) => {
      if (target.closest('.icon-menu')) {
        html.classList.toggle('menu-open')
        toggleBodyLock(html.classList.contains('menu-open'))
      }
    })
  }
}
const menuOpen = () => {
  toggleBodyLock(true)
  html.classList.add('menu-open')
}
const menuClose = () => {
  toggleBodyLock(false)
  html.classList.remove('menu-open')
}



togglePopupWindows()

document.addEventListener('DOMContentLoaded', function () {
  if(document.querySelector('.m12-faq')) {
    let priceItems = document.querySelectorAll('.m12-faq__item-titleBx')

    priceItems.forEach(item => {
      item.addEventListener('click', () => {
        let content = item.parentNode.querySelector('.m12-faq-answerBx');

        if(content.style.maxHeight){
          content.style.maxHeight = null;
          item.classList.remove('active');
        }else{
          document.querySelectorAll('.m12-faq-answerBx').forEach(el => el.style.maxHeight = null);
          document.querySelectorAll('.m12-faq__item-titleBx').forEach(el => el.classList.remove('active'));
          content.style.maxHeight = content.scrollHeight + 'px';
          item.classList.add('active');
        }
      })
    })
  }

  if(document.querySelector('.price-titleBx')) {
    let priceItems = document.querySelectorAll('.price-titleBx')

    priceItems.forEach(item => {
      item.addEventListener('click', () => {
        let content = item.parentNode.querySelector('.price-helper');

        if(content.style.maxHeight){
          content.style.maxHeight = null;
          item.classList.remove('active');
        }else{
          document.querySelectorAll('.price-helper').forEach(el => el.style.maxHeight = null);
          document.querySelectorAll('.price-titleBx').forEach(el => el.classList.remove('active'));
          content.style.maxHeight = content.scrollHeight + 'px';
          item.classList.add('active');
        }
      })
    })
  }

  if(document.querySelector('.slider')) {
    $('.slider-box').slick({
      infinite: true,
      slidesToShow: 7,
      slidesToScroll: 1,
      centerMode: true,
      dots: true,
      adaptiveHeight: true,
      variableWidth: true,
      nextArrow: '.slider-arrowBx__arrow.right',
      prevArrow: '.slider-arrowBx__arrow.left',
      autoplay: true,
      autoplaySpeed: 4000,
    });
    $('.slider-box').on('setPosition', function () {
      $(this).find('.slider__item').height('auto');
      let slickTrack = $(this).find('.slick-track');
      let slickTrackHeight = $(slickTrack).height();
      $(this).find('.slider__item').css('height', slickTrackHeight + 'px');
    });
  }

  if(document.querySelector('.header-burger')) {
    let burger = document.querySelector('.header-burger'),
        nav = document.querySelector('.m12-header-nav')
    burger.addEventListener('click', () => {
      nav.classList.toggle('_is-open')
      burger.classList.toggle('active')
      toggleBodyLock(burger.classList.contains('active'))
    })
  }

  if(document.querySelector('.m12-stages')) {
    if(window.innerWidth <= 480) {
      $('.m12-stages-box').slick({
        infinite: false,
        slidesToShow: 1.5,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
      });
    }
  }

  if(document.querySelector('.mask-phone')) {
    $('.mask-phone').mask('+7(999) 999-99-99')
  }

  if(document.querySelector('.modal-form')) {
    let form = document.querySelector('.modal-form form');

    form.addEventListener('submit', e => {
      e.preventDefault();
      e.target.reset()
      document.querySelector('.success').classList.add('_is-open')
      document.querySelector('.modal-form').classList.remove('_is-open')
    })
  }
})

// =======================================================================================================
