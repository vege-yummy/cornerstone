export default function (object) {
  const imageLoadObject = {
    promise: undefined,
    cancelFn: undefined,
    decacheData: undefined
  }

  imageLoadObject.promise = createImage(object)
return createImage(object)
 // return imageLoadObject
}

async function createImage (object) {
  const image = object.image

  let tmp = []
  for (var k = 0; k < 512 * 512; k++) {
    tmp.push(1)
  }

  image.getPixelData = () => tmp
  image.width = 512

  /*
  const image = {
    imageId,
    color: false,
    columnPixelSpacing: mappedSlice.columnPixelSpacing,
    rowPixelSpacing: mappedSlice.rowPixelSpacing,
    columns: mappedSlice.columns,
    width: mappedSlice.width,
    height: mappedSlice.height,
    rows: mappedSlice.rows,
    intercept: 0,
    invert: false,
    getPixelData: () => mappedSlice.pixelData,
    minPixelValue: mappedSlice.minPixelValue,
    maxPixelValue: mappedSlice.maxPixelValue,
    sizeInBytes: mappedSlice.sizeInBytes,
    slope: 1,
    windowCenter: mappedSlice.windowCenter,
    windowWidth: mappedSlice.windowWidth,
    decodeTimeInMS: 0,
    floatPixelData: undefined,
    isMpr: true
  }

  */

  /*
  // set the ww/wc to cover the dynamic range of the image if no values are supplied
  if (image.windowCenter === undefined || image.windowWidth === undefined) {
    const maxVoi = image.maxPixelValue * image.slope + image.intercept
    const minVoi = image.minPixelValue * image.slope + image.intercept

    image.windowWidth = maxVoi - minVoi
    image.windowCenter = (maxVoi + minVoi) / 2
  }
  */

  // console.log('~~ CREATE IMAGE: ', image)

  return image
}
