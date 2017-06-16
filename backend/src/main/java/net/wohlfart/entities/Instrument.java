package net.wohlfart.entities;

import java.util.Set;

import javax.persistence.*;

@Entity
@Table(name = "INSTRUMENT")
public class Instrument {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @JoinColumn(name = "INSTRUMENT_ID")
    @OneToMany(targetEntity = Quote.class, fetch = FetchType.LAZY, orphanRemoval = false)
	private Set<Quote> quotes;

	public Set<Quote> getQuotes() {
		return this.quotes;
	}

}
