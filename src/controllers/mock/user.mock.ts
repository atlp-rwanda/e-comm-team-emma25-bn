export const httpRequest = (email) => ({
  user: {
    id: '1',
    email,
    name: {
      familyName: 'request',
      middleName: 'request',
      givenName: 'request',
    },
    firstName: 'firstName',
    lastName: 'lastName',
    role: 'buyer',
  },
})

export const httpResponse = () => {
  const res: any = {
    json: (data) => {
      res.body = data
      return res
    },
    status: (data) => {
      res.body = data
      return res
    },
  }
  return res
}
