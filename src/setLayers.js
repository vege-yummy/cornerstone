/* eslint-disable space-infix-ops */
import layers from './layers'
import cornerstone, { convertToFalseColorImage, getViewport } from 'cornerstone-core'
import data from './global'
export default function (index, element) {
  var i
  if (element.id === 'axial-target') i = 0
  if (element.id === 'coronal-target') i = 1
  if (element.id === 'sagittal-target') i = 2
  var total=234
  if (i === 0) {
    layers[i][0].imageId = 'mpr:0:1,0,0,0,1,0:0,0,' + parseInt(index)
    if (data.num===1) total=234
    else if (data.num===2) total=266
    else if (data.num===3) total=306
    layers[i][1].imageId = 'nifti:studies/'+data.niipath+'#z-' + (total - parseInt(index)) + ',t-0'
  } else if (i === 1) {
    layers[i][0].imageId = 'mpr:0:1,0,0,0,0,-1:center:0,' + parseInt(index) + ',233'
    var k=0
    if (data.num===1) {
      k=(279-(index-55)*279/183)+145
    } else if (data.num===2) {
      k=(275-(index-75)*275/195)+121
    } else if (data.num===3) {
      k=(261-(index-76)*261/165)+119
    }

    layers[i][1].imageId = 'nifti:studies/'+data.niipath+'#y-' + parseInt(k) + ',t-0'
  } else if (i === 2) {
    layers[i][0].imageId = 'mpr:0:1,0,0,0,0,-1:center:' + parseInt(index) + ',0,233'
    var m=0
    if (data.num===1) {
      m=((index-52)*332/222)+88
    } else if (data.num===2) {
      m=((index-62)*348/241)+93
    } else if (data.num===3) {
      m=((index-34)*382/238)+60
    }
    layers[i][1].imageId = 'nifti:studies/'+data.niipath+'#x-' + parseInt(m) + ',t-0'
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
      if (i === 0) { // 第一张图
        //console.log(newlayer2.image.imageId)
        newlayer2.viewport.vflip = true
        newlayer2.viewport.scale = newlayer1.viewport.scale
      } else if (i === 1) {
       // console.log(newlayer2.image.imageId)
        if (index===1) { // nii
          if (data.num===1) { // 第一套图
            newlayer2.image.rowPixelSpacing=1.54
          } else if (data.num===2) {
            // newlayer2.viewport.hflip = true
            newlayer2.image.rowPixelSpacing=1.5
          } else if (data.num===3) {
            newlayer2.image.rowPixelSpacing=1.62
          }
        }
        newlayer2.viewport.scale = newlayer1.viewport.scale
      } else if (i === 2) { // 第三张图
       // console.log(newlayer2.image.imageId)
        if (index===1) {
          newlayer2.viewport.hflip=true

          newlayer2.image.rowPixelSpacing=1.54
          if (data.num===3) {
            newlayer2.image.rowPixelSpacing=1.62
          }
        }

        newlayer2.viewport.scale = newlayer1.viewport.scale
      }

      let a = cornerstone.getEnabledElement(element)
      a.syncViewports = false
    })
  })
}
