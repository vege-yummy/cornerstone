/* eslint-disable space-infix-ops */
import layers from './layers'
import cornerstone, { convertToFalseColorImage, getViewport } from 'cornerstone-core'
import niiLoader from './niiLoader'
export default function (index, element) {
  var i
  if (element.id === 'axial-target') i = 0
  if (element.id === 'coronal-target') i = 1
  if (element.id === 'sagittal-target') i = 2

  if (i === 0) {
    layers[i][0].imageId = 'mpr:0:1,0,0,0,1,0:0,0,' + parseInt(index)
    layers[i][1].imageId = 'nifti:studies/5.25_HM-RA-ILD.nii.gz#z-' + (234 - parseInt(index)) + ',t-0'
  } else if (i === 1) {
    layers[i][0].imageId = 'mpr:0:1,0,0,0,0,-1:center:0,' + parseInt(index) + ',233'
    var k=(279-(index-55)*279/183)+145
    layers[i][1].imageId = 'nifti:studies/5.25_HM-RA-ILD.nii.gz#y-' + parseInt(k) + ',t-0'
  } else if (i === 2) {
    layers[i][0].imageId = 'mpr:0:1,0,0,0,0,-1:center:' + parseInt(index) + ',0,233'
    var m=((index-52)*332/222)+88
    layers[i][1].imageId = 'nifti:studies/5.25_HM-RA-ILD.nii.gz#x-' + parseInt(m) + ',t-0'
  }

  loadLayers(i, element)
  cornerstone.resize(element, true)
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
    images.forEach(function (image, index) {
      const layer = layers[i][index]
      const layer2 = cornerstone.getLayers(element)[1]

      cornerstone.removeLayer(element, layer2.layerId)

      const layerId = cornerstone.addLayer(element, image, layer.options)
      const newlayer1 = cornerstone.getLayers(element)[0]
      let newlayer2 = cornerstone.getLayers(element)[1]
      if (i === 0) {
        newlayer2.viewport.vflip = true
        newlayer2.viewport.scale = newlayer1.viewport.scale
      } else if (i === 1) {
        if (index===1) {
          newlayer2.image.rowPixelSpacing=1.54
        }
        newlayer2.viewport.scale = newlayer1.viewport.scale
      } else if (i === 2) {
        console.log(newlayer2.image.imageId)
        if (index===1) {
          newlayer2.viewport.hflip=true
          newlayer2.image.rowPixelSpacing=1.54
          // newlayer2.image.columnPixelSpacing=0.9
        }
        
        newlayer2.viewport.scale = newlayer1.viewport.scale
      }

      let a = cornerstone.getEnabledElement(element)
      a.syncViewports = false
    })
  })
}
