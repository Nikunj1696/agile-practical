import mongoose from 'mongoose';
import constants from '../utils/constants';

const connect =  async () => {
  const connection = await mongoose.connect(constants.databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
	
  return connection.connection.db;
};

export default connect;
