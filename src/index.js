import cornerstone from 'cornerstone-core'
//
import setupCornerstone from './setupCornerstone.js'
import appState from './appState.js'
import getUrlForImageId from './lib/getUrlForImageId.js'
import getMprUrl from './lib/getMprUrl.js'
import setupNiftiLoader from './setupNiftiLoader.js'
import { mat4 } from 'gl-matrix'
import layers from './layers.js'
import * as cornerstoneNIFTIImageLoader from 'cornerstone-nifti-image-loader'
const mprAxialSeriesElement = document.getElementById('axial-target')
const mprCoronalSeriesElement = document.getElementById('coronal-target')
const mprSagittalSeriesElement = document.getElementById('sagittal-target')
function loadLayers () {
  loadImages(0).then(function (images) {
    images.forEach(function (image, index) {
      const layer = layers[0][index]
      const layerId = cornerstone.addLayer(mprAxialSeriesElement, image, layer.options)
      cornerstone.updateImage(mprAxialSeriesElement)
    })
    const layer1 = cornerstone.getLayers(mprAxialSeriesElement)[0]
    const layer2 = cornerstone.getLayers(mprAxialSeriesElement)[1]
    layer2.viewport.vflip = true
    layer2.viewport.scale = layer1.viewport.scale
    let a = cornerstone.getEnabledElement(mprAxialSeriesElement)
    a.syncViewports = false
    cornerstone.updateImage(mprAxialSeriesElement)
  })
  loadImages(1).then(function (images) {
    images.forEach(function (image, index) {
      const layer = layers[1][index]
      const layerId = cornerstone.addLayer(mprCoronalSeriesElement, image, layer.options)

      cornerstone.updateImage(mprCoronalSeriesElement)
    })
    const layer1 = cornerstone.getLayers(mprCoronalSeriesElement)[0]
    const layer2 = cornerstone.getLayers(mprCoronalSeriesElement)[1]
    layer2.viewport.vflip = false

    layer2.viewport.scale = layer1.viewport.scale
    layer2.image.rowPixelSpacing = 1.54
    let a = cornerstone.getEnabledElement(mprCoronalSeriesElement)
    a.syncViewports = false
    cornerstone.updateImage(mprCoronalSeriesElement)
  })
  loadImages(2).then(function (images) {

    images.forEach(function (image, index) {
      const layer = layers[2][index]
      const layerId = cornerstone.addLayer(mprSagittalSeriesElement, image, layer.options)

      cornerstone.updateImage(mprSagittalSeriesElement)
    })
    const layer1 = cornerstone.getLayers(mprSagittalSeriesElement)[0]
    const layer2 = cornerstone.getLayers(mprSagittalSeriesElement)[1]
    layer2.viewport.vflip = false
    layer2.viewport.hflip=true
    layer2.viewport.scale = layer1.viewport.scale
    layer2.image.rowPixelSpacing = 1.54
    let a = cornerstone.getEnabledElement(mprSagittalSeriesElement)
    a.syncViewports = false
    cornerstone.updateImage(mprSagittalSeriesElement)
  })
}

function loadImages (i) {
  const promises = []

  layers[i].forEach(function (layer) {
    const loadPromise = cornerstone.loadAndCacheImage(layer.imageId)
    promises.push(loadPromise)
  })
  return Promise.all(promises)
}

async function kickstartApp () {
  // Setup
  const seriesNumber = 0
  setupCornerstone(seriesNumber)
 // setupNiftiLoader()
 cornerstoneNIFTIImageLoader.external.cornerstone = cornerstone

  cornerstoneNIFTIImageLoader.nifti.streamingMode = true
  // const originalSeriesElement = document.getElementById('cornerstone-target')

  // var ctx = canvas.getContext('2d')
  // let imageData = ctx.createImageData(canvas.width, canvas.height)
  // let data = imageData.data

  // Display original series
  const seriesImageIds = appState.series[seriesNumber]
  const imageUrl = getUrlForImageId(seriesImageIds[0])
  // console.log(imageUrl) // wadouri:http://localhost:9000/studies/1/1.dcm
  /* cornerstone.loadAndCacheImage(imageUrl).then(image => {
    console.log(image)
    cornerstone.displayImage(originalSeriesElement, image)
  })
*/
  // ~~ AXIAL
  // Image orientation patient (IOP)
  const axial = mat4.create()
  const axialIop = new Float32Array([
    axial[0], axial[1], axial[2],
    axial[4], axial[5], axial[6]
  ])
  const axialIopAsString = axialIop.join()
  // const axialMprUrl = getMprUrl(axialIopAsString, "0,0,97.5");
  const axialMprUrl = getMprUrl(axialIopAsString) // 生成一个url
  // console.log(axialMprUrl)// mpr:0:1,0,0,0,1,0:center
  // cornerstone.loadAndCacheImage(axialMprUrl).then(image => {
  // cornerstone.displayImage(mprAxialSeriesElement, image)
  // })

  // ~~ CORONAL
  // Image orientation patient (IOP)
  const coronalIop = new Float32Array([
    1, 0, 0,
    0, 0, -1
  ])
  const coronalIopAsString = coronalIop.join()
  // const coronalMprUrl = getMprUrl(coronalIopAsString, "0,69.3642578125,0");
  const coronalMprUrl = getMprUrl(coronalIopAsString)
  // console.log(coronalMprUrl) // mpr:0:1,0,0,0,0,-1:center
  // cornerstone.loadAndCacheImage(coronalMprUrl).then(image => {
  //   cornerstone.displayImage(mprCoronalSeriesElement, image)
  // })

  // ~~ SAGITTAL
  // Image orientation patient (IOP)
  const sagittalIop = new Float32Array([
    0, 1, 0,
    0, 0, -1
  ])
  const sagittalIopAsString = sagittalIop.join()
  // const sagittalMprUrl = getMprUrl(sagittalIopAsString, "69.3642578125,0,0");
  const sagittalMprUrl = getMprUrl(sagittalIopAsString)
  // console.log(sagittalMprUrl) // mpr:0:0,1,0,0,0,-1:center
  // cornerstone.loadAndCacheImage(sagittalMprUrl).then(image => {
  //  cornerstone.displayImage(mprSagittalSeriesElement, image)
  // })
}

kickstartApp()
loadLayers()
