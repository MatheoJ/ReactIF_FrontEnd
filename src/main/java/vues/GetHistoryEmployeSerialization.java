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
import metier.modele.Intervention;
import metier.modele.InterventionAnimal;
import metier.modele.InterventionLivraison;

/**
 *
 * @author mjoseph
 */
public class GetHistoryEmployeSerialization extends Serialization {

    @Override
    public void appliquer(HttpServletRequest request, HttpServletResponse response) throws IOException {

        // Json wrapper
        List<Intervention> interventionList = (List<Intervention>) request.getAttribute("interventionList");
        Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().create();

        JsonObject container = new JsonObject();
        JsonArray interventionArray = new JsonArray();

        for (Intervention i : interventionList) {
            JsonObject jsonIntervention = new JsonObject();
            jsonIntervention.addProperty("type", i.getType());
            String pattern = "dd/MM/yyyy";
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
            jsonIntervention.addProperty("start_date", simpleDateFormat.format(i.getDateDemande()));
            if (i.getEtat().equals("Terminé")) {
                jsonIntervention.addProperty("end_date", simpleDateFormat.format(i.getDateCloture()));
            }
            jsonIntervention.addProperty("id", i.getId());
            jsonIntervention.addProperty("description", i.getDescription());
            jsonIntervention.addProperty("address", i.getClient().getAdresse());
            jsonIntervention.addProperty("state", i.getEtat());
            jsonIntervention.addProperty("status", i.getStatut());

            JsonObject jsonClient = new JsonObject();
            jsonClient.addProperty("last_name", i.getClient().getNom());
            jsonClient.addProperty("first_name", i.getClient().getPrenom());
            jsonIntervention.add("client", jsonClient);

            switch (i.getType()) {
                case "Animal":
                    jsonIntervention.addProperty("species", ((InterventionAnimal) i).getEspeceAnimal());
                    break;
                case "Incident":
                    // EMPTY
                    break;
                case "Livraison":
                    jsonIntervention.addProperty("object", ((InterventionLivraison) i).getObjet());
                    jsonIntervention.addProperty("company", ((InterventionLivraison) i).getEntreprise());
                    break;
            }
            interventionArray.add(jsonIntervention);
        }

        container.add("interventionList", interventionArray);

        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        out.println(gson.toJson(container));
        out.close();
    }

}
