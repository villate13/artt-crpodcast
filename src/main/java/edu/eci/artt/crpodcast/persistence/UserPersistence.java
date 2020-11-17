package edu.eci.artt.crpodcast.persistence;

import edu.eci.artt.crpodcast.modal.user.User;
import java.util.List;

/**
 *
 * @author jmvillatei
 */

public interface UserPersistence {
    
    /**
     * Este metodo permite obtener todos los usuarios
     *
     * @return Una lista con todos los usuarios
     */
    public List<User> getAllUsers();
    
    /**
     * Este metodo permite la creacion de un nuevo usuario
     *
     * @param us Es el nuevo usuario a crear.
     */
    public void createNewUser(User us);

    /**
     * Este metodo permite obtener un usuario por su nickname
     *
     * @param userNickname nickname del usuario a obtener
     * @return El usuario que pertenece a ese nickname
     */
    public User getUserByUserNickname(String userNickname);

    /**
     * Este metodo permite obtener un usuario por su id
     *
     * @param id Es el id del usuario que se quiere obtener
     * @return Retorna el usuario correspondiente al id.
     */
    public User getUserById(String id);

    /**
     * Este metodo permite eliminar un usuario por su nickname
     *
     * @param userNickname Es el nickname del usuario que se quiere eliminar.
     */
    public void deleteUserByUserNickname(String userNickname);
    
    /**
     * Metodo que permite actualizar un usuario.
     * @param user Es el usuario a actualizar.
     */
    public void updateUser(User user);

}