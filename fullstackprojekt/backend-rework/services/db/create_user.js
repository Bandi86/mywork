export function createUser(
    id,
    email,
    hashedPassword,
    username,    
    role,
    created_at,
    callback
  ) {
    // Adatbázis művelet
    db.run(
      `INSERT INTO user (id, email, password, username, role, created_at)
          VALUES ($id, $email, $password, $username, $role, $created_at)`,
      {
        $id: id,
        $email: email,
        $password: hashedPassword,
        $username: username,
        $role: role,        
        $created_at: created_at,
      },
      (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null);
        }
      }
    );
  }