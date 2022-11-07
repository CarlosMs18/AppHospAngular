import { Component, OnInit , Input, Output , EventEmitter} from '@angular/core';

@Component({
  selector: 'app-aumentador',
  templateUrl: './aumentador.component.html',
  styles: [
  ]
})
export class AumentadorComponent implements OnInit {
  @Input('btnClass') btnClass : string = 'btn-primary'
  @Input('progreso') progreso !: number;
  @Output('valorSalida') valorSalida : EventEmitter<number> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`
  }


  enviarDatos(valor : number){

      if(this.progreso >= 100 && valor > 0 ){

        this.valorSalida.emit(100);
        return
      }else if(this.progreso <= 0 && valor < 0){
        this.valorSalida.emit(0);
        return
      }
      console.log(this.progreso);
      this.progreso= this.progreso + valor;

      this.valorSalida.emit(this.progreso);
  }

  inputValor(valor : number){
      if(valor >= 100){
        this.progreso = 100
      }else if(valor <= 0){
        this.progreso = 0
      }else{
        this.progreso = valor;
      }

      this.valorSalida.emit(this.progreso);
  }
}
