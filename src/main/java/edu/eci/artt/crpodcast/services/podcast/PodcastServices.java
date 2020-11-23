package edu.eci.artt.crpodcast.services.podcast;
import edu.eci.artt.crpodcast.modal.podcast.Podcast;
import java.util.List;
/**
 *
 * @author jmvillatei
 */

public interface PodcastServices {

    /**
     * Este metodo permite obtener todos los podcast
     *
     * @return Una lista con todos los podcast
     */
    public List<Podcast> getAllPodcast();

    /**
     * Este metodo permite guardar nuevo podcast
     *
     * @param podcast
     */
    public void createNewPodcast(Podcast podcast);

    /**
     * Este metodo permite obtener un podcast por su titulo
     *
     * @param podcastTitle titulo del podcast a obtener
     * @return El podcast que pertenece a ese titulo
     */
    public Podcast getPodcastByTitle(String podcastTitle);

    /**
     * Este metodo permite obtener un podcast por su id
     *
     * @param id id del podcast a obtener
     * @return El podcast que pertenece a ese id
     */
    public Podcast getPodcastById(String id);

    /**
     * Metodo que permite actualizar un podcast.
     * @param podcast Es el podcast a actualizar.
     */
    public void updatePodcast(Podcast podcast);
}