import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FirebaseController } from './firebase.controller';

import { FirebaseService } from './firebase.service';

@Module({
  controllers: [FirebaseController],
  providers: [
    FirebaseService,
    {
      provide: 'FIRESTORE',
      useFactory: () => {
        admin.initializeApp({
          credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          }),
        });
        return admin.firestore();
      },
    },
  ],
  exports: ['FIRESTORE'],
})
export class FirebaseModule {}
