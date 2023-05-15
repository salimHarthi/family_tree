import mongoose from 'mongoose';

let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    const collections = Object.keys(mongoose.connection.collections);

    // Loop through the collections and drop each one
    collections.forEach((collectionName) => {
      const collection = mongoose.connection.collections[collectionName];
      collection.drop((err, result) => {
        if (err) {
          console.error(`Error dropping collection ${collectionName}: ${err}`);
        } else {
          console.log(`Collection ${collectionName} dropped successfully.`);
        }
      });
    });
    await Vertical.insertMany(verticalsSeed);
    console.log('MongoDB connected');
    mongoose.connection.close();
  } catch (error) {
    console.log(error);
    mongoose.connection.close();
  }
};
