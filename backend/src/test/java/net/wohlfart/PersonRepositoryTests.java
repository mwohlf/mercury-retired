package net.wohlfart;

import java.util.HashMap;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceContext;
import javax.sql.DataSource;

import net.wohlfart.entities.Person;
import net.wohlfart.entities.PersonRepository;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.boot.test.autoconfigure.OverrideAutoConfiguration;
import org.springframework.boot.test.autoconfigure.jdbc.TestDatabaseAutoConfiguration;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManagerAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.Transactional;

/*
test using a 'real' DB to validate the DB layout
 */

@RunWith(SpringRunner.class)
@DataJpaTest(showSql = true, excludeAutoConfiguration = {
        TestDatabaseAutoConfiguration.class,
        TestEntityManagerAutoConfiguration.class
        })
@ActiveProfiles(profiles = "dev")
@OverrideAutoConfiguration(enabled = false)
@Transactional
public class PersonRepositoryTests {

    @Autowired
    @SuppressWarnings("SpringJavaAutowiringInspection")
	private PersonRepository personRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Test
	public void testPersonRepository() {
		Person person = new Person();
		person.setFirstName("tom");
		personRepository.save(person);
        entityManager.flush();
        entityManager.clear();
        Assert.assertNotNull(personRepository.findOne(1L));
	}


    /*
    this overrides the config from yaml it seems....
     */
    @Configuration
    static class ContextConfiguration {

        @Bean(name = "dataSource")
        @ConfigurationProperties(prefix="datasource.mercury")
        public DataSource dataSource() {
            return DataSourceBuilder
                    .create()
                    .build();
        }

        @Bean(name = "entityManagerFactory")
        public LocalContainerEntityManagerFactoryBean entityManagerFactory(
                EntityManagerFactoryBuilder builder,
                @Qualifier("dataSource") DataSource dataSource) {
            HashMap<String, Object> props = new HashMap<>();
            props.put("hibernate.hbm2ddl.auto", "create");
            return builder
                    .dataSource(dataSource)
                    .packages("net.wohlfart")
                    .properties(props)
                    .persistenceUnit("mercuryPersistenceUnit")
                    .build();
        }

        @Bean(name = "transactionManager")
        public PlatformTransactionManager transactionManager(
                @Qualifier("entityManagerFactory") EntityManagerFactory entityManagerFactory) {
            return new JpaTransactionManager(entityManagerFactory);
        }

    }

}
