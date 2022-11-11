import { environment } from './../../environments/environment';
export class Usuario{
  private base_url = environment.base_url;
  constructor(
    public nombre : string,
    public  email : string,
    public password? : string,
    public img? : string,
    public role? : 'ADMIN_ROLE' | 'USER_ROLE',
    public uid? : string,

  ){}
    get imageUrl(){
      if(!this.img){
        return `${this.base_url}/uploads/usuarios/no-image`
      }else{
        return `${this.base_url}/uploads/usuarios/${this.img}`
      }
    }
}
