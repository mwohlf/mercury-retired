package net.wohlfart.entities;

import javax.persistence.*;

@Entity
@Table(name = "QUOTE")
public class Quote {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
 
}
