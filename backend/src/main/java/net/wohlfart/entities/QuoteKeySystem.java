package net.wohlfart.entities;

import javax.persistence.*;

@Entity
@Table(name = "QUOTE_KEY_SYSTEM")
public class QuoteKeySystem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

}
