let headerBottomNavItems = document.querySelectorAll('.header-bottom__nav-item');

headerBottomNavItems.forEach((el) => {
    el.addEventListener('click', () => {
        headerBottomNavItems.forEach((item) => {
            if (item.classList.contains('_active')) {
                item.classList.remove('_active');
            }
        });
        el.classList.add('_active');
    });
});

let header = document.querySelector('header');
let headerMain = document.querySelector('.header-main');

window.addEventListener('scroll', () => {
    if (document.body.clientWidth >= 950) {
        if (window.scrollY > header.clientHeight) {
            headerMain.classList.add('_fixed');
        } else if (window.scrollY <= header.clientHeight) {
            headerMain.classList.remove('_fixed');
        }
    }
});

let headerBottomBurger = document.querySelector('.header-bottom__burger');
let headerBottomNav = document.querySelector('.header-bottom__nav');
let headerMainBurger = document.querySelector('.header-main__burger');
let headerMainNav = document.querySelector('.header-main__nav');

headerBottomBurger.addEventListener('click', () => {
    headerBottomNav.classList.toggle('_active');
});

headerMainBurger.addEventListener('click', () => {
    headerMainNav.classList.toggle('_active');
    headerMainBurger.classList.toggle('_active');
});

let headerMainSearch = document.querySelector('.header-main__search');
let headerMainForm = document.querySelector('.header-main__form');

headerMainSearch.addEventListener('click', () => {
    headerMainForm.classList.toggle('_active');
    headerMainSearch.parentNode.classList.toggle('_active');
});

let headerMainCall = document.querySelector('.header-main__call');
let headerMainBlock = document.querySelector('.header-main__block');

headerMainCall.addEventListener('click', () => {
    headerMainCall.classList.toggle('_active');
    headerMainBlock.classList.toggle('_active');
});

window.addEventListener('click', (e) => {
    if (headerBottomNav.classList.contains('_active') && !e.target.closest('.header-bottom__burger') && !e.target.classList.contains('header-bottom__nav')) {
        headerBottomNav.classList.remove('_active');
    }
    if (headerMainNav.classList.contains('_active') && !e.target.closest('.header-main__burger') && !e.target.classList.contains('header-main__nav')) {
        headerMainNav.classList.remove('_active');
        headerMainBurger.classList.remove('_active');
    }
    if (headerMainForm.classList.contains('_active') && !e.target.closest('.header-main__search') && !e.target.closest('.header-main__form')) {
        headerMainForm.classList.remove('_active');
        headerMainSearch.parentNode.classList.remove('_active');
    }
    if (headerMainBlock.classList.contains('_active') && !e.target.closest('.header-main__call') && !e.target.closest('.header-main__block')) {
        headerMainCall.classList.remove('_active');
        headerMainBlock.classList.remove('_active');
    }
});

let bannerItems = document.querySelectorAll('.banner-categories__item');
let bannerHover = document.querySelector('.banner-categories__hover');
let bannerRight = document.querySelector('.banner-right');

if (bannerItems.length > 0 && bannerRight && bannerHover) {
    bannerItems.forEach((el) => {
        el.addEventListener('mouseover', (e) => {
            if (document.body.clientWidth > 992) {
                el.classList.add('_active');
                bannerRight.classList.add('_hover');
            }
        });
        el.addEventListener('mouseout', (e) => {
            if (document.body.clientWidth > 992) {
                if (e.relatedTarget && !e.relatedTarget.closest('.banner-categories__hover')) {
                    el.classList.remove('_active');
                    bannerRight.classList.remove('_hover');
                }
            }
        });
    });

    bannerHover.addEventListener('mouseout', (e) => {
        if (document.body.clientWidth > 992) {
            if (e.relatedTarget && !e.relatedTarget.closest('.banner-categories__hover')) {
                bannerItems.forEach((el) => {
                    if (el.classList.contains('_active')) el.classList.remove('_active');
                });
                bannerRight.classList.remove('_hover');
            }
        }
    });
}

$('.proposition__slider').slick({
    slidesToShow: 4,
    responsive: [
        {
            breakpoint: 1300,
            settings: {
                slidesToShow: 3,
            },
        },
        {
            breakpoint: 1050,
            settings: {
                slidesToShow: 2,
            },
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
            },
        },
    ],
});
$('.page-slider__slider').slick({
    slidesToShow: 4,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
        {
            breakpoint: 1300,
            settings: {
                slidesToShow: 3,
                autoplaySpeed: 2000,
            },
        },
        {
            breakpoint: 1050,
            settings: {
                slidesToShow: 2,
                autoplaySpeed: 1500,
            },
        },
        {
            breakpoint: 650,
            settings: {
                slidesToShow: 1,
                adaptiveHeight: true,
            },
        },
    ],
});

let pageMapItems = document.querySelectorAll('.page-maps-item__map');
let pageMapBtns = document.querySelectorAll('.page-maps-item__btn');

if (pageMapItems.length > 0) {
    pageMapItems.forEach((el) => {
        let mapSrc = el.getAttribute('data-map');
        let mapFlag = 1;
        if (el.offsetTop > window.innerHeight) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > el.offsetTop - window.innerHeight && mapFlag) {
                    el.insertAdjacentHTML('beforeend', `<iframe src="${mapSrc}" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`);
                    mapFlag = 0;
                }
            });
        } else {
            el.insertAdjacentHTML('beforeend', `<iframe src="${mapSrc}" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`);
            mapFlag = 0;
        }
    });
}
if (pageMapBtns.length > 0) {
    pageMapBtns.forEach((el) => {
        el.addEventListener('click', () => {
            el.closest('.page-maps-item').classList.toggle('_active');
        });
    });
}

let categoryFilterBlocks = document.querySelectorAll('.category-filter__block');
let categorySelected = document.querySelector('.category-selected');

if (categoryFilterBlocks.length > 0) {
    categoryFilterBlocks.forEach((el) => {
        el.querySelector('.category-filter__btn').addEventListener('click', () => {
            el.classList.toggle('_active');
        });

        let categoryFilterItemSpans = el.querySelectorAll('.category-filter__item .span');
        categoryFilterItemSpans.forEach((span) => {
            let filterId = span.closest('.category-filter__item').getAttribute('data-filter-item');

            span.addEventListener('click', () => {
                let flag = 1;
                if (categorySelected.querySelectorAll('.category-selected__item').length > 0) {
                    categorySelected.querySelectorAll('.category-selected__item').forEach((catSelItem) => {
                        let selId = catSelItem.getAttribute('data-select-item');
                        if (selId == filterId) {
                            flag = 0;
                        }
                    });
                }
                let text = span.querySelector('.text').textContent;
                let del = span.querySelector('.number').textContent;
                text = text.replace(del, '').trim();

                if (!span.previousElementSibling.checked && flag) {
                    let res = `<div class="category-selected__item" data-select-item="${filterId}">
                    <p>${text}</p><span></span>
                    </div>`;
                    categorySelected.querySelector('.category-selected__body').insertAdjacentHTML('afterbegin', res);
                    delSelectedItemBtn();
                } else {
                    if (categorySelected.querySelectorAll('.category-selected__item').length > 0) {
                        categorySelected.querySelectorAll('.category-selected__item').forEach((catSelItem) => {
                            let selId = catSelItem.getAttribute('data-select-item');
                            if (selId == filterId) {
                                catSelItem.remove();
                            }
                        });
                    }
                }
            });
        });
    });
}

delSelectedItemBtn();

function delSelectedItemBtn() {
    if (categorySelected) {
        let btnDel = categorySelected.querySelectorAll('.category-selected__item span');

        btnDel.forEach((el) => {
            el.addEventListener('click', () => {
                let selId = el.closest('.category-selected__item').getAttribute('data-select-item');
                el.closest('.category-selected__item').remove();

                let filterItems = document.querySelectorAll('.category-filter__item');
                filterItems.forEach((el) => {
                    let filterId = el.getAttribute('data-filter-item');
                    if (selId == filterId) {
                        el.querySelector('input').checked = false;
                    }
                });
            });
        });
    }
}

if (categorySelected) {
    let clearSelectedItemAll = document.querySelector('.category-selected__btn');

    clearSelectedItemAll.addEventListener('click', () => {
        let filterItems = document.querySelectorAll('.category-filter__item');
        categorySelected.querySelectorAll('.category-selected__item').forEach((catSelItem) => {
            let selId = catSelItem.getAttribute('data-select-item');
            filterItems.forEach((el) => {
                let filterId = el.getAttribute('data-filter-item');
                if (selId == filterId) {
                    el.querySelector('input').checked = false;
                }
            });
            catSelItem.remove();
        });
    });
}

let pagBody = document.querySelector('.category-pagination__body');

if (pagBody) {
    let padBodyItems = pagBody.querySelectorAll('.category-pagination__item');
    padBodyItems.forEach((el) => {
        el.addEventListener('click', () => {
            for (let i = 0; i < padBodyItems.length; i++) {
                if (padBodyItems[i].classList.contains('_active')) {
                    padBodyItems[i].classList.remove('_active');
                    break;
                }
            }
            el.classList.add('_active');
        });
    });

    let pagNext = document.querySelector('.category-pagination__next');
    pagNext.addEventListener('click', () => {
        for (let i = 0; i < padBodyItems.length; i++) {
            if (padBodyItems[i].classList.contains('_active') && i + 1 < padBodyItems.length) {
                padBodyItems[i].classList.remove('_active');
                padBodyItems[i + 1].classList.add('_active');
                break;
            }
        }
    });
    let pagEnd = document.querySelector('.category-pagination__end');
    pagEnd.addEventListener('click', () => {
        for (let i = 0; i < padBodyItems.length; i++) {
            if (padBodyItems[i].classList.contains('_active') && i + 1 < padBodyItems.length) {
                padBodyItems[i].classList.remove('_active');
                pagBody.lastElementChild.classList.add('_active');
                break;
            }
        }
    });
    let pagPrev = document.querySelector('.category-pagination__prev');
    pagPrev.addEventListener('click', () => {
        for (let i = 0; i < padBodyItems.length; i++) {
            if (padBodyItems[i].classList.contains('_active') && i - 1 >= 0) {
                padBodyItems[i].classList.remove('_active');
                padBodyItems[i - 1].classList.add('_active');
                break;
            }
        }
    });
    let pagStart = document.querySelector('.category-pagination__start');
    pagStart.addEventListener('click', () => {
        for (let i = 0; i < padBodyItems.length; i++) {
            if (padBodyItems[i].classList.contains('_active') && i - 1 >= 0) {
                padBodyItems[i].classList.remove('_active');
                pagBody.firstElementChild.classList.add('_active');
                break;
            }
        }
    });
}

let tovarInfoLeftItems = document.querySelectorAll('.tovar-info-left__item');

if (tovarInfoLeftItems) {
    tovarInfoLeftItems.forEach((el) => {
        el.addEventListener('click', () => {
            let src = el.querySelector('img').getAttribute('src');
            let img = document.querySelector('.tovar-info-left__img img');
            tovarInfoLeftItems.forEach((item) => {
                if (item.classList.contains('_active')) {
                    item.classList.remove('_active');
                }
            });

            img.setAttribute('src', src);
            el.classList.add('_active');
        });
    });
}

let tovarInfoRightColvo = document.querySelector('.tovar-info-right__colvo');

if (tovarInfoRightColvo) {
    let tovarInput = tovarInfoRightColvo.querySelector('.tovar-info-right__input');
    let tovarMinus = tovarInfoRightColvo.querySelector('.tovar-info-right__minus');
    let tovarPlus = tovarInfoRightColvo.querySelector('.tovar-info-right__plus');

    tovarInput.addEventListener('input', (e) => {
        if (tovarInput.value.match(/[^0-9]/g)) {
            let val = tovarInput.value.replace(/[^0-9]/g, '');
            tovarInput.value = val;
        }
    });
    tovarInput.addEventListener('change', (e) => {
        if (tovarInput.value.length < 1 || tovarInput.value == 0 || tovarInput.value[0] == 0) {
            tovarInput.value = 1;
        }
    });
    tovarPlus.addEventListener('click', () => {
        let val = parseInt(tovarInput.value);
        tovarInput.value = val + 1;
    });
    tovarMinus.addEventListener('click', () => {
        let val = parseInt(tovarInput.value);
        if (val > 1) {
            tovarInput.value = val - 1;
        }
    });
}

let tovarInfoRightBottomItem = document.querySelectorAll('.tovar-info-right-bottom__item');
let tovarInfoBottomText = document.querySelectorAll('.tovar-info-bottom__text');

if (tovarInfoRightBottomItem.length > 0) {
    tovarInfoRightBottomItem.forEach((el) => {
        el.addEventListener('click', () => {
            let id = el.getAttribute('data-info-item');
            if (document.body.clientWidth > 768) {
                if (id != 0) {
                    tovarInfoRightBottomItem.forEach((item) => {
                        if (item.classList.contains('_active')) {
                            item.classList.remove('_active');
                        }
                    });
                    el.classList.add('_active');

                    tovarInfoBottomText.forEach((text) => {
                        if (text.getAttribute('data-info-text') == id) {
                            text.classList.add('_active');
                        } else if (text.classList.contains('_active')) {
                            text.classList.remove('_active');
                        }
                    });
                }
            }
        });
        if (el.querySelector('.tovar-info-right-bottom__icon')) {
            el.querySelector('.tovar-info-right-bottom__icon').addEventListener('click', () => {
                let id = el.getAttribute('data-info-item');
                if (id != 0) {
                    el.classList.toggle('_active');
                }
            });
        }
    });
}

$('.tovar-similar__slider').slick({
    slidesToShow: 4,
    responsive: [
        {
            breakpoint: 1250,
            settings: {
                slidesToShow: 3,
            },
        },
        {
            breakpoint: 950,
            settings: {
                slidesToShow: 2,
            },
        },
        {
            breakpoint: 650,
            settings: {
                slidesToShow: 1,
            },
        },
    ],
});
$('.tovar-related__slider').slick({
    slidesToShow: 4,
    responsive: [
        {
            breakpoint: 1250,
            settings: {
                slidesToShow: 3,
            },
        },
        {
            breakpoint: 950,
            settings: {
                slidesToShow: 2,
            },
        },
        {
            breakpoint: 650,
            settings: {
                slidesToShow: 1,
            },
        },
    ],
});

let aboutItems = document.querySelectorAll('.about__item');
let aboutTexts = document.querySelectorAll('.about__text');

if (aboutItems.length > 0) {
    aboutTexts.forEach((el) => {
        if (el.scrollHeight > 350) {
            el.style.overflowY = 'scroll';
        }
    });
    aboutItems.forEach((el) => {
        el.addEventListener('click', () => {
            let id = el.getAttribute('data-about-id');
            aboutItems.forEach((item) => {
                if (item.classList.contains('_active')) {
                    item.classList.remove('_active');
                }
            });
            aboutTexts.forEach((item) => {
                if (item.classList.contains('_active')) {
                    item.classList.remove('_active');
                }
                if (item.getAttribute('data-about-text') == id) {
                    item.classList.add('_active');
                }
            });
            el.classList.add('_active');
        });
    });
}

let contactsItems = document.querySelectorAll('.contacts__item');
let contactsBlocks = document.querySelectorAll('.contacts-block');

if (contactsItems.length > 0) {
    contactsBlocks.forEach((item) => {
        if (item.classList.contains('_active')) {
            let map = item.querySelector('.contacts-block__map');
            let srcMap = map.getAttribute('data-map');
            map.insertAdjacentHTML('beforeend', `<iframe src="${srcMap}" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`);
        }
    });
    contactsItems.forEach((el) => {
        el.addEventListener('click', () => {
            let id = el.getAttribute('data-contacts-id');
            contactsItems.forEach((item) => {
                if (item.classList.contains('_active')) {
                    item.classList.remove('_active');
                }
            });
            contactsBlocks.forEach((item) => {
                if (item.classList.contains('_active')) {
                    item.classList.remove('_active');
                }
                if (item.getAttribute('data-contacts-block') == id) {
                    item.classList.add('_active');
                    let map = item.querySelector('.contacts-block__map');

                    if (map.children.length == 0) {
                        let srcMap = map.getAttribute('data-map');
                        map.insertAdjacentHTML('beforeend', `<iframe src="${srcMap}" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`);
                    }
                }
            });
            el.classList.add('_active');
        });
    });
}

let infoItems = document.querySelectorAll('.info__item');
let infoRows = document.querySelectorAll('.info-block__row');

if (infoItems.length > 0) {
    infoItems.forEach((el) => {
        el.addEventListener('click', () => {
            let id = el.getAttribute('data-info-id');
            infoItems.forEach((item) => {
                if (item.classList.contains('_active')) {
                    item.classList.remove('_active');
                }
            });
            infoRows.forEach((item) => {
                if (item.classList.contains('_active')) {
                    item.classList.remove('_active');
                }
                if (item.getAttribute('data-info-row') == id) {
                    item.classList.add('_active');
                }
            });
            el.classList.add('_active');
        });
    });
}

let cartItems = document.querySelectorAll('.cart-item');

if (cartItems.length > 0) {
    cartItems.forEach((el) => {
        let input = el.querySelector('.cart-item__input');
        let minus = el.querySelector('.cart-item__minus');
        let plus = el.querySelector('.cart-item__plus');
        let close = el.querySelector('.cart-item__close');

        if (input) {
            input.addEventListener('input', (e) => {
                if (input.value.match(/[^0-9]/g)) {
                    let val = input.value.replace(/[^0-9]/g, '');
                    input.value = val;
                }
            });
            input.addEventListener('change', (e) => {
                if (input.value.length < 1 || input.value == 0 || input.value[0] == 0) {
                    input.value = 1;
                }
            });
            plus.addEventListener('click', () => {
                let val = parseInt(input.value);
                input.value = val + 1;
            });
            minus.addEventListener('click', () => {
                let val = parseInt(input.value);
                if (val > 1) {
                    input.value = val - 1;
                }
            });
        }
        close.addEventListener('click', () => {
            el.classList.add('_delete');
            setTimeout(() => {
                el.remove();
            }, 400);
        });
    });
}
