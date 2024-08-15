import { Component, HostBinding } from '@angular/core';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.css'
})
export class GameListComponent {
  @HostBinding('class') classes='row'; 
  games : any = [];

  constructor(private gamesService :GamesService){}
  ngOnInit(){ 
    this.getGames();
  }
  
  getGames(){
    this.gamesService.getGames().subscribe(
  
      resp => {
  
        this.games = resp
      },
      err => console.log(err)
  
    ); 
  }
  deleteGame(id :string){
    console.log(id);
    this.gamesService.deleteGame(id).subscribe(
      resp=>{
          console.log(resp); 
          this.getGames();
        },
      err=>console.log(err)
    )
  }
}
