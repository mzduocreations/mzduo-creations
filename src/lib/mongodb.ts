import { MongoClient, Db } from "mongodb";
import dns from "dns";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "mzduo";

if (!uri) {
  throw new Error("Missing MONGODB_URI environment variable");
}

const options = {
  serverSelectionTimeoutMS: 8000,
  connectTimeoutMS: 8000,
};

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function isDnsError(err: unknown): boolean {
  const e = err as { code?: string; syscall?: string; cause?: { code?: string } };
  const code = e?.code || e?.cause?.code;
  return (
    code === "ECONNREFUSED" ||
    code === "ESERVFAIL" ||
    code === "ETIMEOUT" ||
    code === "ENOTFOUND" ||
    String(e?.syscall || "").includes("querySrv")
  );
}

async function connectOnce(): Promise<MongoClient> {
  return new MongoClient(uri!, options).connect();
}

function connect(): Promise<MongoClient> {
  const p = connectOnce().catch(async (err) => {
    // Only if the FIRST attempt fails with a DNS-type error do we fall back to
    // public resolvers and retry. On a normal machine the first attempt works,
    // so the system DNS is never overridden.
    if (isDnsError(err)) {
      try {
        dns.setServers(["8.8.8.8", "1.1.1.1", ...dns.getServers()]);
      } catch {
        /* ignore */
      }
      return connectOnce();
    }
    throw err;
  });

  // Don't cache a rejected promise — otherwise one failure would break every
  // later request until the server restarts.
  p.catch(() => {
    if (global._mongoClientPromise === p) global._mongoClientPromise = undefined;
  });
  return p;
}

function getClientPromise(): Promise<MongoClient> {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = connect();
  }
  return global._mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const connectedClient = await getClientPromise();
  return connectedClient.db(dbName);
}

export default getClientPromise;
