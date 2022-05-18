package controllers;


/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import vues.AddInterventionSerialization;
import Actions.Action;
import Actions.AuthentificateClientAction;
import Actions.AddInterventionAction;
import Actions.AuthentificateEmployeAction;
import Actions.EndInterventionAction;
import Actions.GetHistoryAction;
import Actions.GetHistoryEmployeAction;
import Actions.GetProfileAction;
import Actions.GetProfileEmployeAction;
import Actions.SignUpClientAction;
import dao.JpaUtil;
import java.io.IOException;
import java.util.Enumeration;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import metier.modele.Client;
import metier.modele.Employe;
import metier.service.Service;
import vues.AuthentificateClientSerialization;
import vues.AuthentificateEmployeSerialization;
import vues.EndInterventionSerialization;
import vues.GetErrorSerialization;
import vues.GetHistoryEmployeSerialization;
import vues.GetHistorySerialization;
import vues.GetProfileEmployeSerialization;
import vues.GetProfileSerialization;
import vues.SignUpClientSerialisation;
import vues.Serialization;

/**
 *
 * @author mjoseph
 */
public class ActionServlet extends HttpServlet {

    @Override
    public void init() throws ServletException {
        super.init();
        JpaUtil.init();
    }

    @Override
    public void destroy() {
        JpaUtil.destroy();
        super.destroy();
    }

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Print all request params
        /*
        Enumeration<String> params = request.getParameterNames();
        while (params.hasMoreElements()) {
            String paramName = params.nextElement();
            System.out.println("Parameter Name - " + paramName + ", Value - " + request.getParameter(paramName));
        }
        */

        String todo = request.getParameter("todo");
        Service service = new Service();
        response.setContentType("text/html;charset=UTF-8");
        //Creat a session if it has not been previously done
        HttpSession session = request.getSession(true);

        switch (todo) {
            case "connect": {
                Action action = new AuthentificateClientAction(service);
                action.executer(request);
                Serialization serialisation = new AuthentificateClientSerialization();
                serialisation.appliquer(request, response);

                if (request.getAttribute("connection") == Boolean.TRUE) {
                    session.setAttribute("client", request.getAttribute("client"));
                    System.out.println(request.getAttribute("client"));
                }

                break;
            }

            case "connectEmploye": {
                Action action = new AuthentificateEmployeAction(service);
                action.executer(request);
                Serialization serialisation = new AuthentificateEmployeSerialization();
                serialisation.appliquer(request, response);

                if (request.getAttribute("connection") == Boolean.TRUE) {
                    session.setAttribute("employe", request.getAttribute("employe"));
                }
                break;
            }

            case "signup": {

                Action action = new SignUpClientAction(service);
                action.executer(request);
                Serialization serialisation = new SignUpClientSerialisation();
                serialisation.appliquer(request, response);
                break;
            }

            case "profile": {
                System.out.println(session.getAttribute("client"));
                if (checkIsConnected(session)) {
                    request.setAttribute("error", Boolean.FALSE);
                    request.setAttribute("client", (Client) session.getAttribute("client"));
                    Action action = new GetProfileAction(service);
                    action.executer(request);
                    Serialization serialisation = new GetProfileSerialization();
                    serialisation.appliquer(request, response);
                } else {
                    request.setAttribute("error", Boolean.TRUE);
                    request.setAttribute("errorMessage", "You must be connected");
                    sendError(request, response);
                }
                break;
            }

            case "profileEmploye": {
                if (checkIsConnectedEmploye(session)) {
                    request.setAttribute("error", Boolean.FALSE);
                    request.setAttribute("employe", (Employe) session.getAttribute("employe"));
                    
                    System.out.println("************************************************************");
                    System.out.println(((Employe) session.getAttribute("employe")).getPrenom());
                    Action action = new GetProfileEmployeAction(service);
                    action.executer(request);
                    System.out.println("ouiiiiii");
                    Serialization serialisation = new GetProfileEmployeSerialization();
                    serialisation.appliquer(request, response);
                } else {
                    request.setAttribute("error", Boolean.TRUE);
                    request.setAttribute("errorMessage", "You must be connected");
                    sendError(request, response);
                }
                break;
            }

            case "history": {
                if (checkIsConnected(session)) {
                    request.setAttribute("error", Boolean.FALSE);
                    request.setAttribute("client", (Client) session.getAttribute("client"));
                    Action action = new GetHistoryAction(service);
                    action.executer(request);
                    Serialization serialisation = new GetHistorySerialization();
                    serialisation.appliquer(request, response);
                } else {
                    request.setAttribute("error", Boolean.TRUE);
                    request.setAttribute("errorMessage", "You must be connected");
                    sendError(request, response);
                }
                break;
            }
            case "historyEmploye": {
                if (checkIsConnectedEmploye(session)) {
                    request.setAttribute("error", Boolean.FALSE);
                    request.setAttribute("employe", (Employe) session.getAttribute("employe"));
                    Action action = new GetHistoryEmployeAction(service);
                    action.executer(request);
                    Serialization serialisation = new GetHistoryEmployeSerialization();
                    serialisation.appliquer(request, response);
                } else {
                    request.setAttribute("error", Boolean.TRUE);
                    request.setAttribute("errorMessage", "You must be connected");
                    sendError(request, response);
                }
                break;
            }
            case "intervention-delivery": {
                // EMPTY CASE
            }
            case "intervention-incident": {
                // EMPTY CASE
            }
            case "intervention-animal": {
                if (checkIsConnected(session)) {
                    request.setAttribute("client", (Client) session.getAttribute("client"));
                    Action action = new AddInterventionAction(service);
                    action.executer(request);
                    AddInterventionSerialization serialisation = new AddInterventionSerialization();
                    serialisation.appliquer(request, response);
                } else {
                    request.setAttribute("error", Boolean.TRUE);
                    request.setAttribute("errorMessage", "You must be connected");
                    sendError(request, response);
                }
                break;
            }
            case "endIntervention": {
                if (checkIsConnectedEmploye(session)) {
                    request.setAttribute("error", Boolean.FALSE);
                    request.setAttribute("employe", (Employe) session.getAttribute("employe"));
                    Action action = new EndInterventionAction(service);
                    action.executer(request);
                    Serialization serialisation = new EndInterventionSerialization();
                    serialisation.appliquer(request, response);
                } else {
                    request.setAttribute("error", Boolean.TRUE);
                    request.setAttribute("errorMessage", "You must be connected");
                    sendError(request, response);
                }
                break;
            }
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

    private boolean checkIsConnected(HttpSession session) {
        return session.getAttribute("client") != null;
    }

    private boolean checkIsConnectedEmploye(HttpSession session) {
        return session.getAttribute("employe") != null;
    }

    private void sendError(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Serialization serialization = new GetErrorSerialization();
        serialization.appliquer(request, response);
    }

}
