import { initializeApp, getApps, cert } from "firebase-admin/app";
import type { App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import type { Firestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import type { Auth } from "firebase-admin/auth";

function formatPrivateKey(key: string | undefined): string | undefined {
  if (!key) return undefined;
  return key.replace(/\\n/g, "\n");
}

export function initFirebaseAdmin(): {
  firestore: Firestore | null;
  auth: Auth | null;
} {
  const existingApps = getApps();
  if (existingApps.length > 0) {
    const existingApp = existingApps[0]!;
    return {
      firestore: getFirestore(existingApp),
      auth: getAuth(existingApp),
    };
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = formatPrivateKey(process.env.FIREBASE_PRIVATE_KEY);

  if (!projectId || !clientEmail || !privateKey) {
    console.error("Missing Firebase Admin environment variables");
    return { firestore: null, auth: null };
  }

  try {
    const app: App = initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });

    return {
      firestore: getFirestore(app),
      auth: getAuth(app),
    };
  } catch (error) {
    console.error("Failed to initialize Firebase Admin SDK:", error);
    return { firestore: null, auth: null };
  }
}
