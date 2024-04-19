class DateTimeHelper {
    
    isDate = (fecha) => { 
        if (isNaN(Date.parse(fecha))){
            return false;
        } 
        else {
            return true;
        }
     };
    getOnlyDate = (fecha = new Date()) => { 
        
     };
    getEdadActual = (fechaNacimiento) => { 
        
     };
    getDiasHastaMiCumple = (fechaNacimiento) => { 
        
     };
    getDiaTexto = (fecha, retornarAbreviacion = false) => { 
        
     };
    getMesTexto = (fecha, retornarAbreviacion = false) => { 
        
     };
    }
    export default new DateTimeHelper;