'use strict';
const localURL = 'http://localhost:3000';
const githubURL = 'https://menu-db.herokuapp.com';
const currentURL = localURL;
let arrWithObjRenderingMenu = []; // будущий массив с объектами, которые отрендерились на странице

//создаем класс меню
class DayMenu {
    constructor(props) {
        this.products = props;
        this.bgColor = props.name;            
    }    
    
    renderTotalCounts(parent) {
        clearInnerHTML(parent);
        for(let product in this.products) {
            if(this.products[product].count) {
            parent.innerHTML += `         
            <li class='sum-menu-list-item'>${this.products[product].name} - ${this.products[product].count} ${this.products[product].sizes}</li>
            `;
            }
        }  
        
    }

    //метод для отображения нового объекта на странице
    render(filter = true) {        
        let currentMenu = {};
        function renderCurrentMenu(dayMenuProducts,menu,bgColor) {
            function toDoCurrentMenu() {
                for (let key in dayMenuProducts) {
                    if(dayMenuProducts[key].count) {
                        currentMenu[key] = dayMenuProducts[key];
                    }
                }
            }
            toDoCurrentMenu(dayMenuProducts);            
            const parent = document.querySelector(`.content-list-${menu}`);            
            parent.innerHTML += `
            <li class='content-list-item'>
                <div class='content-list-item-description bg_${bgColor}'>
                    <div class='num-day'>Неделя ${dayMenuProducts.weak}. ${dayMenuProducts.dayName}.</div>
                    <button data-name=${menu} data-id=${dayMenuProducts.id} type='button' class='delete-btn'>Delete</button>
                    <button type='button'>
                        <i data-more=${menu} data-id=${dayMenuProducts.id} class='fas fa-angle-down open-btn'></i>
                    </button>
                    <input data-name=${menu} data-id=${dayMenuProducts.id} class='check' type='checkbox'/>
                </div>
                <div data-name=${menu} data-id=${dayMenuProducts.id} class='content-list-item-more'>
                    <div class='menu-img'><img src='' alt='Меню'/>
                    </div>
                    <ul class='menu-list menu_day_list_${menu}${dayMenuProducts.id}'>
                    <b>СПИСОК ПРОДУКТОВ:</b>
                        
                    </ul>
                    <div class='recept recept-${menu}${dayMenuProducts.id}'>
                        
                    </div>
                </div>
            </li>`;
            parent.querySelector(`.recept-${menu}${dayMenuProducts.id}`).innerText = dayMenuProducts.recept;
            for(let k in currentMenu) {    
                document.querySelector(`.menu_day_list_${menu}${dayMenuProducts.id}`).innerHTML += `<li class='menu-item'>${currentMenu[k].name} - ${currentMenu[k].count} ${currentMenu[k].sizes}</li>`;
            }
        }

        renderCurrentMenu(this.products, this.products.name, this.bgColor);
        if(filter) {arrWithObjRenderingMenu.push(this.products);} // в filter передаем false, чтобы в массив со всеми объектами меню не пушились повторно
    }
}
//навешиваем обработчик события на кнопку для инициации счета продуктов и отображения блока
document.querySelector('.total-count').addEventListener('click', (e) => {
    const wrapperClass = '.sum-menu-wrapper';
    let allCheckMenu = document.querySelectorAll('.content .check');
    allCheckMenu = [...allCheckMenu];
    let a = allCheckMenu.some(item => item.checked);
    if(document.querySelector(wrapperClass).offsetHeight == 0 && a) {
        showSumProducts();
        openBlock(0.5, wrapperClass);
    } else {
        showSumProducts();
    }    
});
const btnCloseSumArea = document.querySelector('.sum-menu-close-btn');

btnCloseSumArea.addEventListener('click', () => {
    closeBlock(0.5, '.sum-menu-wrapper');
});

// Создаем функцию для подсчета продуктов в выбранных меню 
function showSumProducts() {
    let allCheckMenu = document.querySelectorAll('.content .check'); //выбираем все инпуты с чеком
    let arrWithChekedMenu = [];
    let arrWithCheckedObj = [];
    allCheckMenu.forEach((item, i) => { //находим все элементы, которые были checked
        if(item.checked) { 
            arrWithChekedMenu.push(item);   //пушим сами элеметы с чеком в массив 
        }
    });
    arrWithCheckedObj = arrWithChekedMenu.map(item => { //преобразуем массив с менюшками, которые checked
        return arrWithObjRenderingMenu.find((menu) => { //ищем во всех отображенных менюшках на странице менюшки с checked по id и name
            return item.dataset.id == menu.id && item.dataset.name == menu.name;
        });
    });
    if(arrWithChekedMenu.length > 0) {
        const parent = document.querySelector('.sum-menu-list');
        new DayMenu(sumObjectsByKey(arrWithCheckedObj)).renderTotalCounts(parent); //рендерим объект с уже посчитанными продуктами
        return true;
    } else {
        alert('Выберите хотябы одно меню');
        return false;
    }

    function sumObjectsByKey(objs) { //функция для подсчета суммы продуктов из разных меню
        return objs.reduce((c, b) => {            
            for (let k in b) {
                if(typeof(b[k]) == 'object') {
                    if (c[k]) {
                        c[k].count = +(c[k].count || 0) + +b[k].count;
                    } else {
                        c[k] = JSON.parse(JSON.stringify(b[k]));
                    }
                }
            }                
            return c;
        }, {});
    }

   
}


//Работа с кнопками контента через делегирование событий
const content = document.querySelector('.content');
content.addEventListener('click', (e) => {   
    openDescriptionMenu(e);
    toCheckDayMenu(e);
    deleteDayMenu(e);
    toggleListMenu(e);       
});


function toCheckDayMenu(e) {

    if(e.target && e.target.classList.contains('content-list-item-description')) {
        let check = e.target.querySelector('.check').checked;
        if(check) {
            e.target.querySelector('.check').checked = false;
        } else {
            e.target.querySelector('.check').checked = true;
        }
    }

    if (e.target.classList.contains('num-day')) {
        let check = e.target.parentElement.querySelector('.check').checked;
        if(check) {
            e.target.parentElement.querySelector('.check').checked = false;
        } else {
            e.target.parentElement.querySelector('.check').checked = true;
        }
    }
}

function openDescriptionMenu(e) { //открывает описание конкретного дня + подгружает фотографию
    if(e.target && e.target.classList.contains('open-btn')) {
        let id = e.target.dataset.id;
        let nameMenu = e.target.dataset.more;
        e.target.classList.toggle('fa-angle-down');
        e.target.classList.toggle('fa-angle-up');
        let discription = e.target.parentElement.parentElement.nextElementSibling;
        discription.classList.toggle('open');
        discription.querySelector('.menu-img img').src = `./images/${nameMenu}/${id}.JPG`;        
    }
}
function deleteDayMenu(e) { //удаление отрендеренного дневного меню с бд
    if(e.target && e.target.classList.contains('delete-btn')) {
        let answer = confirm('Вы действиетльно хотите удалить этот рецепт?');
        if(answer) {
            fetch(`${currentURL}/${e.target.dataset.name}/${e.target.dataset.id}`, {
                method: 'DELETE'
            }).then(res => { 
                if(res.status == 200) {
                    e.target.parentElement.parentElement.remove();
                } else {
                    alert('Какая-то ошибка');
                }            
            });
        }
    }
}
//при запуске скрипта мы отстраиваем наши меню взятую с баззы данных
fetch(`${currentURL}/menus`)
    .then(res => res.json())
    .then(answ => {
        console.log(answ);
        answ.forEach(item => {
            let contentLists = document.querySelectorAll('.content-list');
                contentLists.forEach(contentList => {
                    clearInnerHTML(contentList);
                });

            let arrWithMenu = [];
            let arrWithMenuId = [];
            fetch(`${currentURL}/${item.name}`)
            .then(menu => menu.json())
            .then(res => {               
                    res.forEach(item => {
                        console.log(item.id);
                        arrWithMenuId.push(item.id);
                        arrWithMenu.push(new DayMenu(item));                        
                    });
                }   
            )
            .then(() => {
                arrWithMenuId.sort((a, b) => a - b).forEach(id => {
                    arrWithMenu.find(dayMenu => dayMenu.products.id == id).render();//решение для того, чтобы рендерилось по порядку
                });
            });
        });
});

// Делегирование событий на кнопки списка нового меню
function menuName(className) { //функция возвращает имя выбранного меню по списку
    const checkedMenus = document.querySelectorAll(className);
    let name;
        checkedMenus.forEach(item => {
            if(item.checked) {
                name = item.dataset.name;
            }
        });
    return name;   
}
let arrayWithProducts = [];
const checkMenus = document.querySelector('.new-menu-form-menus');
const newMenu = document.querySelector('.new-menu-list');

function addMenu(e) {    //очен
    if (e.target.classList.contains('new-menu-list-remove')) {
        e.target.parentElement.remove();
    }
    //если мы нажимаем на кнопку открытия списка и она не активна (список не активен)
    if (e.target && e.target.tagName === 'I' && !e.target.classList.contains('active')) { 
        console.log(e.target);
        const j = e.target.dataset.id;
        const btns = newMenu.querySelectorAll('.fas');  
        const list = document.querySelectorAll('.new-menu-box-list');
        let i;
        btns.forEach((item, c) => { // функционал для того, чтобы при удалении поля с новым продуктом не сбивался счет
            if(item.dataset.id == j) {
                i = c;
            }
        });
        console.log(i);    
        
        if(Object.keys(arrayWithProducts).length) { //проверка, что запрос вернет не пустой объект в случае ошибки
        //Закрываем другой открытый список, если он открыт (активен, но ничего не выбрано)
            list.forEach((item, index) => {
                if(item.classList.contains('active')) {
                    item.innerHTML = "<li class='new-menu-box-list-item'></li>";
                    item.classList.toggle('active');
                    item.classList.toggle('relative');
                    btns[index].classList.toggle('active');
                    btns[index].classList.toggle('fa-angle-down');
                    btns[index].classList.toggle('fa-angle-up');
                }
            });

            // добавляем классы активности на список выпадающего меню и на кнопку стрелочки
            e.target.classList.toggle('active');    
            e.target.classList.toggle('fa-angle-down');
            e.target.classList.toggle('fa-angle-up');        
            list[i].classList.toggle('relative');
            list[i].classList.toggle('active');
            list[i].classList.toggle('overflow');

            //формируем сам список из невыбранных продуктов        
            list[i].innerHTML = 
            arrayWithProducts.map((item) => {
                let added = newMenu.querySelectorAll('.add');
                let arrayWithProductsNew = [];
                added.forEach(item => arrayWithProductsNew.push(item.innerText));
                if(!arrayWithProductsNew.includes(item.rus)) {
                return `<li data-name='${item.eng}' class='new-menu-box-list-item'>${item.rus}</li>`;}                 
            }).join('');        
            
        
            //навешиваем на каждый элемент списка обработчик клика. При клике мы заполняем поле выбранным элементом
            const items = list[i].querySelectorAll('.new-menu-box-list-item');
            items.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.target.classList.add('add');
                    list[i].innerHTML = e.target.outerHTML;
                    list[i].classList.toggle('relative');                
                    list[i].classList.toggle('active');
                    list[i].classList.toggle('overflow');  
                    btns[i].classList.toggle('active');            
                    btns[i].classList.toggle('fa-angle-down');
                    btns[i].classList.toggle('fa-angle-up');
                });
            });
        } else {alert('Проверьте подключение к интернету');}
        
// иначе если уже активная кнопка со стрелочкой, мы закрываем список и очищаем поле
    } else if (e.target && e.target.tagName === 'I' && e.target.classList.contains('active')) {
        const list = document.querySelectorAll('.new-menu-box-list');
        const j = e.target.dataset.id;
        const btns = newMenu.querySelectorAll('.fas');
        let i;
        btns.forEach((item, c) => {
            if(item.dataset.id == j) {
                i = c;
            }
        });

        e.target.classList.toggle('fa-angle-down');
        e.target.classList.toggle('active');
        e.target.classList.toggle('fa-angle-up');
        list[i].classList.toggle('relative');        
        list[i].classList.toggle('active');
        list[i].classList.toggle('overflow');
        list[i].innerHTML = `<li class='new-menu-box-list-item'></li>`;
    }
}
checkMenus.addEventListener('change', (e) => { //функция, которая подгружает массив со списком продуктов при клике на одно из меню
    if(e.target.classList.contains('checkNewMenu')) {   
            fetch(`${currentURL}/products_${menuName('.checkNewMenu')}`)
                .then(res => res.json())
                .then(res => {
                    arrayWithProducts = res;
                }).then(() => {               
                    newMenu.addEventListener('click', addMenu);//навешиваем обработчик события на новое меню                  
                });  
    }
    checkMenus.addEventListener('click', (e) => {  
        console.log(e.target.checked);           
            if(e.target.classList.contains('checkNewMenu')) {
                console.dir(e.target);
                let answ = confirm('Вы действительно хотите выбрать другое меню?');
                if(answ) {
                    clearNewMenuList();        
                    newMenu.removeEventListener('click', addMenu); //удаляем ранее навешенный обработчик события
                
                    fetch(`${currentURL}/products_${menuName('.checkNewMenu')}`)
                        .then(res => res.json())
                        .then(res => {
                            arrayWithProducts = res;
                        }).then(() => {               
                            newMenu.addEventListener('click', addMenu);//навешиваем обработчик события на новое меню                  
                        });  
                } else {
                    e.preventDefault();
                }                                
            }
        });              
},{once:true});

// Создаем функционал для того, чтобы добавлять на кнопку "+" новый продукт из меню
let counter = 2; // каунтер нужен для того, чтобы кнопке повесить уникальный id.
let plus = document.querySelector('.new-menu-add-item');
plus.addEventListener('click', () => {
    const newItem = document.createElement('li');
    newItem.classList.add('new-menu-list-item');
    newItem.setAttribute('new', '');
    newItem.innerHTML = `
        <div class='new-menu-box'>
            <ul class='new-menu-box-list'>
                <li  class='new-menu-box-list-item'></li>
            </ul>
            <button type='button' data-id=${counter} class='btn-box-menu active'>
                <i data-id=${counter} class="fas fa-angle-down"></i>
            </button>
        </div>
        <input class='new-menu-list-input' placeholder="кол">
        <select class='new-menu-list-select'>
            <option>грамм</option>
            <option>шт</option>
        </select>
        <button type='button' class='new-menu-list-remove'>X</button>
    `;
    const parent = document.querySelector('.new-menu-list');
    parent.append(newItem);
    counter++;
});


//добавляем новое меню в базу
const btnForAddMenu = document.querySelector('.new-menu-add-menu');
btnForAddMenu.addEventListener('click', (e) => {
    let newDayMenu = {},
        currentMenu;
    const countItems = newMenu.querySelectorAll('.new-menu-list-input'), // колическтво продуктов
            products = newMenu.querySelectorAll('.new-menu-box-list-item'), // отсюда берем английское название
            sizes = newMenu.querySelectorAll('.new-menu-list-select'), // размерность продукта
            checkNewMenu = document.querySelectorAll('.checkNewMenu'), //все меню с возможным check
            numberDay = newMenu.querySelector('.dayName');  //выбирает объект select с днями

    checkNewMenu.forEach(item => { //по имени меню назначаем его в переменную currentMenu
        if(item.checked) {
            newDayMenu[item.dataset.name] = true;
            currentMenu = item.dataset.name;
        }
    });

    newDayMenu.dayName = newMenu.querySelector('.dayName').value;
    newDayMenu.weak = newMenu.querySelector('.weak').value;
    newDayMenu.recept = document.querySelector('.new-menu-list-recept').value;
    newDayMenu.name = currentMenu;
    newDayMenu.id = `${newDayMenu.weak}${numberDay.selectedIndex + 1}`; 
    
    products.forEach((item, i) => {
        newDayMenu[item.dataset.name] = {};
        newDayMenu[item.dataset.name].count = countItems[i].value;
        newDayMenu[item.dataset.name].name = products[i].innerText;
        newDayMenu[item.dataset.name].sizes = sizes[i].value;
    });
    //условия для валидации ввода данных
    let arrProducts = [];
    let arrValueProducts = [];
    countItems.forEach(item => arrValueProducts.push(item.value));
    products.forEach(item => arrProducts.push(item.innerText));

    if(arrProducts.some(item => item == false) || arrProducts.length == 0) {
        alert('введите название продукта, либо удалите поле с пустым значением');
    } else if(arrValueProducts.some(item => item == false)) {
        alert('введите количество продуктов, либо удалите поле с пустым значением');
    } else {
        e.target.setAttribute('disabled', '');    
        fetch(`${currentURL}/${currentMenu}/${newDayMenu.id}`) //проверяем id и постим, если такого id нет
            .then(res => {
                if(res.status == 404) {
                    let newDayMenuJSON = JSON.stringify(newDayMenu);
                    fetch(`${currentURL}/${currentMenu}`, {
                        method: 'POST',
                        body: newDayMenuJSON,
                        headers: {
                            'Content-type':'application/json'
                        }
                    }).then(res => {
                        if(res.status == 201) {
                            document.querySelector(`.content-list-${currentMenu}`).innerHTML += `
                            <div>Только что добавленные меню:</div>
                            `;
                            new DayMenu(newDayMenu).render();
                        }
                        clearNewMenuList();
                        e.target.removeAttribute('disabled');
                    });  
                } else if (res.status == 200) {
                    e.target.removeAttribute('disabled');
                    alert('Такой день недели уже существует. Сперва удалите старый');
                }
            }); 
    }
});

//открываем меню с формой с помощью делегирования событий
let form = document.querySelector('.new-menu');
document.querySelector('.open-form').addEventListener('click', (e) => {
    if(e.target.classList.contains('open-form')) {
        form.classList.toggle('activeForm');
    }
});
document.querySelector('.closeBtn .fas').addEventListener('click', ()=>{
    form.classList.toggle('activeForm');
});

//при выборе активного меню при добавлении, выезжает форма, которую нужно заполнять
document.querySelectorAll('.checkNewMenu').forEach(item => {
    item.addEventListener('click',()=> {
        document.querySelector('.new-menu-block').classList.add('select');
    });
});
function clearInnerHTML(elem) {
    elem.innerHTML = '';
}

function clearNewMenuList() { //очищаем форму нового меню
    document.querySelectorAll('.new-menu [new]').forEach(item => item.remove());
    document.querySelector('.new-menu-list-recept').value = '';
    document.querySelector('.new-menu .dayName').firstElementChild.selected = true;
    document.querySelector('.new-menu-list-weak .weak').firstElementChild.selected = true;
    document.querySelector('.new-menu-box-list').innerHTML = `<li  class='new-menu-box-list-item'></li>`;
    document.querySelector('.new-menu .new-menu-list-input').value = '';
}



function currentHeightBlock(name) {
    const list = document.querySelector(`.content-list-${name}`);
    return list.offsetHeight;
}
function closeListMenu(e) {    
          
        e.target.innerText = 'Показать';
        let menuName = e.target.dataset.name;
        let height = currentHeightBlock(`${menuName}`);
        const heightWrapper = document.querySelector(`.content-wrapper-${menuName}`).offsetHeight;
        if(heightWrapper) {
            e.target.setAttribute('disabled', '');
            let int = setInterval(() => {
                document.querySelector(`.content-wrapper-${menuName}`).style.height =  height + 'px';
                height = height - 5;
                if(height <= 0) {
                    document.querySelector(`.content-wrapper-${menuName}`).style.height =  0 + 'px';
                    clearInterval(int);
                    e.target.removeAttribute('disabled');
                }
            }, 4); 
        }
        e.target.classList.remove('show');     
    
    function currentHeightBlock(name) {
        const list = document.querySelector(`.content-list-${name}`);
        return list.offsetHeight;
    }    
}

function openListMenu(e) {   
    
        e.target.innerText = 'Скрыть';        
        let menuName = e.target.dataset.name;
        let height = document.querySelector(`.content-wrapper-${menuName}`).offsetHeight;
        const list = document.querySelector(`.content-list-${menuName}`);
        if(height == 0) {
            e.target.setAttribute('disabled', '');
            let int = setInterval(() => {
                document.querySelector(`.content-wrapper-${menuName}`).style.height =  height + 'px';        
                height = height + 3;
                if(height >= list.offsetHeight) {
                    clearInterval(int);
                    document.querySelector(`.content-wrapper-${menuName}`).style.height = 'auto';
                    e.target.removeAttribute('disabled');
                }
            }, 4);
        }        
        e.target.classList.add('show');        
    
}

function toggleListMenu(e) {
    if(e.target.classList.contains('show') && e.target.classList.contains('content-show-menu-btn')) {
        closeListMenu(e);
    } else if(!e.target.classList.contains('show') && e.target.classList.contains('content-show-menu-btn')){
        openListMenu(e);
    }
}

document.querySelector('.filter-new').addEventListener('click', (e) => {
    if(e.target.classList.contains('filter-new-box-head-btn') && !e.target.classList.contains('open')) {
        openFilterBlock(e, 0.4);
    } else if (e.target.classList.contains('filter-new-box-head-btn') && e.target.classList.contains('open')) {
        closeFilterBlock(e, 0.4);
    }
});

document.querySelector('.filter-new-button').addEventListener('click', (e) => {
    document.querySelector('.filter-new').classList.toggle('filter-new-open');
    if(e.target.innerText == 'ОТКРЫТЬ ФИЛЬТР') {
        e.target.innerText = 'ЗАКРЫТЬ ФИЛЬТР';
    } else {
        e.target.innerText = 'ОТКРЫТЬ ФИЛЬТР';
    }
});

function openFilterBlock(e, sec) {
    e.target.classList.add('open');
        const wrapper = e.target.parentElement.nextElementSibling;
        const heightList = wrapper.lastElementChild;
        let height = 0;
        let k = heightList.offsetHeight/100;
        let i;
        const int = setInterval(() => {
            i = (height/heightList.offsetHeight)*100;
            heightList.style.transform = `translateY(${-100+i}%)`;            
            wrapper.style.height = height + 'px';
            height = height + 1*k*(1/sec);
            if(height >= heightList.offsetHeight) {
                wrapper.style.height = heightList.offsetHeight + 'px';
                heightList.style.transform = `translateY(0%)`;
                clearInterval(int);
                wrapper.style.height = 'auto';
            }
        }, 5);
}

function closeFilterBlock(e, sec) {
    e.target.classList.remove('open');
        const wrapper = e.target.parentElement.nextElementSibling;
        const heightList = wrapper.lastElementChild;
        let height = heightList.offsetHeight;
        let k = heightList.offsetHeight/100;
        let i;
        const int = setInterval(() => {
            i = (height/heightList.offsetHeight)*100;
            heightList.style.transform = `translateY(${-100+i}%)`;          
            wrapper.style.height = height + 'px';
            height = height - 1*k*(1/sec);
            if(height <= 0) {
                heightList.style.transform = `translateY(-100%)`;
                wrapper.style.height = 0 + 'px';
                wrapper.querySelectorAll('.filter-new-box-wrapper').forEach(item => {
                    item.previousElementSibling.lastElementChild.classList.remove('open');
                    
                    item.style.height = 0;
                });
                clearInterval(int);                
            }
        }, 5);
}
//Очищаем фильтр при нажатии на кнопку Очистить
document.querySelector('.filter-new-btns-reset').addEventListener('click', () => {
    document.querySelectorAll('.filter-new input').forEach(item => 
        item.checked = false);
    
        clearNewFilter();
});

//
function toNewFilterObj(arr) { //функция, которая фильтрует массив с объектами меню и рендерит на страницу
    const input = document.querySelectorAll('.filter-new input');
    let contentLists = document.querySelectorAll('.content-list');    
        let arrWithProducts = [];
        input.forEach(item => {
            if(item.checked) {
            arrWithProducts.push(item.previousElementSibling.innerText);
            }
        });
        console.log(arrWithProducts);
        if(arrWithProducts.length) {
        arrWithProducts.forEach(product => {    
            arr = arr.filter(item => {            
                for(let key in item) {
                    if(typeof(item[key]) == 'object' && item[key].name === product) {
                        return true;
                    }
                }
            });
        });
        
        contentLists.forEach(contentList => {
            clearInnerHTML(contentList);
        });
        arr.forEach(dayMenuObj => {
            new DayMenu(dayMenuObj).render(false); //передаем false, чтобы в массив с объектами всех отображенных меню не пушились меню повторно
        });
    } else {        
        alert('Выберите продукты');
    }    
}

function clearNewFilter() {
    const contentLists = document.querySelectorAll('.content-list');
    contentLists.forEach(contentList => {
        clearInnerHTML(contentList);
    });
    arrWithObjRenderingMenu.forEach(menu => new DayMenu(menu).render(false));
}

document.querySelector('.filter-new .filter-new-btns-done').addEventListener('click', () => {
    toNewFilterObj(arrWithObjRenderingMenu);
});


function openBlock(sec, wrapperClass) {
    const wrapper = document.querySelector(wrapperClass);
    const heightList = wrapper.lastElementChild;
    let height = 0;
    let k = heightList.offsetHeight/100;
    let i;
    const int = setInterval(() => {
        i = (height/heightList.offsetHeight)*100;
        heightList.style.transform = `translateY(${-100+i}%)`;            
        wrapper.style.height = height + 'px';
        height = height + 1*k*(1/sec);
        if(height >= heightList.offsetHeight) {
            wrapper.style.height = heightList.offsetHeight + 'px';
            heightList.style.transform = `translateY(0%)`;
            clearInterval(int);
            wrapper.style.height = 'auto';
        }
    }, 5);
}

function closeBlock(sec, wrapperClass) {
        const wrapper = document.querySelector(wrapperClass);
        const heightList = wrapper.lastElementChild;
        let height = heightList.offsetHeight;
        let k = heightList.offsetHeight/100;
        let i;
        const int = setInterval(() => {
            i = (height/heightList.offsetHeight)*100;
            heightList.style.transform = `translateY(${-100+i}%)`;          
            wrapper.style.height = height + 'px';
            height = height - 1*k*(1/sec);
            if(height <= 0) {
                heightList.style.transform = `translateY(-100%)`;
                wrapper.style.height = 0 + 'px';
                clearInterval(int);                
            }
        }, 5);
}