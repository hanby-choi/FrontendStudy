import { connectDB } from '@/util/database';
import ListItem from './ListItem';
export const revalidate = 20;

export default async function List() {
  let client = await connectDB;
  const db = client.db('forum');
  let result = await db.collection('post').find().toArray();

  return (
    <div className="list-bg">
      <ListItem result={result} />
    </div>
  );
}
