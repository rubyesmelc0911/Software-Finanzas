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
      const response = await fetch('https://official-joke-api.appspot.com/random_joke');
      const data = await response.json();

      this.joke = `${data.setup} 🤔 ${data.punchline}`;
      this.showJoke = true;
      console.log(this.joke)

      // Hide the bubble after 5 seconds
      setTimeout(() => {
        this.showJoke = false;
      }, 5000);

    } catch (error) {
      this.joke = 'Oops! No se pudo obtener un chiste 😢';
      this.showJoke = true;
      setTimeout(() => this.showJoke = false, 5000);
    }
  }
  }

