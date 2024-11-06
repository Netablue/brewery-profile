import { use } from 'react';
import SearchBrewery from '@/components/SearchBrewery/SearchBrewery';

interface User {
  id: number;
  name: string;
  email: string;
}

async function getUsers() {
  const response = await fetch('http://localhost:3000/api/users');
  if (!response.ok) {
    return { message: "No users found" };
  }
  return response.json();
}

export default function Home() {
  const users = use(getUsers());

  return (
    <div className='text-center'>
      <h1>Users List</h1>
      <ul>

        {users.length > 0 ? (
          <ul>
            {users.map((user: User) => (
              <li key={user.id}>
                {user.name} - {user.email}
              </li>
            ))}
          </ul>
        ) : (
          <p>No users found.</p>
        )}

      </ul>

      {/* SearchBrewery */}
      <SearchBrewery/>

    </div>
  );
}
