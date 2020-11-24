package edu.eci.artt.crpodcast.controllers;

import edu.eci.artt.crpodcast.modal.podcast.Podcast;
import edu.eci.artt.crpodcast.services.podcast.PodcastServices;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.http.HttpStatus;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;
import java.util.Date;
import java.util.Map;
import org.bson.types.ObjectId;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

/**
 *
 * @author jmvillatei
 */
@RestController
@RequestMapping(value = "/api/v1")
public class PodcastAPIController {

    @Autowired
    private PodcastServices pService;


    @RequestMapping(method = RequestMethod.GET, path = "podcast")
    public ResponseEntity<?> getAllPodcast() {
        try {
            System.out.println("Consultando Podast...");
            List<Podcast> podcast = new ArrayList<>();

            String data = new Gson().toJson(pService.getAllPodcast());

            return new ResponseEntity<>(data, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            Logger.getLogger(PodcastAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("No se ha podido retornar los podcast", HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(method = RequestMethod.POST, path = "podcast")
    public ResponseEntity<?> createNewPodcast(@RequestBody String podcast) {
        // Formato de json
        // {"1":{"podcastTitle":"title","podcastCategory":"categoria","podcastURL":"url"}}
        try {
            System.out.println("Creando nuevo podcast...");
            // Pasar el String JSON a un Map
            Type listType = new TypeToken<Map<Integer, Podcast>>() {
            }.getType();
            Map<String, Podcast> result = new Gson().fromJson(podcast, listType);

            // Obtener las llaves del Map
            Object[] nameKeys = result.keySet().toArray();

            Podcast pc = result.get(nameKeys[0]);
            ObjectId newObjectIdPodcast = new ObjectId(new Date());
            pc.setIdPodcast(newObjectIdPodcast.toHexString());


            if (pService.getPodcastByTitle(pc.getPodcastTitle()) == null) {
                pc.setPodcastDate(new Date());
                pService.createNewPodcast(pc);
                return new ResponseEntity<>(HttpStatus.CREATED);
            } else {
                System.out.println("Podcast con el mismo nombre en la plataforma.");
                return new ResponseEntity<>("Podcast con el mismo nombre en la plataforma.",
                        HttpStatus.NOT_ACCEPTABLE);

            }

        } catch (Exception ex) {
            Logger.getLogger(UserAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("No se ha podido registrar el podcast", HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(method = RequestMethod.GET, path = { "podcast/{title}" })
    public ResponseEntity<?> getPodcastByTitle(@PathVariable("title") String title) {
        try {
            System.out.println("Consultando podcast por titulo: " + title);
            Podcast consulPodcast = pService.getPodcastByTitle(title);

            String data = new Gson().toJson(consulPodcast);

            return new ResponseEntity<>(data, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            Logger.getLogger(UserAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("No se ha podido retornar el podcast con titulo: " + title,
                    HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(method = RequestMethod.GET, path = { "podcast/id/{id}" })
    public ResponseEntity<?> getPodcastById(@PathVariable("id") String id) {
        try {
            System.out.println("Consultando podcast por id: " + id);
            Podcast consulPodcast = pService.getPodcastById(id);

            String data = new Gson().toJson(consulPodcast);

            return new ResponseEntity<>(data, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            Logger.getLogger(UserAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("No se ha podido retornar el podcast con id: " + id,
                    HttpStatus.NOT_FOUND);
        }
    }

}