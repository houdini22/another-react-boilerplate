import md5 from 'md5'

export const uuid = () => {
  return md5(Math.random())
}
