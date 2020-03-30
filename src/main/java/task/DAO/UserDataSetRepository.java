package task.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import task.model.UserDataSet;

@Repository
public interface UserDataSetRepository extends JpaRepository<UserDataSet, Long> {

    UserDataSet findUserDataSetByLogin(String login);
    UserDataSet findByUsername(String username);
}
