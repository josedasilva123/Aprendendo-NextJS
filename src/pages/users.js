import React from 'react';
import Link from 'next/link';

const Users = ({users}) => {
    /*
    const [users, setUsers] = React.useState([]);

    const fetchUsers = async () => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const data = response.data;
        setUsers(data);
    };

    console.log(users);

    React.useEffect(() => {
        fetchUsers();
    }, []);
     */
    return (
        <>
            {users.map((user) => (
                <Link href="/profile/[postName]" as={`/profile/${user.id}`} key={user.id}>{user.name}</Link>
            ))}
        </>
    );
   
}
export async function getServerSideProps(context) {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    return {
        props: {
          users,
        },
    }    
  }

export default Users;