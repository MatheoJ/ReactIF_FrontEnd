/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package vues;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import metier.modele.Client;
import metier.modele.Intervention;
import metier.modele.InterventionAnimal;
import metier.modele.InterventionLivraison;

/**
 *
 * @author mjoseph
 */
public class GetHistorySerialization extends Serialization {

    @Override
    public void appliquer(HttpServletRequest request, HttpServletResponse response) throws IOException {

        List<Intervention> interventionList = (List<Intervention>)request.getAttribute("interventionList");
        Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().create();
        
        JsonObject container = new JsonObject();
        JsonArray interventionArray = new JsonArray();
        
        for (Intervention i : interventionList){
            JsonObject jsonI = new JsonObject();
            jsonI.addProperty("type", i.getType());        
            String pattern = "dd/MM/yyyy";
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
            jsonI.addProperty("date", simpleDateFormat.format(i.getDateDemande()));
            jsonI.addProperty("id", i.getId());
            jsonI.addProperty("description", i.getDescription());
            jsonI.addProperty("adresse", i.getClient().getAdresse());
            jsonI.addProperty("etat", i.getEtat());
            
            JsonObject jsonEmployee = new JsonObject();
            jsonEmployee.addProperty("last_name", i.getEmploye().getNom());
            jsonEmployee.addProperty("first_name", i.getEmploye().getPrenom());
            jsonI.add("employee", jsonEmployee);

            switch (i.getType())
            {
                case "Animal":
                    jsonI.addProperty("species", ((InterventionAnimal) i).getEspeceAnimal());
                    break;
                case "Incident":
                    // EMPTY
                    break;
                case "Livraison":
                    jsonI.addProperty("object", ((InterventionLivraison) i).getObjet());
                    jsonI.addProperty("enterprise", ((InterventionLivraison) i).getEntreprise());
                    break;
            }
            interventionArray.add(jsonI);
        }
        
        
        container.add("interventionList", interventionArray);
        
        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        out.println(gson.toJson(container));
        out.close();
    }

}
