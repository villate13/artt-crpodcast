package edu.eci.artt.crpodcast.persistence.impl;

import edu.eci.artt.crpodcast.modal.podcast.Podcast;
import edu.eci.artt.crpodcast.persistence.PodcastPersistence;
import edu.eci.artt.crpodcast.modal.podcast.PodcastRepository;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.stereotype.Service;

/**
 *
 * @author jmvillatei
 */
@Service
public class InMemoryPodcastPersistence implements PodcastPersistence {

    @Autowired
    private PodcastRepository pRepository;

    @Override
    public List<Podcast> getAllPodcast() {
        List<Podcast> listaPodcast = null;
        try {
            listaPodcast = pRepository.findAll();
            return listaPodcast;
        } catch (Exception ex) {
            System.out.println("No se han podido obtener los podcast");
            return listaPodcast;
        }
    }

    @Override
    public void createNewPodcast(Podcast podcast) { 
        try {

            Boolean existePodcast = false;
            List<Podcast> listaPodcast = new ArrayList<>();
            listaPodcast = getAllPodcast();

            for (Podcast x : listaPodcast) {
                if (x.getPodcastTitle().equals(podcast.getPodcastTitle())) {
                    existePodcast = true;
                }
            }

            if (!existePodcast) {
                pRepository.save(podcast);
            } else {
                System.out.println("Este podcast ya existe");
            }
        } catch (Exception ex) {
            System.out.println("No se ha podido crear este Podcast");
        }
    }

    @Override
    public Podcast getPodcastByTitle(String podcastTitle){
        Podcast podcastNuevo = null;
        try {
            podcastNuevo = pRepository.getPodcastByPodcastTitle(podcastTitle);
            // podcastNuevo = null;
            return podcastNuevo;
        } catch (Exception ex) {
            System.out.println("No se ha podido obtener el podcast");
            return podcastNuevo;
        }
    }

    @Override
    public Podcast getPodcastById(String id){
        Podcast podcastNuevo = null;
        try {
            Optional<Podcast> data = pRepository.findById(id);
            System.out.println("OK- findbyID");
            if (data.isPresent()) {
                podcastNuevo = data.get();
                System.out.println(podcastNuevo.getPodcastTitle());

                return podcastNuevo;
                
              } else {
                System.out.println("No se ha podido actualizxar el podcast");
                return podcastNuevo;
              }
        } catch (Exception ex) {
            System.out.println("No se ha podido obtener el podcast");
            return podcastNuevo;
        }
    }

    @Override
    public void updatePodcast(Podcast podcast) {
        // String id = podcast.getIdPodcast();
        // try {
        //     Optional<Podcast> data = pRepository.findById(id);
        //     System.out.println("optional");
        //     System.out.println(data);
        //     if (data.isPresent()) {
        //         pRepository.save(podcast);
                
        //       } else {
        //         System.out.println("No se ha podido actualizxar el podcast");
        //       }
        // } catch (Exception ex) {
        //     System.out.println("error al actualizar podcast");
        // }
    }
}