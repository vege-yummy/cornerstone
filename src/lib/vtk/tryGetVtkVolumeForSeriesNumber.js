import appState from './../../appState.js'
import createVtkVolumeAsync from './createVtkVolumeAsync.js'
let num1=1
export default async function (seriesNumber) {
  let vtkVolume = appState.vtkVolumes[seriesNumber]
  if (!vtkVolume) {
    vtkVolume = await createVtkVolumeAsync(appState.series[seriesNumber]) // 1.dcm
    appState.vtkVolumes[seriesNumber] = vtkVolume
  }
  return vtkVolume
}
