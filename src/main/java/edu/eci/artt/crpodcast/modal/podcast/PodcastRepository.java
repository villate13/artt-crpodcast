package edu.eci.artt.crpodcast.modal.podcast;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.domain.Sort;



/**
 *
 * @author jmvillatei
 */
public interface PodcastRepository extends MongoRepository<Podcast, String> {

    /**
     * Este metodo obtiene un podcast desde la base de datos mediante su titulo
     *
     * @param podcastTitle
     * @return
     */
    public Podcast getPodcastByPodcastTitle(String podcastTitle);
  

}