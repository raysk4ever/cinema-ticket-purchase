import { createClient } from 'redis'

const redis = createClient({ url: 'redis://localhost:6379' });
redis.connect()

redis
.on('connect', () => {
  console.log('Connected to Redis');
})
.on('error', err => console.error(`Redis Error: ${err}`));


export default redis
