import { connect } from 'mongoose';

const PASSWORD = '';
const DB_PATH = `mongodb+srv://stu01509:${PASSWORD}@mongodb.q9wxpvh.mongodb.net/?retryWrites=true&w=majority`

const connectMongoDB = async (): Promise<void> => {
  await connect(DB_PATH);
};

export default connectMongoDB;