import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  joke: string = '';
  showJoke: boolean = false;

  async fetchJoke(){
    try {
      console.log('Fetching joke...');
      let data;
      let response;
     fetch('https://v2.jokeapi.dev/joke/Programming?safe-mode')
  .then(response => response.json())
  .then(data => {
     this.joke = `${data.setup} 🤔, ${data.delivery} 😅`;
    this.showJoke = true;
      console.log(this.joke)
  });

      // Hide the bubble after 5 seconds
      setTimeout(() => {
        this.showJoke = false;
      }, 8000);

    } catch (error) {
      this.joke = 'Oops! No se pudo obtener un chiste 😢';
      this.showJoke = true;
      setTimeout(() => this.showJoke = false, 5000);
    }
  }
  }

