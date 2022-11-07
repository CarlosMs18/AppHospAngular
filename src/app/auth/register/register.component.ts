import { Router } from '@angular/router';
import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder ,FormGroup , Validators} from "@angular/forms";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public formSubmmitted = false;
  public registerForm : FormGroup = this.fb.group({
    nombre :['',Validators.required],
    email : ['',],
    password : ['',Validators.required],
    password2 : ['',Validators.required],
    check : [false,Validators.requiredTrue]
    /* ,
   , */
    /*  */
  }, {
    validators : this.passwordsIguales('password' ,'password2')
  })

  constructor(
    private fb : FormBuilder,
    private usuarioService : UsuarioService,
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  campoNoValido(campo : string){
    if(this.registerForm.get(campo)?.invalid && this.formSubmmitted){
      return true
    }else{
      return false
    }
  }
  contrasenasNoValidas(){
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value

    if(pass1 === pass2){
      return false
    }else{
      return true
    }

  }

  aceptaTerminos(){
      if(this.registerForm.get('check')?.invalid && this.formSubmmitted){
        return true
      }else{
        return false
      }
  }

  passwordsIguales(pass1 : string, pass2 :string){
    return(formGroup : FormGroup) => {
      const pass1Control = formGroup.get(pass1)
      const pass2Control = formGroup.get(pass2)
      if(pass1Control?.value === pass2Control?.value){
        pass2Control?.setErrors(null)
      }else{
        pass2Control?.setErrors({noEsigual : true})
      }
    }
  }
  enviarRegistro(){
    this.formSubmmitted = true;
    if(!this.registerForm.invalid && this.formSubmmitted == true){
        this.usuarioService.crearUsuario(this.registerForm.value)
                .subscribe(
                  {
                    next : resp =>
                    {
                      this.router.navigateByUrl('/')
                    },
                    error : (err) =>{
                      console.log(err)
                      Swal.fire('Error',err.error.msg,'error')
                    }
                  }
                )

    }
    return;

  }
}
