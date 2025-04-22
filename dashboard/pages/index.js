import { collection, getDocs } from 'firebase/firestore';

export async function getServerSideProps() {
  const querySnapshot = await getDocs(collection(db, 'messages'));
  const messages = querySnapshot.docs.map(doc => doc.data());
  return { props: { messages } };
}