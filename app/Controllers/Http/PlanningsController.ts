import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Poste from 'App/Models/Poste';
import Secretary from 'App/Models/Secretary';
import Config from '@ioc:Adonis/Core/Config';

export default class PlanningsController {

  public async add({view}: HttpContextContract){
    const poste = await Poste.all();
    const secretary = await  Secretary.all();
    const days = Config.get('days.days');

    return view.render('plannings/add', {postes: poste, secretaries: secretary, days: days});
  }

  public async store({request}: HttpContextContract){

    const lastPoste = request.input('poste');
    const defaultOrder = await this.defaultOrder(lastPoste-1);

    console.log(defaultOrder);


  }

  public async defaultOrder(lastPoste){

    const order = Config.get('site.defaultOrderPoste');
    let poste!: Array<String>;
    let other!: Array<String>;

    if(parseInt(lastPoste)+1 === order.length){
      order.push(order[0]);
      return order;
    }

    order.forEach( (item:string,index:number):void => {

        if(index > lastPoste){
          poste.push(item);
        }else{
          other.push(item);
        }
    });



    const roulement = poste.concat(other);
    roulement.push(poste[0]);

    return roulement;
  }
}
