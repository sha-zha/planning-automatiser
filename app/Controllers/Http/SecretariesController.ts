import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext';
import Secretary from "App/Models/Secretary";


export default class SecretariesController {

  public async index({view}: HttpContextContract){
    const secretaries = await Secretary.all();

    return view.render('secretaries/index', {'secretaries':secretaries});
  }

  public add({view}: HttpContextContract){
    return view.render('secretaries/add');
  }

  public async store({request, response} : HttpContextContract){
    await Secretary.create({
      name : request.input('name'),
      lastname : request.input('lastname')
    });

    return response.redirect('/secretary');
  }
}

