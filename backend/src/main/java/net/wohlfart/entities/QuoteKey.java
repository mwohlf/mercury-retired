package net.wohlfart.entities;

import javax.persistence.*;

@Entity
@Table(name = "QUOTE_KEY")
public class QuoteKey {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
 
}
