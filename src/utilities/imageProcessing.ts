import express from 'express';
import sharp from 'sharp';
import path from 'path';
import { existsSync } from 'fs';

// define local directory for images
const importImages: string = './images/full';
const exportImages: string = './images/thumb';

// define a middleware for image processing
const imageProcess = async (req: express.Request, res: express.Response, next: Function): Promise<void> => {
  const width: string | number = req.query.width as string | number;
  const height: string | number = req.query.height as string | number;
  const imageName: string = req.query.filename as string;
  const thumbImageName: string = `${imageName}_${width}_${height}.jpg` as string;
  const originalImgPath: string = path.join(__dirname, `.${importImages}`, `/${imageName}.jpg`) as string;
  const thumbImgPath: string = path.join(__dirname, `.${exportImages}`, `/${thumbImageName}`) as string;

  try {
    // check if the image exists in the thumb directory
    if (existsSync(thumbImgPath)) {
      res.sendFile(thumbImgPath);
    } else {
      // Using sharp to resize provided image
      const result = await sharp(originalImgPath)
        .resize({ width: +width, height: +height })
        .toFile(thumbImgPath);
      res.sendFile(thumbImgPath);
    }
  } catch (error) {
    // throw an error when any of the parameters is wrongly entered
    if (width <= 0 || height <= 0) {
      console.log(`Image parameters is wrong! Try positve value`);
      res.send(`Image parameters is wrong! Try positve value`);
    } else if (width != Number(width) || height != Number(height)) {
      console.log(`Image parameters is wrong! Try entring numerical value`);
      res.send(`Image parameters is wrong! Try entring numerical value`);
    } else if (imageName == '') {
      console.log(`Image parameters is missing! Try entring the value`);
      res.send(`Image name parameter is missing! Try entring the value`);
    } else {
      console.log(`There is no image names ${imageName}`);
      res.send(`There is no image names ${imageName}`);
    }
  }
  next();
}

export default imageProcess;