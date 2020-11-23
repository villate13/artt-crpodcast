package edu.eci.artt.crpodcast.services.podcast;

import edu.eci.artt.crpodcast.modal.podcast.Podcast;
import edu.eci.artt.crpodcast.persistence.PodcastPersistence;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author jmvillatei
 */
@Service
public class PodcastServicesStub implements PodcastServices{

    @Autowired
    private PodcastPersistence pPersistence;

    @Override
    public List<Podcast> getAllPodcast() {
        return pPersistence.getAllPodcast();
    }

    @Override
    public void createNewPodcast(Podcast podcast) { 
        pPersistence.createNewPodcast(podcast);
    }

    @Override
    public Podcast getPodcastByTitle(String podcastTitle){
        return pPersistence.getPodcastByTitle(podcastTitle);
    }

    @Override
    public Podcast getPodcastById(String id){
        return pPersistence.getPodcastById(id);
    }

    @Override
    public void updatePodcast(Podcast podcast) {
        pPersistence.updatePodcast(podcast);
    }

}