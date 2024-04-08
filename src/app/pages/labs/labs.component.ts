import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'todoapp';

  tasks = signal([
    'Instalar el Angular CLI',
    'Crear Proyecto',
    'Crear Componente',
    'ir a comer'
  ])

  name = signal('Juan');
  edad = 31;
  estado = false;
  img =  'https://w3schools.com/howto/img_avatar.png';

  person = {
    name: 'Juan',
    edad: 31,
    img: 'https://w3schools.com/howto/img_avatar.png'
  }


  colorControl = new FormControl();
  widthControl = new FormControl(50,{
    nonNullable:true

  })
  nameControl = new FormControl('Juan',{
    nonNullable:true,
    validators:[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(6)
    ]

  })
  constructor(){

    this.colorControl.valueChanges.subscribe(value=> {
      console.log("Color",value)
    })
  }
  click(event:any){
    alert("hola")
    console.log("evento :" , event)
  }

  changeHandelr(event:Event){
     const input = event.target as HTMLInputElement;
     const newValue = input.value
     this.name.set(newValue)
    console.log("Evento Input ", newValue)
  }
  keyHandelr(event: KeyboardEvent){

    const input = event.target as HTMLInputElement;

    console.log("Evento Input Key ", input.value)
  }
}
