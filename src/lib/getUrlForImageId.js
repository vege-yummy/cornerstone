import data from '../global'
const scheme = 'wadouri'
const base = 'http://localhost:9000/studies'

var seriesNumber = data.num

export default function (imageId) {
  // seriesNumber = num
  return `${scheme}:${base}/${seriesNumber}/${imageId}`
}
