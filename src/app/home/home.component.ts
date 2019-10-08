import { UserService } from './../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  IngredientsFormModel = {
    Ingredients: '',
  }

  NutritionalFormModel = {
    minCarbs: '',
    maxCarbs: '',
    minCalories: '',
    maxCalories: ''
  }

   results : any;
   typeid : number;
   username : string; 

   searching : boolean = false;


  constructor(private router: Router,  private http: HttpClient) { }

  ngOnInit() {
    this.typeid =  parseInt(localStorage.getItem('typeid'));
    this.username = localStorage.getItem('username');

   console.log(this.typeid , this.username)
  }

  onSubmitIngredients(form: NgForm){
    this.searching = true;
    this.http.get('https://api.spoonacular.com/recipes/search', {
      params: {
        query: this.IngredientsFormModel.Ingredients,
        apiKey: '4e982b8d88284d728c7c546a14ceed39'
      },
      observe: 'response'
    }).subscribe((res : any)=>{
       this.results = res.body.results;
       console.log(this.results)
       this.searching = false;
    })
 
  }


  onSubmitNutritional(form: NgForm){
    
    this.searching = true;
    
    this.http.get('https://api.spoonacular.com/recipes/findByNutrients', {
      params: {
        maxCalories: this.NutritionalFormModel.maxCalories,
        minCalories: this.NutritionalFormModel.minCalories,
        minCarbs: this.NutritionalFormModel.minCarbs,
        maxCarbs: this.NutritionalFormModel.maxCarbs,
        apiKey: '4e982b8d88284d728c7c546a14ceed39'
      },
      observe: 'response'
    }).subscribe((res : any)=>{
       this.results = res.body;  
       console.log(this.results)
       this.searching = false;
    })
  
 
  }


  




  onLogout() {
    localStorage.removeItem('typeid');
    localStorage.removeItem('username');
    this.router.navigate(['/user/login']);
  }
}
