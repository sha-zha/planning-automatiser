import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Poste from "App/Models/Poste";

export default class PostesController {
  public async index({view}: HttpContextContract){
    const postes = await Poste.all();

    return view.render('postes/index', {'postes':postes});
  }

  public add({view}: HttpContextContract){
    return view.render('postes/add');
  }

  public async store({request, response} : HttpContextContract){
    await Poste.create({
        label : request.input('label')
    });

    return response.redirect('/poste');
  }
}
