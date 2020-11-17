package edu.eci.artt.crpodcast.persistence.impl;

import edu.eci.artt.crpodcast.modal.user.User;
import edu.eci.artt.crpodcast.persistence.UserPersistence;
import edu.eci.artt.crpodcast.modal.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.stereotype.Service;

/**
 *
 * @author jmvillatei
 */
@Service
public class InMemoryUserPersistence implements UserPersistence {

    @Autowired
    private UserRepository uRepository;

    
    @Override
    public List<User> getAllUsers() {
        List<User> listaUsuarios = null;
        try {
            listaUsuarios = uRepository.findAll();
            return listaUsuarios;
        } catch (Exception ex) {
            System.out.println("No se han podido obtener los usuarios");
            return listaUsuarios;
        }

    }

    @Override
    public void createNewUser(User us) {
        try {

            Boolean existeUsuario = false;
            List<User> listaUsuario = new ArrayList<>();
            listaUsuario = getAllUsers();

            for (User x : listaUsuario) {
                if (x.getUserNickname().equals(us.getUserNickname())) {
                    existeUsuario = true;
                }
            }

            if (!existeUsuario) {
                uRepository.save(us);
            } else {
                System.out.println("Este usuario ya existe");
            }
        } catch (Exception ex) {
            System.out.println("No se ha podido crear esta usuario");
        }
    }

    @Override
    public User getUserByUserNickname(String userNickname) {
        User usuarioNuevo = null;
        try {
            usuarioNuevo = uRepository.getUserByUserNickname(userNickname);
            return usuarioNuevo;
        } catch (Exception ex) {
            System.out.println("No se ha podido obtener el usuario");
            return usuarioNuevo;
        }
        
    }

    @Override
    public void updateUser(User user) {
        // newDb();
        // try {
        //     wsdb.updateUser(user);
        // } catch (Exception ex) {
        //     Logger.getLogger(InMemoryUserPersistence.class.getName()).log(Level.SEVERE, null, ex);
        // }
        

    }

    @Override
    public User getUserById(String id) {
        User usuarioNuevo = null;
        // try {
        //     usuarioNuevo = uRepository.getUserById(id);
        //     return usuarioNuevo;
        // } catch (Exception ex) {
        //     System.out.println("No se ha podido obtener el usuario");
        //     return usuarioNuevo;
        // }
        return usuarioNuevo;

    }

    @Override
    public void deleteUserByUserNickname(String userNickname) {
        // uPersistence.deleteUserByUserNickname(userNickname);
    }
}