import {useRouter} from 'next/router';

const Profile = ({user = {}}) => {
    const router = useRouter();
    /* Loading */
    if(router.isFallback) return <h1>carregando...</h1>
    return <h1>
        <>
            <p>Profile {user.id}</p>
            <p>{user.name}</p>
            <p>{user.username}</p>
        </>
    </h1>;
}

export async function getStaticProps(context) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${context.params.postName}`);
    const user = await response.json();

    return {      
      props: { user, revalidate: 1 }, // will be passed to the page component as props
    }
  }

  export async function getStaticPaths() {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/`);
    const users = await response.json();
    const usersSlice = users.slice(0, 5);

    const paths = usersSlice.map(user => {
      return { params: {postName: String(user.id)}}; 
    })

    return {
      paths,
      fallback: true,
    };
  }  
export default Profile;
