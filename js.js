'use strict';


//создаем класс меню
class DayMenu {
    constructor({
        img = 0,
        sup = false,
        recept = 0,
        gurman = false,
        torop = false,
        tasty = false,
        autumn = false,
        id,
        day,
        dayName,
        weak,
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
        this.img = img;
        this.sup = sup;
        this.recept = recept;
        this.autumn = autumn;
        this.tasty = tasty;
        this.torop = torop;
        this.gurman = gurman;    
        this.id = id;
        this.dayName = dayName;
        this.weak = weak;
        this.chickenHeart = {
            sizes: 'грамм',
            name: 'Куринные сердечки',
            count: chickenHeart
        };
        this.sudak = {
            sizes: 'грамм',
            name: 'Судак',
            count: sudak
        };
        this.easeCheese = {
            sizes: 'грамм',
            name: 'Мягкий творожок 5%',
            count: easeCheese
        };
        this.brokkoli = {
            sizes: 'грамм',
            name: 'Брокколи',
            count: brokkoli
        };
        this.sous = {
            sizes: 'грамм',
            name: 'Соевый соус',
            count: sous
        };
        this.chickenLeg = {
            sizes: 'грамм',
            name: 'Филе бедра курицы',
            count: chickenLeg
        };
        this.cambala = {
            sizes: 'грамм',
            name: 'Камбала',
            count: cambala
        };
        this.semga = {
            sizes: 'грамм',
            name: 'Семга',
            count: semga
        };
        this.orange = {
            sizes: 'шт',
            name: 'Апельсин',
            count: orange
        };
        this.vanilin = {
            sizes: 'грамм',
            name: 'Ванилин',
            count: vanilin
        };
        this.beefLiver = {
            sizes: 'грамм',
            name: 'Говяжья печень',
            count: beefLiver
        };
        this.shrimps = {
            sizes: 'грамм',
            name: 'Креветки',
            count: shrimps
        };
        this.squid = {
            sizes: 'грамм',
            name: 'Кальмар',
            count: squid
        };
        this.mozarella = {
            sizes: 'грамм',
            name: 'Моцарелла',
            count: mozarella
        };
        this.sorrel = {
            sizes: 'грамм',
            name: 'Щавель',
            count: sorrel
        };
        this.champignon = {
            sizes: 'грамм',
            name: 'Шампиньоны',
            count: champignon
        };
        this.banan = {
            sizes: 'грамм',
            name: 'Бананы',
            count: banan
        };
        this.avacado = {
            sizes: 'грамм',
            name: 'Авакадо',
            count: avacado
        };
        this.pear = {
            sizes: 'грамм',
            name: 'Груши',
            count: pear
        };        
        this.balsamic = {
            sizes: 'грамм',
            name: 'Бальзамический уксус',
            count: balsamic
        };
        this.makarone = {
            sizes: 'грамм',
            name: 'Цельнозерновые макароны',
            count: makarone
        };
        this.chicken = {
            sizes: 'грамм',
            name: 'Куринное филе',
            count: chicken
        };
        this.egg = {
            sizes: 'шт',
            name: 'Яйца',
            count: egg
        };
        this.tomato = {
            sizes: 'грамм',
            name: 'Помидоры',
            count: tomato
        };
        this.indeika = {
            sizes: 'грамм',
            name: 'Филе индейки',
            count: indeika
        };
        this.onion = {
            sizes: 'грамм',
            name: 'Лук репчатый',
            count: onion
        };
        this.carrot = {
            sizes: 'грамм',
            name: 'Морковь',
            count: carrot
        };
        this.cucumber = {
            sizes: 'грамм',
            name: 'Огурцы',
            count: cucumber
        };
        this.zucchini = {
            sizes: 'грамм',
            name: 'Кабачок',
            count: zucchini
        };
        this.redis = {
            sizes: 'грамм',
            name: 'Редис',
            count: redis
        };
        this.limon = {
            sizes: 'шт',
            name: 'Лимон',
            count: limon
        };
        this.freshGreen = {
            sizes: 'грамм',
            name: 'Свежая зелень',
            count: freshGreen
        };
        this.apple = {
            sizes: 'грамм',
            name: 'Яблоки',
            count: apple
        };
        this.cottageСheese = {
            sizes: 'грамм',
            name: 'Творог 5%',
            count: cottageСheese
        };
        this.sourCream = {
            sizes: 'грамм',
            name: 'Сметана ',
            count: sourCream
        };
        this.rise= {
            sizes: 'грамм',
            name: 'Рис',
            count: rise
        };        
        this.riseCow= {
            sizes: 'грамм',
            name: 'Рисовая мука',
            count: riseCow
        };
        this.olive= {
            sizes: 'грамм',
            name: 'Оливковое масло',
            count: olive
        };
        this.sweetener= {
            sizes: 'грамм',
            name: 'Сахарозаменитель',
            count: sweetener
        };
        this.spices= {
            sizes: 'грамм',
            name: 'Специи',
            count: spices
        };
        this.beef = {
            sizes: 'грамм',
            name: 'Говядина постная',
            count: beef
        };
        this.fishKeta = {
            sizes: 'грамм',
            name: 'Филе кеты',
            count: fishKeta
        };
        this.fishTreska = {
            sizes: 'грамм',
            name: 'Филе трески',
            count: fishTreska
        };
        this.butter = {
            sizes: 'грамм',
            name: 'Масло сливочное',
            count: butter
        };
        this.milk = {
            sizes: 'грамм',
            name: 'Молоко 1,5%',
            count: milk
        };
        this.kefir = {
            sizes: 'грамм',
            name: 'Кефир',
            count: kefir
        };
        this.yogurt = {
            sizes: 'грамм',
            name: 'Йогурт 4%',
            count: yogurt
        };
        this.fetax = {
            sizes: 'грамм',
            name: 'Фетакса',
            count: fetax
        };
        this.cheese = {
            sizes: 'грамм',
            name: 'Сыр российский',
            count: cheese
        };
        this.cream = {
            sizes: 'грамм',
            name: 'Сливки 10%',
            count: cream
        };
        this.sweetPepper = {
            sizes: 'грамм',
            name: 'Сладкий перец',
            count: sweetPepper
        };
        this.spinach = {
            sizes: 'грамм',
            name: 'Шпинат',
            count: spinach
        };
        this.salat = {
            sizes: 'грамм',
            name: 'Зеленый салат',
            count: salat
        };
        this.сhineseСabbage = {
            sizes: 'грамм',
            name: 'Пекинская капуста',
            count: сhineseСabbage
        };
        this.potato = {
            sizes: 'грамм',
            name: 'Картофель',
            count: potato
        };
        this.garlic = {
            sizes: 'грамм',
            name: 'Чеснок',
            count: garlic
        };
        this.olives = {
            sizes: 'грамм',
            name: 'Оливки',
            count: olives
        };
        this.grapefruit = {
            sizes: 'грамм',
            name: 'Грейпфрут',
            count: grapefruit
        };
        this.strawberry = {
            sizes: 'грамм',
            name: 'Замороженная клубника',
            count: strawberry
        };
        this.oatFlakes = {
            sizes: 'грамм',
            name: 'Овсяные хлопья',
            count: oatFlakes
        };
        this.buckwheat = {
            sizes: 'грамм',
            name: 'Гречка',
            count: buckwheat
        };
        this.cacao = {
            sizes: 'грамм',
            name: 'Какао-порошок',
            count: cacao
        };
        this.bulgur = {
            sizes: 'грамм',
            name: 'Булгур',
            count: bulgur
        };        
        this.bakingPowder = {
            sizes: 'грамм',
            name: 'Разрыхлитель',
            count: bakingPowder
        };
        this.mindal = {
            sizes: 'грамм',
            name: 'Миндаль',
            count: mindal
        };
        this.lavash = {
            sizes: 'грамм',
            name: 'Лаваш',
            count: lavash
        };
        this.mustard = {
            sizes: 'грамм',
            name: 'Горчица',
            count: mustard
        };
        this.honey = {
            sizes: 'грамм',
            name: 'Мед',
            count: honey
        };
        this.breadBuckwheat = {
            sizes: 'грамм',
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
        function renderCurrentMenu(obj,menu, bgColor) {
            for (let key in obj) {
                if(key === 'weak' || key === 'dayName') {
                    continue;
                }
                if(obj[key].count) {
                    currentMenu[key] = obj[key];
                }
            }
            const parent = document.querySelector(`.content-list-${menu}`);
            parent.innerHTML += `
            <li class='content-list-item'>
                <div class='content-list-item-description bg_${bgColor}'>
                    <div class='num-day'>Неделя ${obj.weak}. ${obj.dayName}.</div>
                    <button type='button'>
                        <i data-id=${obj.id} class='fas fa-angle-down open-btn'></i>
                    </button>
                    <input class='check' type='checkbox'/>
                </div>
                <div data-menu=${obj.id} class='content-list-item-more'>
                    <div class='menu-img'><img src='./images/${menu}/${obj.weak}_${obj.dayName}.JPG' alt='Меню'/>
                    </div>
                    <ul class='menu-list menu_day_list_${obj.id}'>
                    <b>СПИСОК ПРОДУКТОВ:</b>
                        
                    </ul>

                    <div class='recept recept-${obj.id}'>
                        
                    </div>
                </div>
            </li>`;
            parent.querySelector(`.recept-${obj.id}`).innerText = obj.recept;
            for(let k in currentMenu) {      
                document.querySelector(`.menu_day_list_${obj.id}`).innerHTML += `<li class='menu-item'>${currentMenu[k].name} - ${currentMenu[k].count} ${currentMenu[k].sizes}</li>`;
            }
        }

        if(this.gurman) {
            renderCurrentMenu(this, 'gurman', 'green');
        } else if (this.torop) {
            renderCurrentMenu(this, 'torop', 'pink');
        } else if (this.tasty) {
            renderCurrentMenu(this, 'tasty', 'blue');
        } else if (this.autumn) {
            renderCurrentMenu(this, 'autumn', 'orange');
        }
    }
}


// Открытие/закрытие описания каждого дня меню
const content = document.querySelector('.content');
content.addEventListener('click', (e) => {
    if(e.target && e.target.classList.contains('open-btn')) {
        let i = e.target.dataset.id;
        let contents = content.querySelectorAll('.content-list-item-more');
        e.target.classList.toggle('fa-angle-down');
        e.target.classList.toggle('fa-angle-up');
        contents.forEach(item => {
            if(item.dataset.menu == i) {                           
                item.classList.toggle('open');
            }
        });
    }
        
});


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


let newMenu = document.querySelector('.new-menu-list');
newMenu.addEventListener('click',(e) => {
    let arrayWithProducts = [];
        
        //если мы нажимаем на кнопку открытия списка и она не активна (список не активен)
        if(e.target && e.target.tagName === 'I' && !e.target.classList.contains('active')) {        
            const i = e.target.dataset.id;
            const btns = newMenu.querySelectorAll('.fas');  
            const list = document.querySelectorAll('.new-menu-box-list');
            
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
const newMenuList = document.querySelector('.new-menu-list');
const btnForAddMenu = document.querySelector('.new-menu-add-menu');
btnForAddMenu.addEventListener('click', () => {
    let newMenu = {};
    const countItems = newMenuList.querySelectorAll('.new-menu-list-input'); // колическтво продуктов
    const products = newMenuList.querySelectorAll('.new-menu-box-list-item'); // английское называние
    const checkedMenu = document.querySelectorAll('.checkedMenu');
    const receptMenu = document.querySelector('.new-menu-list-recept').value;
    if(checkedMenu[0].checked) {
        newMenu.gurman = true;
    } else if (checkedMenu[1].checked) {
        newMenu.torop = true;
    } else if (checkedMenu[2].checked) {
        newMenu.autumn = true;
    } else if (checkedMenu[3].checked) {
        newMenu.tasty = true;
    }
    newMenu.dayName = newMenuList.querySelector('.dayName').value;
    newMenu.weak = newMenuList.querySelector('.weak').value;
    newMenu.recept = receptMenu;
    
    // for( let i = 0; i < products.length; i++) {
    //     newMenu[products[i].dataset.name] = countItems[i].value;
    // }
    products.forEach((item, i) => {
        newMenu[item.dataset.name] = countItems[i].value;
    });

    let lastId;
    new Promise(() => {fetch('http://localhost:3000/menu')
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
            newMenu.id = lastId + 1;
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
document.querySelector('.open-form').addEventListener('click', (e) => {
    if(e.target.classList.contains('open-form')) {
        form.classList.toggle('activeForm');
    }
});
document.querySelector('.closeBtn .fas').addEventListener('click', ()=>{
    form.classList.toggle('activeForm');
});


document.querySelectorAll('.checkedMenu').forEach(item => {
    item.addEventListener('click',()=> {
        document.querySelector('.new-menu-block').classList.add('select');
        console.log('hh');
    });
});