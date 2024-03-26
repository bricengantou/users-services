import { Firestore } from '@google-cloud/firestore';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(@Inject('FIRESTORE') private firestore: Firestore) {}

  async getDocument(collectionName: string) {
    const docRef = this.firestore.collection(collectionName);
    const doc = await docRef.get();
    if (doc.empty) {
      throw new Error('Document does not exist!');
    }
    return doc.docs;
  }
}
