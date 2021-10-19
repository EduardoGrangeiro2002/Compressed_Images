const sharp = require('sharp');
const compress_images = require('compress-images')
const fs = require('fs');

let path = process.argv[2];

let width = Number(process.argv[3]);

let outputPath = process.argv[4];

function redimensionar(inputPath,outputPath, width){
     sharp(inputPath).resize({width: width}).rotate(30)
     .toFile(outputPath,(err) => {
         if(err){console.log(err)}else{
             console.log('imagem redimensionada com sucesso')
             compress(outputPath, "./compressed/")

         }
     })
}



let compress = (pathInput, pathOutput) =>{
    compress_images(pathInput, pathOutput, { compress_force: false, statistic: true, autoupdate: true }, false,
        { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
        { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
        { svg: { engine: "svgo", command: "--multipass" } },
        { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
function (error, completed, statistic) {
console.log("-------------");
console.log(error);
console.log(completed);
console.log(statistic);
console.log("-------------");
      fs.unlink(pathInput, (err)=>{
          if(err){
              console.log(err)
          }else{
              console.log(pathInput, ' Apagado')
          }
      })




}
);

}


redimensionar(path, outputPath, width)
