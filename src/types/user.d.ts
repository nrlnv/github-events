interface User {
  email: string
  gender: string
  name: {
    first: string
    last: string
    title: string
  }
  phone: string
  picture: {
    thumbnail: string
    large: string
  }
  login: {
    uuid: string
    username: string
  }
}
