const config = {}

config.appletName = 'answer'

config.env = {
  dev: {
    DOMAIN: 'http://192.168.50.80:9001'
  },
  test: {
    DOMAIN: 'http://192.168.31.194:9001'
  },
  pro: {
    DOMAIN: 'https://mp.langjie.com'
  }
}
export default {
  ...config.env.pro,
  ...config
}