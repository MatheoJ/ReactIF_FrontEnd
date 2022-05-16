/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Actions;

import com.google.gson.JsonObject;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import metier.modele.Client;
import metier.modele.Intervention;
import metier.service.Service;

/**
 *
 * @author mjoseph
 */
public class GetHistoryAction extends Action {

    public GetHistoryAction(Service service) {
        super(service);
    }

    @Override
    public void executer(HttpServletRequest request) {
        Client client = (Client) request.getAttribute("client");
        
        List<Intervention> interventionList = service.consulterHistoriqueIntervention(client);
        request.setAttribute("interventionList",interventionList);
    }

}
