'use strict';

let MENU =  [
    {id: 11, menu: 1, milk:4, fish:10, egg: 1},
    {id: 71, menu: 2, egg: 4, indeika: 200, chicken: 200, tomato: 400, onion : 50, carrot : 50, cucumber: 200, zucchini: 300, 
    redis: 100, limon: 1, freshGreen: 1, apple: 300, tvorog: 180, cream: 110, rise: 50, riseCow: 25, olive: 29, sweetener: 1, spices: 1},
    {id: 31, menu: 3, egg: 4, indeika: 200, chicken: 200, tomato: 400, onion : 50, carrot : 50, cucumber: 200, zucchini: 300, 
    redis: 100, limon: 1, freshGreen: 1, apple: 300, tvorog: 180, cream: 110, rise: 50, riseCow: 25, olive: 29, sweetener: 1, spices: 1},
    {id:41 , menu: 4, egg: 4, indeika: 200, chicken: 200, tomato: 400, onion : 50, carrot : 50, cucumber: 200, zucchini: 300, 
    redis: 100, limon: 1, freshGreen: 1, apple: 300, tvorog: 180, cream: 110, rise: 50, riseCow: 25, olive: 29, sweetener: 1, spices: 1},
    {id: 51, menu: 5, egg: 4, indeika: 200, chicken: 200, tomato: 400, onion : 50, carrot : 50, cucumber: 200, zucchini: 300, 
    redis: 100, limon: 1, freshGreen: 1, apple: 300, tvorog: 180, cream: 110, rise: 50, riseCow: 25, olive: 29, sweetener: 1, spices: 1}
    ];





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
                    <button type='button'>Показать граммовку</button>
                </div>
        </div>`;
        
        for(let k in currentMenu) {      
            document.querySelector(`.menu_day_list_${this.day}`).innerHTML += `<li class='list-item'>${currentMenu[k].name} - ${currentMenu[k].count} грамм</li>`;
        }
        
    }
}

//Изначально было так
// MENU.forEach( item => {
//arrWithMenu.push(new DayMenu(item));
//});

//arrWithMenu.forEach(item => {
//item.render();
//});
//при запуске скрипта мы отстраиваем наши меню взятую с баззы данных
let arrWithMenu = [];
fetch('http://localhost:3000/menu')
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
            console.log(item);
        item.render();
        });
        }
    );

const sameMenu = JSON.stringify(MENU);
// добавляем новое меню в базу данных
document.querySelector('button').addEventListener('click', () => { 
        fetch('http://localhost:3000/menu', {
            method: 'POST',
            body: sameMenu,
            headers: {
                'Content-type':'application/json'
            }
        });
    }
);
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
    if(e.target && e.target.tagName === 'I' && !e.target.classList.contains('active')) {        
        const i = e.target.dataset.id;
        const btns = document.querySelectorAll('.fas');
        e.target.classList.toggle('active');
        e.target.classList.toggle('fa-angle-down');
        e.target.classList.toggle('fa-angle-up');
        const list = document.querySelectorAll('.new-menu-box-list');
        list[i-1].classList.toggle('relative');
        list[i-1].innerHTML = 
        arrayWithProducts.map((item) => {
            return `<li data-name='${item.eng}' class='new-menu-box-list-item'>${item.rus}</li>`;
        }).join('');        
        
        const items = list[i-1].querySelectorAll('.new-menu-box-list-item');
        items.forEach(item => {
            item.addEventListener('click', (e) => {
                list[i-1].innerHTML = e.target.outerHTML;
                list[i-1].classList.toggle('relative');
                btns[i-1].classList.toggle('active');
                btns[i-1].classList.toggle('fa-angle-down');
                btns[i-1].classList.toggle('fa-angle-up');
            });
        });
    } else if (e.target && e.target.tagName === 'I' && e.target.classList.contains('active')) {
        const items = document.querySelectorAll('.new-menu-box-list');
        const i = e.target.dataset.id;
        e.target.classList.toggle('active');
        e.target.classList.toggle('fa-angle-down');
        e.target.classList.toggle('fa-angle-up');
        items[i-1].classList.toggle('relative');
        items[i-1].innerHTML = `<li class='new-menu-box-list-item'></li>`;
    }
});



// Создаем функционал для того, чтобы добавлять на кнопку "+" новый продукт из меню
let counter = 3; // каунтер нужен для того, чтобы кнопке повесить уникальный id.
let plus = document.querySelector('.new-menu-add-item');
plus.addEventListener('click', () => {
    const newItem = document.createElement('li');
    newItem.classList.add('new-menu-list-item');
    newItem.innerHTML = `
        <div class='new-menu-box'>
            <ul class='new-menu-box-list'>
                <li  class='new-menu-box-list-item'></li>
            </ul>
            <button data-id=${counter} class='btn-box-menu active'>
                <i data-id=${counter} class="fas fa-angle-down"></i>
            </button>
        </div>
        <input class='new-menu-list-input' placeholder="кол">
    `;
    const parent = document.querySelector('.new-menu-list');
    parent.append(newItem);
    counter++;
});


const btnForAddMenu = document.querySelector('.new-menu-add-menu');
btnForAddMenu.addEventListener('click', () => {
    const newMenu = {};
    const countItems = document.querySelectorAll('.new-menu-list-input');
    const products = document.querySelector('.new-menu-box-list-item');
});