import { adminAuth, db } from '$lib/firebase/admin';
import { json } from '@sveltejs/kit';

async function getUserId(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) throw new Error('No Authorization header');

  const token = authHeader.split(' ')[1];
  if (!token) throw new Error('No token provided');

  try {
    const decoded = await adminAuth.verifyIdToken(token);
    return decoded.uid;
  } catch (error) {
    console.error('Token verification failed', error);
    throw new Error('Invalid token');
  }
}

export async function GET({ request }) {
  try {
    const userId = await getUserId(request);
    const snapshot = await db
      .collection('favourites')
      .doc(userId)
      .collection('items')
      .get();

    const favourites = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return json(favourites);
  } catch (err) {
    console.error('GET error:', err);
    return json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function POST({ request }) {
  try {
    const userId = await getUserId(request);
    const { movieId, title, posterPath } = await request.json();

    const favRef = db
      .collection('favourites')
      .doc(userId)
      .collection('items')
      .doc(movieId.toString());

    const doc = await favRef.get();
    if (doc.exists) {
      return json({ message: 'Already exists' }, { status: 409 });
    }

    const favourite = {
      movieId,
      title,
      posterPath,
      createdAt: new Date().toISOString(),
    };

    await favRef.set(favourite);

    return json({ id: movieId, ...favourite });
  } catch (err) {
    console.error('POST error:', err);
    return json({ error: err || 'Server error' }, { status: 500 });
  }
}

export async function DELETE({ request }) {
  try {
    const userId = await getUserId(request);
    const { movieId } = await request.json();

    const favRef = db
      .collection('favourites')
      .doc(userId)
      .collection('items')
      .doc(movieId.toString());

    await favRef.delete();

    return json({ message: 'Deleted' });
  } catch (err) {
    console.error('DELETE error:', err);
    return json({ error: 'Unauthorized or Server Error' }, { status: 401 });
  }
}
