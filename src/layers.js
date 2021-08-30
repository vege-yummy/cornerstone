import data from './global'

let niipath = data.niipath
let z = 117
let x = 254
let y = 256
if (data.num === 2) {
  z = 134
  y = 255
  x = 255
} else if (data.num === 3) {
  z = 154
  y = 252
  x = 256
}
let layers = [[{
  imageId: 'mpr:0:1,0,0,0,1,0:center',
  options: {
    name: 'AXIAL'
  }
}, {
  imageId: 'nifti:studies/' + niipath + '#z-' + z + ',t-0',
  options: {
    name: 'NIFTI-Z',
    opacity: 0.4,
    viewport: {
      colormap: 'copper'
    }
  }
}],
[{
  imageId: 'mpr:0:1,0,0,0,0,-1:center',
  options: {
    name: 'CORONAL'
  }
}, {
  imageId: 'nifti:studies/' + niipath + '#y-' + y + ',t-0',
  options: {
    name: 'NIFTI-Y',
    opacity: 0.4,
    viewport: {
      colormap: 'copper'
    }
  }
}],
[{
  imageId: 'mpr:0:0,1,0,0,0,-1:center',
  options: {
    name: 'SAGITTAL'
  }
}, {
  imageId: 'nifti:studies/' + niipath + '#x-' + x + ',t-0',
  options: {
    name: 'NIFTI-X',
    opacity: 0.4,
    viewport: {
      colormap: 'copper'
    }
  }
}]
]

export default layers
