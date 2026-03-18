import { useEffect, useState } from "react";
import axios from "axios";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/admin/users`, {
        withCredentials: true,
      })
      .then((res) => setUsers(res.data.users));
  }, []);

  return (
    <>
      <h1 className="text-2xl mb-4">Users</h1>

      {users.map((user) => (
        <div key={user._id} className="bg-white p-3 mb-2 rounded shadow">
          {user.name} - {user.email}
        </div>
      ))}
    </>
  );
};

export default AdminUsers;