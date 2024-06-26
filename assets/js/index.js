document.addEventListener("DOMContentLoaded", () => {
  const stockPage = document.querySelector(".stock");
  const cartPage = document.querySelector(".cart");
  if (!stockPage || !cartPage) {
    const swiper = new Swiper(".headerWrapperSlider__container", {
      loop: true,
      slidesPerView: 1.5,
      spaceBetween: 15,
      1500: {
        slidesPerView: 1.5,
      },
      navigation: {
        nextEl: ".headerWrapperSlider__btn-next",
        prevEl: ".headerWrapperSlider__btn-prev",
      },
    });

    const product = new Swiper(".product__swiper-container", {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 15,
      1500: {
        slidesPerView: 1,
      },
      pagination: {
        el: ".swiperWrapperProduct__paginations",
        clickable: true,
      },
    });

    const btnsSlider = [
      {
        next: "card-product__btn-next",
        prev: "card-product__btn-prev",
        container: "card-product__swiper-container",
      },
      {
        next: "card-product__recomedation-btn__next",
        prev: "card-product__recomedation-btn__prev",
        container: "card-product__swiper-container__two",
      },
      {
        next: "card-product__viewed-btn__next",
        prev: "card-product__viewed-btn__prev",
        container: "card-product__swiper-container__three",
      },
    ];

    btnsSlider?.forEach((btnSlider) => {
      const cardProduct = new Swiper(`.${btnSlider.container}`, {
        loop: true,
        slidesPerView: 5.3,
        spaceBetween: 15,
        1500: {
          slidesPerView: 5.3,
        },
        navigation: {
          nextEl: `.${btnSlider.next}`,
          prevEl: `.${btnSlider.prev}`,
        },
      });
    });
  }

  // счётчик продукта

  // Контейнер кнопок
  const btnsContainer = document.querySelectorAll(".product__counter");
  // количество
  const productsCount = document.querySelectorAll(".product__count");
  // цены
  const productsPrice = document.querySelectorAll(
    ".product__count-price__number"
  );

  productsCount.forEach((countText, index) => {
    //   находим цену по индексу
    const countTextPrice = productsPrice[index];
    //   находим блок кнопок по индексу
    const btns = btnsContainer[index].querySelectorAll(".product__btn");
    let counter = 10;
    let price = 29;
    let priceAdd = 29;

    btns.forEach((btn, btnIndex) => {
      btn.addEventListener("click", (e) => {
        if (e.currentTarget) {
          if (btnIndex === 0 && counter >= 1) {
            counter = counter - 10;
            price = price - priceAdd;
          } else if (btnIndex === 1) {
            counter = counter + 10;
            price = price + priceAdd;
          }
          countText.textContent = counter;
          countTextPrice.textContent = price;
          setDisabled(counter, btns);
        }
      });
    });

    function setDisabled(count, buttons) {
      if (count === 10) {
        buttons[0].disabled = true;
      } else if (count === 990) {
        buttons[1].disabled = true;
      } else {
        buttons[0].disabled = false;
        buttons[1].disabled = false;
      }
    }
    window.addEventListener("DOMContentLoaded", function () {
      setDisabled(10, btns);
    });
  });

  // избранные и сравнение
  // контейнер с иконками
  const btnsIconContainer = document.querySelectorAll(
    ".swiperWrapperProduct__icons"
  );

  const productsContent = document.querySelectorAll(".product__content");

  productsContent?.forEach((product, index) => {
    const btnsIconIndex = btnsIconContainer[index]?.querySelectorAll(
      ".swiperWrapperProduct__icon svg"
    );
    btnsIconIndex?.forEach((btn, index) => {
      btn.addEventListener("click", (e) => {
        if (e.currentTarget) {
          if (index === 0) {
            btn.classList.toggle("active");
            btn.firstElementChild.classList.toggle("active");
          } else if (index === 1) {
            btn.lastElementChild.classList.toggle("active");
            btn.firstElementChild.classList.toggle("active");
          }
        }
      });
    });
  });

  // переключение страниц
  const switchingPage = document.querySelector(
    ".best-deals__block-btns__pages"
  );

  switchingPage?.addEventListener("click", (e) => {
    // вешаем один обработчик события клика на весь блок
    const { target } = e; // цель, на которую мы кликнули
    const targetClassList = target.classList; // массив классов цели, на которую мы кликнули
    const allNumPages = [
      ...document.querySelectorAll(".best-deals__block-page"),
    ]; // массив всех нумерованых блоков

    const activePageNumber = allNumPages.findIndex((i) =>
      i.classList.contains("active")
    ); // номер (индекс) ранее выбранной страницы

    switch (
      true // этот оператор смотрит на какую кнопку мы кликнули
    ) {
      case targetClassList.contains("best-deals__block-btn-right"):
        return activePageNumber - allNumPages.length + 1 && setNum(1, true); // если кликнули на кнопку вправо
      case targetClassList.contains("best-deals__block-page"):
        return setNum(target.innerHTML); // если кликнули прямо на число
    }

    function setNum(num, direction = null) {
      // функция, которая задает выбранную страницу. параметр num - какую цифру мы выбрали (если мы нажали на цифру). параметр direction - направление стрелки, которую мы выбрали (если мы нажали на стрелку)
      allNumPages[activePageNumber].classList.remove("active"); // убирает класс
      // если в вызываемой функции указан аргумент direction (он true или false), то берем индекс ранее выбранной цифры и плюсуем/минусуем 1, чтобы активировать предыдущую/следующую цифру
      // плюсовать или минусовать указывает аргумент num, который равен -1 либо 1
      // если в вызываемой функции не указан аргумен direction (он равен null) - значит мы кликнули прямо на число. берем содержимое выбранной цифры (через innerHTML) и по полученому индексу делаем элемент активным
      allNumPages[
        direction === null ? target.innerHTML - 1 : activePageNumber + num
      ].classList.add("active");
    }
  });

  // табы
  // получаем все кнопки навигации
  // тут вынесены классы табов
  const btnsBestDeals = [
    { btn: "btn__best-deals", content: "best-deals__page" },
    { btn: "btn__contacts", content: "our-contacts__block-content" },
    { btn: "btn-main__catalog-cards", content: "catalog__page" },
    { btn: "stock__btn-cards", content: "stock__page" },
    { btn: "dealers__btn-cards", content: "section-dealers__block" },
    {
      btn: "card-product__tabs-block__btn",
      content: "card-product__tabs-block__content",
    },
    { btn: "placing-order__btn", content: "placing-order__content-block" },
  ];

  function btnTabs(btn, content) {
    const tabs = document.querySelectorAll(`.${btn}`);
    // Проходимся по всем кнопкам карточки элемента
    tabs.forEach((tab) => {
      // вешаем на каждую кнопку обработчик события клик
      tab.addEventListener("click", () => {
        // Получаем предыдущую активную кнопку
        const prevActiveButton = document.querySelector(`.${btn}.active`);

        // Получаем предыдущую активную вкладку
        const prevActiveItem = document.querySelector(`.${content}.active`);
        // Проверяем есть или нет предыдущая активная кнопка
        if (prevActiveButton) {
          //Удаляем класс active у предыдущей кнопки если она есть
          prevActiveButton.classList.remove("active");
        }

        // Проверяем есть или нет предыдущая активная вкладка
        if (prevActiveItem) {
          // Удаляем класс active у предыдущей вкладки если она есть
          prevActiveItem.classList.remove("active");
        }

        // получаем id новой активной вкладки, который мы перем из атрибута data-tab у кнопки
        const nextActiveItemId = tab.getAttribute("data-tab");

        const asideBlock = document.querySelector(".placing-order__aside");
        const checkboxBlock = document.querySelector(
          ".placing-order__content-checkboxes"
        );

        if (nextActiveItemId === "tab3") {
          asideBlock.style.display = "none";
          checkboxBlock.style.display = "none";
        } else if (nextActiveItemId === "tab1" || nextActiveItemId === "tab2") {
          asideBlock.style.display = "flex";
          checkboxBlock.style.display = "block";
        }

        // получаем новую активную вкладку по id
        const nextActiveItem = document.querySelector(`#${nextActiveItemId}`);
        // добавляем класс active кнопке на которую нажали
        tab.classList.add("active");
        // добавляем класс _active новой выбранной вкладке
        nextActiveItem.classList.add("active");
      });
    });
  }

  // селект сортировки
  btnsBestDeals?.forEach((block) => btnTabs(block.btn, block.content));
  const selectBtn = document.querySelector(".select__btn");
  const selectContent = document.querySelector(".select__content");
  selectBtn?.addEventListener("click", (e) => {
    selectBtn.classList.toggle("active");
    if (selectBtn.classList.contains("active")) {
      selectContent.classList.add("active");
    } else {
      selectContent.classList.remove("active");
    }
  });

  // filter положения
  const inputsRange = document.querySelectorAll(
    ".aside__category-select__box-label__input"
  );
  const textareasOutput = document.querySelectorAll(
    ".aside__category-select__box-label__textarea"
  );

  textareasOutput.forEach((textarea) => {
    textarea.addEventListener("input", (e) => {
      const targetId = textarea.getAttribute("data-target");
      const targetTextarea = document.getElementById(targetId);
      const inputValue = parseFloat(textarea.value) || 0;
      targetTextarea.value = inputValue;
    });
  });

  inputsRange.forEach((input) => {
    input.addEventListener("input", (e) => {
      const targetId = input.getAttribute("data-target");
      const targetTextarea = document.getElementById(targetId);
      const inputValue = input.value;
      targetTextarea.value = `${inputValue}`;
    });
  });

  // селект aside

  const selectsAside = document.querySelectorAll(
    ".aside__category-select__box-select"
  );

  selectsAside.forEach((select) => {
    select.addEventListener("click", () => {
      const target = select.getAttribute("data-select");
      const targetId = document.getElementById(target);
      const view = targetId.classList.contains("active");
      if (!view) {
        select.classList.add("active");
        targetId.classList.add("active");
      } else {
        select.classList.remove("active");
        targetId.classList.remove("active");
      }
    });
  });

  // Сброс всех чекбоксов
  const resetBtn = document.querySelector(".btnBorder__aside");

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      // Сброс всех чекбоксов
      const checkboxes = document.querySelectorAll(
        ".aside__category-select__block-checkbox"
      );
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });

      // Сброс всех радиокнопок
      const radioButtons = document.querySelectorAll(
        ".aside__category-select__box-label__input"
      );

      const textareas = document.querySelectorAll(
        ".aside__category-select__box-label__textarea"
      );

      radioButtons.forEach((radioButton) => {
        const targetId = radioButton.getAttribute("id");

        if (targetId === "minPrice") {
          radioButton.value = radioButton.getAttribute("min");
        } else {
          radioButton.value = radioButton.getAttribute("max");
        }
      });

      textareas.forEach((textarea) => {
        const targetId = textarea.getAttribute("data-target");
        if (targetId === "minPrice") {
          textarea.value = 14;
        } else {
          textarea.value = 20000;
        }
      });
    });
  }

  const asideScrollbar = document.querySelector(".aside__scrollbar");

  asideScrollbar?.addEventListener("scroll", function () {
    const scrollTop = this.scrollTop;
    const titel = document.querySelector(".aside__category-title");
    const block = document.querySelector(".aside__scrollbar");
    if (scrollTop > 1) {
      titel.style.paddingTop = "20px";
    } else if (scrollTop < 1) {
      titel.style.paddingTop = "0";
      block.style.paddingTop = "20px";
    }
  });

  const inputPostIndex = document.querySelector(
    ".inputForm_postIndex[type=number]"
  );

  inputPostIndex?.addEventListener("input", function () {
    const maxLength = 6;
    if (this.value.length > maxLength) {
      this.value = this.value.substring(0, maxLength);
    }
  });

  const allChecks = document.querySelectorAll(
    ".aside__category-select__block-checkbox"
  );

  allChecks.forEach((check, index) => {
    check.addEventListener(
      "click",
      (e) => {
        const checkId1 = document.getElementById("check1");
        const checkId2 = document.getElementById("check2");
        if (index === 0) {
          checkId2.checked = false;
          checkId1.checked = true;
        } else if (index === 1) {
          checkId2.checked = true;
          checkId1.checked = false;
        }
      },
      false
    );
  });
});
