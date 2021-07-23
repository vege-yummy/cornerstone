import layers from './layers'
import cornerstone, { convertToFalseColorImage } from 'cornerstone-core'

export default function (index, element) {
    console.log(element)
  var i
  if (element.id === 'axial-target') i = 0
  if (element.id === 'coronal-target') i = 1

  if (i === 0) {
    layers[i][0].imageId = 'mpr:0:1,0,0,0,1,0:0,0,' + parseInt(index)
    layers[i][1].imageId = 'nifti:studies/5.25_HM-RA-ILD.nii.gz#z-' + (234 - parseInt(index)) + ',t-0'
  } else if (i === 1) {
    layers[i][0].imageId = 'mpr:0:1,0,0,0,0,-1:center:0,' + parseInt(index) + ',233'
    layers[i][1].imageId = 'nifti:studies/5.25_HM-RA-ILD.nii.gz#y-' + (234-parseInt(index)) + ',t-0'
  }

  loadLayers(i, element)
}
function loadImages (i) {
  const promises = []

  layers[i].forEach(function (layer) {
    const loadPromise = cornerstone.loadAndCacheImage(layer.imageId)
    promises.push(loadPromise)
  })

  return Promise.all(promises)
}

function loadLayers (i, element) {
  loadImages(i).then(function (images) {
      console.log(images)
    images.forEach(function (image, index) {
      const layer = layers[i][index]
      // const layer1 = cornerstone.getLayers(tmp)[0]
      const layer2 = cornerstone.getLayers(element)[1]

      cornerstone.removeLayer(element, layer2.layerId)
      const layerId = cornerstone.addLayer(element, image, layer.options)
      const newlayer1 = cornerstone.getLayers(element)[0]
      const newlayer2 = cornerstone.getLayers(element)[1]
      newlayer2.viewport.vflip = true
      newlayer2.viewport.scale = newlayer1.viewport.scale
      let a = cornerstone.getEnabledElement(element)
      a.syncViewports = false
    })
  })
}
