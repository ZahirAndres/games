import { Component, OnInit, HostBinding} from '@angular/core';
import { Game } from '../../models/Game';
import { GamesService } from '../../services/games.service';
import { ActivatedRoute,Router } from '@angular/router';


@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrl: './game-form.component.css'
})
export class GameFormComponent {

  //atributos de la clase
  @HostBinding('class') classes='row';
  game : Game ={
    id:0,
    title : '',
    description : '',
    image : '', 
    created_at : new Date()
  }
  //para update
  edit : boolean = false

  constructor(private gameService : GamesService, 
              private router :Router,
              private activatedRoute : ActivatedRoute
            ){}


//es lo que se incia al principio.
 ngOnInit(){
  const params = this.activatedRoute.snapshot.params;
  if ((params)['id']){
    this.gameService.getGame((params)['id']).subscribe(
      resp =>{
        console.log(resp);
        this.game = resp;
        this.edit = true;
      },  
      err => console.error(err)
    )
  }
 }

 saveNewGame(){
  delete this.game.id;
  delete this.game.created_at;
  this.gameService.saveGame(this.game).subscribe(
    resp => {
        console.log(resp);
        this.router.navigate(['/games']);
      },
    err => console.log(err)
  );
 }

 updateGame(){
  delete this.game.created_at;
  let number : number = Number(this.game.id); //transforma el number por un string
  this.gameService.updateGame(number, this.game).subscribe( //peticion del update desde service
    resp => {
      console.log(resp);
      this.router.navigate(['/games']);
    },
    err => console.error(err)
  );
 }
}
