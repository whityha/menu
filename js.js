'use strict';

let arrWithRenderingMenu = [];
//создаем класс меню
class DayMenu {
    constructor(props) {
        this.products = props;       
    }

    currentMenu () {
        let currentMenu = {};
        for (let key in this) {
            if(this[key].count) {
                currentMenu[key] = this[key];
            }
        }
        return currentMenu;
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
        // fetch('http://localhost:3000/products', {
        //     method: 'POST',
        //     body: products,
        //     headers: 
        //         {'Content-type' : 'application/json'}
            
        // });
    }
    
    //метод для отображения нового класса на странице
    render() {        
        let currentMenu = {};
        function renderCurrentMenu(dayMenu,menu,bgColor) {
            for (let key in dayMenu) {
                // if(key === 'weak' || key === 'dayName') {
                //     continue;
                // }
                if(dayMenu[key].count) {
                    currentMenu[key] = dayMenu[key];
                }
            }            
            const parent = document.querySelector(`.content-list-${menu}`);
            parent.innerHTML += `
            <li class='content-list-item'>
                <div class='content-list-item-description bg_${bgColor}'>
                    <div class='num-day'>Неделя ${dayMenu.weak}. ${dayMenu.dayName}.</div>
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

        if(this.products.gurman) {
            renderCurrentMenu(this.products, 'gurman', 'green');
        } else if (this.products.torop) {
            renderCurrentMenu(this.products, 'torop', 'pink');
        } else if (this.products.tasty) {
            renderCurrentMenu(this.products, 'tasty', 'blue');
        } else if (this.products.autumn) {
            renderCurrentMenu(this.products, 'autumn', 'orange');
        }

        arrWithRenderingMenu.push(this.products);
    }
}
// Создаем функцию для подсчета продуктов в выбранных меню и навешиваем обработчик события на кнопку для инициации
document.querySelector('.total-count').addEventListener('click', showSumProducts);

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
        return arrWithRenderingMenu.find((menu) => { //ищем во всех отображенных менюшках на странице менюшки с checked по id и name
            return item.dataset.id == menu.id && item.dataset.name == menu.name;
        });
    });
   
    console.log(sumObjectsByKey(arrWithCheckedObj)); //выводим в консоль объект с уже посчитанными продуктами

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


// Открытие/закрытие описания каждого дня меню
const content = document.querySelector('.content');
content.addEventListener('click', (e) => {
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
        
});


//при запуске скрипта мы отстраиваем наши меню взятую с баззы данных
fetch('http://localhost:3000/menus')
    .then(res => res.json())
    .then(menus => {
        let counter = 0;
        menus.forEach(item => {
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
                    item.render(counter);
                    counter++;
                    });
                }
            );
        });
    });



// Делегирование событий на кнопки списка нового меню


let newMenu = document.querySelector('.new-menu-list');
newMenu.addEventListener('click',(e) => {
    let arrayWithProducts = [];
        if (e.target.classList.contains('new-menu-list-remove')) {
            e.target.parentElement.remove();
        } else
        //если мы нажимаем на кнопку открытия списка и она не активна (список не активен)
        if(e.target && e.target.tagName === 'I' && !e.target.classList.contains('active')) {        
            const j = e.target.dataset.id;
            const btns = newMenu.querySelectorAll('.fas');  
            const list = document.querySelectorAll('.new-menu-box-list');
            let i;
            btns.forEach((item, c) => {
                if(item.dataset.id == j) {
                    i = c;
                }
            });
            console.log(i);

            const menuNumber = () => {
                let num;
                const checkedMenus = document.querySelectorAll('.checkedMenu');
                checkedMenus.forEach((item, i) => {
                    if(item.checked) {
                        num = i;
                    }
                });                
                return num;
            };
            
            fetch(`http://localhost:3000/products_${menuNumber()}`)
            .then(res => res.json())
            .then(res => {
                arrayWithProducts = res;
            }).then(() => {
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
                            btns[i].classList.toggle('active');            
                            btns[i].classList.toggle('fa-angle-down');
                            btns[i].classList.toggle('fa-angle-up');
                        });
                    });

                    e.target.dataset.loaded = '1';
                }
            });
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
            list[i].innerHTML = `<li class='new-menu-box-list-item'></li>`;
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
    const checkedMenu = document.querySelectorAll('.checkedMenu');
    let currentMenu;

    checkedMenu.forEach(item => {
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
document.querySelectorAll('.checkedMenu').forEach(item => {
    item.addEventListener('click',()=> {
        document.querySelector('.new-menu-block').classList.add('select');
    });
});

// Это скрипт для подсчета суммы нужных продуктов
let obj1 = {a: 10, b: 20};
let obj2 = {a: 234, b: 34};
let arrrrrrrrrr = [obj1, obj2];
function sumObjectsByKey(objs) {
    console.log(objs);
    return objs.reduce((c, b) => {
        console.log(b);
        for (let k in b) {
        if (b.hasOwnProperty(k)){
            c[k] = (c[k] || 0) + b[k];}
        }
        return c;
    }, {});
}

