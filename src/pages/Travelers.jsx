import { useEffect, useState } from "react";
import axios from "axios";

export default function Travelers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://dummyjson.com/users")
      .then((res) => {
        setUsers(res.data.users); 
      })
      .catch((err) => {
        setError(err.message || "Gagal memuat data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center">Loading data users...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Daftar Users</h1>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="p-3 text-left border-b">ID</th>
            <th className="p-3 text-left border-b">Name</th>
            <th className="p-3 text-left border-b">Email</th>
            <th className="p-3 text-left border-b">Phone</th>
            <th className="p-3 text-left border-b">Username</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="p-3 border-b">{user.id}</td>
              <td className="p-3 border-b">{user.firstName} {user.lastName}</td>
              <td className="p-3 border-b">{user.email}</td>
              <td className="p-3 border-b">{user.phone}</td>
              <td className="p-3 border-b">{user.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
