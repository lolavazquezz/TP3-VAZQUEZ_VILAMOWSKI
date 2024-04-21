class DateTimeHelper {
    
    isDate = (fecha) => { 
        if (isNaN(Date.parse(fecha))){
            return false;
        } 
        else {
            return true;
        }
     };
    getEdadActual = (fechaNac) => { 
        let fechaN = new Date(fechaNac);
        const fechaHoy = new Date();
        let edad = fechaHoy.getFullYear() - fechaN.getFullYear();
        if ((fechaHoy.getMonth() < fechaN.getMonth()) || 
        (fechaHoy.getMonth() === fechaN.getMonth() && 
        fechaHoy.getDate() < fechaN.getDate())){
            edad --;
        } 
        return edad.toString();
     };
    getDiasHastaMiCumple = (fechaNacimiento) => { 
        
     };
    getDiaTexto = (fecha, retornarAbreviacion = false) => { 
        
     };
    getMesTexto = (fecha, retornarAbreviacion = false) => { 
        
     };
    }
    export default new DateTimeHelper;