import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import Comment from './Comment';

export default async function Detail(props) {
  //console.log(props);
  let client = await connectDB;
  const db = client.db('forum');

  const _id = props.params.id;

  let result = await db.collection('post').findOne({ _id: new ObjectId(_id) });
  return (
    <div>
      <h4>상세 페이지</h4>
      <h4>{result.title}</h4>
      <h4>{result.content}</h4>
      {result.imgUrl ? <img src={result.imgUrl} /> : <></>}
      <Comment _id={_id} />
    </div>
  );
}
