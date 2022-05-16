/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Actions;

import com.google.gson.JsonObject;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import metier.modele.Client;
import metier.modele.Employe;
import metier.modele.Intervention;
import metier.service.Service;

/**
 *
 * @author mjoseph
 */
public class GetProfileEmployeAction extends Action {

    public GetProfileEmployeAction(Service service) {
        super(service);
    }

    @Override
    public void executer(HttpServletRequest request) {
        Employe employe = (Employe) request.getAttribute("employe");
        
        Intervention currentIntervention = service.recupererInterventionEnCours(employe); // return null if it doesn't exist
        
        Date date = new Date();
        String pattern = "dd/MM/yyyy";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
        String dateString = simpleDateFormat.format(date);
        try {
            date =  simpleDateFormat.parse(dateString);
        } catch (ParseException ex) {
            Logger.getLogger(GetProfileEmployeAction.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        c.add(Calendar.DATE, 1);
        Date date2 = c.getTime();
        
        Double distance = service.calculerDistanceParcourue(employe, date, date2);
         
        request.setAttribute("distance", distance);       
        request.setAttribute("currentIntervention", currentIntervention);       
    }
}
