import bucket from './firebaseAdmin';
export const uploadProfilePicture = async (req: Request, res: Response) => {
    try {
      const file = req.file;
      const userId = req.body.userId;

      if (!file) {
        return res.status(400).send('No file uploaded');
      }

      const filename = `${userId}-${Date.now()}${path.extname(file.originalname)}`;
      const fileUpload = bucket.file(filename);

      const stream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });

      stream.on('error', (error) => {
        console.error('Upload error:', error);
        res.status(500).send('Upload error');
      });

      stream.on('finish', async () => {
        try {
          await fileUpload.makePublic();
          const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;

          const userDocRef = doc(db, 'users', userId);
          await setDoc(userDocRef, { profilePictureUrl: publicUrl }, { merge: true });

          res.status(200).json({ url: publicUrl });
        } catch (error) {
          console.error('Error making file public:', error);
          res.status(500).send('Error making file public');
        }
      });

      stream.end(file.buffer);
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).send('Upload error');
    }
  };

  export const fetchProfilePicture = async (req: Request, res: Response) => {
    try {
      const userId = req.query.userId;
      const usersCollectionRef = collection(db, 'users');
      const querySnapshot = await getDocs(usersCollectionRef);
      const userDoc = querySnapshot.docs.find(doc => doc.id === userId);

      if (!userDoc) {
        return res.status(404).json({ error: 'User not found' });
      }

      const userData = userDoc.data();
      res.json({ data: userData });
    } catch (error) {
      console.error('Error fetching profile picture:', error);
      res.status(500).json({ error: 'Failed to fetch profile picture' });
    }
  };
