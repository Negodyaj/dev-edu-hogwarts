// To convert dataUrl (which we get from our blob) to a a file object
export const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) u8arr[n] = bstr.charCodeAt(n);

  return new File([u8arr], filename, { type: mime });
};

export const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

export function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180;
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
export function rotateSize(width, height, rotation) {
  const rotRad = getRadianAngle(rotation);

  return {
    width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 */
// export default async function getCroppedImg(
//   imageSrc,
//   pixelCrop,
//   rotation = 0,
//   flip = { horizontal: false, vertical: false }
// ) {
//   const image = await createImage(imageSrc);
//   const canvas = document.createElement('canvas');
//   const ctx = canvas.getContext('2d');

//   if (!ctx) {
//     return null;
//   }

//   const rotRad = getRadianAngle(rotation);

//   // calculate bounding box of the rotated image
//   const { width: bBoxWidth, height: bBoxHeight } = rotateSize(image.width, image.height, rotation);

//   // set canvas size to match the bounding box
//   canvas.width = bBoxWidth;
//   canvas.height = bBoxHeight;

//   // translate canvas context to a central location to allow rotating and flipping around the center
//   ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
//   ctx.rotate(rotRad);
//   ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
//   ctx.translate(-image.width / 2, -image.height / 2);

//   // draw rotated image
//   ctx.drawImage(image, 0, 0);

//   // croppedAreaPixels values are bounding box relative
//   // extract the cropped image using these values
//   const data = ctx.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height);

//   // set canvas width to final desired crop size - this will clear existing context
//   canvas.width = pixelCrop.width;
//   canvas.height = pixelCrop.height;

//   // paste generated rotate image at the top left corner
//   ctx.putImageData(data, 0, 0);

//   // As Base64 string
//   // return canvas.toDataURL('image/jpeg');

//   // As a blob
//   return new Promise((resolve) => {
//     canvas.toBlob((file) => {
//       resolve(URL.createObjectURL(file));
//     }, 'image/jpeg');
//   });
// }

export default async function getCroppedImg(imageSrc, pixelCrop, rotation = 0) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  // set each dimensions to double largest dimension to allow for a safe area for the
  // image to rotate in without being clipped by canvas context
  canvas.width = safeArea;
  canvas.height = safeArea;

  // translate canvas context to a central location on image to allow rotating around the center.
  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate(getRadianAngle(rotation));
  ctx.translate(-safeArea / 2, -safeArea / 2);

  // draw rotated image and store data.
  ctx.drawImage(image, safeArea / 2 - image.width * 0.5, safeArea / 2 - image.height * 0.5);

  const data = ctx.getImageData(0, 0, safeArea, safeArea);

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // paste generated rotate image with correct offsets for x,y crop values.
  ctx.putImageData(
    data,
    0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x,
    0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y
  );

  // As Base64 string
  // return canvas.toDataURL("image/jpeg");
  return canvas;
}
