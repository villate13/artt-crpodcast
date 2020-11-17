package edu.eci.artt.crpodcast.modal.user;

import org.springframework.data.annotation.Id;

import java.util.List;

/**
 *
 * @author jmvillatei
 */
public class User {
    
    @Id
    public String idUser;
    
    private String userType;
    private String userName;
    private String userEmail;
    private String userPassword;
    private String userNickname;
    private int userFeedback;
    
    private List podcast;

    public User(String userPassword, String userNickname) {
        this.userPassword = userPassword;
        this.userNickname = userNickname;
        this.userFeedback = 0;
    }
    
    public String getIdUser() {
        return idUser;
    }
    public void setIdUser(String idUser) {
        this.idUser = idUser;
    }
    
    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }


    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public String getUserNickname() {
        return userNickname;
    }

    public void setUserNickname(String userNickname) {
        this.userNickname = userNickname;
    }


    public int getUserFeedback() {
        return userFeedback;
    }

    public void setUserFeedback(int userFeedback) {
        this.userFeedback = userFeedback;
    }

    public List getPodcast() {
        return podcast;
    }

    public void setPodcast(List podcast) {
        this.podcast = podcast;
    }
    
}