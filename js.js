'use strict';


//создаем класс меню
class DayMenu {
    constructor({
        menu, 
        egg=0, 
        indeika=0, 
        chicken=0, 
        tomato=0, 
        onion =0, 
        carrot =0, 
        cucumber=0, 
        zucchini=0, 
        redis=0, 
        limon=0, 
        freshGreen=0, 
        apple=0,
        cottageСheese= 0, 
        sourCream= 0, 
        rise= 0, 
        riseCow= 0, 
        olive= 0, 
        sweetener= 0, 
        spices= 0,
        beef = 0,
        fishKeta = 0,
        fishTreska = 0,
        butter = 0,
        milk = 0,
        kefir = 0,
        yogurt = 0,
        fetax = 0,
        cheese = 0,
        cream = 0,
        sweetPepper = 0,
        spinach = 0,
        salat = 0,
        сhineseСabbage = 0,
        potato = 0,
        garlic = 0,
        olives = 0,
        grapefruit = 0,
        strawberry = 0,
        oatFlakes = 0,
        buckwheat = 0,
        cacao = 0,
        bulgur = 0,        
        bakingPowder = 0,
        mindal = 0,
        lavash = 0,
        mustard = 0,
        honey = 0,
        breadBuckwheat = 0,
        beefLiver = 0,
        shrimps = 0,
        squid = 0,
        mozarella = 0,
        sorrel = 0,
        champignon = 0,
        banan = 0,
        avacado = 0,
        pear = 0,        
        balsamic = 0,
        makarone = 0,
        chickenLeg = 0,
        cambala = 0,
        semga = 0,
        orange = 0,
        vanilin = 0,
        chickenHeart = 0,
        sudak = 0,
        easeCheese = 0,
        brokkoli = 0,
        sous = 0
    }) {    
        this.day = menu;
        this.chickenHeart = {
            name: 'Куринные сердечки',
            count: chickenHeart
        };
        this.sudak = {
            name: 'Судак',
            count: sudak
        };
        this.easeCheese = {
            name: 'Мягкий творожок 5%',
            count: easeCheese
        };
        this.brokkoli = {
            name: 'Брокколи',
            count: brokkoli
        };
        this.sous = {
            name: 'Соевый соус',
            count: sous
        };
        this.chickenLeg = {
            name: 'Филе бедра курицы',
            count: chickenLeg
        };
        this.cambala = {
            name: 'Камбала',
            count: cambala
        };
        this.semga = {
            name: 'Семга',
            count: semga
        };
        this.orange = {
            name: 'Апельсин',
            count: orange
        };
        this.vanilin = {
            name: 'Ванилин',
            count: vanilin
        };
        this.beefLiver = {
            name: 'Говяжья печень',
            count: beefLiver
        };
        this.shrimps = {
            name: 'Креветки',
            count: shrimps
        };
        this.squid = {
            name: 'Кальмар',
            count: squid
        };
        this.mozarella = {
            name: 'Моцарелла',
            count: mozarella
        };
        this.sorrel = {
            name: 'Щавель',
            count: sorrel
        };
        this.champignon = {
            name: 'Шампиньоны',
            count: champignon
        };
        this.banan = {
            name: 'Бананы',
            count: banan
        };
        this.avacado = {
            name: 'Авакадо',
            count: avacado
        };
        this.pear = {
            name: 'Груши',
            count: pear
        };        
        this.balsamic = {
            name: 'Бальзамический уксус',
            count: balsamic
        };
        this.makarone = {
            name: 'Цельнозерновые макароны',
            count: makarone
        };
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
        this.cottageСheese = {
            name: 'Творог 5%',
            count: cottageСheese
        };
        this.sourCream = {
            name: 'Сметана ',
            count: sourCream
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
        this.beef = {
            name: 'Говядина постная',
            count: beef
        };
        this.fishKeta = {
            name: 'Филе кеты',
            count: fishKeta
        };
        this.fishTreska = {
            name: 'Филе трески',
            count: fishTreska
        };
        this.butter = {
            name: 'Масло сливочное',
            count: butter
        };
        this.milk = {
            name: 'Молоко 1,5%',
            count: milk
        };
        this.kefir = {
            name: 'Кефир',
            count: kefir
        };
        this.yogurt = {
            name: 'Йогурт 4%',
            count: yogurt
        };
        this.fetax = {
            name: 'Фетакса',
            count: fetax
        };
        this.cheese = {
            name: 'Сыр российский',
            count: cheese
        };
        this.cream = {
            name: 'Сливки 10%',
            count: cream
        };
        this.sweetPepper = {
            name: 'Сладкий перец',
            count: sweetPepper
        };
        this.spinach = {
            name: 'Шпинат',
            count: spinach
        };
        this.salat = {
            name: 'Зеленый салат',
            count: salat
        };
        this.сhineseСabbage = {
            name: 'Пекинская капуста',
            count: сhineseСabbage
        };
        this.potato = {
            name: 'Картофель',
            count: potato
        };
        this.garlic = {
            name: 'Чеснок',
            count: garlic
        };
        this.olives = {
            name: 'Оливки',
            count: olives
        };
        this.grapefruit = {
            name: 'Грейпфрут',
            count: grapefruit
        };
        this.strawberry = {
            name: 'Замороженная клубника',
            count: strawberry
        };
        this.oatFlakes = {
            name: 'Овсяные хлопья',
            count: oatFlakes
        };
        this.buckwheat = {
            name: 'Гречка',
            count: buckwheat
        };
        this.cacao = {
            name: 'Какао-порошок',
            count: cacao
        };
        this.bulgur = {
            name: 'Булгур',
            count: bulgur
        };        
        this.bakingPowder = {
            name: 'Разрыхлитель',
            count: bakingPowder
        };
        this.mindal = {
            name: 'Миндаль',
            count: mindal
        };
        this.lavash = {
            name: 'Лаваш',
            count: lavash
        };
        this.mustard = {
            name: 'Горчица',
            count: mustard
        };
        this.honey = {
            name: 'Мед',
            count: honey
        };
        this.breadBuckwheat = {
            name: 'Хлебцы гречневые',
            count: breadBuckwheat
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

    // метод, чтобы запостить все продукты, что есть в конструкторе в bd
    post() {
        let products = [];

        for( let key in this) {
            if(key !== 'day') {
            let obj = {};
            obj.eng = key;
            obj.rus = this[key].name;
            products.push(obj);
            }
        }
        console.log(products);
        products = JSON.stringify(products);
        fetch('http://localhost:3000/products', {
            method: 'POST',
            body: products,
            headers: 
                {'Content-type' : 'application/json'}
            
        });
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

let arrayWithProducts = [];
fetch('http://localhost:3000/products')
.then(res => res.json())
.then(res => {
    arrayWithProducts = res;
});
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