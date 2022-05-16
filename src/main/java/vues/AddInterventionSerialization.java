/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package vues;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
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
public class AddInterventionSerialization extends Serialization {

    @Override
    public void appliquer(HttpServletRequest request, HttpServletResponse response) throws IOException {

        JsonObject container = new JsonObject();
        Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().create();

        JsonObject jsonCurrentIntervention = new JsonObject();
        Intervention intervention = (Intervention) request.getAttribute("intervention");
        if (intervention == null) {
            container.addProperty("error", Boolean.TRUE);
            String errorMessage = "Votre demande d'intervention a échoué\nVeuillez réessayer ultérieurement";
            container.addProperty("errorMessage", errorMessage);
        } else {
            jsonCurrentIntervention.addProperty("type", intervention.getType());

            String pattern = "dd/MM/yyyy";
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
            jsonCurrentIntervention.addProperty("date", simpleDateFormat.format(intervention.getDateDemande()));
            jsonCurrentIntervention.addProperty("id", intervention.getId());
            jsonCurrentIntervention.addProperty("description", intervention.getDescription());

            JsonObject jsonEmployee = new JsonObject();
            jsonEmployee.addProperty("last_name", intervention.getEmploye().getNom());
            jsonEmployee.addProperty("first_name", intervention.getEmploye().getPrenom());
            jsonCurrentIntervention.add("employee", jsonEmployee);

            switch (intervention.getType()) {
                case "Animal":
                    jsonCurrentIntervention.addProperty("species", ((InterventionAnimal) intervention).getEspeceAnimal());
                    break;
                case "Incident":
                    // EMPTY
                    break;
                case "Livraison":
                    jsonCurrentIntervention.addProperty("object", ((InterventionLivraison) intervention).getObjet());
                    jsonCurrentIntervention.addProperty("company", ((InterventionLivraison) intervention).getEntreprise());
                    break;
            }

            container.add("intervention", jsonCurrentIntervention);
            container.addProperty("error", Boolean.FALSE);
        }

        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        out.println(gson.toJson(container));
        out.close();
    }
}
