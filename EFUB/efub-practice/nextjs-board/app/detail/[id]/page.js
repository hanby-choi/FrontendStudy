import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function Detail(props) {
  //console.log(props);
  let client = await connectDB;
  const db = client.db('forum');
  let result = await db
    .collection('post')
    .findOne({ _id: new ObjectId(props.params.id) });
  return (
    <div>
      <h4>상세 페이지</h4>
      <h4>{result.title}</h4>
      <h4>{result.content}</h4>
    </div>
  );
}
