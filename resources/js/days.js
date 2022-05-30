import {days,daysUma,daysPneumo} from "../../config/days";

document.addEventListener("DOMContentLoaded", function() {

  function Coche(idCheck){

    const id = document.getElementById(idCheck);

    if(id != undefined){

      const checkbox = document.querySelectorAll(idCheck);
      switch (idCheck){
        case "daysUma" :
          checkbox.forEach( (item) => {
            daysUma.forEach((day, index) => {
                console.log(day, index)
            })
          })


          break

        case "daysPneumo":
          break
        default:
          break
      }
    }

  }

  const checkbox = document.querySelectorAll('input[type=checkbox]');

  console.log(checkbox)

});
