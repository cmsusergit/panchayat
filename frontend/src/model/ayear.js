export default class AyearDetail{
  constructor(){

      this.akarniyearid=0;
      this.akarniyear="";

      this.aystartfrom=new Date(new Date().getFullYear()+'-01-01');
      this.ayend=new Date(new Date().getFullYear()+'-12-31');
  }
}
