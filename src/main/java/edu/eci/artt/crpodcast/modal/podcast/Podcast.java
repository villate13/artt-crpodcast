package edu.eci.artt.crpodcast.modal.podcast;

import org.springframework.data.annotation.Id;

import java.util.List;
import java.util.ArrayList;
import java.util.Date;

public class Podcast {

    @Id
    public String idPodcast;

    private String category;
    private String podcastTitle;
    private int podcastLikes;
    private int podcastShares;
    private Date podcastDate;
    private int podcastFeedback;

    private String podcastURL;

    private List participants;
    private List commentaries;

    public Podcast(String podcastTitle, String category, String podcastURL) {
        this.podcastTitle = podcastTitle;
        this.category = category;
        this.podcastURL = podcastURL;
        this.podcastFeedback = 0;
        this.podcastLikes = 0;
        this.podcastShares = 0;
        this.participants = new ArrayList();
        this.commentaries = new ArrayList();

    }

    // id
    public String getIdPodcast() {
        return idPodcast;
    }

    public void setIdPodcast(String idUser) {
        this.idPodcast = idPodcast;
    }

    // category
    public String getCategory() {
        return category;
    }

    public void setCategory(String idUser) {
        this.category = category;
    }

    // title
    public String getPodcastTitle() {
        return podcastTitle;
    }

    public void setPodcastTitle(String podcastTitle) {
        this.podcastTitle = podcastTitle;
    }

    // likes
    public int getPodcastLikes() {
        return podcastLikes;
    }

    public void setPodcastLikes(int podcastLikes) {
        this.podcastLikes = podcastLikes;
    }

    // podcastShares
    public int getPodcastShares() {
        return podcastShares;
    }

    public void setPodcastShares(int podcastShares) {
        this.podcastShares = podcastShares;
    }

    // podcastDate
    public Date getPodcastDate() {
        return podcastDate;
    }

    public void setPodcastDate(Date podcastDate) {
        this.podcastDate = podcastDate;
    }

    // podcastFeedback
    public int getPodcastFeedback() {
        return podcastFeedback;
    }

    public void setPodcastFeedback(int podcastFeedback) {
        this.podcastFeedback = podcastFeedback;
    }

    // podcastURL
    public String getPodcastURL() {
        return podcastURL;
    }

    public void setPodcastURL(String podcastURL) {
        this.podcastURL = podcastURL;
    }

    // participants
    public List getParticipants() {
        return participants;
    }

    public void setParticipants(List participants) {
        this.participants = participants;
    }

    // commentaries
    public List getCommentaries() {
        return commentaries;
    }

    public void setCommentaries(List commentaries) {
        this.commentaries = commentaries;
    }
}