package edu.eci.artt.crpodcast.modal.user;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 *
 * @author jmvillatei
 */
public interface UserRepository extends MongoRepository<User, String> {

    /**
     * Este metodo obtiene un usuario desde la base de datos mediante su userNickname
     *
     * @param userNickname
     * @return
     */
    public User getUserByUserNickname(String userNickname);

   

}
