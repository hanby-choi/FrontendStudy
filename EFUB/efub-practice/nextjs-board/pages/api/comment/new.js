import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
export default async function handler(req, res) {
  let session = await getServerSession(req, res, authOptions);
  if (session) {
    if (req.method == 'POST') {
      req.body = JSON.parse(req.body);
      console.log(res.body);
      let content = {
        content: req.body.comment,
        parent: new ObjectId(req.body._id),
        author: session.user.email,
      };
      let db = (await connectDB).db('forum');
      let result = await db.collection('comment').insertOne(content);
      res.status(200).json('저장완료');
    }
  }
}
