import mongoose from 'mongoose';
import config from 'config'

import logger from "./logger"

async function connect() {
    const dbUri = config.get<string>('dbUri')
    try {
        await mongoose.connect(dbUri);
        logger.info("Database connected")
    } catch (err) {
        logger.error("Coudln't connect to Database");
        process.exit(1)
    }
}


export default connect