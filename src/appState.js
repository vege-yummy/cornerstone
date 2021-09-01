import data from './global'

import study1 from 'studies/1.js'
import study2 from 'studies/2.js'
import study3 from 'studies/3.js'
const series = []

if (data.num === 1) {
  series[0] = study1
} else if (data.num === 2) {
  series[0] = study2
} else if (data.num === 3) {
  series[0] = study3
}

export default {
  series,
  vtkVolumes: []
}
