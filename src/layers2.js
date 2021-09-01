
let niipath = '_0727add5.25_CAL-IAC.nii.gz'
let z = 134
let y = 255
let x = 255

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
