'use strict';

let arrWithObjRenderingMenu = []; // будущий массив с объектами, которые отрендерились на странице
//создаем класс меню
class DayMenu {
    constructor(props) {
        this.products = props;
        this.bgColor = props.name;            
    }    

    // метод, чтобы запостить все продукты, что есть в конструкторе в bd
    post() {
        let products = [];
        let arrrrr = [];
        for( let key in this) {
            if(key !== 'day') {
            let obj = {};
            arrrrr.push(this[key]);
            obj.eng = key;
            obj.rus = this[key].name;
            products.push(obj);
            }
        }
        console.log(arrrrr);
        console.log(products);
        products = JSON.stringify(products);
    }

    renderTotalCounts(parent) {
        clearInnerHTML(parent);
        for(let product in this.products) {
            parent.innerHTML += `         
            <li class='sum-menu-list-item'>${this.products[product].name} - ${this.products[product].count}${this.products[product].sizes}</li>
        `;
        }  
        
    }

    //метод для отображения нового класса на странице
    render(filter = true) {        
        let currentMenu = {};
        function renderCurrentMenu(dayMenu,menu,bgColor) {
            function toDoCurrentMenu() {
                for (let key in dayMenu) {
                    if(dayMenu[key].count) {
                        currentMenu[key] = dayMenu[key];
                    }
                }
            }
            toDoCurrentMenu(dayMenu);            
            const parent = document.querySelector(`.content-list-${menu}`);
            parent.innerHTML += `
            <li class='content-list-item'>
                <div class='content-list-item-description bg_${bgColor}'>
                    <div class='num-day'>Неделя ${dayMenu.weak}. ${dayMenu.dayName}.</div>
                    <button data-name=${menu} data-id=${dayMenu.id} type='button' class='delete-btn'>Delete</button>
                    <button type='button'>
                        <i data-more=${menu} data-id=${dayMenu.id} class='fas fa-angle-down open-btn'></i>
                    </button>
                    <input data-name=${menu} data-id=${dayMenu.id} class='check' type='checkbox'/>
                </div>
                <div data-name=${menu} data-id=${dayMenu.id} class='content-list-item-more'>
                    <div class='menu-img'><img src='./images/${menu}/${dayMenu.weak}_${dayMenu.dayName}.JPG' alt='Меню'/>
                    </div>
                    <ul class='menu-list menu_day_list_${menu}${dayMenu.id}'>
                    <b>СПИСОК ПРОДУКТОВ:</b>
                        
                    </ul>
                    <div class='recept recept-${menu}${dayMenu.id}'>
                        
                    </div>
                </div>
            </li>`;
            parent.querySelector(`.recept-${menu}${dayMenu.id}`).innerText = dayMenu.recept;
            for(let k in currentMenu) {    
                document.querySelector(`.menu_day_list_${menu}${dayMenu.id}`).innerHTML += `<li class='menu-item'>${currentMenu[k].name} - ${currentMenu[k].count} ${currentMenu[k].sizes}</li>`;
            }
        }

        renderCurrentMenu(this.products, this.products.name, this.bgColor);
        if(filter) {arrWithObjRenderingMenu.push(this.products);} // в filter передаем false, чтобы в массив со всеми объектами меню не пушились повторно
    }
}
//навешиваем обработчик события на кнопку для инициации счета продуктов
document.querySelector('.total-count').addEventListener('click', () => { toAddActiveClass(showSumProducts());});

function toAddActiveClass(a = true) {
    if(a) {
    document.querySelector('.sum-menu').classList.add('active');
    document.querySelector('.sum-menu-block').classList.add('active');
    }
}

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
        new DayMenu(sumObjectsByKey(arrWithCheckedObj)).renderTotalCounts(parent); //выводим в консоль объект с уже посчитанными продуктами
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
    toChangeDayMenu(e);
    deleteDayMenu(e);        
});
function toChangeDayMenu(e) {
    if(e.target && e.target.classList.contains('content-list-item-description')) {
        let check = e.target.querySelector('.check').checked;
        check ? check = false : check = true;
    }
}
function openDescriptionMenu(e) {
    if(e.target && e.target.classList.contains('open-btn')) {
        let i = e.target.dataset.id;
        let j = e.target.dataset.more;
        let contents = content.querySelectorAll('.content-list-item-more');
        e.target.classList.toggle('fa-angle-down');
        e.target.classList.toggle('fa-angle-up');
        contents.forEach(item => {
            if(item.dataset.id == i && item.dataset.name == j) {                           
                item.classList.toggle('open');
            }
        });
    }
}
function deleteDayMenu(e) { //удаление отрендеренного дневного меню с бд
    if(e.target && e.target.classList.contains('delete-btn')) {
        let answer = confirm('Вы действиетльно хотите удалить этот рецепт?');
        if(answer) {
            fetch(`http://localhost:3000/${e.target.dataset.name}/${e.target.dataset.id}`, {
                method: 'DELETE'
            });
        }
    }
}
//при запуске скрипта мы отстраиваем наши меню взятую с баззы данных
fetch('http://localhost:3000/menus')
    .then(res => res.json())
    .then(menus => {
        menus.forEach(item => {
            let contentLists = document.querySelectorAll('.content-list');
                contentLists.forEach(contentList => {
                    clearInnerHTML(contentList);
                });

            let arrWithMenu = [];
            fetch(`http://localhost:3000/${item.name}`)
            .then(menu => menu.json())
            .then(res => {                
                    res.forEach( item => {
                        arrWithMenu.push(new DayMenu(item));                        
                    });
                }   
            )
            .then(() => {
                arrWithMenu.forEach(item => {
                    item.render();
                    });
                }
            );
        });
});

// Делегирование событий на кнопки списка нового меню
function menuName(className) { //функция возвращает имя выбранного меню по списку
    const checkedMenus = document.querySelectorAll(className);
    let num;
        checkedMenus.forEach(item => {
            if(item.checked) {
                num = item.dataset.name;
            }
        });
    return num;   
}
let arrayWithProducts = [];
const checkMenus = document.querySelector('.new-menu-form-menus');
const newMenu = document.querySelector('.new-menu-list');
function addMenu(e) {    
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
        }
        
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

// 
checkMenus.addEventListener('click', (e) => { //функция, которая подгружает массив со списком продуктов
    if(e.target.classList.contains('checkedNewMenu')) {        
        newMenu.removeEventListener('click', addMenu); //удаляем ранее навешенный обработчик события
        console.log(e.target);
        fetch(`http://localhost:3000/products_${menuName('.checkedNewMenu')}`)
            .then(res => res.json())
            .then(res => {
                arrayWithProducts = res;
            }).then(() => {
                console.log(arrayWithProducts);                
                newMenu.addEventListener('click', addMenu);  //навешиваем обработчик события на новое меню            
            });          
        }
});

// Создаем функционал для того, чтобы добавлять на кнопку "+" новый продукт из меню
let counter = 2; // каунтер нужен для того, чтобы кнопке повесить уникальный id.
let plus = document.querySelector('.new-menu-add-item');
plus.addEventListener('click', () => {
    const newItem = document.createElement('li');
    newItem.classList.add('new-menu-list-item');
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
btnForAddMenu.addEventListener('click', () => {
    let newDayMenu = {};
    const countItems = newMenu.querySelectorAll('.new-menu-list-input'); // колическтво продуктов
    const products = newMenu.querySelectorAll('.new-menu-box-list-item'); // английское название
    const sizes = newMenu.querySelectorAll('.new-menu-list-select'); // размерность продукта
    const checkedNewMenu = document.querySelectorAll('.checkedNewMenu');
    let currentMenu;

    checkedNewMenu.forEach(item => {
        if(item.checked) {
            newDayMenu[item.dataset.name] = true;
            currentMenu = item.dataset.name;
        }
    });

    newDayMenu.dayName = newMenu.querySelector('.dayName').value;
    newDayMenu.weak = newMenu.querySelector('.weak').value;
    newDayMenu.recept = document.querySelector('.new-menu-list-recept').value;
    newDayMenu.name = currentMenu;
    
    products.forEach((item, i) => {
        newDayMenu[item.dataset.name] = {};
        newDayMenu[item.dataset.name].count = countItems[i].value;
        newDayMenu[item.dataset.name].name = products[i].innerText;
        newDayMenu[item.dataset.name].sizes = sizes[i].value;
    });

    let lastId;
    new Promise(() => {fetch(`http://localhost:3000/${currentMenu}`)
        .then(menu => menu.json())
        .then(res => {
            if(res.length) {
            lastId = res[res.length-1].id;
            } else { 
                lastId = 0;
            }
            console.log(lastId);
        })
        .then(() => {
            newDayMenu.id = lastId + 1;
            newDayMenu = JSON.stringify(newDayMenu);
            fetch(`http://localhost:3000/${currentMenu}`, {
                method: 'POST',
                body: newDayMenu,
                headers: {
                    'Content-type':'application/json'
                }
            });
        });
    });
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
document.querySelectorAll('.checkedNewMenu').forEach(item => {
    item.addEventListener('click',()=> {
        document.querySelector('.new-menu-block').classList.add('select');
    });
});

function toFilterObj(arr, inputClass) { //функция, которая фильтрует массив с объектами меню и рендерит на страницу
    const input = document.querySelector(inputClass).value;
    let filteredObjs = arr;
    if(input) {
        let arrWithProducts = turnStringIntoArray(input);
        arrWithProducts = arrWithProducts.map(productName => productName[0].toUpperCase() + productName.slice(1).toLowerCase()); //приобразуем к требуемому виду
        arrWithProducts.forEach(product => {    
            filteredObjs = filteredObjs.filter(item => {            
                for(let key in item) {
                    if(typeof(item[key]) == 'object' && item[key].name === product) {
                        return true;
                    }
                }
            });
        });
        let contentLists = document.querySelectorAll('.content-list');
        contentLists.forEach(contentList => {
            clearInnerHTML(contentList);
        });
        filteredObjs.forEach(dayMenuObj => {
            new DayMenu(dayMenuObj).render(false); //передаем false, чтобы в массив с объектами всех отображенных меню не пушились меню повторно
        });
    } else {
        alert('Введите продукты');
    }    
}

function clearInnerHTML(elem) {
    elem.innerHTML = '';
}

document.querySelector('.filter_block button').addEventListener('click', () => {toFilterObj(arrWithObjRenderingMenu, '.input-filter');});

function turnStringIntoArray(str) {
    return str.split(', ');
}