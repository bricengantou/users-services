import { Firestore } from '@google-cloud/firestore';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FirebaseService {
  constructor(@Inject('FIRESTORE') private firestore: Firestore) {}

  async getDocument(docId: string) {
    const docRef = this.firestore.collection('users').doc(docId);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new Error('Document does not exist!');
    }
    return doc.data();
  }
}
