import { Client, Databases, Query, ID } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APP_WRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_MOVIE_DB_ID;
const COLLECTION_ID = import.meta.env.VITE_METRICS_ID;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Fixed endpoint
  .setProject(PROJECT_ID);

const database = new Databases(client);

export const updatedSearchCount = async (searchItem, movie) => {
  console.log("update function Triggered")
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchItem", searchItem), // Fixed Query.equal syntax
    ]);

    if (result.documents.length > 0) {
      const doc = result.documents[0];
      await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1, // Fixed property access
      });
    } else {
     console.log("New Item")
      const newDoc = await database.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          searchItem,
          count: 1,
          movie_id: movie.id,
          poster_url:`https://image.tmdb.org/t/p/w500${movie.poster_path}`
            
        }
      );
      console.log(newDoc);
    }
  } catch (e) {
    console.log(e);
  }
};
