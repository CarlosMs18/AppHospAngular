export class Usuario{

  constructor(
    public nombre : string,
    public  email : string,
    public password? : string,
    public img? : string,
    public role? : string,
    public uid? : string,
    public token? : string
  ){}

}
