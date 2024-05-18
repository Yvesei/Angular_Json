import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // title = 'AngularFramework';
  actions : Array<any> = [
    {title: "Home", "route" : "/home" , icon : "house"},
    {title: "Products", "route" : "/products" , icon : "bag"},
    {title: "New Product", "route" : "/newproduct" , icon : "plus-square"},
  ];
  currentAction : any ;
 setCurrentAction(action : any){
   this.currentAction = action;
 }
} 
