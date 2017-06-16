package net.wohlfart.entities;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface CustomUserRepository extends CrudRepository<User, Long> {

}