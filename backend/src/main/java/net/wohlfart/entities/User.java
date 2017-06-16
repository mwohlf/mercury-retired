package net.wohlfart.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Locale;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name = "USER",
       uniqueConstraints = {
            @UniqueConstraint(columnNames = "ID", name = "USER_PK_CONSTRAINT"),
            @UniqueConstraint(columnNames = "LOGIN", name = "USER_LOGIN_CONSTRAINT")
})
public class User {

    // RESTful API's should not expose surrogate key ID's because they mean nothing to external systems.
    // In RESTful architecture the ID is the canonical URL for that resource.
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "LOGIN", nullable = false, unique = true, length = 100)
    private String login;

    // TODO: use a hash function here
    @JsonIgnore
    @Column(name = "PASSWD_HASH", nullable = true, length = 255)
    private String passwdHash;

    @Column(name = "EMAIL", nullable = false, length = 150)
    private String email;

    // the time zone according to http://joda-time.sourceforge.net/timezones.html
    @Column(name = "TIME_ZONE", nullable = false, length = 25)
    private String timeZone = "Berlin/Germany";

    // the locale according to http://tools.ietf.org/search/bcp47
    @Column(name = "LOCALE", nullable = false, length = 25)
    private Locale locale = Locale.GERMAN;


    public long getId() {
        return id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPasswdHash() {
        return passwdHash;
    }

    public void setPasswdHash(String passwd) {
        this.passwdHash = passwdHash;
    }

    public Locale getLocale() {
        return locale;
    }

    public void setLocale(Locale locale) {
        this.locale = locale;
    }

    public String getTimeZone() {
        return timeZone;
    }

    public void setTimeZone(String timeZone) {
        this.timeZone = timeZone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}