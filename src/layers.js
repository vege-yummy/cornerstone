let layers = [[{
  imageId: 'mpr:0:1,0,0,0,1,0:center',
  options: {
    name: 'AXIAL'
  }
}, {
  imageId: 'nifti:studies/5.25_HM-RA-ILD.nii.gz#z-117,t-0',
  options: {
    name: 'NIFTI',
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
  imageId: 'nifti:studies/5.25_HM-RA-ILD.nii.gz#y-117,t-0',
  options: {
    name: 'NIFTI',
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
  imageId: 'nifti:studies/5.25_HM-RA-ILD.nii.gz#x-117,t-0',
  options: {
    name: 'NIFTI',
    opacity: 0.4,
    viewport: {
      colormap: 'copper'
    }
  }
}]
]

export default layers
