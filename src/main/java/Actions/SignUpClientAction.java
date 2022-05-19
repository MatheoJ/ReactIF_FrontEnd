/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Actions;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import metier.modele.Client;
import metier.service.Service;

/**
 *
 * @author mjoseph
 */
public class SignUpClientAction extends Action {

    public SignUpClientAction(Service service) {
        super(service);
    }

    @Override
    public void executer(HttpServletRequest request) {

        String pattern = "yyyy-MM-dd";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);

        String confirmPassword = request.getParameter("confirm_password");
        String password = request.getParameter("password");
        String firstName = request.getParameter("first_name");
        String lastName = request.getParameter("last_name");
        String email = request.getParameter("email");
        String phone = request.getParameter("phone");
        String address = request.getParameter("address");
        String birthDateField = request.getParameter("birth_date");

        boolean valid = true;
        StringBuilder builder = new StringBuilder(10);
        if (!password.equals(confirmPassword)) {
            builder.append("Le mot de passe de confirmation est invalide.\n");
            valid = false;
        }
        if (password.equals("")) {
            builder.append("Veuillez renseigner un mot de passe.\n");
            valid = false;
        }
        if (firstName.equals("")) {
            builder.append("Veuillez renseigner votre prénom.\n");
            valid = false;
        }
        if (lastName.equals("")) {
            builder.append("Veuillez renseigner votre nom de famille.\n");
            valid = false;
        }
        if (email.equals("")) {
            builder.append("Veuillez renseigner votre email.\n");
            valid = false;
        }
        if (phone.equals("")) {
            builder.append("Veuillez renseigner votre numéro de téléphone.\n");
            valid = false;
        }
        if (address.equals("")) {
            builder.append("Veuillez renseigner votre adresse.\n");
            valid = false;
        }
        if (birthDateField.equals("")) {
            builder.append("Veuillez renseigner votre adresse.\n");
            valid = false;
        }

        Date birthDate = null;
        try {
            birthDate = simpleDateFormat.parse(request.getParameter("birth_date"));
        } catch (ParseException ex) {
            builder.append("Date de naissance invalide.\n");
            valid = false;
        }

        Client clientCree = null;
        if (valid) {
            Client newClient = new Client(lastName, firstName, email, password, phone, address, birthDate);
            clientCree = service.inscrireClient(newClient);
            if (clientCree == null) {
                builder.append("L'adresse e-mail est déjà utilisée !\n");
            }
        }

        if (clientCree == null) {
            request.setAttribute("error", true);
            request.setAttribute("errorMessage", builder.toString());
        } else {
            request.setAttribute("error", false);
            request.setAttribute("client", clientCree);
        }
    }

}
