import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
export default async function handler(req, res) {
  if (req.method == 'POST') {
    let newDocument = {
      title: req.body.title,
      content: req.body.content,
    };
    const db = (await connectDB).db('forum');
    let result = await db
      .collection('post')
      .updateOne({ _id: new ObjectId(req.body._id) }, { $set: newDocument });
    return res.redirect(302, '/list');
  }
}
