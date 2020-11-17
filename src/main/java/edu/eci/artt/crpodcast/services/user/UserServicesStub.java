package edu.eci.artt.crpodcast.services.user;

import edu.eci.artt.crpodcast.modal.user.User;
import edu.eci.artt.crpodcast.persistence.UserPersistence;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author jmvillatei
 */
@Service
public class UserServicesStub implements UserServices{

    @Autowired
    private UserPersistence uPersistence;
    
    @Override
    public List<User> getAllUsers() {
        return uPersistence.getAllUsers();
    }

    @Override
    public void createNewUser(User us) { 
        uPersistence.createNewUser(us);
    }

    @Override
    public User getUserByUserNickname(String userNickname) {
        return uPersistence.getUserByUserNickname(userNickname);
    }

    @Override
    public void deleteUserByUserNickname(String userNickname) {
        uPersistence.deleteUserByUserNickname(userNickname);
    }

    @Override
    public void updateUser(User user) {
        uPersistence.updateUser(user);
    }

    @Override
    public User getUserById(String id) {
        return uPersistence.getUserById(id);

    }
 
    
}