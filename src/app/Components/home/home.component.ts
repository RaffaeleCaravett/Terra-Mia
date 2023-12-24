import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Aos from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  implements OnInit, OnDestroy{


images:any[]=
[
  {title:"../../../assets/Background-images/home/container/casc.jpg",name:"Cascette"},
  {title:"../../../assets/Background-images/home/container/teglia.jpg",name:"Teglie"},
  {title:"../../../assets/Background-images/home/container/fritti.jpg",name:"Fritti"},
  {title:"../../../assets/Background-images/home/container/margherita.jpg",name:"Pizze"},
]

menu:any[] = [
  {
    categoryName: 'Specialità',
    items: [
      {
        name: 'Cascetta Terra Mia',
        ingredients: ['Misti di salumi', 'fritti', 'mozzarella', 'formaggi', 'sottoli'],
        price: 10.00
      }
    ]
  },
  {
    categoryName: 'Fritti',
    items: [
      {
        name: 'Stick',
        ingredients: ["Patatine fritte stick"],
        price: 3.50
      },
      {
        name: 'Dippers',
        ingredients: ["Chips di patate con la buccia"],
        price: 4.50
      },
      {
        name: 'Coccoli di nonna rosa',
        ingredients: ['Straccetti di pizza fritta', 'olive schiacciate', 'pomodorini'],
        price: 6.00
      },
      {
        name: 'Tris di Montanare',
        ingredients: [
          'Pomodoro e mozzarella',
          'Pistacchio e mortadella',
          'Pesto di basilico e pomodorini'
        ],
        price: 6.50
      }
    ]
  },
  {
    categoryName: 'Pizze Classiche',
    items: [
      {
        name: 'Margherita',
        ingredients: ['Pomodoro', 'Fiordilatte', 'Olio evo', 'Basilico'],
        price: 6.00
      },
      {
        name: 'Marinara',
        ingredients: ['Pomodoro', 'Olio evo', 'Basilico'],
        price: 4.50
      },
      {
        name: 'Margherinara',
        ingredients: ['Pomodoro', 'Fiordilatte', 'Acciughe', 'Capperi', 'Olive verdi schiacciate', 'Olio evo', 'Basilico'],
        price: 8.00
      },
      {
        name: 'Bufalina',
        ingredients: ['Bufala', 'Pomodorini', 'Olio evo', 'Basilico'],
        price: 8.00
      },
      {
        name: 'Napoletana',
        ingredients: ['Pomodoro', 'Fiordilatte', 'Acciughe', 'Olio evo', 'Basilico'],
        price: 8.00
      },
      {
        name: 'Tonno e cipolla',
        ingredients: ['Pomodoro', 'Fiordilatte', 'Tonno', 'Cipolla', 'Olio evo', 'Basilico'],
        price: 8.00
      },
      {
        name: 'Al salame',
        ingredients: ['Pomodoro', 'Fiordilatte', 'Salame stagionato', 'Olio evo', 'Basilico'],
        price: 8.00
      },
      {
        name: '4 formaggi',
        ingredients: [],
        price: 8.00
      },
      {
        name: 'Capricciosa',
        ingredients: ['Pomodoro', 'Fiordilatte', 'Funghi', 'Prosciutto cotto', 'Olive verdi', 'Olio evo', 'Basilico'],
        price: 8.00
      },
      {
        name: 'Paesana',
        ingredients: ['Fiordilatte', 'Pomodoro', 'Salsiccia fresca', 'Patate mbacchiuse', 'Olio evo', 'Basilico'],
        price: 9.00
      },
      {
        name: 'Primavera',
        ingredients: ['Fiordilatte', 'Pomodorini', 'Rucola', 'Prosciutto crudo', 'Scaglie di parmigiano', 'Olio evo'],
        price: 9.50
      },
      {
        name: 'Americana',
        ingredients: ['Pomodoro', 'Fiordilatte', 'Würstel', 'Patatine fritte', 'Olio evo'],
        price: 8.00
      },
      {
        name: 'Orto di nonna',
        ingredients: ['Pomodoro', 'Fiordilatte', 'Zucchine', 'Melanzane', 'Olio evo', 'Basilico'],
        price: 8.00
      }
    ]
  },
  {
    categoryName: 'Pizze Food Porn',
    items: [
      {
        name: 'Ottobrina',
        ingredients: ['Fiordilatte', 'Crema di zucchine', 'Zucchine', 'Stracciatella', 'Polpettine di carne', 'Olio evo', 'Basilico'],
        price: 12.00
      },
      {
        name: 'Nonna Rosa',
        ingredients: ['Ragù di carne', 'Polpettine di carne', 'Ciliegine', 'Olio evo', 'Basilico'],
        price: 12.00
      },
      {
        name: 'Bronte ai casali',
        ingredients: ['Fiordilatte', 'Mortadella', 'Pesto di pistacchio', 'Burrata', 'Olio evo', 'Basilico'],
        price: 12.00
      },
      {
        name: 'Food porn',
        ingredients: ['Fiordilatte', 'Pesto al basilico', 'Datterini Rossi', 'Salsiccia fresca', 'Burrata', 'Olio evo', 'Basilico'],
        price: 12.00
      }
    ]
  },
  {
    categoryName: 'Pizze Dessert',
    items: [
      {
        name: 'Coccole di Nonna Rosa',
        ingredients: ['Straccetti di pizza fritta con nutella e Zucchero a velo'],
        price: 7.00
      },
      {
        name: 'Bora Bora',
        ingredients: ['Straccetti di pizza fritta al pistacchio e Zucchero a velo'],
        price: 7.00
      }
    ]
  },
  {
    categoryName: 'Bibite',
    items: [
      {
        name: 'Acqua naturale 1L',
        ingredients: [],
        price: 2.00
      },
      {
        name: 'Acqua frizzante 1L',
        ingredients: [],
        price: 2.00
      },
      {
        name: 'Menabrea Rossa/Leffe Rossa 33cl',
        ingredients: [],
        price: 5.00
      },
      {
        name: 'Nastro/Haineken da 66cl',
        ingredients: [],
        price: 3.50
      },
      {
        name: 'Icnusa non filtrata 50cl',
        ingredients: [],
        price: 5.00
      },
      {
        name: 'Coca cola 1L',
        ingredients: [],
        price: 4.00
      },
      {
        name: 'Coca cola 33cl',
        ingredients: [],
        price: 2.50
      },
      {
        name: 'Coca cola zero 33cl',
        ingredients: [],
        price: 2.50
      },
      {
        name: 'Fanta 33cl',
        ingredients: [],
        price: 2.50
      },
      {
        name: 'Birra alla spina Menabrea bionda 0,40 cl',
        ingredients: [],
        price: 5.00
      }
    ]
  },
  {
    categoryName: 'Vini',
    items: [
      {
        name: 'Lumare',
        ingredients: [],
        price: 20.00
      },
      {
        name: 'Principe Spinelli',
        ingredients: [],
        price: 20.00
      },
      {
        name: 'Berbicaro rosso',
        ingredients: [],
        price: 15.00
      }
    ]
  },
  {
    categoryName: 'Per Concludere',
    items: [
      {
        name: 'Amaro',
        ingredients: [],
        price: 1.50
      },
      {
        name: 'Caffé',
        ingredients: [],
        price: 0.90
      }
    ]
  },
  {
    categoryName: 'Coperto',
    items: [
      {
        name: 'Coperto',
        ingredients: [],
        price: 1.00
      }
    ]
  }
];

title:string=''
image:string=''
i:number=0
interval:any

ngOnInit(): void {
  this.carousel(this.i)
  Aos.init()
this.interval=setInterval(()=>{
this.carousel(this.i)
},3000)
}


carousel(i:number){
    if(i<this.images.length-1){
       this.title=this.images[i].name
    this.image=this.images[i].title
    this.i+=1
  }else{
this.i=0
this.title=this.images[i].name
this.image=this.images[i].title
  }
}
ngOnDestroy(): void {
  clearInterval(this.interval);
}
}
