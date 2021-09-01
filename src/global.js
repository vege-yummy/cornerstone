let num0 = 1
const niipath1 = '5.25_HM-RA-ILD.nii.gz'
const niipath2 = '_0727add5.25_CAL-IAC.nii.gz'
const niipath3 = '_0727add5.25_CZE-ILD.nii.gz'
let niipath = niipath1
if (num0 === 1) {
  niipath = niipath1
} else if (num0 === 2) {
  niipath = niipath2
} else if (num0 === 3) {
  niipath = niipath3
}

let data = {
  num: num0,
  niipath
}
export default data
