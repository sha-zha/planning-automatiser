/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('welcome');
});

Route.get('/secretary', 'SecretariesController.index').as('secretary.index');
Route.get('/secretary/add','SecretariesController.add').as('secretary.add');
Route.post('/secretary', 'SecretariesController.store').as('secretary.store');

Route.get('/poste', 'PostesController.index').as('poste.index');
Route.get('/poste/add','PostesController.add').as('poste.add');
Route.post('/poste','PostesController.store').as('poste.store');

Route.get('/planning/add', 'PlanningsController.add').as('planning.add');
Route.post('/planning', 'PlanningsController.store').as('planning.store');
