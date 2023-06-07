export function  asyncFileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      // target.result 该属性表示目标对象的DataURL
      resolve(e.target.result)
    }
  })
}
export function  asyncImage2Base64(file) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = file
    img.onload = function() {
      var canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      var ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, img.width, img.height)
      var ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase()
      var dataURL = canvas.toDataURL('image/' + ext)
      resolve(dataURL)
      // console.log(11,dataURL)
    }

  })
}
