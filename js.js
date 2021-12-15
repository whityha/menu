'use strict';


//создаем класс меню
class DayMenu {
    constructor({menu, egg=0, indeika=0, chicken=0, tomato=0, onion =0, carrot =0, cucumber=0, zucchini=0, redis=0, limon=0, freshGreen=0, apple=0,
        tvorog= 0, cream= 0, rise= 0, riseCow= 0, olive= 0, sweetener= 0, spices= 0}) {
        this.day = menu;
        this.chicken = {
            name: 'Куринное филе',
            count: chicken
        };
        this.egg = {
            name: 'Яйца',
            count: egg
        };
        this.tomato = {
            name: 'Помидоры',
            count: tomato
        };
        this.indeika = {
            name: 'Филе индейки',
            count: indeika
        };
        this.onion = {
            name: 'Лук репчатый',
            count: onion
        };
        this.carrot = {
            name: 'Морковь',
            count: carrot
        };
        this.cucumber = {
            name: 'Огурцы',
            count: cucumber
        };
        this.zucchini = {
            name: 'Кабачок',
            count: zucchini
        };
        this.redis = {
            name: 'Редис',
            count: redis
        };
        this.limon = {
            name: 'Лимон',
            count: limon
        };
        this.freshGreen = {
            name: 'Свежая зелень',
            count: freshGreen
        };
        this.apple = {
            name: 'Яблоки',
            count: apple
        };
        this.tvorog = {
            name: 'Творог 5%',
            count: tvorog
        };
        this.cream = {
            name: 'Сметана ',
            count: cream
        };
        this.rise= {
            name: 'Рис',
            count: rise
        };        
        this.riseCow= {
            name: 'Рисовая мука',
            count: riseCow
        };
        this.olive= {
            name: 'Оливковое масло',
            count: olive
        };
        this.sweetener= {
            name: 'Сахарозаменитель',
            count: sweetener
        };
        this.spices= {
            name: 'Специи',
            count: spices
        };
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
    //метод для отображения нового класса на странице
    render() {        
        let currentMenu = {};
        for (let key in this) {
            if(key === 'day') {
                continue;
            }
            if(this[key].count) {
                currentMenu[key] = this[key];
            }
        }
        const parent = document.querySelector('.wrapper');
        parent.innerHTML += `
        <div class='menu_day menu_day_${this.day}'>
            <div class='menu_day_number'>Меню: ${this.day}</div>
                <div class='menu_day_list menu_day_list_${this.day}'></div>
                <div class='menu_day_vote'>
                    <input type='checkbox'/>
                    <button type='button' class='deleteBlock'>Показать граммовку</button>
                </div>
        </div>`;
        
        for(let k in currentMenu) {      
            document.querySelector(`.menu_day_list_${this.day}`).innerHTML += `<li class='list-item'>${currentMenu[k].name} - ${currentMenu[k].count} грамм</li>`;
        }
        
    }
}

//при запуске скрипта мы отстраиваем наши меню взятую с баззы данных
let arrWithMenu = [];
window.addEventListener('load', () => {fetch('http://localhost:3000/menu')
    .then(menu => menu.json())
    .then(res => {
        console.log(res);
        let menu = res;
            menu.forEach( item => {
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
//Это скрипт для будущего подсчета суммы нужных продуктов
// const obj1 = arrWithMenu[0];
  
// const obj2 = arrWithMenu[1];
  
// const obj3 = arrWithMenu[2];
  
  
// function sumObjectsByKey(...objs) {
// return objs.reduce((c, b) => {
//     for (let k in b) {
//     if (b.hasOwnProperty(k))
//     c[k] = (c[k] || 0) + b[k];
//     }
//     return c;
// }, {});
// }

// console.log(sumObjectsByKey(obj1, obj2, obj3));

// Делегирование событий на кнопки списка нового меню
let arrayWithProducts = [
    {
        eng: 'milk',
        rus: 'Молоко'
    },
    {
        eng: 'egg',
        rus: 'Яйца'
    },
    {
        eng: 'chicken',
        rus: 'Курица'
    },
    {
        eng: 'onion',
        rus: 'Лук'
    },
    {
        eng: 'olive',
        rus: 'Оливковое масло'
    },
    {
        eng: 'spices',
        rus: 'Специи'
    },
    {
        eng: 'fish',
        rus: 'Рыба'
    },
    {
        eng: 'bread',
        rus: 'Хлеб'
    },
];
let newMenu = document.querySelector('.new-menu-list');
newMenu.addEventListener('click',(e) => {
    //если мы нажимаем на кнопку открытия списка и она не активна (список не активен)
    if(e.target && e.target.tagName === 'I' && !e.target.classList.contains('active')) {        
        const i = e.target.dataset.id;
        const btns = newMenu.querySelectorAll('.fas');  
        const list = document.querySelectorAll('.new-menu-box-list');

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
        
    // иначе если уже активная кнопка со стрелочкой, мы закрываем список и очищаем поле
    } else if (e.target && e.target.tagName === 'I' && e.target.classList.contains('active')) {
        const list = document.querySelectorAll('.new-menu-box-list');
        const i = e.target.dataset.id;       
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
    `;
    const parent = document.querySelector('.new-menu-list');
    parent.append(newItem);
    counter++;
});

//добавляем новое меню в базу 
const btnForAddMenu = document.querySelector('.new-menu-add-menu');
btnForAddMenu.addEventListener('click', () => {
    let newMenu = {};
    const countItems = document.querySelectorAll('.new-menu-list-input'); // колическтво продуктов
    const products = document.querySelectorAll('.new-menu-box-list-item'); // английское называние
    for( let i = 0; i < products.length; i++) {
        newMenu[products[i].dataset.name] = countItems[i].value;
    }

    let lastId;
    new Promise(() => {fetch('http://localhost:3000/menu')
        .then(menu => menu.json())
        .then(res => {
            lastId = res[res.length-1].id;
            console.log(lastId);
        })
        .then(() => {
            newMenu.id = lastId + 1;
            newMenu.menu = newMenu.id;
            newMenu = JSON.stringify(newMenu);
            fetch('http://localhost:3000/menu', {
                method: 'POST',
                body: newMenu,
                headers: {
                    'Content-type':'application/json'
                }
            });
        });
    });
});

//открываем меню с формой с помощью делегирования событий
let form = document.querySelector('.new-menu');
document.querySelector('.wrapper').addEventListener('click', (e) => {
    if(e.target.classList.contains('open-form')) {
        form.classList.toggle('activeForm');
    }
});