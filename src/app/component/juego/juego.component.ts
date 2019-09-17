import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-juego",
  templateUrl: "./juego.component.html"
})
export class JuegoComponent implements OnInit {
  targetas: targeta[];
  targeta: targeta;
  click: number;
  url: string;
  score1: number;
  score2: number;
  gamer: boolean;
  gano: boolean;
  perdio: boolean;
  esperar: boolean;
  constructor() {
    this.url = "./assets/img/n.png";
    this.click = 0;
    this.score1 = 0;
    this.score2 = 0;
    this.generarTablero();
  }
  generarTablero() {
    this.targetas = [];
    let c = 0,
      i = 0;
    let use="";
    let t=0;
    for (let y = 0; y < 6; y++) {
      use = "";
      for (let x = 0; x < 6; x++) {
        do {
            c=Math.floor(Math.random() * (6 - 0)) + 0;
         /* if (t>20) {
            break;
          }t++;*/
        } while (use.includes("" + c)); 
        console.log(use); 
        use += c;
        this.targetas[i] = {
          id: "" + i,
          url: "./assets/img/" + c + ".png",
          estado: false,
          correcto: false
        };
        i++;
        //c++;
      }
      c = 0;
    }
  }
  validarCampos(targeta: targeta) {
    let targetaVo = document.getElementById(targeta.id);
    targetaVo.style.backgroundColor = "red";
    console.log(targetaVo);

    if (!this.esperar) {
      if (this.click == 0) {
        this.targeta = targeta;
        this.targeta.estado = true;
        this.click = 1;
      } else {
        targeta.estado = true;
        if (targeta.id != this.targeta.id) {
          if (targeta.url == this.targeta.url) {
            targeta.correcto = true;
            this.targeta.correcto = true;
            if (!this.gamer) {
              this.score1++;
            } else {
              this.score2++;
            }
          } else {
            this.esperar = true;
            setTimeout(() => {
              targeta.estado = false;
              this.targeta.estado = false;
              this.esperar = false;
            }, 2000);
            /*if (this.gamer) {
            this.score1--;
          } else {
            this.score2--;
          }*/
          }
        }
        this.click = 0;
        if (!this.targeta.correcto) {
          if (this.gamer) {
            this.gamer = false;
          } else {
            this.gamer = true;
          }
        }
      }
      console.log("correcto " + targeta.correcto);
    }
    this.gano = true;
    for (let i = 0; i < this.targetas.length; i++) {
      if (!this.targetas[i].correcto) {
        this.gano = false;
        break;
      }
    }
    if (this.gano) {
      if (this.score1 > this.score2) {
      } else {
      }
    }
    /*for (let i = 0; i < this.targetas.length; i++) {
      if (!this.targetas[i].estado) {
        if (this.targetas[i].id == targeta.id) {
          this.targetas[i].estado = true;
        }
      }else{
        if (this.targetas[i].id != targeta.id) {
           if (this.targetas[i].url != targeta.url) {
            this.targetas[i].estado = false;
            this.targetas[i].correcto = true; 
           }
        }
      }
    }*/
  }

  ngOnInit() {}
}

class targeta {
  id: string;
  url: string;
  estado: boolean;
  correcto: boolean;
  constructor(id: string, url: string, estado: boolean, correcto: boolean) {
    this.id = id;
    this.url = url;
    this.estado = estado;
    this.correcto = correcto;
  }
}
