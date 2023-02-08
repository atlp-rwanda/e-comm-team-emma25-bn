import {createClient} from 'redis'

const redis_client = createClient({
  password: 'PAmdnJZxlNl4uZDFDK5U3T7Km56w1xCq',
  socket: {
    host: 'redis-12751.c9.us-east-1-4.ec2.cloud.redislabs.com',
    port: 12751,
  },
})
export default redis_client
