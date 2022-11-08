
import { Router } from '@angular/router';
import { UsuarioService } from './../../services/usuario.service';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import  Swal  from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmitted : boolean  = false;
  public loginForm : FormGroup = this.fb.group({
    email : [localStorage.getItem('email'),Validators.required],
    password : ['',Validators.required],
    remember : [false]
  })
  constructor(
    private fb : FormBuilder,
    private router :Router,
    private usuarioService : UsuarioService
  ) { }

  ngOnInit(): void {
  }

  campoNoValido(campo : string){
    if(this.loginForm.get(campo)?.invalid && this.formSubmitted){
        return true
    }else{
      return false
    }
  }

  logeando(){
    this.formSubmitted = true;
    if(this.loginForm.invalid){
        return
    }
    this.usuarioService.login(this.loginForm.value)
                .subscribe(
                    {
                      next : resp => {
                        if(this.loginForm.get('remember')?.value){
                          localStorage.setItem('email',this.loginForm.get('email')?.value)
                        }else{
                          localStorage.removeItem('email')
                        }
                        this.router.navigateByUrl('/')

                      },
                      error : (err) => {
                        Swal.fire('Error',err.error.msg,'error')
                      }
                    }

                )

  }


}
