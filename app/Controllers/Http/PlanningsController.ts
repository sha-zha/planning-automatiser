import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Poste from 'App/Models/Poste';
import Secretary from 'App/Models/Secretary';
import Config from '@ioc:Adonis/Core/Config';

export default class PlanningsController {

  public async add({view}: HttpContextContract){
    const poste = await Poste.all();
    const secretary = await  Secretary.all();

    return view.render('plannings/add', {postes: poste, secretaries: secretary});
  }

  public async store({request}: HttpContextContract){

    let lastPoste = request.input('poste');
    let present = request.input('days');

    let days = Config.get(`days.${present}`);

    //const defaultOrder = await this.defaultOrder(lastPoste-1);
    if(present != "days"){
      const orderOther = await this.orderExterne(lastPoste-1, days);
      console.log(orderOther);
    }

  }

  public async defaultOrder(lastPoste){

    //ordre des postes
    const order = Config.get('site.defaultOrderPoste');
    let poste!: Array<String>;
    let other!: Array<String>;

    // si le dernier poste est le dernier de order
    if(parseInt(lastPoste)+1 === order.length) {
      order.push(order[0]);
      return order;
    }

    //parcourrir les postes pour terminer ordre des postes à dispatcher
    order.forEach( (item:string,index:number):void => {
        if(index > lastPoste){
          poste.push(item);
        }else{
          other.push(item);
        }
    });

    // fusion pour avoir le roulement
    const roulement = poste.concat(other);
    roulement.push(poste[0]);

    return roulement;
  }
  public async orderExterne(lastPoste: number,days:Array<String>){

    //ordre des postes
    const order = Config.get('site.defaultOrderPoste');
    let poste!: Array<String>;

    // parcourrir l'ordre des postes
    order.forEach( (item:string,index:number):void => {

      if(index < days.length){

        // si le jour est différent de mardi
        if(days[index] != Config.get('site.notThisDay')){
         if(index > lastPoste){
           if(poste === undefined) {
             poste = [];
           }
           if(poste.includes(item) ==false){
             poste.push(item);
           }
          }
        }else{
          // si mardi un poste différent de notThisPoste
          if(item != Config.get('site.notThisPoste') && index != lastPoste){

            console.log(item, days[index], lastPoste)
            //poste.push(item);
          }else{
            if(poste === undefined){
              poste = [];
            }
            poste.push(order[index+1]);
          }
        }
      }
    });

    return poste;
  }
}
